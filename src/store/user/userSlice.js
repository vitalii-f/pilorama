import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuthService } from "src/services/firebaseAuth.service";
import { FirestoreService } from "src/services/firestore.service";
import { auth } from "src/utils/constants/firebase.constants";

let currentUser = null
onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user
    } else {
      // User is signed out
    }
  });

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: currentUser,
    },
    reducers: {
        signOutUser: (state) => {
            state.value = null
        }
    },
    extraReducers: (builder) => {
      builder.addCase(setUser.fulfilled, (state, action) => {
        state.value = action.payload
      })
    }
})

export const setUser = createAsyncThunk(
  'user/setUser',
  async () => {
    const userData = await FirebaseAuthService.userState()
    const userRoles = await FirestoreService.getRole(userData.email)
    return {userData, userRoles}
  }
)

export const { signOutUser } = userSlice.actions
export default userSlice.reducer