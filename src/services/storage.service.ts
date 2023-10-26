import { storage } from "@/utils/constants/firebase.constants"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const storagePath = {
    avatar: '/avatar/',
    newsPreview: '/news_preview/'
}

export const StorageService = {
    createStorage(path: string) {
        return ref(storage, path)
    },
    async uploadProfilePhoto(file: Blob, fileName: string) {
        const reference = ref(storage, 'profile_photo/' + fileName)
        return await uploadBytes(reference, file)
    },
    async downloadProfilePhoto(fileName: string) {
        const reference = ref(storage, 'profile_photo/' + fileName)
        const url = await getDownloadURL(reference)
        return url
    },
    async uploadNewsPreview(file: Blob, fileName: string) {
        const reference = ref(storage, 'news_preview/' + fileName)
        return await uploadBytes(reference, file)
    },
    async downloadNewsPreview(fileName: string) {
        const reference = ref(storage, 'news_preview/' + fileName)
        const url = await getDownloadURL(reference)
        return url
    }
}