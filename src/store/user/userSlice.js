import { createSlice } from "@reduxjs/toolkit";
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

console.log(currentUser)
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: currentUser,
    },
    reducers: {
        setUser: (state) => {
            state.value = FirebaseAuthService.userState()
            state.value.role = FirestoreService.getRole(state.value.email)
        },
        signOutUser: (state) => {
            state.value = null
        }
    }
})

export const { setUser, signOutUser } = userSlice.actions
export default userSlice.reducer