import { ref } from 'vue'
import { defineStore } from 'pinia'
import ls from './localStorageHelper'

export const useSettingsStore = defineStore('settings', () => {
  const lang = ref(ls.get('lang') || 'ru')
  const token = ref(ls.get('token') || '')
  const user = ref(ls.getObj('user') || {})

  function setToken(value) {
    token.value = value
    ls.set('token', value)
  }

  function setUser(data) {
    user.value = data
    ls.saveObj('user', data)
  }

  ls.saveAll([
    ['lang', lang.value],
    ['token', token.value]
  ])

  return { lang, token, user, setToken, setUser }
})
