<template>
  <div class="container">
    <div class="window-controls">
      <div class="control-dot close">
        <IconFont name="icon-close" :size="12"></IconFont>
      </div>
      <div class="control-dot minimize">
        <IconFont name="icon-minimize" :size="12"></IconFont>
      </div>
      <div class="control-dot maximize">
        <IconFont name="icon-maximize" :size="12"></IconFont>
      </div>
    </div>
    <div class="options">
      <div class="tools">
        <a-dropdown position="tl" trigger="hover" @select="onSelect" :popup-max-height="false">
          <div class="more">...</div>
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
            <!-- <a-doption value="about">
              <template #icon><icon-info /></template>{{ $t('header.dropdown.about') }}
            </a-doption>
            <a-doption value="mini">
              <template #icon><icon-minus /></template>{{ $t('header.dropdown.mini') }}
            </a-doption> -->
            <a-doption value="exit">
              <template #icon><icon-close /></template>{{ $t('header.dropdown.exit') }}
            </a-doption>
          </template>
        </a-dropdown>
        <!-- <div class="logo"></div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { h } from 'vue'
// import { IconSun } from '@arco-design/web-vue/es/icon'
import IconFont from '@/components/iconfont/iconfont.vue'
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

// const IconTheme: any = {
//   render: () => {
//     let icon = IconSun
//     return h(icon)
//   },
// }
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  color: var(--color-text-1);
  box-sizing: border-box;

  // background: var(--color-bg-1);
  .window-controls {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      .control-dot {
        .arco-icon {
          opacity: 0.6;
        }
      }
    }

    .control-dot {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      &:active {
        opacity: 0.7;
      }

      .arco-icon {
        vertical-align: 0;
        opacity: 0;
      }
    }

    .close {
      background-color: #ff5f57;
    }

    .minimize {
      background-color: #ffbd2e;
    }

    .maximize {
      background-color: #28c940;
    }
  }

  .options {
    padding: 20px 0;
    box-sizing: border-box;

    .tools {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .more {
        cursor: pointer;
        font-size: 32px;
        user-select: none;
        // transform: rotate(90deg);

        &:hover {
          color: var(--color-text-3);
        }
      }
    }
  }
}
</style>
