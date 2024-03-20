<template>
  <icon-font :type="name" :size="size" />
</template>

<script setup lang="ts">
import { Icon } from '@arco-design/web-vue'
const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/c/font_4270601_evslicvutu8.js' })

defineProps({
  size: {
    type: Number,
    required: true,
    default: 20,
  },
  name: {
    type: String,
    required: true,
    default: 'icon-niuyouguo',
  },
})
</script>
