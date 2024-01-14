import { UserSliceState, UserStatus } from "@/utils/interfaces/user.interfaces";
import { supabase } from "@/utils/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  user: null,
  role: ['default'],
  status: UserStatus.loading,
  login: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
        state.user = null
        state.login = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.pending, (state) => {
      state.user = null
      state.login = null
      state.status = UserStatus.loading
    }),
    builder.addCase(setUser.fulfilled, (state, { payload }) => {
      state.user = payload.user
      state.role = payload.role
      state.login = payload.login
      state.status = UserStatus.loaded
    }),
    builder.addCase(setUser.rejected, (state) => {
      state.user = null
      state.login = null
      state.status = UserStatus.reject
    })
  }
})

export const setUser = createAsyncThunk(
  'user/setUser',
  async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return {user: null, role: null}
    
    const { data: profile } = await supabase.from('profiles').select('role, login').eq('id', user?.id)
    return {user: user, role: profile && profile[0].role, login: profile && profile[0].login}
  }
)

export const { signOutUser } = userSlice.actions
export default userSlice.reducer