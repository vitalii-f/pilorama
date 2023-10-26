import { FirestoreService } from '@/services/firestore.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Article = styled.article`
  margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Title = styled.h2`
  padding: 20px 0;
  font-size: clamp(1.3rem, 5vw, 2.5rem);
  font-weight: 500;
  border-bottom: 2px solid white;
`
const Text = styled.div`
  font-size: clamp(1rem, 4vw, 1.5rem);
  line-height: 1.6;
  max-width: 1200px;
`

const Img = styled.img`
  margin: 0 auto;
`

function NewsArticleDetail() {
  const { id } = useParams()

  const { data, isSuccess, isLoading } = useQuery(
    {
      queryKey: ['getArticleById'],
      queryFn: async () => await FirestoreService.getArticleById(id)
    }
  )
  if (isLoading) return <h1>LOADING</h1>
  if (isSuccess)
    return (
      <Article className='flex flex-col gap-5'>
        <Img className='' src={data.imgURL} />
        <Title>{data.title}</Title>
        <Text dangerouslySetInnerHTML={{ __html: data.text }}></Text>
        <div className='flex justify-between'>
          <span>Автор: {data.author}</span>
          <span>{data.creation_date.toDate().toLocaleDateString()}</span>
        </div>
      </Article>
    )
}

export default NewsArticleDetail
