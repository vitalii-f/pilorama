import { DatabaseService } from '@/services/database.service'
import { RootState } from '@/store/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { StyledUl, StyledMenu, StyledButton, StyledBackdrop } from './ArticleOptionsMenu.styled'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ArticleOptionsMenuProps {
  id: number
  setOpenedDialogMenu({}: number | null): void
}

const ArticleOptionsMenu = ({ id, setOpenedDialogMenu }: ArticleOptionsMenuProps) => {
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
    // <div>
    //   <StyledUl>
    //     <StyledLi onClick={redirectToEdit}>Редактировать</StyledLi>
    //     <StyledLi type='delete' onClick={() => mutate(id)}>
    //       Удалить
    //     </StyledLi>
    //   </StyledUl>
    // </div>

  <div>
    <StyledMenu>
      <StyledUl>
        <li><StyledButton onClick={redirectToEdit}><EditIcon />Редактировать</StyledButton></li>
        <li><StyledButton onClick={() => mutate(id)} $colorType='delete'><DeleteIcon />Удалить</StyledButton></li>
      </StyledUl>
    </StyledMenu>
    <StyledBackdrop onClick={() => setOpenedDialogMenu(null)} />
  </div>
  )
}

export default ArticleOptionsMenu
