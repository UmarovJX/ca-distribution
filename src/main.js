import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import { createManager } from '@vue-youtube/core'

import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'

import './assets/main.css'
export const tg = window.Telegram.WebApp

const app = createApp(App)
app.use(createManager())
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
tg.expand()
