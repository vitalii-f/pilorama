import { auth } from '@/utils/constants/firebase.constants'
import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { UpdateProfileProps } from '@/utils/interfaces/user.interfaces'
import { FirebaseError } from 'firebase/app'

export const FirebaseAuthService = {
  async createUser(email: string, password: string, login: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log(userCredential)
        if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: login })
        return userCredential.user
      } catch (e) {
        const error = e instanceof FirebaseError
        if (error) return e.code
      }
  },
  async authUser(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      return response.user
    } catch (e) {
      const error = e instanceof FirebaseError
      if (error) return e.code
    }
  },
  async signOutUser() {
    return await signOut(auth)
  },
  userState(): User | null {
    return auth.currentUser
  },
  async updateUserProfile(data: UpdateProfileProps) {
    try {
      if (auth.currentUser) return await updateProfile(auth.currentUser, data)
    } catch (e) {
      const error = e instanceof FirebaseError
      if (error) return e.code
    }
  },
  async verefyEmail() {
    try {
      if (auth.currentUser) return await sendEmailVerification(auth.currentUser)
    } catch (e) {
      const error = e instanceof FirebaseError
      if (error) return e.code
    }
  },
}
