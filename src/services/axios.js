import axios from 'axios'
import { useSettingsStore } from '../stores/settings'
import { useRouter } from 'vue-router'
const router = useRouter()
const instance = axios.create({
  mode: 'no-cors',
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  function (config) {
    const settings = useSettingsStore()

    config.headers.Authorization = settings.token.value
    config.headers['Accept-Language'] = settings.lang.value
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Access-Control-Allow-Credentials'] = 'true'
    config.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT'
    config.headers['Access-Control-Allow-Headers'] =
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

    console.log(config.headers)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (response) {
    const settings = useSettingsStore()
    if (response.status === 401) settings.set('token', '')
    router.push({ name: 'signin' })
  }
)

export default instance
