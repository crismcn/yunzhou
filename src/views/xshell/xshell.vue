<template>
  <VueDragSplit
    ref="vueDragSplitRef"
    v-model:windowListSync="windowList"
    v-model:activeTabKeySync="activeTabKey"
    :generateWindowConfig="generateWindowConfig"
    @closeWindow="onCloseWindow"
    @resize="onResize"
    @dragEnd="onDragend"
  >
    <template #TabView="win">
      <Xterm />
    </template>
    <!-- <template #Tab="win">
      <p style="color: white; font-size: 12px">{{ win.label }}</p>
    </template>
    <template #CloseBtn>
      <div class="close_inner_cus">X</div>
    </template>
    <template #AddBtn>
      <div class="add_btn_cus" style="height: 26px; line-height: 26px">添加</div>
    </template>
    <template #TabView="win">
      <div>{{ win }}2</div>
    </template>
    <template #TabActions>
      <button style="padding: 3px 10px; margin: 0">关闭所有窗口</button>
    </template>
    <template #placeHolder>
      <div class="placeholder_cus">
        <button @click="createNewWindow">创建窗口</button>
      </div>
    </template> -->
  </VueDragSplit>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue-demi'
import VueDragSplit from '@/components/vue-drag-split/index.vue'
import Xterm from '@/components/xterm/xterm.vue'
import { useAppStore } from '@/store'
import { GUID, Debounce } from '@/common'

const appStore = useAppStore()

const vueDragSplitRef = ref<any>('')
const activeTabKey = ref('')
const windowList = ref([])

const generateWindowConfig = (params: any) => {
  return {
    key: Date.now(),
    label: '标签' + Date.now(),
  }
}

const onResize = () => {
  Debounce(() => appStore.onResize(GUID()))()
  // appStore.onResize(GUID())
}
const onDragend = (params: any) => {
  // console.log('onDragend :>> ', params)
}
const onCloseWindow = (params: any) => {
  // console.log('onCloseWindow :>> ', params)
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>
