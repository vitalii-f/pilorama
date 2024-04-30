import styled from "styled-components"

export const StyledArticle = styled.div`
  display: flex;
  gap: 20px;
  
  margin-top: 20px;
  background-color: #303030;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ArticleImgContainer = styled.div`
  flex-shrink: 3;
`

export const StyledImg = styled.img`
  max-width: 220px;
  max-height: 130px;
  
  @media (max-width: 768px) {
    min-width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
`

export const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  width: 100%;
  padding: 10px 10px 10px 0;

  @media (max-width: 768px) {
    padding: 10px 10px;
  }
`

export const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 2px solid #BFCFE7;
  padding-bottom: 5px;
  text-overflow: ellipsis;
`

export const ArticleTitle = styled.h3`
  font-size: 1.25rem;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
`

export const ArticleAuthor = styled.p`
  font-size: 0.75rem;
`

export const ArticleMenu = styled.div`
  /* position: relative; */
`

export const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`

export const ArticleDate = styled.span`
  font-size: 0.75rem;
`

export const ArticleCategories = styled.div`
  display: flex;
  gap: 10px;

  font-size: 0.75rem;
`

export const StyledOptionsButton = styled.button`
  position: relative;
  height: fit-content;
  align-self: center;
  font-size: 1.5rem;
  line-height: 100%;

  z-index: 50;
`