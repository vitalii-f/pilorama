import { supabase } from '@/utils/supabase'

export const AuthService = {
  registerUser: async (login: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          login: login,
        },
      },
    })
    return error?.message
  },
  logInUser: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
    return error?.message
  },
  signOutUser: async () => {
    const { error } = await supabase.auth.signOut()
    return error?.message
  },
  updateUserLogin: async (login: string, id: string) => {
    try {
      const { data, error } = await supabase.from('profiles').update({login}).eq('id', id).select()
      if (error) throw new Error(error.message)

      return data
    } catch(error) {
      throw new Error(error as string)
    }
  },
  updateUserPassword: async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({password: password})
      if (error) throw new Error(error.message)

      return data
    } catch(error) {
      throw new Error(error as string)
    }
  },
  updateUserEmail: async (email: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({email: email})
      if (error) throw new Error(error.message)

      return data
    } catch(error) {
      throw new Error(error as string)
    }
  },
  // async addRole(userID: string, role: [string], email: string, login: string) {
  //  
  // },
  // async getRole(email: string): Promise<[string]> {
  //   
  // },
  // async removeRole(userID: string, role: string) {
  //   
  // },
}
