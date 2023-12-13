import LoadingSpinner from "@/components/layout/ui/loading/LoadingSpinner";
import UserDataChange from "@/components/layout/ui/profile/UserDataChange";
import { FirebaseAuthService } from "@/services/firebaseAuth.service";
import { RootState } from "@/store/store";
import { AlertProps } from "@/utils/interfaces/interfaces";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

//TODO Вынести изменения профиля в отдельный компонент (изменить пароль/почту/никнейм) ✔️
//TODO Перенести алёрт вниз страницы (или сделать абсолютным позиционированием по центру)
//TODO Оформить/стилизовать страницу профиля

const Profile = () => {
  const userData = useSelector((state: RootState) => state.userSlice)
  
  const [modal, setModal] = useState<boolean | undefined>(false)

  const changeModal = (): void => {
    if (modal) {
      setModal(false)
    } else setModal(true)
  }

  const [alert, setAlert] = useState<AlertProps>({
    type: 'none',
    message: ''
  })

  async function sendVerefyMessage() {
    await FirebaseAuthService.verefyEmail()
  }

  function showAlert(type: string, message: string) {
    if (type === 'success') return <Alert onClose={() => setAlert({type: 'none', message: ''})} severity="success"></Alert>
    if (type === 'error') return <Alert onClose={() => setAlert({type: 'none', message: ''})} severity="error"> {message.toString()} </Alert>
  }
  
  const creationDate = userData.user && userData.user.created_at && new Date(userData.user.created_at)
  
  if (userData.status === 'loading') return <LoadingSpinner />
  if (userData.status === 'loaded' && userData.user === null) return <h1>Please, log in to your account.</h1>
  if (userData.status === 'reject') return <h1> Error </h1>
  
  return (
    userData.user && (
      <section id='profile' className="w-full mt-5">
        <div className="flex gap-5">
          {/* {user.photoURL && <img className="w-48" src={user.photoURL} alt={user.displayName?.toString()} />} */}
          <div className="flex flex-col gap-4">
            <p>Имя пользователя: {userData.user.user_metadata.login}</p>
            <p>E-mail: {userData.user.email}</p>
            <p>Статус подтверждения почты: {userData.user.email_confirmed_at ? <span className="text-green-500"> подтверждена! </span> : <span className="text-red-500"> не подтверждена! </span>}</p>
            {userData.user.email_confirmed_at || <button onClick={() => sendVerefyMessage()}>Подтвердить почту</button>}
            <p>Дата регистрации: {creationDate && creationDate.getDate()}.{creationDate && creationDate.getMonth() < 9 ? '0' + creationDate.getMonth() : creationDate && creationDate.getMonth()}.{creationDate && creationDate.getFullYear()}</p>
            
            <button onClick={() => changeModal()}>Изменить данные профиля</button>
          </div>
          {modal && <UserDataChange user={userData.user} setModal={setModal} setAlert={setAlert}/>}
        </div>
        
        {showAlert(alert.type, alert.message)}

      </section>
    )
  );
};

export default Profile;