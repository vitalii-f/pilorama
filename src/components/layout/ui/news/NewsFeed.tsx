import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import NewsArticle from './NewsArticle'
import NewsPagination from './NewsPagination'
import { FirestoreService } from '@/services/firestore.service'
import { IArticle, IUserState } from '@/utils/interfaces/interfaces'

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
  if (isLoading) return <h2> Loading.. </h2>

  if (!Array.isArray(data?.news))
    return (
      <div className='flex flex-col items-center content-center w-full gap-y-5'>
        {' '}
        <h2 className='text-2xl text-yellow-400 '>Loading... </h2>{' '}
        <CircularProgress />{' '}
      </div>
    )

  const currentItems: IArticle[] = data.news
  const pageCount = Math.ceil(data.newsCount / itemsPerPage)

  return (
    <section className='flex flex-col w-full'>
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
    </section>
  )
}

export default NewsFeed
