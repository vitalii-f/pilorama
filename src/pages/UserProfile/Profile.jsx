import { Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FirebaseAuthService } from "src/services/firebaseAuth.service";
import { StorageService } from "src/services/storage.service";

//TODO Вынести изменения профиля в отдельный компонент (изменить пароль/почту/никнейм)
//TODO Перенести алёрт вниз страницы (или сделать абсолютным позиционированием по центру)
//TODO Оформить/стилизовать страницу профиля

const Profile = () => {
  const user = useSelector((state) => state.user.value?.userData)

  const [alert, setAlert] = useState({
    type: 'none',
    message: null
  })

  const { handleSubmit, register } = useForm()


  const {mutate} = useMutation(
    ['update profile'],
    async (data) => {
      await StorageService.uploadProfilePhoto(data.photo[0], 'profile_photo_' + user.email)

      const photoURL = await StorageService.downloadProfilePhoto('profile_photo_' + user.email)

      await FirebaseAuthService.updateUserProfile({photoURL: photoURL})
    },
    {
      onSuccess: () => {
        setAlert({type: 'success'})
      },
      onError: () => {
        setAlert({type: 'error'})
      }
    }
    )

  const updateProfilePhoto = async (data) => {
    console.log(data.photo[0])
    mutate(data)
  }

  function showAlert(type, message) {
    if (type === 'success') return <Alert onClose={() => setAlert({type: 'none', message: null})} severity="success">Профиль успешно обновлён</Alert>
    if (type === 'error') return <Alert onClose={() => setAlert({type: 'none', message: null})} severity="error"> {message.toString()} </Alert>
    if (type === 'none') return null
  }

  return (
    user && (
      <div>
        {showAlert(alert.type, alert.message)}
        {user.photoURL && <img className="w-28" src={user.photoURL} alt={user.displayName} />}
        
        <p>Имя пользователя: {user.displayName}</p>
        <p>Почта: {user.email}</p>
        <form onSubmit={handleSubmit(updateProfilePhoto)}> 
          <input {...register('photo')} id='filex' type='file'/>
          <button> Обновить фото профиля </button>
        </form>
      </div>
    )
  );
};

export default Profile;