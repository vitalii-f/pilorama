import { FirebaseAuthService } from "@/services/firebaseAuth.service";
import { FirestoreService } from "@/services/firestore.service";
import { TUserRoles } from "@/utils/interfaces/user.interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserState {
  value: {
    userData: User | null
    userRoles: TUserRoles | null 
  } | null | undefined
}

const initialState = {
  value: undefined
} as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
        state.value = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.fulfilled, (state, { payload }) => {
      state.value = payload
    })
  }
})

export const setUser = createAsyncThunk(
  'user/setUser',
  async () => {
    const userData: User | null = FirebaseAuthService.userState()
    const userRoles: TUserRoles | null = userData && userData.email !== null ? await FirestoreService.getRole(userData.email) : null
    return {userData, userRoles}
  }
)

export const { signOutUser } = userSlice.actions
export default userSlice.reducer