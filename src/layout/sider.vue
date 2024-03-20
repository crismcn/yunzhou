<template>
  <a-layout-sider class="layout-sider">
    <Lottie class="bg" :animation-data="Daytime"></Lottie>
    <WindowControls />
    <Menus />
    <Options />
  </a-layout-sider>
</template>

<script lang="ts" setup>
import Menus from '@/layout/components/menus/menus.vue'
import Options from '@/layout/components/options/options.vue'
import WindowControls from '@/layout/components/window-controls/window-controls.vue'
import Lottie from '@/components/lottie/lottie.vue'
import Evening from '@/assets/lottie/evening.json'
import Daytime from '@/assets/lottie/daytime.json'
</script>

<style lang="less" scoped>
.layout-sider {
  position: relative;
  width: 80px !important;
  box-shadow: none;
  background-color: var(--color-bg-1);
  border-right: solid @border-1 var(--color-neutral-2);
  .bg {
    width: 1100px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
