import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  StyledArticle,
  StyledArticleFooter,
  StyledImg,
  StyledText,
  StyledTitle,
} from './NewsArticleDetail.styled'
import LoadingSpinner from '../loading/LoadingSpinner'
import { DatabaseService } from '@/services/database.service'

function NewsArticleDetail() {
  const { id } = useParams()

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['getArticleById'],
    queryFn: async () => id && await DatabaseService.getArticleById(+id),
  })

  if (isLoading) return <LoadingSpinner />

  if (isSuccess && data)
    return (
      <StyledArticle>
        <StyledImg src={data[0].imgURL} />
        <StyledTitle>{data[0].title}</StyledTitle>
        <StyledText
          dangerouslySetInnerHTML={{ __html: data[0].text }}
        ></StyledText>
        <StyledArticleFooter>
          <span>Автор: {data[0].author}</span>
          <span>{data[0].creation_date}</span>
        </StyledArticleFooter>
      </StyledArticle>
    )
}

export default NewsArticleDetail
