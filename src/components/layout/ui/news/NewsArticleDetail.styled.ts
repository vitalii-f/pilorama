import styled from 'styled-components'

export const StyledArticle = styled.article`
  margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const StyledTitle = styled.h2`
  padding: 20px 0;
  font-size: clamp(1.3rem, 5vw, 2.5rem);
  font-weight: 500;
  border-bottom: 2px solid white;
`
export const StyledText = styled.div`
  font-size: clamp(1rem, 4vw, 1.5rem);
  line-height: 1.6;
  max-width: 1200px;
`

export const StyledImg = styled.img`
  margin: 0 auto;
`

export const StyledArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ffffff;
  padding-top: 10px;
`
