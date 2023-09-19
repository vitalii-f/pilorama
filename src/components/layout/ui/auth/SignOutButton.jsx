import { useDispatch } from 'react-redux'
import { FirebaseAuthService } from 'src/services/firebaseAuth.service'
import { signOutUser } from 'src/store/user/userSlice'

function SignOutButton() {
  const dispatch = useDispatch()
  return (
    <>
        <button onClick={() => {
          FirebaseAuthService.signOutUser()
          dispatch(signOutUser())}
          }>
          Выйти
          </button>
    </>
  )
}

export default SignOutButton