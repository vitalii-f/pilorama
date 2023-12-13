import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import NewsArticle from './NewsArticle'
import NewsPagination from './NewsPagination'
import LoadingSpinner from '../loading/LoadingSpinner'
import styled from 'styled-components'
import NewsCategories from './NewsCategories'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'
import { RootState } from '@/store/store'
import { NewsProps } from '@/utils/interfaces/article.interfaces'
import { DatabaseService } from '@/services/database.service'

const StyledNewsFeedSection = styled.section`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

function NewsFeed() {
  const user = useSelector((state: RootState) => state.userSlice.user)

  const [haveAccess, setHaveAccess] = useState<boolean>(false)
  useEffect(() => {
    if (user && user.role) setHaveAccess(user?.role.includes('admin'))
  }, [user])

  const [itemsPerPage, setItemsPerPage] = useState<number>(2)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const [filterCategory, setFilterCategory] = useState<string>('')

  const { data, isLoading, isError, refetch, error } = useQuery<NewsProps>({
    queryKey: ['articles', currentPage, itemsPerPage, filterCategory],
    queryFn: async () => {
      if (filterCategory.length) {
        return await DatabaseService.getFilteredArticles(
          itemsPerPage,
          currentPage * itemsPerPage,
          filterCategory
        )
      } else {
        return await DatabaseService.getArticles(
          itemsPerPage,
          currentPage * itemsPerPage
        )
      }
    },
    refetchOnWindowFocus: false,
  })

  if (isError) return <ErrorPage errorCode={error.message} />
  if (isLoading) return <LoadingSpinner />
  if (!data) return <LoadingSpinner />

  const currentItems = data.news
  const pageCount = data.newsCount && Math.ceil(data.newsCount / itemsPerPage)

  return (
    <StyledNewsFeedSection>
      <NewsCategories
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        setCurrentPage={setCurrentPage}
        refetch={refetch}
      />
      {pageCount && currentItems && currentItems.length ? (
        <>
          {currentItems.map((article) => (
            <NewsArticle
              article={article}
              haveAccess={haveAccess}
              key={article.id}
            />
          ))}
          <NewsPagination
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />
        </>
      ) : (
        <h2>No Articles</h2>
      )}
    </StyledNewsFeedSection>
  )
}

export default NewsFeed
