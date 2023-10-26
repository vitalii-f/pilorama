import UserDataChange from "@/components/layout/ui/profile/UserDataChange";
import { FirebaseAuthService } from "@/services/firebaseAuth.service";
import { AlertProps, IUserState } from "@/utils/interfaces/interfaces";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

//TODO Вынести изменения профиля в отдельный компонент (изменить пароль/почту/никнейм) ✔️
//TODO Перенести алёрт вниз страницы (или сделать абсолютным позиционированием по центру)
//TODO Оформить/стилизовать страницу профиля

const Profile = () => {
  const user = useSelector((state: IUserState) => state.user.value?.userData)
  
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
    console.log(await FirebaseAuthService.verefyEmail())
  }

  function showAlert(type: string, message: string) {
    if (type === 'success') return <Alert onClose={() => setAlert({type: 'none', message: ''})} severity="success"></Alert>
    if (type === 'error') return <Alert onClose={() => setAlert({type: 'none', message: ''})} severity="error"> {message.toString()} </Alert>
  }
  
  const creationDate = user && user.metadata && user.metadata.creationTime && new Date(user.metadata.creationTime)
  
  return (
    user && (
      <section id='profile' className="w-full mt-5">
        <div className="flex gap-5">
          {user.photoURL && <img className="w-48" src={user.photoURL} alt={user.displayName?.toString()} />}
          <div className="flex flex-col gap-4">
            <p>Имя пользователя: {user.displayName}</p>
            <p>E-mail: {user.email}</p>
            <p>Статус подтверждения почты: {user.emailVerified ? <span className="text-green-500"> подтверждена! </span> : <span className="text-red-500"> не подтверждена! </span>}</p>
            {user.emailVerified || <button onClick={() => sendVerefyMessage()}>Подтвердить почту</button>}
            <p>Дата регистрации: {creationDate && creationDate.getDate()}.{creationDate && creationDate.getMonth() < 9 ? '0' + creationDate.getMonth() : creationDate && creationDate.getMonth()}.{creationDate && creationDate.getFullYear()}</p>
            
            <button onClick={() => changeModal()}>Изменить данные профиля</button>
          </div>
          {modal && <UserDataChange user={user} setModal={setModal} setAlert={setAlert}/>}
        </div>
        
        {showAlert(alert.type, alert.message)}

      </section>
    )
  );
};

export default Profile;