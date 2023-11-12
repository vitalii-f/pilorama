import styled from "styled-components";
import { FirebaseAuthService } from "@/services/firebaseAuth.service";
import { setUser } from "@/store/user/userSlice";
import { useAppDispatch } from "@/store/store";
import { IUserLogInData } from "@/utils/interfaces/user.interfaces";
import { useFormik } from "formik";
import * as Yup from "yup"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin-top: 50px;
`

const StyledInput = styled.input`
  padding: 15px;
  border-radius: 5px;
`

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Неверный Email').required('Обязательное поле'),
  password: Yup.string().min(6, 'Минимум 6 символов').max(16, 'Максимум 16 символов').required('Обязательное поле')
})

function LogIn() {
  const dispatch = useAppDispatch()
  const test = {
    test1: 'test11',
    test2: 'test22'
  }

  const aboba = 'test2'

  console.log(test[aboba])

  const formik = useFormik<IUserLogInData>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LogInSchema,
    onSubmit: async (value) => {
      const auth = await FirebaseAuthService.authUser(value.email, value.password)
      // if (typeof auth === 'string') {
        // const errorCode: keyof typeof AuthErrorCode = auth as keyof typeof AuthErrorCode
        // console.log(AuthErrorCode[errorCode])
        // console.log(auth)
        // console.log(AuthErrorCode['auth/app-deleted'])
        // console.log(AuthErrorCode[auth as keyof typeof AuthErrorCode])
      // }
      // formik.setFieldError('email', auth)
      // if (auth) dispatch(setUser())
    }
  })

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <label className="text-2xl text-center">Вход в учётную запись</label>
      <StyledInput
        onChange={formik.handleChange}
        name="email"
        type="email"
        placeholder="Введите e-mail"
        required
      />
      {formik.errors.email && <p className="font-bold text-red-500"> {formik.errors.email} </p>}

      <StyledInput
        onChange={formik.handleChange}
        name='password'
        type="password"
        placeholder="Введите пароль"
        required
      />
      {formik.errors.password && <p className="font-bold text-red-500"> {formik.errors.password} </p>}
      
      <button type='submit'>Войти в систему</button>
    </StyledForm>
  );
}

export default LogIn;
