import axios from './axios.js'
import { useSettingsStore } from '../stores/settings.js'
function signIn(username, password) {
  const settings = useSettingsStore()
  return axios.postForm('common/auth/login', { password, username }).then((response) => {
    settings.setToken(response.data.token)
  })
}
function getUser() {
  const settings = useSettingsStore()

  return axios.get('telegram/user/profile').then((response) => {
    settings.setUser(response.data)
  })
}

export default { signIn, getUser }
