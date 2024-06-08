import axios from "axios"

const SERVER_URL = import.meta.env.PYTHON_SERVER_URL
console.log(SERVER_URL)

const ajax = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 1600000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

ajax.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default ajax
