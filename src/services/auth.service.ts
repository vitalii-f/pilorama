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
    const { data, error } = await supabase.from('profiles').update({login}).eq('id', id).select()
    // const { data, error } = await supabase.auth.updateUser({data: { login: login }})
      console.log(data)
      console.log(error)
    // const user = (await supabase.auth.getUser()).data.user
    // if (user) {
      // const { data, error } = await supabase.from('profiles').update({login: login}).match({id: user.id})

    //   console.log(data)
    //   console.log(error)
    //   console.log("----")
    //   console.log(login)
    //   console.log(user)
    // }
    

    // return error?.message
  },
  updateUserPassword: async (password: string) => {
    const { error } = await supabase.auth.updateUser({password: password})
    return error?.message
  },
  updateUserEmail: async (email: string) => {
    const { data, error } = await supabase.auth.updateUser({email: email})
    console.log(data)
    console.log(error)
    return error?.message
  },
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
