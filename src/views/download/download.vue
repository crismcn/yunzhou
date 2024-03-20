<template>
  <div class="container">
    <a-layout-sider class="layout-sider" :class="[collspanStatus ? 'layout-sider--expand' : 'layout-sider--shrink']">
      <Tabs />
      <Collspan v-model="collspanStatus" />
    </a-layout-sider>
    <a-layout-content id="layoutContent" class="layout-content">
      <List />
    </a-layout-content>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Collspan from '@/components/collspan/collspan.vue'
import Tabs from './components/tabs/tabs.vue'
import List from './components/download-list/download-list.vue'

const collspanStatus = ref(true)
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;

  .layout-sider {
    box-shadow: none;
    box-sizing: border-box;
    // background-color: var(--color-bg-1);
    background-color: #ffffff00; // lottie-bg
    border-right: solid 1px var(--color-neutral-2);
  }

  .layout-sider--expand {
    width: 240px !important;
  }

  .layout-sider--shrink {
    width: 0 !important;
  }

  .layout-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
