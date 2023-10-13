import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "src/utils/constants/firebase.constants"

export const storagePath = {
    avatar: '/avatar/',
    newsPreview: '/news_preview/'
}

export const StorageService = {
    createStorage(path) {
        return ref(storage, path)
    },
    async uploadProfilePhoto(file, fileName) {
        const reference = ref(storage, 'profile_photo/' + fileName)
        return await uploadBytes(reference, file)
    },
    async downloadProfilePhoto(fileName) {
        const reference = ref(storage, 'profile_photo/' + fileName)
        const url = await getDownloadURL(reference)
        return url
    },
    async uploadNewsPreview(file, fileName) {
        const reference = ref(storage, 'news_preview/' + fileName)
        return await uploadBytes(reference, file)
    },
    async downloadNewsPreview(fileName) {
        const reference = ref(storage, 'news_preview/' + fileName)
        const url = await getDownloadURL(reference)
        return url
    }
}