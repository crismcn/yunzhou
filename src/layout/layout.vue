<template>
  <a-layout class="layout-container">
    <Sider></Sider>
    <a-layout class="layout-content">
      <div class="content">
        <Views />
      </div>
    </a-layout>
    <Lock />
  </a-layout>
</template>

<script lang="ts" setup>
import Lock from '@/components/lock/lock.vue'
import Views from './views.vue'
import Sider from './sider.vue'
</script>

<style lang="less" scoped>
.layout-container {
  position: relative;
  height: 100%;
  background: var(--color-bg-1);
  overflow: hidden;
  border-radius: 12px;

  .layout-content {
    display: flex;
    flex-direction: row;

    .content {
      width: 100%;
      // background: rgb(var(--arcoblue-6));
    }
  }
}
</style>
