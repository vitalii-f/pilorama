import { onAuthStateChanged } from 'firebase/auth'
import Router from './components/layout/ui/Router'
import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/user/userSlice'
import { auth } from '@/utils/constants/firebase.constants'

const App = () => {
  const dispatch = useAppDispatch()
  
  onAuthStateChanged(auth, (_user) => {
    dispatch(setUser())
  })

  return (
    <>
      <Router />
    </>
  )
}

export default App
