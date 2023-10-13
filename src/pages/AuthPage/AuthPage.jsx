import { useSelector } from "react-redux"
import LogIn from "../../components/layout/ui/auth/LogIn"
import SignUp from "../../components/layout/ui/auth/SignUp"

//TODO Разделить страницы регистрации/авторизации

function AuthPage() {
  const user = useSelector((state) => state.user.value)

  return (
    <>
      {user ? <h2 className="w-full text-3xl text-center"> Авторизация успешна! </h2> : <> <SignUp /> <LogIn /> </>}
    </>
  )
}

export default AuthPage