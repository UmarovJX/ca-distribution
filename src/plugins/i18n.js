import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'ru',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'ru',
  availableLocales: ['en', 'ru'],
  messages
})

export default i18n
