import axios from "axios"

const requestAdress = 'http://localhost:3000/articles'

export const NewsService = {
    async getArticles() {
        const responce = await axios.get(requestAdress)
        return responce.data
    },
    async addArticle(data) {
        return axios.post(requestAdress, data)
    },
    async removeArticle(data) {
        console.log(data)
        return axios.delete(requestAdress + '/' + data.toString())
    }
}