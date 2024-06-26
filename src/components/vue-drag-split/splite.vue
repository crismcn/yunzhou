<template>
  <div
    ref="splitContainerRef"
    class="split_container clearfix"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    :split="split"
    :style="{
      userSelect: resizing ? 'none' : 'auto',
    }"
  >
    <Pane class="split_pane split_paneL" :split="split" :style="{ [type]: percent + '%' }">
      <slot name="paneL"></slot>
    </Pane>

    <resizer v-if="!layout" :style="{ [resizeType]: percent + '%' }" :split="split" @mousedown="onMouseDown"></resizer>

    <Pane v-if="!layout" class="split_pane split_paneR" :split="split" :style="{ [type]: 100 - percent + '%' }">
      <slot name="paneR"></slot>
    </Pane>
  </div>
</template>
<script setup lang="ts">
import Resizer from './resizer.vue'
import Pane from './pane.vue'
import { ref, toRefs, watch } from 'vue-demi'

const props = defineProps({
  layout: {
    type: Boolean,
    default: false,
  },
  minPercent: {
    type: Number,
    default: 10,
  },
  defaultPercent: {
    type: Number,
    default: 50,
  },
  split: {
    validator(value: string) {
      return ['horizontal', 'vertical'].indexOf(value) >= 0
    },
    required: true,
  },
})
const { layout, minPercent, defaultPercent, split } = toRefs(props)

const type = ref('width')
const resizeType = ref('left')
const resizing = ref(false)
const percent = ref(50)

watch(
  split,
  (nv) => {
    type.value = nv === 'horizontal' ? 'width' : 'height'
    resizeType.value = nv === 'horizontal' ? 'left' : 'top'
  },
  { immediate: true }
)
watch(
  defaultPercent,
  (nv) => {
    percent.value = nv
  },
  { immediate: true }
)

const emits = defineEmits(['resize'])
const debounce = () => {
  let timer: any = null
  return (fun: () => void) => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fun()
      clearTimeout(timer)
      timer = null
    }, 100)
  }
}
const debounceIns = debounce()
function onMouseDown() {
  resizing.value = true
}
function onMouseUp() {
  resizing.value = false
}
const onMouseMove: any = (e: { buttons: number; which: number; currentTarget: { offsetWidth: any; offsetHeight: any }; pageX: any; pageY: any }) => {
  if (e.buttons === 0 || e.which === 0) {
    return
  }
  if (!resizing.value) return
  let offset = 0
  let target: any = e.currentTarget
  if (split.value === 'horizontal') {
    while (target) {
      offset += target.offsetLeft
      target = target.offsetParent
    }
  } else {
    while (target) {
      offset += target.offsetTop
      target = target.offsetParent
    }
  }
  const currentPage = split.value === 'horizontal' ? e.pageX : e.pageY
  const targetOffset = split.value === 'horizontal' ? e.currentTarget.offsetWidth : e.currentTarget.offsetHeight
  const _percent = Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100
  if (_percent > minPercent.value && _percent < 100 - minPercent.value) {
    percent.value = _percent
  }

  debounceIns(() => {
    emits('resize', e)
  })
}
</script>

<style lang="less">
#split_window {
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }

  .split_container {
    height: 100%;
    position: relative;
  }

  .split_container:not(:has(.Resizer)) {
    .split_pane {
      padding: 0 !important;
    }
  }
}
</style>
