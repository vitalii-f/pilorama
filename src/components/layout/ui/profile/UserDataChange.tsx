import { AlertProps } from '@/utils/interfaces/interfaces'
import { useMutation } from '@tanstack/react-query'
import { UpdateProfileProps } from '@/utils/interfaces/user.interfaces'
import { useFormik } from 'formik'
import { User } from '@supabase/supabase-js'

//TODO Сделать полноценное изменение данных: пароль, почта, логин, фото(сделано)

interface UserDataChangeProps {
  user: User
  setModal(arg?: boolean | undefined): void
  setAlert({}: AlertProps): void
}

interface UserChangedData {
  login: string
  email: string
  password: string
  imgURL: string
}

const UserDataChange = ({ setModal, setAlert }: UserDataChangeProps) => {
  const formik = useFormik<UserChangedData>({
    initialValues: {
      login: '',
      email: '',
      password: '',
      imgURL: '',
    },
    onSubmit: (data) => {
      mutate(data)
    },
  })

  const { mutate } = useMutation(
    // ['update profile'],
    {
      mutationFn: async (data: UpdateProfileProps) => {
        // await StorageService.uploadProfilePhoto(data.photo[0], 'profile_photo_' + user.email)
        if (data.photo) {
          // await StorageService.uploadProfilePhoto(data.photo, 'profile_photo_' + user.email)
          // const photoURL = await StorageService.downloadProfilePhoto('profile_photo_' + user.email)
          // await FirebaseAuthService.updateUserProfile({photoURL: photoURL})
        }
      },
      onSuccess: () => {
        setAlert({ type: 'success', message: 'Профиль успешно обновлён' })
        setModal()
      },
      onError: () => {
        setAlert({ type: 'error', message: 'Ошибка' })
      },
    }
  )

  return (
    <div className='fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-zinc-900/95'>
      <h2>Изменение данных</h2>
      <form className='flex flex-col gap-5 w-96' onSubmit={formik.handleSubmit}>
        <input name='login' type='text' onChange={formik.handleChange} placeholder='Новое имя' />
        <input name='email' type='email' onChange={formik.handleChange} placeholder='Новый e-mail' />
        <input name='password' type='password' onChange={formik.handleChange} placeholder='Новый пароль' />

        <label>
          Фото профиля: <input name='imgURL' type='file' onChange={formik.handleChange} />
        </label>

        <button type='reset' onClick={() => setModal()}>Отменить изменения</button>
        <button type='submit'> Сохранить изменения </button>
      </form>
    </div>
  )
}

export default UserDataChange
