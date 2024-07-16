import axios from "axios"

const SERVER_URL = import.meta.env.PYTHON_SERVER_URL

const ajax = axios.create({
  baseURL: SERVER_URL,
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
