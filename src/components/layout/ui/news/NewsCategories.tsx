import { FirestoreService } from '@/services/firestore.service'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  gap: 15px;

  padding: 15px 0;
`
const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  gap: 10px;

  padding: 7px 0;

  overflow-x: scroll;
  scrollbar-width: thin;
`

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px 10px;
  background-color: var(--color-bg-input);

  border: 2px solid white;
  border-radius: 10px;

  cursor: pointer;
`

const NewsCategories = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await FirestoreService.getСategoriesList(),
  })

  const renderCategoriesList = () => {
    if (isSuccess) {
      return (
        <StyledUl>
          {data.map((item) => (
            <StyledLi key={item.name}>{item.name}</StyledLi>
          ))}
        </StyledUl>
      )
    }
  }

  return (
    <StyledContainer>
      {renderCategoriesList()}
    </StyledContainer>
  )
}

export default NewsCategories
