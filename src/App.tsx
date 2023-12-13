import Router from './components/layout/ui/Router'
import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/user/userSlice'

const App = () => {
  const dispatch = useAppDispatch()
  dispatch(setUser())

  return (
    <>
      <Router />
    </>
  )
}

export default App
