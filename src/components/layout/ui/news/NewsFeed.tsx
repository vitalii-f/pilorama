import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import NewsArticle from './NewsArticle'
import NewsPagination from './NewsPagination'
import { FirestoreService } from '@/services/firestore.service'
import { IUserState } from '@/utils/interfaces/user.interfaces'
import { IGetedArticle } from '@/utils/interfaces/article.interfaces'
import LoadingSpinner from '../loading/LoadingSpinner'
import styled from 'styled-components'

const StyledNewsFeedSection = styled.section`
  max-width: 1280px;
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

  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ['articles', currentPage, itemsPerPage],
      queryFn: async () => await FirestoreService.getArticles(itemsPerPage, currentPage * itemsPerPage)
    }
  )
  if (isError) return <h2> Error... </h2>
  if (isLoading) return <LoadingSpinner />

  if (!Array.isArray(data?.news))
    return (
      <div className='flex flex-col items-center content-center w-full gap-y-5'>
        {' '}
        <h2 className='text-2xl text-yellow-400 '>Loading... </h2>{' '}
        <CircularProgress />{' '}
      </div>
    )

  const currentItems: IGetedArticle[] = data.news
  const pageCount = Math.ceil(data.newsCount / itemsPerPage)
  
  // redirect('/home')
  

  return (
    <StyledNewsFeedSection className='flex flex-col w-full'>
      <NewsPagination
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
      {currentItems.length ? (
        currentItems.map((article) => (
          <NewsArticle
            article={article}
            haveAccess={haveAccess}
            key={article.id}
          />
        ))
      ) : (
        <h2> No Articles</h2>
      )}
    </StyledNewsFeedSection>
  )
}

export default NewsFeed
