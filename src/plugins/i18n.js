import { createI18n } from 'vue-i18n'
import ru from '../locales/ru.json'


const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'ru',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'ru',
  messages: {
    ru
  }
})

export default i18n
