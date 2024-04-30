import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleOptionsMenu from './ArticleOptionsMenu'
import { Tables, TablesUpdate } from '@/utils/interfaces/Supabase.interfaces'
import { ArticleAuthor, ArticleCategories, ArticleContent, ArticleDate, ArticleFooter, ArticleHeader, ArticleImgContainer, ArticleMenu, ArticleTitle, StyledArticle, StyledImg, StyledOptionsButton } from './NewsArticle.styled'

interface NewsArticleProps {
  article: Tables<'news_articles'> & {profiles: TablesUpdate<'profiles'> | null}
  haveAccess: boolean
}

const NewsArticle = ({ article, haveAccess }: NewsArticleProps) => {
  const [openedDialogMenu, setOpenedDialogMenu] = useState<number | null>(null)

  const handleMenuClick = () => {
    openedDialogMenu ? setOpenedDialogMenu(null) : setOpenedDialogMenu(article.id)
  }

  return (
    <StyledArticle>
      <ArticleImgContainer>
        <StyledImg src={article.imgURL} />
      </ArticleImgContainer>
      <ArticleContent>
        <ArticleHeader>
          <div>
            <Link to={'/articles/' + article.id}>
              <ArticleTitle>
                {article.title}
              </ArticleTitle>
            </Link>
            <ArticleAuthor>Автор: {article.profiles!.login}</ArticleAuthor>
          </div>
          <ArticleMenu>
            {haveAccess && <StyledOptionsButton onClick={handleMenuClick}>...</StyledOptionsButton>}
            {openedDialogMenu === article.id && <ArticleOptionsMenu id={article.id} setOpenedDialogMenu={setOpenedDialogMenu} />}
          </ArticleMenu>
        </ArticleHeader>
        <ArticleFooter>
          <ArticleDate>
            {new Date(article.creation_date).toLocaleDateString()}
          </ArticleDate>
          <ArticleCategories>
            {article.categories &&
              article.categories.map((category) => (
                <span key={category}>
                  {category}
                </span>
              ))}
          </ArticleCategories>
        </ArticleFooter>
      </ArticleContent>
    </StyledArticle>
  )
}

export default NewsArticle
