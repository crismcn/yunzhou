<template>
  <router-view v-slot="{ Component, route }">
    <!-- <transition name="slide-right-drawer" mode="out-in"> -->
    <keep-alive>
      <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
    <!-- </transition> -->
  </router-view>
</template>

<style scoped>
/* 路由动画 */
.slide-right-drawer-enter-active,
.slide-right-drawer-appear-active {
  transition: transform 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
}

.slide-right-drawer-leave-from {
  transform: translateX(100%);
}

.slide-right-drawer-leave-to {
  transform: translateX(-100%);
}

.slide-right-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
