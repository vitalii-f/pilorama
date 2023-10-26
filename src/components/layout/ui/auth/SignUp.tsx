import { FirebaseAuthService } from "@/services/firebaseAuth.service";
import { FirestoreService } from "@/services/firestore.service";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/user/userSlice";
import { IUserSignUpData } from "@/utils/interfaces/interfaces";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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

function SignUp() {
  const dispatch = useAppDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSignUpData>({
    mode: "onChange",
  });

  const registerUser = async (data: IUserSignUpData) => {
    const currentUser = await FirebaseAuthService.createUser(data.email, data.password, data.login)
    if (currentUser) await FirestoreService.addRole(currentUser.uid, ['default'], data.email, data.login)
    dispatch(setUser())
  };

  return (
    <StyledForm
      onSubmit={handleSubmit(registerUser)}
    >
      <label className="text-2xl text-center">Реистрация</label>
      
      <StyledInput
        {...register("login", {
          required: true,
          minLength: { value: 3, message: "Минимум 3 символа" },
          maxLength: { value: 16, message: "Максимум 16 символов" },
          pattern: { value: /^[a-z0-9_-]{3,16}$/, message: "Неверный формат ввода"},
        })}
        type="text"
        placeholder="Введите логин"
        required
      />
      {errors.login && <p className="font-bold text-red-500"> {errors.login.message?.toString()} </p>}
      
      <StyledInput
        {...register("email", {
          minLength: { value: 5, message: "Минимум 5 символов" },
          maxLength: { value: 30, message: "Максимум 30 символов" },
        })}
        type="email"
        placeholder="Введите e-mail"
        required
      />
      {errors.email && <p className="font-bold text-red-500"> {errors.email.message?.toString()} </p>}

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
      {errors.password && <p className="font-bold text-red-500"> {errors.password.message?.toString()} </p>}
      
      <button>Зарегестрироваться</button>
      {/* {alertMessage && <p> {alertMessage} </p>} */}
    </StyledForm>
  );
}

export default SignUp;
