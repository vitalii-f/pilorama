import axios from "axios";
import md5 from "md5"

const requestAdress = "http://localhost:3000/users";

export const AuthService = {
  async checkPassword (email, password) {
    const { data } = await axios.get(`${requestAdress}?email=${email}`)
    return data[0]
  },
  async isRegister(login = null, email = null) {
    login = await axios.get(`${requestAdress}?login=${login}`)
    email = await axios.get(`${requestAdress}?email=${email}`)

    login.data.length ? (login = true) : (login = false)
    email.data.length ? (email = true) : (email = false)

    return { login, email }
  },
  async registerUser(login, password, email) {
    const isRegister = this.isRegister(login, email)
    password = md5(password)
    let response =
    isRegister
      .then((result) => {
        if (result.login) return {type: "error", message: "Данный логин уже используется"}
        if (result.email) return {type: "error", message: "Данный email уже используется"}
        if (!result.login && !result.email) return axios.post(requestAdress, {login, password, email})
      })
      .catch((error) => {
        return error
      });
      
    return response
  },
  async authUser(email, password) {
    const isRegister = this.isRegister(null, email)
    isRegister.then(result => {
      if (result.email) this.checkPassword(email, password)
    })
  },
};
