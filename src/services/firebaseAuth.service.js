import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from "src/utils/constants/firebase.constants";

export const FirebaseAuthService = {
    async createUser(email, password, login) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {displayName: login})
        return userCredential.user
    },
    async authUser(email, password) {
        const response = await signInWithEmailAndPassword(auth, email, password)
        return response.user
    },
    async signOutUser() {
        return await signOut(auth)
    },
    userState() {
        return auth.currentUser
    }
};