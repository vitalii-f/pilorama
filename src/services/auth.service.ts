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
  // async updateUserProfile(data: UpdateProfileProps) {

  // },
  // async verefyEmail() {
    
  // },
  // async addRole(userID: string, role: [string], email: string, login: string) {
  //  
  // },
  // async getRole(email: string): Promise<[string]> {
  //   
  // },
  // async removeRole(userID: string, role: string) {
  //   
  // },
  // async getUsers() {
  //   
  // },
}
