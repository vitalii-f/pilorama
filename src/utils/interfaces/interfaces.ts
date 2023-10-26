import { User } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'

export interface AlertProps {
  type: string
  message: string
  showAlert?(type: string, message: string | null): void
}

export interface UserProps {
  userData: User | null
  userRoles: TUserRoles | null
}

export interface INews {
  news: IArticle
  newsCount: number
}

export interface IArticle {
  author: string | null | undefined
  category: string[]
  creation_date: Timestamp | Date
  id?: number
  imgURL: any
  text: string
  title: string
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