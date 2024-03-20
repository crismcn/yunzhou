import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'

export default function useLocale() {
  const i18 = useI18n()
  // 获取当前语言
  const currentLocale = computed(() => {
    return i18.locale.value
  })
  // 切换当前语言
  const changeLocale = (value: string) => {
    i18.locale.value = value
    localStorage.setItem('arco-locale', value)
    Message.success(i18.t('change-locale'))
  }
  return {
    currentLocale,
    changeLocale,
    t: i18.t,
  }
}
