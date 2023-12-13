import { setUser } from '@/store/user/userSlice'
import { useAppDispatch } from '@/store/store'
import { UserLogInData } from '@/utils/interfaces/user.interfaces'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { StyledErrorParagraph, StyledForm, StyledInput } from './AuthStyle'
import { AuthService } from '@/services/auth.service'

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Неверный Email').required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(16, 'Максимум 16 символов')
    .required('Обязательное поле'),
})

function LogIn() {
  const [errorCode, setErrorCode] = useState<string>('')
  const dispatch = useAppDispatch()

  const formik = useFormik<UserLogInData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LogInSchema,
    onSubmit: async (value) => {
      const response = await AuthService.logInUser(value.email, value.password) //return only error
      response ? setErrorCode(response) : dispatch(setUser())
    },
  })

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <label className='text-2xl text-center'>Вход в учётную запись</label>
      <StyledInput
        onChange={formik.handleChange}
        name='email'
        type='email'
        placeholder='Введите e-mail'
        required
      />
      {formik.errors.email && (
        <StyledErrorParagraph className='font-bold text-red-500'> {formik.errors.email} </StyledErrorParagraph>
      )}

      <StyledInput
        onChange={formik.handleChange}
        name='password'
        type='password'
        placeholder='Введите пароль'
        required
      />
      {formik.errors.password && (
        <StyledErrorParagraph className='font-bold text-red-500'> {formik.errors.password} </StyledErrorParagraph>
      )}
      {errorCode && <StyledErrorParagraph>{errorCode}</StyledErrorParagraph>}
      <button type='submit'>Войти в систему</button>
    </StyledForm>
  )
}

export default LogIn
