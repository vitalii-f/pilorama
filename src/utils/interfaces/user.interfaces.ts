import { User } from "@supabase/supabase-js"

// export interface UserProps {
//   user: User | null | undefined
// }

export interface UserSliceState {
  user: User | null
  status: UserStatus
}

export interface UserSelectorProps {
  state: UserSliceState
}

export enum UserStatus {
  loading = 'loading',
  loaded = 'loaded',
  reject = 'reject'
}

// export type UserDB = UserProps[]

// export interface CreateUserProps {
//   creationDate: Date
//   email: string
//   id: number
//   role: string[]
//   userID: string
// }

export interface UpdateProfileProps {
  displayName?: string
  email?: string
  password?: string
  photo?: Blob
}

export interface UserLogInData {
  email: string
  password: string
}

export interface UserSignUpData {
  email: string
  password: string
  login: string
}
