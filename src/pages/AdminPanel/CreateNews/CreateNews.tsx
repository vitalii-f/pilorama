import { useMutation, useQuery } from '@tanstack/react-query'
import { Alert } from '@mui/material'
import { useState } from 'react'
import SunEditor from 'suneditor-react'
import { AlertProps } from '@/utils/interfaces/interfaces'
import 'suneditor/dist/css/suneditor.min.css'
import AsyncSelect from 'react-select/async'
import { FormikErrors, useFormik } from 'formik'
import { DatabaseService } from '@/services/database.service'
import { Tables, TablesInsert } from '@/utils/interfaces/Supabase.interfaces'
import { StyledFileInput, StyledForm } from './CreateNews.styled'
import { showAlert } from '@/utils/alert/ShowAlert'
import { defaultEditorOptions, defaultEditorStyle } from '@/utils/constants/textEditor.sonstants'

function CreateNews() {
  const [alert, setAlert] = useState<AlertProps | null>(null)

  const formik = useFormik<TablesInsert<'news_articles'>>({
    initialValues: {
      categories: [],
      imgURL: '',
      text: '',
      title: '',
    },
    validate: (values) => {
      const errors: FormikErrors<TablesInsert<'news_articles'>> = {}
      if (values.title.length < 5) errors.title = 'Минимум 5 символов'
      if (values.text.length < 5) errors.text = 'Минимум 50 символов'

      return errors
    },
    onSubmit: (values) => {
      mutate(values)
    },
    validateOnChange: false,
  })

  const { mutate } = useMutation({
    mutationKey: ['add article'],
    mutationFn: async (data: TablesInsert<'news_articles'>) => {
      data.imgURL = await DatabaseService.uploadArticlePreview(data.imgURL[0], data.title)
      return await DatabaseService.addArticle(data)
    },
    onSuccess: () => {
      formik.resetForm()
      setAlert({ type: 'success', message: 'Пост успешно опубликован!' })
    },
    onError: (error) => {
      setAlert({ type: 'error', message: error.message })
    },
  })

  const { data, isSuccess } = useQuery<Tables<'categories'>[] | null>({
    queryKey: ['get categories'],
    queryFn: () => DatabaseService.getCategoriesList(),
  })

  const loadOptions = (): Promise<{value: string, label: string}[]> | undefined => {
    if (isSuccess && data) {
      const localOptions = data.map((item: Tables<'categories'>) => {
        return { value: item.name, label: item.name }
      })
      return new Promise((resolve) => resolve(localOptions))
    } else return
  }

  const getSelectValue = formik.values.categories.map((item) => {
    return {value: item, label: item}
  })

  return (
    <>
      {alert && showAlert(alert.type, alert.message, setAlert)}
      <StyledForm onSubmit={formik.handleSubmit}>
        <input
          name='title'
          onChange={formik.handleChange}
          value={formik.values.title}
          className='p-2'
          placeholder='Заголовок'
          type='text'
          required
        />
        {formik.errors.title && <Alert severity="warning">{formik.errors.title}</Alert>}
        <AsyncSelect
          key={isSuccess.toString()}
          name='category'
          onChange={(value) => formik.setFieldValue('categories', value.map((item) => item.value))}
          placeholder={'Выберите категории...'}
          isMulti
          defaultOptions
          loadOptions={loadOptions}
          value={getSelectValue}
          className='categories-select'
          classNamePrefix='select'
          required
          styles={{
            input: (baseStyles) => ({
              ...baseStyles,
              cursor: 'text'
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              cursor: 'pointer'
            })
          }}
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
          setContents={formik.values.text}
          width='100%'
          height='400px'
          setDefaultStyle={defaultEditorStyle}
          setOptions={defaultEditorOptions}
        />
        {formik.errors.text && <Alert severity="warning">{formik.errors.text}</Alert>}
        
        <button type='submit'> Создать пост </button>
      </StyledForm>
    </>
  )
}

export default CreateNews
