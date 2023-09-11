import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AuthService } from "../../../../services/auth.service";

const Input = styled.input`
  width: 400px;
  padding: 15px;
  border-radius: 5px;
`;

function SignIn() {
  const { isLoading, isSuccess, data, isError } = useQuery(['signIn user'], () => AuthService.checkPassword('vit.vit.00.000@gmail.com', null))
  isLoading && console.log("Loading " + isLoading)
  isSuccess && console.log(data)
  isError && console.log('Error ' + isError)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const authUser = async () => {
    
  }


  return (
    <form
      className="flex flex-col p-2 mx-auto mt-5 gap-y-3"
      onSubmit={handleSubmit(authUser())}
    >
      <label className="text-2xl text-center">Вход в учётную запись</label>
      
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
      
      <button>Войти в систему</button>
    </form>
  );
}

export default SignIn;
