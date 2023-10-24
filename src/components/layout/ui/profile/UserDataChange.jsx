import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { FirebaseAuthService } from "src/services/firebaseAuth.service"
import { StorageService } from "src/services/storage.service"

//TODO Сделать полноценное изменение данных: пароль, почта, логин, фото(сделано)

function UserDataChange({ user, setModal, setAlert }) {
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
        setModal()
      },
      onError: () => {
        setAlert({type: 'error'})
      }
    })

  const updateProfilePhoto = async (data) => {
    mutate(data)
  }
  
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-zinc-900/95">
      <h2>Изменение данных</h2>
      <form className="flex flex-col gap-5 w-96" onSubmit={handleSubmit(updateProfilePhoto)}>
          <input {...register('login')} type='text' placeholder="Новое имя"/>
          <input {...register('email')} type='email' placeholder="Новый e-mail"/>

          <input {...register('password')} type='password' placeholder="Новый пароль"/>

          <label>Фото профиля: <input {...register('photo')} type='file'/></label>
          
          <button type="reset" onClick={() => setModal()}> Отменить изменения </button>
          <button type="submit"> Сохранить изменения </button>
      </form>
    </div>
  )
}

export default UserDataChange