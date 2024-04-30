import { User } from "@supabase/supabase-js"

export interface UserSliceState {
  user: User | null
  role: string[] | null
  status: UserStatus
  login: string | null | undefined
}

export interface UserSelectorProps {
  state: UserSliceState
}

export enum UserStatus {
  loading = 'loading',
  loaded = 'loaded',
  reject = 'reject'
}

export interface UpdateProfileProps {
  displayName?: string
  email?: string
  password?: string
  avatar?: Blob | null
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
