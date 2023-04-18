import { reactive } from 'vue'
import { defineStore } from 'pinia'
import ls from './localStorageHelper'

export const useProgressStore = defineStore('progress', () => {
  const progress = reactive(ls.getObj('progress') || {})

  function setProgress(id, value) {
    progress[id] = value
    ls.saveObj('progress', JSON.parse(JSON.stringify(progress)))
  }

  function deleteProgress(id) {
    delete progress[id]
    ls.saveObj('progress', JSON.parse(JSON.stringify(progress)))
  }

  return { progress, setProgress, deleteProgress }
})
