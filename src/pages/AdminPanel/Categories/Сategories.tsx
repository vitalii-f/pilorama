import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormikErrors, useFormik } from 'formik'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import { StyledCategoryList, StyledContainer, StyledDeleteButton, StyledForm, StyledLi, StyledUl } from './Categories.styled'
import { DatabaseService } from '@/services/database.service'
import { showAlert } from '@/utils/alert/ShowAlert'
import { AlertProps } from '@/utils/interfaces/interfaces'

interface categoryProps {
  category: string
}

interface modalDeleteProps {
  opened: boolean
  name: string
}

const Сategories = () => {
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const [dialogOpened, setDialogOpened] = useState<modalDeleteProps>({
    opened: false,
    name: '',
  })
  const quaryClient = useQueryClient()

  const formik = useFormik<categoryProps>({
    initialValues: {
      category: '',
    },
    validate: (values) => {
      const errors: FormikErrors<categoryProps> = {}
      if (!values.category) {
        errors.category = 'Обязательное поле для ввода'
      } else if (values.category.length < 3) {
        errors.category = 'Необходимо минимум 3 символа'
      }
      return errors
    },
    onSubmit: (values) => {
      formik.resetForm()
      formik.setSubmitting(false)
      mutateCreateCategory(values)
    },
  })

  const { mutate: mutateCreateCategory } = useMutation({
    mutationKey: ['category'],
    mutationFn: (data: categoryProps) =>
      DatabaseService.addCategory(data.category),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ['category'] })
    },
    onError: (error) => {
      setAlert({ type: 'error', message: error.message })
    },
  })

  const { mutate: mutateDeleteCategoryByName } = useMutation({
    mutationKey: ['category'],
    mutationFn: (name: string) => DatabaseService.deleteCategoryByName(name),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ['category'] })
    },
    onError: (error) => {
      setAlert({ type: 'error', message: error.message })
    },
  })

  const { data, isSuccess } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await DatabaseService.getCategoriesList(),
  })

  const handleModalOpen = (name: string) => {
    setDialogOpened({ name: name, opened: true })
  }

  const handleModalClose = () => {
    setDialogOpened({ name: '', opened: false })
  }

  const deleteHandler = () => {
    mutateDeleteCategoryByName(dialogOpened.name)
    setDialogOpened({ name: '', opened: false })
  }

  const renderCategoriesList = () => {
    if (isSuccess) {
      return (
        <StyledUl>
          {data && data.map((item) => (
            <StyledLi key={item.name}>
              {item.name}
              <DeleteIcon
                sx={{ color: 'var(--color-red-delete)', cursor: 'pointer' }}
                onClick={() => handleModalOpen(item.name)}
              />
            </StyledLi>
          ))}
        </StyledUl>
      )
    }
  }
  return (
    <StyledContainer>
      <Dialog open={dialogOpened.opened} onClose={handleModalClose}>
        <DialogTitle id='alert-dialog-title'>
          {'Вы уверены что хотите удалить категорию?'}
        </DialogTitle>
        <DialogActions>
          <button onClick={handleModalClose}>Отмена</button>
          <StyledDeleteButton onClick={() => deleteHandler()}>
            Удалить
          </StyledDeleteButton>
        </DialogActions>
      </Dialog>
      <StyledForm onSubmit={formik.handleSubmit}>
        <label> Название категории:</label>
        <input
          id='category'
          name='category'
          type='text'
          value={formik.values.category}
          onChange={formik.handleChange}
        />
        {formik.errors.category && formik.touched.category && formik.errors.category}
        <button type='submit'>Добавить</button>
      </StyledForm>
      <StyledCategoryList>
        <label>Список категорий:</label>
        {renderCategoriesList()}
      </StyledCategoryList>
      {alert && showAlert(alert.type, alert.message, setAlert)}
    </StyledContainer>
  )
}

export default Сategories
