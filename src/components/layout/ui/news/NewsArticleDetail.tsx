import { FirestoreService } from '@/services/firestore.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { StyledArticle, StyledArticleFooter, StyledImg, StyledText, StyledTitle } from './NewsArticleDetail.styled'
import LoadingSpinner from '../loading/LoadingSpinner'

function NewsArticleDetail() {
  const { id } = useParams()

  const { data, isSuccess, isLoading } = useQuery(
    {
      queryKey: ['getArticleById'],
      queryFn: async () => id ? await FirestoreService.getArticleById(+id) : null
    }
  )

  if (isLoading) return <LoadingSpinner />
  
  if (isSuccess && data)
    return (
      <StyledArticle>
        <StyledImg src={data.imgURL} />
        <StyledTitle>{data.title}</StyledTitle>
        <StyledText dangerouslySetInnerHTML={{ __html: data.text }}></StyledText>
        <StyledArticleFooter>
          <span>Автор: {data.author}</span>
          <span>{data.creation_date.toDate().toLocaleDateString()}</span>
        </StyledArticleFooter>
      </StyledArticle>
    )
}

export default NewsArticleDetail
