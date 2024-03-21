<template>
  <a-space :class="{ radio: check }">
    <a-radio :model-value="checked" @click="onClick"></a-radio>
  </a-space>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  check: Number,
  total: Number,
})

const emits = defineEmits(['toggle', 'update:status'])

const checked = computed(() => {
  if (props.check == 0) {
    emits('update:status', 0)
    return false
  }
  if (props.check != props.total) {
    emits('update:status', 1)
    return false
  } else {
    emits('update:status', 2)
    return true
  }
})
const onClick = () => {
  emits('toggle', !checked.value)
}
</script>

<style lang="less" scoped>
.radio {
  :deep(.arco-radio-icon) {
    border-color: rgb(var(--primary-6));
  }
}
</style>
