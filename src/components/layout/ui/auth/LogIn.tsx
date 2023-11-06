import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FirebaseAuthService } from "@/services/firebaseAuth.service";
import { setUser } from "@/store/user/userSlice";
import { useAppDispatch } from "@/store/store";
import { IUserLogInData } from "@/utils/interfaces/user.interfaces";

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

function LogIn() {
  const dispatch = useAppDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogInData>({ mode: "onChange" });

  const authUser = (data: IUserLogInData) => {
    FirebaseAuthService.authUser(data.email, data.password)
    dispatch(setUser())
  }

  return (
    <StyledForm

      onSubmit={handleSubmit(authUser)}
    >
      <label className="text-2xl text-center">Вход в учётную запись</label>
      <StyledInput
        {...register("email", {
          minLength: { value: 5, message: "Минимум 5 символов" },
          maxLength: { value: 30, message: "Максимум 30 символов" },
        })}
        type="email"
        placeholder="Введите e-mail"
        required
      />
      {errors.email && <p className="font-bold text-red-500"> {errors.email.message} </p>}

      <StyledInput
        {...register("password", {
          required: true,
          minLength: { value: 6, message: "Минимум 6 символов" },
          maxLength: { value: 16, message: "Максимум 16 символов" },
        })}
        type="password"
        placeholder="Введите пароль"
        required
      />
      {errors.password && <p className="font-bold text-red-500"> {errors.password.message} </p>}
      
      <button>Войти в систему</button>
    </StyledForm>
  );
}

export default LogIn;
