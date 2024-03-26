<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import useLocale from '@/hooks/locale'

const { currentLocale } = useLocale()
const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh-CN':
      return zhCN
    case 'en-US':
      return enUS
    default:
      return enUS
  }
})

onMounted(() => {
  invoke('close_splashscreen')
})
</script>
