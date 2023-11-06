import { useEffect, useState } from 'react'
import { auth } from '../constants/firebase.constants'
import { onAuthStateChanged } from 'firebase/auth'

const useAuth = () => {
  const [authUser, setAuthUser] = useState<any>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setAuthUser(user ?? false)
    )

    return unsubscribe
  }, [auth])

  return authUser
}

export default useAuth
