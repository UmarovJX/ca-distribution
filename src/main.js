import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia();
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'

import './assets/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
