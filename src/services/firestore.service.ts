import { collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { FirebaseAuthService } from '@/services/firebaseAuth.service';
import { db } from "@/utils/constants/firebase.constants";
import { ICreatedArticle } from "@/utils/interfaces/article.interfaces";
import { IGetedArticle } from './../utils/interfaces/article.interfaces';
import { ICategory } from "@/utils/interfaces/interfaces";

export const FirestoreService = {
    async addArticle(article: ICreatedArticle) {
        const data: ICreatedArticle = {
            title: article.title,
            text: article.text,
            creation_date: new Date(),
            author: FirebaseAuthService.userState()?.displayName,
            category: article.category,
            imgURL: article.imgURL,
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

        const response: IGetedArticle[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data() as IGetedArticle
            response.push(data)
        });

        return {news: response, newsCount: dataCount}
    },
    async getArticleById(id: number): Promise<IGetedArticle> {
        const coll = collection(db, 'news_articles')
        const dbQuery = query(coll, orderBy('id'), where('id', '==', +id))
        const querySnapshot = await getDocs(dbQuery)

        const response: Array<IGetedArticle> = []
        querySnapshot.forEach((doc) => {
            const data = doc.data() as IGetedArticle
            response.push(data)
        });

        return response[0]
    },
    async deleteArticle(id: number) {
        try {
            await deleteDoc(doc(db, 'news_articles', id.toString()));
        } catch(e){
            console.error(e)
        }
    },
    async addRole(userID: string, role: [string], email: string, login: string) {
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
    async getRole(email: string): Promise<[string]> {
        return (await getDoc(doc(db, 'users', email))).data()?.role
    },
    async removeRole(userID: string, role: string) {
        try {
            await updateDoc(doc(db, 'users', userID), {
                role: role
            })
        } catch (e) {
            console.error(e)
        }
    },
    async getUsers() {
        const responce: Array<object> = []
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
    async getСategoriesList(): Promise<ICategory[]> {
        const responce: Array<ICategory> = []

        const querySnapshot = await getDocs(query(collection(db, 'categories')))
        querySnapshot.forEach((doc) => {
            const data = doc.data() as ICategory
            responce.unshift(data)
        })
        return responce
    },
    async addCategory(name: string) {
        const data: ICategory = {
            name: name
        }
        return await setDoc(doc(db, 'categories', name), data);
    },
    async deleteCategoryByName(name: string) {
        const categoryRef = doc(db, 'categories', name)
        return await deleteDoc(categoryRef)
    }
}