import { createI18n } from 'vue-i18n'
import en from './en-US'
import cn from './zh-CN'

const defaultLocale = 'zh-CN'

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  messages: {
    'en-US': en,
    'zh-CN': cn,
  },
})

export default i18n
