<template>
  <div class="tabs" data-tauri-drag-region>
    <a-space class="tab-item tab-item--active">
      <IconFont name="icon-typescript1" :size="20"></IconFont>
      <span class="tab-name">xcodeDark</span>
      <icon-close />
    </a-space>
    <a-space class="tab-item">
      <IconFont name="icon-js" :size="14"></IconFont>
      <span class="tab-name">xcodeLight</span>
      <icon-close />
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import IconFont from '@/components/iconfont/iconfont.vue'
import Editor from './editor.vue'
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  color: #767d8c;
  background: #2e3440;
  box-sizing: border-box;

  .tab-item {
    cursor: pointer;
    padding: 0 10px;
    line-height: 40px;
    background-color: #4c566a80;

    .tab-name {
      font-size: 13px;
      padding: 0 5px;
    }

    .arco-icon {
      padding: 4px;
      border-radius: 2px;

      &:hover {
        color: #ffffff;
        background-color: #4c566a80;
      }
    }
  }

  .tab-item--active {
    color: #ffffff;
    background: #2e3440;
  }
}
</style>
