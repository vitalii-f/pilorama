import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { FirestoreService } from 'src/services/firestore.service'
import NewsArticle from './NewsArticle'
import NewsPagination from './NewsPagination'

function NewsFeed() {
  const user = useSelector((state) => state.user.value)

  const [haveAccess, setHaveAccess] = useState(false)
  useEffect(() => {
    setHaveAccess(user?.userRoles.includes('admin'))
  }, [user])

  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [currentPage, setCurrentPage] = useState(0)

  const { data, isLoading, isError } = useQuery(
    ['articles', currentPage, itemsPerPage],
    () => FirestoreService.getArticles(itemsPerPage, currentPage * itemsPerPage)
  )
  if (isError) return <h2> Error... </h2>
  if (isLoading) return <h2> Loading.. </h2>

  if (!Array.isArray(data.news))
    return (
      <div className='flex flex-col items-center content-center w-full gap-y-5'>
        {' '}
        <h2 className='text-2xl text-yellow-400 '>Loading... </h2>{' '}
        <CircularProgress />{' '}
      </div>
    )

  const currentItems = data.news
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
            key={article.id}
            haveAccess={haveAccess}
          />
        ))
      ) : (
        <h2> No Articles</h2>
      )}
    </section>
  )
}

export default NewsFeed
