import { FirestoreService } from '@/services/firestore.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

interface ICategoryForm {
  category: string
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
`

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const StyledLi = styled.li`
  padding: 10px;
  background-color: var(--color-bg-input);

  border-radius: 15px;
`

const Сategories = () => {
  const { register, handleSubmit, reset } = useForm<ICategoryForm>()

  const { mutate } = useMutation({
    mutationKey: ['category'],
    mutationFn: (data: ICategoryForm) => FirestoreService.addCategory(data.category),
  })

  const { data, isSuccess } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await FirestoreService.getСategoriesList(),
  })

  const ref = useRef(null)

  console.log(ref)

  const renderCategoriesList = () => {
    if (isSuccess) {
      return (
        <StyledUl>
          {data.map((item) => <StyledLi key={item.name}>{item.name}</StyledLi>)}
        </StyledUl>
      )
    }
  }
  
  const addArticle = (data: ICategoryForm) => {
    mutate(data)
  }

  return (
    <StyledContainer ref={ref}>
      <StyledForm onSubmit={handleSubmit(addArticle)}>
        <label> Название категории:</label>
        <input {...register('category')} type='text' required />
        <button>Добавить</button>
      </StyledForm>
      <StyledCategoryList>
        <label>Список категорий:</label>
        {renderCategoriesList()}
      </StyledCategoryList>
    </StyledContainer>
  )
}

export default Сategories
