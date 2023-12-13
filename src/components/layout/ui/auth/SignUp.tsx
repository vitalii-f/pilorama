import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/user/userSlice'
import { UserSignUpData } from '@/utils/interfaces/user.interfaces'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { StyledErrorParagraph, StyledForm, StyledInput } from './AuthStyle'
import { useState } from 'react'
import { AuthService } from '@/services/auth.service'

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Неверный Email').required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(16, 'Максимум 16 символов')
    .required('Обязательное поле'),
  login: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(16, 'Максимум 16 символов')
    .required('Обязательное поле'),
})

function SignUp() {
  const [errorCode, setErrorCode] = useState<string>('')

  const dispatch = useAppDispatch()

  const formik = useFormik<UserSignUpData>({
    initialValues: {
      login: '',
      email: '',
      password: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async (data) => {
      const response = await AuthService.registerUser(data.login, data.email, data.password) //return only error
      response ? setErrorCode(response) : dispatch(setUser())
    },
  })

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <label className='text-2xl text-center'>Реистрация</label>
      <StyledInput
        name='login'
        type='text'
        onChange={formik.handleChange}
        placeholder='Введите логин'
        required
      />
      {formik.errors.login && (
        <StyledErrorParagraph>{formik.errors.login}</StyledErrorParagraph>
      )}

      <StyledInput
        name='email'
        type='email'
        onChange={formik.handleChange}
        placeholder='Введите e-mail'
        required
      />
      {formik.errors.email && (
        <StyledErrorParagraph>{formik.errors.email}</StyledErrorParagraph>
      )}

      <StyledInput
        name='password'
        type='password'
        onChange={formik.handleChange}
        placeholder='Введите пароль'
        required
      />
      {formik.errors.password && (
        <StyledErrorParagraph>{formik.errors.password}</StyledErrorParagraph>
      )}

      <button type='submit'>Зарегестрироваться</button>
      {errorCode && <StyledErrorParagraph>{errorCode}</StyledErrorParagraph>}

    </StyledForm>
  )
}

export default SignUp
