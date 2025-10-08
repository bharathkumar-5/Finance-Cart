import axios from 'axios'

const baseURL = 'https://finance-cart-2.onrender.com/api'

const apiClient = axios.create({
  baseURL,
  withCredentials: true
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default apiClient