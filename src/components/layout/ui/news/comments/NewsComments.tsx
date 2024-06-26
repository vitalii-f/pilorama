import { DatabaseService } from '@/services/database.service'
import { TablesInsert } from '@/utils/interfaces/Supabase.interfaces'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FormikErrors, useFormik } from 'formik'
import {
  StyledAvatar,
  StyledCommentForm,
  StyledCommentInput,
  StyledComments,
  StyledControl,
  StyledSendIcon,
  StyledSendText,
  StyledSubmitButton,
  StyledWrapper,
  StyledWriteComment,
} from './NewsComments.styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import NewsComment from './NewsComment'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../loading/LoadingSpinner'

//TODO: Make load spinner for comments

interface NewsCommentsProps {
  articleID: number
}

const NewsComments = ({ articleID }: NewsCommentsProps) => {
  const [openedDialogMenu, setOpenedDialogMenu] = useState<number | null>(null)

  const userData = useSelector((state: RootState) => state.userSlice.user)
  const formik = useFormik<TablesInsert<'comments'>>({
    initialValues: {
      article_id: articleID,
      text: '',
    },
    validate: (values) => {
      const errors: FormikErrors<TablesInsert<'comments'>> = {}
      if (values.text.length < 3) {
        errors.text = 'Минимум 3 символа'
      }
      return errors
    },
    onSubmit: (data) => {
      formik.resetForm()
      mutate(data)
    },
  })

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      return;
    }
    fetchNextPage()
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const queryClient = useQueryClient()

  const {
    data: commentsData,
    isSuccess,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get comments'],
    queryFn: async ({ pageParam }) => {
      const comments = await DatabaseService.getComments(articleID, pageParam * 5, pageParam * 5 + 5 - 1)
      const count = await DatabaseService.getCommentCount(articleID)

      if (userData) {
        const authorAvatar = await DatabaseService.getUserAvatar()
        return { comments, authorAvatar, count }
      }
      
      return { comments, count }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (lastPage.comments.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  })

  const { mutate } = useMutation({
    mutationKey: ['write comment'],
    mutationFn: async (comment: TablesInsert<'comments'>) => {
      return await DatabaseService.writeComment(comment)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get comments']})
    }
  })

  const renderComments = () => {
    if (commentsData?.pages[0]?.count === 0) {
      return <h2>No comments</h2>
    }

    if (isSuccess) {
      return commentsData.pages.map((group, i) => (
        <React.Fragment key={i + Date()}>
          {group.comments.map((item) => (
        <NewsComment comment={item} openedDialogMenu={openedDialogMenu} setOpenedDialogMenu={setOpenedDialogMenu} key={item.id} />
      ))}
        </React.Fragment>
      ))
    }
  }

  return (
    <StyledWrapper>
      <StyledControl>
        <p>Комментариев: {commentsData?.pages[0]?.count}</p>
        <div> Сортировка </div>
      </StyledControl>
      {userData
          ? <StyledWriteComment>
          <StyledAvatar
            src={commentsData?.pages[0].authorAvatar}
            alt='avatar'
          />
          <StyledCommentForm onSubmit={formik.handleSubmit}>
            <StyledCommentInput
              type='text'
              name='text'
              placeholder='Введите комментарий'
              onChange={formik.handleChange}
              value={formik.values.text}
              autoComplete='off'
            />
            <StyledSubmitButton type='submit'><StyledSendText>Отправить</StyledSendText><StyledSendIcon /></StyledSubmitButton>
          </StyledCommentForm>
        </StyledWriteComment>
        : <p>Оставляить коментарии могут только авторизованные пользователи</p>
        }
      <StyledComments>{renderComments()}</StyledComments>
      {isLoading && <LoadingSpinner />}
    </StyledWrapper>
  )
}

export default NewsComments
