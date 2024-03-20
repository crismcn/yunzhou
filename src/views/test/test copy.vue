<template>
  <div class="center">
    <a-button @click="onRouteChange"> Jump To About View </a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const onRouteChange = () => {
  router.push({
    path: '/about',
  })
}
</script>

<style lang="less">
.center {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
