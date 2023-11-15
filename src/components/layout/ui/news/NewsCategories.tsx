import { FirestoreService } from '@/services/firestore.service'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const StyledContainer = styled.div`
  display: flex;
  gap: 15px;

  padding: 15px 0;
`
const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 7px 0;

  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 2px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-bg-scrollbar);
  }
`

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px 10px;
  background-color: var(--color-bg-input);

  border: 2px solid ${(props) => props.color || '#FFF'};
  border-radius: 10px;

  cursor: pointer;
`

interface NewsCategoryProps {
  filterCategory: string
  setFilterCategory(filterCategory: string): void
  setCurrentPage(currentPage: number): void
  refetch(): void
}

const NewsCategories = ({
  filterCategory,
  setFilterCategory,
  setCurrentPage,
  refetch,
}: NewsCategoryProps) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await FirestoreService.getСategoriesList(),
  })

  const renderCategoriesList = () => {
    if (isSuccess) {
      return (
        <StyledUl>
          {filterCategory && (
            <RestartAltIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setCurrentPage(0)
                setFilterCategory('')
                refetch()
              }}
            />
          )}
          {data.map((item) => (
            <StyledLi
              color={
                item.name === filterCategory ? 'var(--color-secondary)' : '#FFF'
              }
              key={item.name}
              onClick={() => {
                setCurrentPage(0)
                setFilterCategory(item.name)
                refetch()
              }}
            >
              {item.name}
            </StyledLi>
          ))}
        </StyledUl>
      )
    }
  }

  return <StyledContainer>{renderCategoriesList()}</StyledContainer>
}

export default NewsCategories
