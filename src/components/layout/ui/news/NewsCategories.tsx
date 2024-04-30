import { useQuery } from '@tanstack/react-query'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { StyledContainer, StyledLi, StyledUl } from './NewsCategories.styled'
import { DatabaseService } from '@/services/database.service'

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
    queryFn: async () => await DatabaseService.getCategoriesList(),
  })
  const renderCategoriesList = () => {
    if (isSuccess && data) {
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
