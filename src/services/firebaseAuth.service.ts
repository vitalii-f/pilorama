import { auth } from '@/utils/constants/firebase.constants';
import { User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { UpdateProfileProps } from '@/utils/interfaces/user.interfaces';

export const FirebaseAuthService = {
    async createUser(email: string, password: string, login: string) {
        if (auth.currentUser) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(auth.currentUser, {displayName: login})
                return userCredential.user
            } catch (e) {
                console.log(e)
            }
        }
    },
    async authUser(email: string, password: string) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return response.user
        } catch (e) {
            console.log(e)
        }
    },
    async signOutUser() {
        return await signOut(auth)
    },
    userState(): User | null {
        return auth.currentUser
    },
    async updateUserProfile(data: UpdateProfileProps) {
        if (auth.currentUser) return await updateProfile(auth.currentUser, data)
    },
    async verefyEmail() {
        if (auth.currentUser) return await sendEmailVerification(auth.currentUser)
    },
};