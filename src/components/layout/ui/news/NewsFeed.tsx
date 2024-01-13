import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import NewsArticle from './NewsArticle'
import NewsPagination from './NewsPagination'
import LoadingSpinner from '../loading/LoadingSpinner'
import styled from 'styled-components'
import NewsCategories from './NewsCategories'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'
import { RootState } from '@/store/store'
import { DatabaseService } from '@/services/database.service'

const StyledNewsFeedSection = styled.section`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

function NewsFeed() {
  const userData = useSelector((state: RootState) => state.userSlice)

  const [haveAccess, setHaveAccess] = useState<boolean>(false)
  useEffect(() => {
    if (userData && userData.role)
      setHaveAccess(userData.role.includes('admin'))
  }, [userData])

  const [itemsPerPage, setItemsPerPage] = useState<number>(2)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const [filterCategory, setFilterCategory] = useState<string>('')

  const { data, isError, refetch, error } = useQuery({
    queryKey: ['articles', currentPage, itemsPerPage, filterCategory],
    queryFn: async () => {
      if (filterCategory.length) {
        return await DatabaseService.getFilteredArticles(
          currentPage,
          currentPage * itemsPerPage + itemsPerPage - 1,
          filterCategory
        )
      } else {
        return await DatabaseService.getArticles(
          currentPage * itemsPerPage,
          currentPage * itemsPerPage + itemsPerPage - 1
        )
      }
    },
    refetchOnWindowFocus: false,
  })

  const renderNewsCategories = useMemo(() => {
    return (
      <NewsCategories
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        setCurrentPage={setCurrentPage}
        refetch={refetch}
      />
    )
  }, [filterCategory])

  if (isError) return <ErrorPage errorCode={error.message} />

  return (
    <StyledNewsFeedSection>
      {renderNewsCategories}
      {data && data.news && data.newsCount ? (
        <>
          {data.news.map((article) => (
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
            pageCount={Math.ceil(data.newsCount / itemsPerPage)}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </StyledNewsFeedSection>
  )
}

export default NewsFeed
