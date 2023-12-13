import { UserSliceState, UserStatus } from "@/utils/interfaces/user.interfaces";
import { supabase } from "@/utils/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  user: null,
  status: UserStatus.loading
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
        state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.pending, (state) => {
      state.user = null
      state.status = UserStatus.loading
    }),
    builder.addCase(setUser.fulfilled, (state, { payload }) => {
      state.user = payload
      state.status = UserStatus.loaded
    }),
    builder.addCase(setUser.rejected, (state) => {
      state.user = null
      state.status = UserStatus.reject
    })
  }
})

export const setUser = createAsyncThunk(
  'user/setUser',
  async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('profiles').select('role')

    return {...user, role: data && data[0].role}
  }
)

export const getUserRole = createAsyncThunk(
  'user/getUserRole',
  async () => {
    const role = await supabase.from('profiles').select()
  }
)

export const { signOutUser } = userSlice.actions
export default userSlice.reducer