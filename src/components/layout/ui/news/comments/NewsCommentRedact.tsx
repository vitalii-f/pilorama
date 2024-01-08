import { DatabaseService } from '@/services/database.service'
import { TablesUpdate } from '@/utils/interfaces/Supabase.interfaces'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormikErrors, useFormik } from 'formik'
import SendIcon from '@mui/icons-material/Send'
import ClearIcon from '@mui/icons-material/Clear';
import { StyledCancelButton, StyledCommentForm, StyledCommentInput, StyledSubmitButton } from './NewsCommentRedact.styled'

interface NewsCommentRedactProps {
  id: number
  text: string
  setRedactingComment(redactingComment: number | null): void
}

const NewsCommentRedact = ({ id, text, setRedactingComment }: NewsCommentRedactProps) => {
  const queryClient = useQueryClient()

  const formik = useFormik<TablesUpdate<'comments'>>({
    initialValues: {
      article_id: id,
      text: text,
    },
    validate: (values) => {
      const errors: FormikErrors<TablesUpdate<'comments'>> = {}
      if (values.text!.length < 3) {
        errors.text = 'Минимум 3 символа'
      }
      return errors
    },
    onSubmit: (data) => {
      mutate(data)
    },
  })

  const { mutate } = useMutation({
    mutationKey: ['write comment'],
    mutationFn: async (comment: TablesUpdate<'comments'>) => {
      return await DatabaseService.redactComment(id, comment.text!)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get comments'] })
      setRedactingComment(null)
    },
  })

  const handleCancel = () => {
    setRedactingComment(null)
  }

  return (
    <StyledCommentForm onSubmit={formik.handleSubmit}>
      <StyledCommentInput
        type='text'
        name='text'
        onChange={formik.handleChange}
        value={formik.values.text}
        autoComplete='off'
      />
      <StyledCancelButton type='reset' onClick={handleCancel}><ClearIcon /></StyledCancelButton>
      <StyledSubmitButton type='submit'>
        <SendIcon />
      </StyledSubmitButton>
    </StyledCommentForm>
  )
}

export default NewsCommentRedact
