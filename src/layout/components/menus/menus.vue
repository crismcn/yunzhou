<template>
  <div class="menus-container" data-tauri-drag-region>
    <div class="logo" data-tauri-drag-region></div>
    <div class="menus">
      <div v-for="item in menuList" @click="selectItme(item.name)" class="menus-item" :class="{ 'menus-item--active': appStore.activeMenu == item.name }">
        <component :is="item.icon"></component>
        <div class="menus-item-label">{{ $t(item.label) }}</div>
      </div>
      <div @click="selectItme(`download`)" class="menus-item" :class="{ 'menus-item--active': appStore.activeMenu == `download` }">
        <Lottie class="download" :animation-data="Download"></Lottie>
        <icon-download style="width: 0" />
        <div class="menus-item-label">{{ $t(`menus.transfer`) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
import { IconStorage, IconLayers } from '@arco-design/web-vue/es/icon'
import Lottie from '@/components/lottie/lottie.vue'
import Download from '@/assets/lottie/download.json'

const router = useRouter()
const appStore = useAppStore()

const menuList = ref([
  {
    name: 'applications',
    icon: () => h(IconLayers),
    label: 'menus.applications',
  },
  {
    name: 'servers',
    icon: () => h(IconStorage),
    label: 'menus.servers',
  },
])

const selectItme = (e: string) => {
  if (appStore.activeMenu != e) {
    router.push({
      path: `/${e}`,
    })
    appStore.setActiveMenu(e)
  }
}
</script>

<style lang="less" scoped>
.menus-container {
  position: relative;
  height: 100%;
  .logo {
    cursor: pointer;
    width: 100%;
    height: 100px;
    background-size: 42px;
    background-position: center 70%;
    background-repeat: no-repeat;
    background-image: url(@/assets/images/logo.png);
  }

  .menus {
    width: 100%;
    padding: @size-2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    .menus-item {
      position: relative;
      cursor: pointer;
      width: 100%;
      margin: @size-2 0;
      padding: @size-2 0;
      color: var(--color-text-2);
      text-align: center;

      &:hover {
        color: var(--color-text-1);
        border-radius: @border-radius-medium;
        background-color: var(--color-fill-1);
      }

      .arco-icon {
        cursor: pointer;
        font-size: @size-small;
        stroke-width: 3;
        user-select: none;
        transition: transform 0.3s ease;
      }

      .menus-item-label {
        margin-top: 4px;
        font-size: @font-size-body-2;
      }
      .download {
        position: absolute;
        top: -6px;
        height: 52px;
      }
    }

    .menus-item--active {
      color: var(--color-text-1);
      border-radius: @border-radius-medium;
      background-color: var(--color-fill-2);
    }
  }
}
.menus-item:hover .arco-icon {
  // animation: mybox 0.15s 2;
  // transition: transform 0.3s ease;
  transform: scale(1.2);
}
</style>
