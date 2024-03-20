<template>
  <VueDragSplit
    ref="vueDragSplitRef"
    v-model:windowListSync="windowList"
    v-model:activeTabKeySync="activeTabKey"
    :generateWindowConfig="generateWindowConfig"
    :createAddBtn="createAddBtn"
    :createClose="createClose"
    :createTab="createTab"
    :createTabView="createTabView"
    @closeWindow="onCloseWindow"
    @resize="onResize"
    @dragEnd="onDragend"
  >
  </VueDragSplit>
</template>

<script setup lang="ts">
import { ref, h, RendererElement, RendererNode, VNode, VNodeArrayChildren } from 'vue-demi'
import VueDragSplit from '@/components/vue-drag-split/index.vue'
// import { splitDirectionMap } from '@/components/vue-drag-split/utils'

const vueDragSplitRef = ref<any>('')
const activeTabKey = ref('')
const windowList = ref([])

const generateWindowConfig = (params: any) => {
  return {
    key: Date.now(),
    label: '标签' + Date.now(),
  }
}

const createAddBtn = (win: any) => {
  return h(
    'div',
    {
      class: 'add_btn_cus',
      style: { heigth: '26px', lineHeight: '26px' },
      onClick: createNewWindow,
    },
    '+'
  )
}
const createClose = (win: any) => {
  return h(
    'div',
    {
      class: 'close_inner_cus',
    },
    'x'
  )
}
const createTab = (win: { label: string }) => {
  return h('span', { style: { color: 'white', fontSize: '12px' } }, '自定义' + win.label)
}
const createTabView = (win: {
  key:
    | string
    | number
    | boolean
    | VNode<RendererNode, RendererElement, { [key: string]: any }>
    | VNodeArrayChildren
    | (() => any)
    | { [name: string]: unknown; $stable?: boolean | undefined }
    | undefined
}) => {
  return h('div', null, [h('h3', { style: { color: '#a5a5fa' } }, win.key)])
}
const createNewWindow = (params: any) => {
  vueDragSplitRef.value.newWindow({
    key: Date.now(),
    label: '标签' + vueDragSplitRef.value.windowList.length,
    contentText: Date.now(),
  })
}

const onCloseWindow = (params: any) => {
  console.log('onCloseWindow :>> ', params)
}
const onResize = (params: any) => {
  console.log('onResize :>> ', params)
}
const onDragend = (params: any) => {
  console.log('onDragend :>> ', params)
}
</script>

<style lang="less">
#split_window {
  .close_inner_cus {
    padding: 0 5px;
    color: white;
    font-size: 14px;
    height: 18px;
    width: 18px;
    text-align: center;
    line-height: 18px;
    margin: 3px 0;
    &:hover {
      color: crimson;
      background: white;
      border-radius: 50%;
    }
  }
  .add_btn_cus {
    cursor: pointer;
    padding: 0 10px;
    background: rgb(59, 59, 59);
    color: white;
    &:hover {
      color: #008ae1;
    }
  }
}
</style>
