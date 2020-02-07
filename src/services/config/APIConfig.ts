import axios, { AxiosInstance } from 'axios'

const API: AxiosInstance = axios.create({
  baseURL: "https://api.github.com/users/"
})

export default API