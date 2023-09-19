import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FirebaseAuthService } from "src/services/firebaseAuth.service";
import { FirestoreService } from "src/services/firestore.service";
import { setUser } from "src/store/user/userSlice";
import styled from "styled-components";

const Input = styled.input`
  width: 400px;
  padding: 15px;
  border-radius: 5px;
`

function SignUp() {
  const dispatch = useDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const registerUser = async (data) => {
    const currentUser = await FirebaseAuthService.createUser(data.email, data.password, data.login)
    await FirestoreService.addRole(currentUser.uid, ['default'], data.email, data.login)
    dispatch(setUser())
  };

  return (
    <form
      className="flex flex-col p-2 mx-auto mt-5 gap-y-3"
      onSubmit={handleSubmit(registerUser)}
    >
      <label className="text-2xl text-center">Реистрация</label>
      
      <Input
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
      {errors.login && <p className="font-bold text-red-500"> {errors.login.message} </p>}
      
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
      
      <button>Зарегестрироваться</button>
      {/* {alertMessage && <p> {alertMessage} </p>} */}
    </form>
  );
}

export default SignUp;
