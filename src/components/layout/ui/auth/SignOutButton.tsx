import { FirebaseAuthService } from '@/services/firebaseAuth.service'
import { useAppDispatch } from '@/store/store'
import { signOutUser } from '@/store/user/userSlice'

function SignOutButton() {
  const dispatch = useAppDispatch()
  return (
    <>
      <button
        onClick={() => {
          FirebaseAuthService.signOutUser()
          dispatch(signOutUser())
        }}
      >
        Выйти
      </button>
    </>
  )
}

export default SignOutButton
