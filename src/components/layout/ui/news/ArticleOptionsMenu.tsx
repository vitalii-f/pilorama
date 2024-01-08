import { DatabaseService } from '@/services/database.service'
import { RootState } from '@/store/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { StyledUl, StyledLi } from './ArticleOptionsMenu.styled'

interface ArticleOptionsMenuProps {
  id: number
}

const ArticleOptionsMenu = ({ id }: ArticleOptionsMenuProps) => {
  const queryClient = useQueryClient()
  const userData = useSelector((state: RootState) => state.userSlice)
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationKey: ['remove article'],
    mutationFn: async (id: number) => {
      if (userData.role?.includes('admin')) await DatabaseService.deleteArticle(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })

  const redirectToEdit = () => {
    if (userData.role?.includes('admin')) navigate(`/edit/${id}`)
  }

  return (
    <div>
      <StyledUl>
        <StyledLi onClick={redirectToEdit}>Редактировать</StyledLi>
        <StyledLi type='delete' onClick={() => mutate(id)}>
          Удалить
        </StyledLi>
      </StyledUl>
    </div>
  )
}

export default ArticleOptionsMenu
