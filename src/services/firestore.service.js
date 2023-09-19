import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "src/utils/constants/firebase.constants";
import { FirebaseAuthService } from "./firebaseAuth.service";

export const FirestoreService = {
    async addArticle(article) {
        const data = {
            title: article.title,
            text: article.text,
            creationDate: new Date(),
            author: FirebaseAuthService.userState().displayName,
            category: article.category,
            imgURL: article.imgURL,
        }
        try {
            console.log(data)
            await setDoc(doc(db, "news_articles", data.title), data);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    },
    async getArticles() {
        const querySnapshot = await getDocs(query(collection(db, "news_articles"), orderBy("creation_date")));
        let response = []

        querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = (doc.id)
            
            response.unshift(data)
        });

        return response
    },
    async deleteArticle(id) {
        try {
            await deleteDoc(doc(db, 'news_articles', id));
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
}