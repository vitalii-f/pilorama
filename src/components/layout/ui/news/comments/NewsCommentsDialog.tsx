import { DatabaseService } from '@/services/database.service'
import { RootState } from '@/store/store'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import EditIcon from '@mui/icons-material/Edit';
import { openReportForm } from '@/store/comments/reportSlice'
import { StyledBackdrop, StyledButton, StyledMenu, StyledUl } from './NewsCommentsDialog.styled';
import { setRedactingComment } from '@/store/comments/dialogMenuSlice';

interface NewsCommentsDialogProps {
  setOpenedDialogMenu(openedDialogMenu: number | null): void
  id: number
  authorID: string
}

const NewsCommentsDialog = ({ setOpenedDialogMenu, id, authorID }: NewsCommentsDialogProps) => {
  const userRoles = useSelector((state: RootState) => state.userSlice.role)
  const userID = useSelector((state: RootState) => state.userSlice.user?.id)
  const queryClient = useQueryClient()

  const dispatch = useDispatch()

  const handleDeleteComment = async () => {
    if (userRoles?.includes('admin')) {
      await DatabaseService.deleteComment(id)
      queryClient.invalidateQueries({queryKey: ['get comments']})
    }
  }

  const handleRedactComment = () => {
    setOpenedDialogMenu(null)
    dispatch(setRedactingComment({id}))
  }

  const handleReport = () => {
    setOpenedDialogMenu(null)
    dispatch(openReportForm({target_id: id}))
  }

  return (
    <div>
      <StyledMenu>
        <StyledUl>
          <li><StyledButton onClick={handleReport}><ReportIcon />Пожаловаться</StyledButton></li>
          {authorID === userID && <li><StyledButton onClick={handleRedactComment}><EditIcon />Редактировать</StyledButton></li>}
          {(authorID === userID || userRoles?.includes('admin')) && <li><StyledButton onClick={handleDeleteComment} $colorType='delete'><DeleteIcon />Удалить</StyledButton></li>}
        </StyledUl>
      </StyledMenu>
      <StyledBackdrop onClick={() => setOpenedDialogMenu(null)} />
    </div>
  )
}

export default NewsCommentsDialog
