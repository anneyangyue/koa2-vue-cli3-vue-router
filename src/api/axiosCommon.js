import axios from 'axios'
import router from '../router'
const axiosCommon = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosCommon.interceptors.request.use(
  config => {
    if (window.sessionStorage.getItem('token')) {
      config.headers.token = window.sessionStorage.getItem('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axiosCommon.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      router.push('/login')
    }
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default axiosCommon
