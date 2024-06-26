import axios from 'axios'
import { useSettingsStore } from '../stores/settings'
import { useRouter } from 'vue-router'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  function (config) {
    const settings = useSettingsStore()

    //config.headers.Authorization = settings.token.value
    config.headers['Accept-Language'] = settings.lang
    config.headers['Authorization'] = settings.token

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (r) => r,
  function (error) {
    const settings = useSettingsStore()
    if (error.status === 401) {
      settings.setToken('')
      useRouter().push({ name: 'signin' })
    }
    return Promise.reject({ msg: error.response.data.message }) //{ R: 'E', msg: response.response.data }
  }
)

export default instance
