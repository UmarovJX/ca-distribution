import { ref } from 'vue'
import { defineStore } from 'pinia'
import ls from './localStorageHelper'

export const useSettingsStore = defineStore('settings', () => {
  const lang = ref(ls.get('lang') || 'ru')
  const token = ref(ls.get('token') || '')

  //const profile =

  let settings = { lang, token }
  settings.set = function (key, value) {
    if (this[key]) {
      this[key].value = value
      ls.set(key, value)
    }
  }

  ls.saveAll([
    ['lang', lang.value],
    ['token', token.value]
  ])

  return settings
})
