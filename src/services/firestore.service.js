import { collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, startAt, updateDoc, where } from "firebase/firestore";
import { db } from "src/utils/constants/firebase.constants";
import { FirebaseAuthService } from "./firebaseAuth.service";

export const FirestoreService = {
    async addArticle(article) {
        const data = {
            title: article.title,
            text: article.text,
            creation_date: new Date(),
            author: FirebaseAuthService.userState().displayName,
            category: article.category,
            imgURL: article.imageFile,
        }
        try {
            //geting last ID
            const coll = collection(db, 'news_articles')
            const dbQuery = query(coll, orderBy('creation_date', 'desc'), limit(1))
            const querySnapshot = await getDocs(dbQuery)

            if (querySnapshot.docs.length > 0) {
                const id = +querySnapshot.docs[0].id + 1
                data.id = id
                await setDoc(doc(db, 'news_articles', id.toString()), data);
            } else {
                data.id = 0
                await setDoc(doc(db, 'news_articles', '0'), data);
            }
          } catch (e) {
            console.error('Error adding document: ', e);
          }
    },
    async getArticles(lim = 1, startIndex = 0) {
        const coll = collection(db, 'news_articles')
        const dataCount = (await getCountFromServer(coll)).data().count 
        const currentIndex = dataCount - startIndex - 1
        const dbQuery = query(coll, orderBy('id', 'desc'), where('id', '<=', currentIndex), limit(lim))
        const querySnapshot = await getDocs(dbQuery)

        const response = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()

            response.push(data)
        });

        return {news: response, newsCount: dataCount}
    },
    async getArticleById(id) {
        const coll = collection(db, 'news_articles')
        const dbQuery = query(coll, orderBy('id'), where('id', '==', +id))
        const querySnapshot = await getDocs(dbQuery)

        const response = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()

            response.push(data)
        });

        return response[0]
    },
    async deleteArticle(id) {
        try {
            await deleteDoc(doc(db, 'news_articles', id.toString()));
        } catch(e){
            console.error(e)
        }
    },
    async addRole(userID, role, email, login) {
        const data = {
            userID: userID,
            login: login,
            email: email,
            role: role,
            creationDate: new Date(),
        }
        try {
            await setDoc(doc(db, 'users', email), data)
        } catch (e) {
            console.error(e)
        }
    },
    async getRole(email) {
        return (await getDoc(doc(db, 'users', email))).data().role
    },
    async removeRole(userID, role) {
        try {
            await updateDoc(doc(db, 'users', userID), {
                role: role
            })
        } catch (e) {
            console.error(e)
        }
    },
    async getUsers() {
        let responce = []
        try {
            const querySnapshot = await getDocs(query(collection(db, 'users'), orderBy('creationDate')))
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                responce.unshift(data)
            })
            return responce
        } catch (e) {
            console.error(e)
        }
    },
}