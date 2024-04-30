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
import NewsComments from './comments/NewsComments'
import ReportForm from '@/components/reportForm/ReportForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const NewsArticleDetail = () => {
  const { id } = useParams()

  const isReportFormOpened = useSelector((state: RootState) => state.reportSlice.isOpened)
  const targetID = useSelector((state: RootState) => state.reportSlice.target_id)

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['getArticleById'],
    queryFn: async () => id && await DatabaseService.getArticleById(+id),
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <LoadingSpinner />

  if (isSuccess && data && id) {
    const creationDate = new Date(data[0].creation_date).toLocaleDateString()

    return (
      <StyledArticle>
        <StyledImg src={data[0].imgURL} />
        <StyledTitle>{data[0].title}</StyledTitle>
        <StyledText
          dangerouslySetInnerHTML={{ __html: data[0].text }}
        ></StyledText>
        <StyledArticleFooter>
          <span>Автор: {data[0].profiles?.login}</span>
          <span>{creationDate}</span>
        </StyledArticleFooter>
        <NewsComments articleID={+id} />
        {isReportFormOpened && targetID && <ReportForm target_id={targetID} type='comment' />}
      </StyledArticle>
    )
  }
}

export default NewsArticleDetail
