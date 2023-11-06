import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert } from '@mui/material'
import { useState } from 'react'
import SunEditor from 'suneditor-react'
import { StorageService } from '@/services/storage.service'
import { FirestoreService } from '@/services/firestore.service'
import { AlertProps } from '@/utils/interfaces/interfaces'
import { ICreatedArticle } from '@/utils/interfaces/article.interfaces'
import styled from 'styled-components'
import 'suneditor/dist/css/suneditor.min.css'
import Select from 'react-select'

//TODO Правильно выставить reset()

interface CategorysOptions {
  readonly value: string
  readonly label: string
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 10px;
  flex-shrink: 2;
`

const StyledFileInput = styled.input`
  width: 260px;
`

const categorysOptions: readonly CategorysOptions[] = [
  { value: 'Важное', label: 'Важное' },
  { value: 'Политика', label: 'Политика' },
  { value: 'Технологии', label: 'Технологии' },
  { value: 'Финансы', label: 'Финансы' },
  { value: 'Путишествия', label: 'Путишествия' },
  { value: 'Кино', label: 'Кино' },
  { value: 'Сериалы', label: 'Сериалы' },
  { value: 'Крипто', label: 'Крипто' },
  { value: 'Авто', label: 'Авто' },
]

function CreateNews() {
  const [alert, setAlert] = useState<AlertProps>({
    type: 'none',
    message: '',
  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ICreatedArticle>({
    mode: 'onChange',
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['add article'],
    mutationFn: async (data: ICreatedArticle) => {
      await StorageService.uploadNewsPreview(
        data.imgURL[0],
        'news_preview_' + data.title
      )
      data.imgURL = await StorageService.downloadNewsPreview(
        'news_preview_' + data.title
      )
      await FirestoreService.addArticle(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['add articles'] })
      // reset();
      setAlert({ type: 'success', message: 'Пост успешно опубликован!' })
    },
    onError: (error) => {
      setAlert({ type: 'error', message: error.message })
    },
  })

  const addNews = async (data: ICreatedArticle) => {
    mutate(data)
  }

  function showAlert(type: string, message: string) {
    if (type === 'success')
      return (
        <Alert
          onClose={() => setAlert({ type: 'none', message: '' })}
          severity='success'
        >
          {message}
        </Alert>
      )
    if (type === 'error')
      return (
        <Alert
          onClose={() => setAlert({ type: 'none', message: '' })}
          severity='error'
        >
          {' '}
          {message}{' '}
        </Alert>
      )
  }

  return (
    <>
      {showAlert(alert.type, alert.message)}
      <StyledForm onSubmit={handleSubmit(addNews)}>
        <input
          {...register('title', { required: 'Requared' })}
          className='p-2'
          placeholder='Заголовок'
        />
        {errors?.title?.message && <p>Requared</p>}
        <Controller
          control={control}
          name='category'
          render={({ field }) => (
            <Select
              onChange={(event) => field.onChange(event)}
              placeholder={'Выберите категории...'}
              isMulti
              name='categorys'
              options={categorysOptions}
              className='categorys-select'
              classNamePrefix='select'
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral0: 'var(--color-bg-input)',
                  primary25: 'black',
                  neutral20: 'var(--color-border-input)',
                },
              })}
            />
          )}
        />
        <StyledFileInput type='file' {...register('imgURL')} required />
        <Controller
          control={control}
          name='text'
          render={({ field }) => (
            <SunEditor
              onChange={(e) => field.onChange(e)}
              width='100%'
              height='400px'
              setDefaultStyle={'font-size: 16px; border: 2px solid red;'}
              setOptions={{
                buttonList: [
                  ['undo', 'redo'],
                  ['bold', 'underline', 'italic', 'strike'],
                  ['fontColor', 'hiliteColor', 'textStyle'],
                  ['list', 'align', 'fontSize', 'formatBlock'],
                  [
                    'table',
                    'image',
                    'paragraphStyle',
                    'blockquote',
                    'outdent',
                    'indent',
                  ],
                  ['preview'],
                  ['removeFormat'],
                ],
              }}
            />
          )}
        />
        <button> Создать пост </button>
      </StyledForm>
    </>
  )
}

export default CreateNews
