<template>
  <div class="options" data-tauri-drag-region>
    <icon-translate @click="onChangeLocale" />
    <IconTheme @click="onChangeTheme" />
    <a-dropdown position="tl" trigger="click" @select="onSelect" :popup-max-height="false">
      <icon-command />
      <template #content>
        <a-doption value="setting">
          <template #icon><icon-settings /></template>
          {{ $t('options.dropdown.setting') }}
        </a-doption>
        <a-dsubmenu>
          <template #icon><icon-code-block /></template>
          <template #default>{{ $t('options.dropdown.data') }}</template>
          <template #content>
            <a-doption value="clear">
              <template #icon><icon-eraser /></template>
              {{ $t('options.dropdown.clear') }}
            </a-doption>
            <a-doption value="import">
              <template #icon><icon-import /></template>
              {{ $t('options.dropdown.import') }}
            </a-doption>
            <a-doption value="export">
              <template #icon><icon-export /></template>
              {{ $t('options.dropdown.export') }}
            </a-doption>
          </template>
        </a-dsubmenu>
        <a-doption value="feedback">
          <template #icon><icon-bug /></template>{{ $t('options.dropdown.feedback') }}
        </a-doption>
        <a-doption value="lock">
          <template #icon><icon-lock /></template>{{ $t('options.dropdown.lock') }}
        </a-doption>
        <a-doption value="exit">
          <template #icon><icon-close /></template>{{ $t('options.dropdown.exit') }}
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, onMounted } from 'vue'
import { listen } from '@tauri-apps/api/event'
import { IconMoon, IconSun, IconDesktop } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
import useLocale from '@/hooks/locale'
import { exit } from '@tauri-apps/api/process';
import { onUnmounted } from 'vue'



const router = useRouter()
const appStore = useAppStore()

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
    case 'lock':
      appStore.setLock(true)
      break

    case 'exit':
      await exit(1);
      break
    default:
      break
  }
}

const theme = ref('light')
const IconTheme: any = {
  render: () => {
    let icon = IconMoon
    if (theme.value == 'dark') icon = IconMoon
    if (theme.value == 'light') icon = IconSun
    if (theme.value == 'auto') icon = IconDesktop
    return h(icon)
  },
}

const onChangeTheme = () => {
  if (theme.value == 'dark') {
    theme.value = 'light'
    document.body.removeAttribute('arco-theme')
  } else if (theme.value == 'light') {
    theme.value = 'dark'
    document.body.setAttribute('arco-theme', 'dark')
  }
}

const { changeLocale, currentLocale } = useLocale()
const onChangeLocale = () => {
  const locale = currentLocale.value == 'en-US' ? 'zh-CN' : 'en-US'
  changeLocale(locale)
  appStore.setLocale(locale)
}


const unlisten = ref<any>(() => { })
onMounted(async () => {
  unlisten.value = await listen('sys', (p: any) => {
    const { payload } = p
    const { t } = payload
    // const { id, payload } = p
    // const { t, v } = payload
    switch (t) {
      case 'lock':
        appStore.setLock(true)
        break
    }
  })
})
onUnmounted(async () => {
  await unlisten.value()
})
</script>

<style lang="less" scoped>
.options {
  width: 100%;
  padding: 20px 0;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 2;

  .arco-icon {
    cursor: pointer;
    margin: 14px;
    font-size: 26px;
    stroke-width: 3;
    user-select: none;
    color: var(--color-text-1);

    &:hover {
      color: var(--color-text-3);
    }
  }
}

.arco-dropdown-option:hover .arco-icon {
  animation: shake 0.17s 2;
}

@keyframes shake {

  0%,
  90%,
  100% {
    transform: rotate(0) scale(1);
  }

  20%,
  40% {
    transform: scale(1.2);
    // transform: rotate(-15deg) scale(1.2);
  }

  30%,
  50% {
    transform: scale(1.2);
    // transform: rotate(15deg) scale(1.2);
  }
}
</style>
