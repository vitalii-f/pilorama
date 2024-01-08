import { AlertProps } from '@/utils/interfaces/interfaces'
import { useMutation } from '@tanstack/react-query'
import { FormikErrors, useFormik } from 'formik'
import { User } from '@supabase/supabase-js'
import { DatabaseService } from '@/services/database.service'
import { AuthService } from '@/services/auth.service'
import { Alert } from '@mui/material'
import { StyledForm, StyledWrapper } from './UserDataChange.styled'

interface UserDataChangeProps {
  user: User
  setModal(arg?: boolean | undefined): void
  setAlert({}: AlertProps): void
}

interface UserChangedData {
  login: string
  email: string
  password: string
  avatar: Blob | null
}

const UserDataChange = ({ setModal, setAlert }: UserDataChangeProps) => {
  const formik = useFormik<UserChangedData>({
    initialValues: {
      login: '',
      email: '',
      password: '',
      avatar: null,
    },
    validate: (values) => {
      const errors: FormikErrors<UserChangedData> = {}
      const checkIsSingleValue = Object.values(values).filter(item => {
        if (item) return item
      })
      if (checkIsSingleValue.length > 1) errors.email = 'Можно изменить только одно поле'
      return errors
    },
    onSubmit: (data) => {
      mutate(data)
    },
  })

  const { mutate } = useMutation(
    {
      mutationKey: ['update profile'],
      mutationFn: async (data: UserChangedData) => {
        if (data.avatar) return await DatabaseService.updateUserAvatar(data.avatar)
        if (data.login) return await AuthService.updateUserLogin(data.login)
        if (data.email) return await AuthService.updateUserEmail(data.email)
        if (data.password) return await AuthService.updateUserPassword(data.password)
      },
      onSuccess: () => {
        setAlert({ type: 'success', message: 'Профиль успешно обновлён' })
        setModal()
      },
      onError: () => {
        setAlert({ type: 'error', message: 'Ошибка' })
      },
    }
  )

  return (
    <StyledWrapper>
      <h2>Изменение данных</h2>
      <StyledForm onSubmit={formik.handleSubmit}>
        <input name='login' type='text' onChange={formik.handleChange} placeholder='Новое имя' />
        <input name='email' type='email' onChange={formik.handleChange} placeholder='Новый e-mail' />
        <input name='password' type='password' onChange={formik.handleChange} placeholder='Новый пароль' />
        <label>
          Фото профиля: <input name='avatar' type='file' onChange={(event) => formik.setFieldValue('avatar', event.target.files && event.target.files[0])} />
        </label>
        {formik.errors.email && <Alert severity="warning">{formik.errors.email}</Alert>}
        
        <button type='reset' onClick={() => setModal()}>Отменить изменения</button>
        <button type='submit'> Сохранить изменения </button>
      </StyledForm>
    </StyledWrapper>
  )
}

export default UserDataChange
