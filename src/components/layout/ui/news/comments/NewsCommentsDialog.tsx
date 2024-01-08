import { DatabaseService } from '@/services/database.service'
import { RootState } from '@/store/store'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;
  z-index: 45;
`

const StyledMenu = styled.div`
  position: absolute;
  transform: translateX(-100%);

  background-color: var(--color-backdrop);
  padding: 10px 10px;
  border-radius: 5%;
  z-index: 50;
`

const StyledUl = styled.ul`
  position: relative;
  z-index: 55;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledButton = styled.button`
  width: 100%;
  padding: 2px;
  text-align: left;
  &:hover {
    outline: 1px solid white;
    border-radius: 3px;
  }
`

interface NewsCommentsDialogProps {
  setOpenedDialogMenu(openedDialogMenu: number | null): void
  id: number
  authorID: string
  setRedactingComment(redactingComment: number | null): void
}

const NewsCommentsDialog = ({ setOpenedDialogMenu, id, authorID, setRedactingComment }: NewsCommentsDialogProps) => {
  const userRoles = useSelector((state: RootState) => state.userSlice.role)
  const userID = useSelector((state: RootState) => state.userSlice.user?.id)
  const queryClient = useQueryClient()

  const handleDeleteComment = async () => {
    if (userRoles?.includes('admin')) {
      await DatabaseService.deleteComment(id)
      queryClient.invalidateQueries({queryKey: ['get comments']})
    }
  }

  const handleRedactComment = () => {
    setRedactingComment(id)
    setOpenedDialogMenu(null)
  }

  return (
    <div>
      <StyledMenu>
        <StyledUl>
          <li><StyledButton>Пожаловаться</StyledButton></li>
          {authorID === userID && <li><StyledButton onClick={handleRedactComment}>Редактировать</StyledButton></li>}
          {(authorID === userID || userRoles?.includes('admin')) && <li><StyledButton onClick={handleDeleteComment}>Удалить</StyledButton></li>}
        </StyledUl>
      </StyledMenu>
      <StyledBackdrop onClick={() => setOpenedDialogMenu(null)} />
    </div>
  )
}

export default NewsCommentsDialog
