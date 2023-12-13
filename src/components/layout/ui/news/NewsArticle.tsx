import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ArticleOptionsMenu from './ArticleOptionsMenu'
import { Tables } from '@/utils/interfaces/Supabase.interfaces'

const StyledArticle = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ArticleImgContainer = styled.div`
  flex-shrink: 3;
`

const StyledImg = styled.img`
  max-width: 220px;
  max-height: 130px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 200px;
  }
`

interface NewsArticleProps {
  article: Tables<'news_articles'>
  haveAccess: boolean
}

interface ElementVisibilityProps {
  id: number | null
  togled: boolean
}

const NewsArticle = ({ article, haveAccess }: NewsArticleProps) => {
  const [elementVisibility, setElementVisibility] = useState<ElementVisibilityProps>({
    id: null,
    togled: false,
  })

  function togleMenu(id: number) {
    elementVisibility.togled
      ? setElementVisibility(() => ({ id: id, togled: false }))
      : setElementVisibility(() => ({ id: id, togled: true }))
  }

  return (
    <StyledArticle className='transition-shadow shadow-md sm:flex-row'>
      <ArticleImgContainer className=''>
        <StyledImg src={article.imgURL} />
      </ArticleImgContainer>
      <div className='flex flex-col justify-between w-full py-2'>
        <div className='flex items-center justify-between pb-2 border-b-2 border-solid border-slate-500'>
          <div>
            <Link to={'' + article.id}>
              <h3 className='text-lg break-words text-ellipsis line-clamp-3'>
                {article.title}
              </h3>
            </Link>
            <p className='text-xs'>Автор:{article.author}</p>
          </div>
          <div className='relative'>
            {haveAccess && <button onClick={() => togleMenu(article.id)}>...</button>}
            {elementVisibility.togled && elementVisibility.id === article.id && <ArticleOptionsMenu id={article.id} />}
          </div>
        </div>
        <div className='flex justify-between'>
          <span className='mt-2 text-xs'>
            {/* {article.creation_date} */}
          </span>
          <div className='flex gap-3'>
            {article.categories &&
              article.categories.map((category) => (
                <span key={category} className='mt-2 text-xs'>
                  {category}
                </span>
              ))}
          </div>
        </div>
      </div>
    </StyledArticle>
  )
}

export default NewsArticle
