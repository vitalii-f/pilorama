import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import NewsArticle from './NewsArticle'
import NewsPagination from './NewsPagination'
import { FirestoreService } from '@/services/firestore.service'
import { IUserState } from '@/utils/interfaces/user.interfaces'
import { IGetedArticle, INews } from '@/utils/interfaces/article.interfaces'
import LoadingSpinner from '../loading/LoadingSpinner'
import styled from 'styled-components'
import NewsCategories from './NewsCategories'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'

const StyledNewsFeedSection = styled.section`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

function NewsFeed() {
  const user = useSelector((state: IUserState) => state.user.value)

  const [haveAccess, setHaveAccess] = useState<boolean>(false)
  useEffect(() => {
    if (user && user.userRoles) setHaveAccess(user?.userRoles.includes('admin'))
  }, [user])

  const [itemsPerPage, setItemsPerPage] = useState<number>(2)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const [filterCategory, setFilterCategory] = useState<string>('')

  const { data, isLoading, isError, refetch, error } = useQuery<INews>({
    queryKey: ['articles', currentPage, itemsPerPage, filterCategory],
    queryFn: async () => {
      if (filterCategory.length) {
        return await FirestoreService.getFilteredArticles(
          itemsPerPage,
          currentPage * itemsPerPage,
          filterCategory
        )
      } else {
        return await FirestoreService.getArticles(
          itemsPerPage,
          currentPage * itemsPerPage
        )
      }
    },
  })

  if (isError) return <ErrorPage errorCode={error.message} />
  if (isLoading) return <LoadingSpinner />
  if (!data) return <LoadingSpinner />

  const currentItems: IGetedArticle[] = data.news
  console.log(data.newsCount)
  console.log(data)
  const pageCount: number = Math.ceil(data.newsCount / itemsPerPage)

  return (
    <StyledNewsFeedSection>
      <NewsCategories
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        refetch={refetch}
      />
      {currentItems.length ? (
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
