<template>
  <div class="name">
    <img class="icon" :src="getExtIcon(name)" />
    <div class="text">{{ name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { getExtIcon } from '@/assets/icons'

defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>

<style lang="less" scoped>
.name {
  display: flex;
  align-items: center;
  .icon {
    content: ' ';
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  .text {
    font-size: 12px;
    line-height: 32px;
    color: var(--color-text-2);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
