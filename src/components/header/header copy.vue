<template>
  <div class="container">
    <div class="title" @click="onSelect('themes')">
      <a-space direction="horizontal" size="small">
        <IconTheme />
        <span>
          {{ $t('app-name') }}
        </span>
      </a-space>
    </div>
    <a-dropdown trigger="hover" @select="onSelect" :popup-max-height="false">
      <div class="tools">...</div>
      <template #content>
        <a-doption value="setting">
          <template #icon><icon-settings /></template>
          {{ $t('header.dropdown.setting') }}
        </a-doption>
        <a-dsubmenu>
          <template #icon><icon-code-block /></template>
          <template #default>{{ $t('header.dropdown.data') }}</template>
          <template #content>
            <a-doption value="clear">
              <template #icon><icon-eraser /></template>
              {{ $t('header.dropdown.clear') }}
            </a-doption>
            <a-doption value="import">
              <template #icon><icon-import /></template>
              {{ $t('header.dropdown.import') }}
            </a-doption>
            <a-doption value="export">
              <template #icon><icon-export /></template>
              {{ $t('header.dropdown.export') }}
            </a-doption>
          </template>
        </a-dsubmenu>
        <a-doption value="about">
          <template #icon><icon-info /></template>{{ $t('header.dropdown.about') }}
        </a-doption>
        <a-doption value="mini">
          <template #icon><icon-minus /></template>{{ $t('header.dropdown.mini') }}
        </a-doption>
        <a-doption value="exit">
          <template #icon><icon-close /></template>{{ $t('header.dropdown.exit') }}
        </a-doption>
      </template>
    </a-dropdown>
    <div class="logo"></div>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { IconMoon, IconSun, IconDesktop } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'

const router = useRouter()

const onSelect = async (e: any) => {
  switch (e) {
    case 'clear':
      break
    case 'import':
      break
    case 'export':
      break
    case 'about':
      break
    case 'setting':
      router.push({
        path: '/setting',
      })
      break
    case 'mini':
      break
    case 'exit':
      break
    case 'themes':
      break
    default:
      break
  }
}

const IconTheme: any = {
  render: () => {
    let icon = IconSun
    return h(icon)
  },
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px;
  padding-bottom: 5px;
  color: var(--color-text-1);
  box-sizing: border-box;
  cursor: pointer;
  background: var(--color-bg-1);

  .title {
    width: 180px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 50px;
    background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
  }

  .tools {
    cursor: pointer;
    position: absolute;
    right: 50px;
    top: 15px;
    font-size: 32px;
    user-select: none;
    transform: rotate(90deg);

    &:hover {
      color: var(--color-text-3);
    }
  }

  .logo {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('@/assets/images/logo.png');
  }
}
</style>
