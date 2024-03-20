<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
const props = defineProps({
  split: {
    validator(value: any) {
      return ['horizontal', 'vertical'].indexOf(value) >= 0
    },
    required: true,
  },
})
const classes = ref<any>('')
const { split } = toRefs(props)
watch(
  split,
  (nv) => {
    classes.value = nv
  },
  { immediate: true }
)
</script>

<style lang="less">
#split_window {
  .split_pane.horizontal.split_paneL {
    position: absolute;
    left: 0px;
    height: 100%;
    padding-right: 2px;
  }

  .split_pane.horizontal.split_paneR {
    position: absolute;
    right: 0px;
    height: 100%;
    padding-left: 2px;
  }

  .split_pane.vertical.split_paneL {
    position: absolute;
    top: 0px;
    width: 100%;
  }

  .split_pane.vertical.split_paneR {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding-top: 2px;
  }
}
</style>
