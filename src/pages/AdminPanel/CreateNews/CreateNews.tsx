import { useMutation, useQuery } from '@tanstack/react-query'
import { Alert } from '@mui/material'
import { useState } from 'react'
import SunEditor from 'suneditor-react'
import { StorageService } from '@/services/storage.service'
import { FirestoreService } from '@/services/firestore.service'
import { AlertProps, ICategory } from '@/utils/interfaces/interfaces'
import { CategoriesOptions, ICreatedArticle } from '@/utils/interfaces/article.interfaces'
import styled from 'styled-components'
import 'suneditor/dist/css/suneditor.min.css'
import AsyncSelect from 'react-select/async'
import { FormikErrors, useFormik } from 'formik'

//TODO Правильно выставить reset()

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

function CreateNews() {
  const [alert, setAlert] = useState<AlertProps>({
    type: 'none',
    message: '',
  })

  const formik = useFormik<ICreatedArticle>({
    initialValues: {
      author: '',
      category: ['uncategory'],
      creation_date: new Date(),
      imgURL: '',
      text: '',
      title: '',
    },
    validate: (values) => {
      const errors: FormikErrors<ICreatedArticle> = {}
      if (values.title.length < 5) errors.title = 'Минимум 5 символов'
      if (values.text.length < 5) errors.text = 'Минимум 50 символов'

      return errors
    },
    onSubmit: (values) => {
      console.log(values)
      mutate(values)
      formik.resetForm()
    },
    validateOnChange: false,
  })

  const { mutate } = useMutation({
    mutationKey: ['add article'],
    mutationFn: async (data: ICreatedArticle) => {
      console.log('data')
      console.log(data.imgURL)
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
      setAlert({ type: 'success', message: 'Пост успешно опубликован!' })
    },
    onError: (error) => {
      setAlert({ type: 'error', message: error.message })
    },
  })

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
          {message}
        </Alert>
      )
  }

  const { data, isSuccess } = useQuery<ICategory[]>({
    queryKey: ['get categories'],
    queryFn: () => FirestoreService.getСategoriesList(),
  })

  const loadOptions = (): Promise<CategoriesOptions[]> | undefined => {
    if (isSuccess) {
      const localOptions: CategoriesOptions[] = data.map((item: ICategory) => {
        return { value: item.name, label: item.name }
      })
      return new Promise((resolve) => resolve(localOptions))
    } else return
  }

  return (
    <>
      {showAlert(alert.type, alert.message)}
      <StyledForm onSubmit={formik.handleSubmit}>
        <input
          name='title'
          onChange={formik.handleChange}
          className='p-2'
          placeholder='Заголовок'
          type='text'
          required
        />
        {formik.errors.title && <Alert severity="warning">{formik.errors.title}</Alert>}
        <AsyncSelect
          key={isSuccess.toString()}
          name='category'
          onChange={(value) => formik.setFieldValue('category', value.map((item: CategoriesOptions) => item.value))}
          placeholder={'Выберите категории...'}
          isMulti
          defaultOptions
          loadOptions={loadOptions}
          className='categorys-select'
          classNamePrefix='select'
          required
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
        <StyledFileInput name='imgURL' type='file' onChange={(value) => formik.setFieldValue('imgURL', value.target.files)} required />
        <SunEditor
          name='text'
          onChange={(value) => formik.setFieldValue('text', value)}
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
        {formik.errors.text && <Alert severity="warning">{formik.errors.text}</Alert>}
          
        <button type='submit'> Создать пост </button>
      </StyledForm>
    </>
  )
}

export default CreateNews
