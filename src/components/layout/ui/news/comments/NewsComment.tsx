import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import {
  StyledComment,
  StyledCommentBody,
  StyledCommentText,
  StyledOptionsButton,
  StyledRatingBar,
  StyledRatingBlock,
} from './NewsComment.styled'
import { StyledAvatar } from './NewsComments.styled'
import NewsCommentsDialog from './NewsCommentsDialog'
import { TablesRow } from '@/utils/interfaces/Supabase.interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { DatabaseService } from '@/services/database.service'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import NewsCommentRedact from './NewsCommentRedact'

interface NewsCommentProps {
  comment: TablesRow<'comments'>
  index: number
  avatars: string[]
  logins: string[]
  openedDialogMenu: number | null
  setOpenedDialogMenu(openedDialogMenu: number | null): void
}

const NewsComment = ({
  comment,
  index,
  avatars,
  logins,
  openedDialogMenu,
  setOpenedDialogMenu,
}: NewsCommentProps) => {
  const userData = useSelector((state: RootState) => state.userSlice.user)
  const queryClient = useQueryClient()

  const [redactingComment, setRedactingComment] = useState<number | null>(null)

  const handleLikeClick = async (commentID: number) => {
    if (userData) {
      await DatabaseService.likeComment(commentID)
      queryClient.invalidateQueries({ queryKey: ['get comments'] })
    }
  }

  const handleDislikeClick = async (commentID: number) => {
    if (userData) {
      await DatabaseService.dislikeComment(commentID)
      queryClient.invalidateQueries({ queryKey: ['get comments'] })
    }
  }

  const togleDialogMenu = (id: number) => {
    if (id === openedDialogMenu) setOpenedDialogMenu(null)
    else setOpenedDialogMenu(id)
  }

  return (
    <StyledComment>
      <StyledAvatar src={avatars[index]} alt='avatar' />
      <StyledCommentBody>
        <p>{logins[index]}</p>
        {redactingComment === comment.id
         ? <NewsCommentRedact id={comment.id} text={comment.text} setRedactingComment={setRedactingComment} />
         : <StyledCommentText>{comment.text}</StyledCommentText>
        }
        <StyledRatingBar>
          <StyledRatingBlock>
            {userData && comment.liked_by.includes(userData.id) ? (
              <ThumbUpIcon
                fontSize='small'
                sx={{ cursor: 'pointer' }}
                onClick={() => handleLikeClick(comment.id)}
              />
            ) : (
              <ThumbUpOffAltIcon
                fontSize='small'
                sx={{ cursor: 'pointer' }}
                onClick={() => handleLikeClick(comment.id)}
              />
            )}
            <span>{comment.likes}</span>
          </StyledRatingBlock>
          <StyledRatingBlock>
            {userData && comment.disliked_by.includes(userData.id) ? (
              <ThumbDownAltIcon
                fontSize='small'
                sx={{ cursor: 'pointer' }}
                onClick={() => handleDislikeClick(comment.id)}
              />
            ) : (
              <ThumbDownOffAltIcon
                fontSize='small'
                sx={{ cursor: 'pointer' }}
                onClick={() => handleDislikeClick(comment.id)}
              />
            )}
            <span>{comment.dislikes}</span>
          </StyledRatingBlock>
        </StyledRatingBar>
      </StyledCommentBody>
      <div>
        <StyledOptionsButton onClick={() => togleDialogMenu(comment.id)}>
          ...
        </StyledOptionsButton>
        {openedDialogMenu === comment.id && (
          <NewsCommentsDialog setOpenedDialogMenu={setOpenedDialogMenu} id={comment.id} authorID={comment.author_id} setRedactingComment={setRedactingComment} />
        )}
      </div>
    </StyledComment>
  )
}

export default NewsComment