import { DatabaseService } from '@/services/database.service'
import { showAlert } from '@/utils/alert/ShowAlert'
import { Tables, TablesUpdate } from '@/utils/interfaces/Supabase.interfaces'
import { AlertProps } from '@/utils/interfaces/interfaces'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FormikErrors, useFormik } from 'formik'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledFileInput, StyledForm } from './EditArticlePage.styled'
import AsyncSelect from 'react-select/async'
import { Alert } from '@mui/material'
import SunEditor from 'suneditor-react'
import { defaultEditorOptions, defaultEditorStyle } from '@/utils/constants/textEditor.sonstants'

const EditArticlePage = () => {
  const { id } = useParams()

  const [firstLoad, setFirstLoad] = useState<Boolean>(true)
  const [alert, setAlert] = useState<AlertProps | null>(null)

  const { data: article, error } = useQuery({
    queryKey: ['get article by id', id],
    queryFn: async () => id ? await DatabaseService.getArticleById(Number(id)) : undefined,
  })
  
  const formik = useFormik<TablesUpdate<'news_articles'>>({
    initialValues: {
      categories: article && article[0].categories,
      imgURL: undefined,
      text: article && article[0].text,
      title: article && article[0].title,
    },
    validate: (values) => {
      const errors: FormikErrors<TablesUpdate<'news_articles'>> = {}
      if (values.title && values.title.length < 5) errors.title = 'Минимум 5 символов'
      if (values.text && values.text.length < 5) errors.text = 'Минимум 50 символов'

      return errors
    },
    onSubmit: (values) => {
      mutate(values)
    },
    validateOnChange: false,
  })

  const { mutate } = useMutation({
    mutationKey: ['add article'],
    mutationFn: async (data: TablesUpdate<'news_articles'>) => {
      if (data.title && data.imgURL) data.imgURL = await DatabaseService.uploadArticlePreview(data.imgURL[0], data.title)
      return id && await DatabaseService.updateArticleById(data, +id)
    },
    onSuccess: () => {
      formik.resetForm()
      setAlert({ type: 'success', message: 'Пост успешно опубликован!' })
    },
    onError: (error) => {
      setAlert({ type: 'error', message: error.message })
    },
  })

  const { data: categories, isSuccess } = useQuery<Tables<'categories'>[] | null>({
    queryKey: ['get categories'],
    queryFn: () => DatabaseService.getCategoriesList(),
  })

  if (error) return showAlert('error', error.message, setAlert)
  if (!article) return showAlert('warning', 'no article', setAlert)
  if (!categories) return showAlert('warning', 'loading error', setAlert)

  const loadOptions = () => {
    const localOptions = categories.map((item: Tables<'categories'>) => {
      return { value: item.name, label: item.name }
    })
    return new Promise<{value: string, label: string}[]>((resolve) => resolve(localOptions))
  }

  const getDefaultSelectValue = article[0].categories.map((item) => {
    return {value: item, label: item}
  })

  const setFormikDefaultValues = () => {
    if (firstLoad) {
      formik.values.categories = article && article[0].categories,
      formik.values.imgURL = undefined
      formik.values.text = article && article[0].text
      formik.values.title = article && article[0].title
      setFirstLoad(false)
    }
  }
  
  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit}>
      {alert && showAlert(alert.type, alert.message, setAlert)}
        <input
          name='title'
          onChange={formik.handleChange}
          className='p-2'
          placeholder='Заголовок'
          type='text'
          defaultValue={article[0].title}
          value={formik.values.title}
          required
        />
        {formik.errors.title && <Alert severity="warning">{formik.errors.title}</Alert>}
        <AsyncSelect
          key={isSuccess.toString()}
          defaultValue={getDefaultSelectValue}
          name='category'
          onChange={(value) => formik.setFieldValue('categories', value.map((item) => item.value))}
          placeholder={'Выберите категории...'}
          isMulti
          defaultOptions
          loadOptions={loadOptions}
          className='categories-select'
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
        <StyledFileInput name='imgURL' type='file' onChange={(value) => formik.setFieldValue('imgURL', value.target.files)} />
        
        <SunEditor
          name='text'
          onChange={(value) => formik.setFieldValue('text', value)}
          defaultValue={article[0].text}
          setContents={formik.values.text}
          width='100%'
          height='400px'
          setDefaultStyle={defaultEditorStyle}
          setOptions={defaultEditorOptions}
        />
        {formik.errors.text && <Alert severity="warning">{formik.errors.text}</Alert>}
          
        <button type='submit'> Обновить пост </button>
      </StyledForm>
      {setFormikDefaultValues()}
    </>
  )
}

export default EditArticlePage