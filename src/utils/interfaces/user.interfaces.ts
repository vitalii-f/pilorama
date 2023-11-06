import { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"

export interface UserProps {
  userData: User | null
  userRoles: TUserRoles | null
}

export interface IUserState {
  user: {
    value: UserProps
  }
}

export type IUserDB = IUser[]

export interface IUser {
  creationDate: Date | Timestamp
  email: string
  id: number
  role: TUserRoles
  userID: string
}

export type TUserRoles = string[]

export interface UpdateProfileProps {
  displayName?: string
  email?: string
  password?: string
  photo?: Blob
}

export interface IUserLogInData {
  email: string
  password: string
}

export interface IUserSignUpData {
  email: string
  password: string
  login: string
}
