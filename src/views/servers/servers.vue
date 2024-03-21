<template>
  <div class="container">
    <a-layout-sider class="layout-sider" :class="[collspanStatus ? 'layout-sider--expand' : 'layout-sider--shrink']">
      <ServerList />
      <Collspan v-model="collspanStatus" />
    </a-layout-sider>
    <a-layout-content id="layoutContent" class="layout-content">
      <ServerContent />
      <ServerInfo v-model:visible="serverStore.showServerInfo" />
      <CodeMirror />
    </a-layout-content>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Collspan from '@/components/collspan/collspan.vue'
import CodeMirror from '@/components/codemirror/codemirror.vue'
import ServerList from './components/server-list/server-list.vue'
import ServerContent from './components/server-content/server-content.vue'
import ServerInfo from './components/server-info/server-info.vue'
import { useServerStore } from '@/store'

const serverStore = useServerStore()
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
