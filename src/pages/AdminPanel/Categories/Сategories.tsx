import { FirestoreService } from '@/services/firestore.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormikErrors, useFormik } from 'formik'
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { Dialog, DialogActions, DialogTitle } from '@mui/material'

interface ICategoryForm {
  category: string
}

interface modalDeleteProps {
  opened: boolean
  name: string
}

const StyledContainer = styled.div`
  display: flex;
  gap: 15px;
`

const StyledForm = styled.form`
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const StyledCategoryList = styled.div`
  flex: 1 0 50%;

  display: flex;
  flex-direction: column;
  gap: 15px;
`

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 8px 15px;
  background-color: var(--color-bg-input);

  border: 2px solid white;
  border-radius: 20px;
`

const StyledDeleteButton = styled.button`
  border-color: var(--color-red-delete);
  transition: all 0.2s;
  &:hover {
    border-color: var(--color-red-delete);
    box-shadow: 0px 0px 10px 3px rgba(238, 32, 76, 0.75);
  }
`

const Сategories = () => {
  const [dialogOpened, setDialogOpened] = useState<modalDeleteProps>({
    opened: false,
    name: '',
  })
  const quaryClient = useQueryClient()

  const formik = useFormik<ICategoryForm>({
    initialValues: {
      category: '',
    },
    validate: (values) => {
      const errors: FormikErrors<ICategoryForm> = {}
      if (!values.category) {
        errors.category = 'Обязательное поле для ввода'
      } else if (values.category.length < 3) {
        errors.category = 'Необходимо минимум 3 символа'
      }
      return errors
    },
    onSubmit: (values) => {
      console.log(values)
      formik.resetForm()
      formik.setSubmitting(false)
      mutateCreateCategory(values)
    },
  })

  const { mutate: mutateCreateCategory } = useMutation({
    mutationKey: ['category'],
    mutationFn: (data: ICategoryForm) =>
      FirestoreService.addCategory(data.category),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const { mutate: mutateDeleteCategoryByName } = useMutation({
    mutationKey: ['category'],
    mutationFn: (name: string) => FirestoreService.deleteCategoryByName(name),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const { data, isSuccess } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await FirestoreService.getСategoriesList(),
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
          {data.map((item) => (
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
    </StyledContainer>
  )
}

export default Сategories
