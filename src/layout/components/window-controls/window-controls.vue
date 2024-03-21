<template>
  <div class="window-controls">
    <div class="control-dot close" @click="onClick(0)">
      <IconFont name="icon-close" :size="12"></IconFont>
    </div>
    <div class="control-dot minimize" @click="onClick(1)">
      <IconFont name="icon-minimize" :size="12"></IconFont>
    </div>
    <div class="control-dot maximize" @click="onClick(2)">
      <IconFont name="icon-maximize" :size="12"></IconFont>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconFont from '@/components/iconfont/iconfont.vue'
import { appWindow } from '@tauri-apps/api/window';

const onClick = async (e: any) => {
  switch (e) {
    case 0:
      await appWindow.hide()
      break
    case 1:
      await appWindow.minimize()
      break
    default:
      {
        const isMaximized = await appWindow.isMaximized();
        isMaximized ? await appWindow.unmaximize() : await appWindow.maximize()
      }
  }
}
</script>

<style lang="less" scoped>
.window-controls {
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  padding: 12px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  transition: all 0.25s;
  z-index: 1000;

  &:hover {
    .control-dot {

      .arco-icon,
      .option-dot {
        opacity: 0.6;
      }
    }
  }

  .control-dot {
    width: 12px;
    height: 12px;
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
</style>
