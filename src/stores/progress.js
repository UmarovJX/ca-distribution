import { reactive } from 'vue'
import { defineStore } from 'pinia'
import ls from './localStorageHelper'

export const useProgressStore = defineStore('progress', () => {
  const progress = reactive(ls.getObj('progress') || {})

  function setProgress(url, value) {
    progress[url] = value
    ls.saveObj('progress', JSON.parse(JSON.stringify(progress)))
  }

  function deleteProgress(url) {
    delete progress[url]
    ls.saveObj('progress', JSON.parse(JSON.stringify(progress)))
  }

  return { progress, setProgress, deleteProgress }
})
