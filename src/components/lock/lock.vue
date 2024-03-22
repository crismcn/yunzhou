<template>
  <transition name="fade">
    <div class="lock-container" data-tauri-drag-region v-show="appStore.locked">
      <div class="content">
        <Lottie class="lottie" :animation-data="Unlock"></Lottie>
        <span class="text">输入PIN码解锁软件</span>
        <a-verification-code v-model="pin" @finish="onFinish" :error="error" masked size="large" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Lottie from '@/components/lottie/lottie.vue'
import Unlock from '@/assets/lottie/unlock.json'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const pin = ref('')
const error = ref(false)
const onFinish = (e: any) => {
  if (e == 123456) {
    pin.value = ''
    error.value = false
    appStore.unlock()
  } else {
    error.value = true
  }
}
</script>

<style lang="less" scoped>
.lock-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: blur 0.35s forwards;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 999;
  pointer-events: none;
  user-select: none;

  .content {
    width: 396px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 48px;
    margin-bottom: 70px;
    color: var(--color-text-3);
    border-radius: 2px;
    box-sizing: border-box;
    animation: fade 0.35s forwards;

    .lottie {
      width: 120px;
      height: 120px;
    }

    .text {
      font-size: 12px;
      padding-bottom: 20px;
    }
  }
}

@keyframes blur {
  0% {
    backdrop-filter: blur(0px);
  }

  100% {
    backdrop-filter: blur(40px);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

// .fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

// .fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
