import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FirebaseAuthService } from "src/services/firebaseAuth.service";
import { useDispatch } from "react-redux";
import { setUser } from "src/store/user/userSlice";

const Input = styled.input`
  width: 400px;
  padding: 15px;
  border-radius: 5px;
`;

function LogIn() {
  const dispatch = useDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const authUser = (data) => {
    FirebaseAuthService.authUser(data.email, data.password)
    dispatch(setUser())
  }

  return (
    <form
      className="flex flex-col p-2 mx-auto mt-5 gap-y-3"
      onSubmit={handleSubmit(authUser)}
    >
      <label className="text-2xl text-center">Вход в учётную запись</label>

      <Input
        {...register("email", {
          minLength: { value: 5, message: "Минимум 5 символов" },
          maxLength: { value: 30, message: "Максимум 30 символов" },
        })}
        type="email"
        placeholder="Введите e-mail"
        required
      />
      {errors.email && <p className="font-bold text-red-500"> {errors.email.message} </p>}

      <Input
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
    </form>
  );
}

export default LogIn;
