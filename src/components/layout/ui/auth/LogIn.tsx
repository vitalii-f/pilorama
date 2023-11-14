import { FirebaseAuthService } from '@/services/firebaseAuth.service'
import { setUser } from '@/store/user/userSlice'
import { useAppDispatch } from '@/store/store'
import { IUserLogInData } from '@/utils/interfaces/user.interfaces'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthErrorCode } from '@/utils/enums/auth.enum'
import { useState } from 'react'
import { StyledErrorParagraph, StyledForm, StyledInput } from './AuthStyle'

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

  const formik = useFormik<IUserLogInData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LogInSchema,
    onSubmit: async (value) => {
      const auth = await FirebaseAuthService.authUser(
        value.email,
        value.password
      )
      if (typeof auth === 'string') {
        setErrorCode(AuthErrorCode[auth as keyof typeof AuthErrorCode])
      } else if (auth) dispatch(setUser())
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
