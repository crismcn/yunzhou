<template>
  <a-space>
    <div class="path-trail" @click.stop="onFocus">
      <a-input class="input" :class="{ hidden: !focus }" v-model="pathTrail" ref="pathTrailRef" @blur="onBlur" @change="onChange"></a-input>
      <div class="trail" :style="{ zIndex: focus ? 1 : 0 }">
        <a-breadcrumb :routes="modelValue" :max-count="4">
          <template #item-render="{ route, paths }">
            <a-link @click.stop="cd(paths)">
              <icon-home v-if="route == '/'" />
              <span v-else>{{ route }}</span>
            </a-link>
          </template>
        </a-breadcrumb>
      </div>
    </div>
  </a-space>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array<any>,
    default() {
      return []
    },
  },
})

const emit = defineEmits(['update:modelValue', 'change'])
const cd = (e: any[]) => {
  emit('update:modelValue', props.modelValue.slice(0, e.length))
}

const focus = ref(false)
const onFocus = () => {
  focus.value = true
  pathTrailRef.value.focus()
}
const onBlur = () => {
  focus.value = false
  // console.log(pathTrail.value)
  // emit("change", pathTrail.value)
}
const onChange = () => {
  const value: any = pathTrail.value.split('/').filter((p: string) => p)
  value.unshift('/')
  emit('update:modelValue', value)
  // pathTrail.value = `/${value.filter((p: string) => p).join('/')}`
  // const value = pathTrail.value.split('/')
  // if (value.length && !value[value.length - 1]) value.pop()
  // console.log(value)
  // focus.value = false
  // console.log(pathTrail.value)
  // emit("change", pathTrail.value)
}
const pathTrail = ref('')
const pathTrailRef = ref()
watch(
  () => props.modelValue,
  (newVal, _oldVal) => {
    let path = newVal.join('/') || '/'
    if (path[0] == path[1]) path = path.slice(1)
    pathTrail.value = path
    emit('change', path)
  },
  { deep: true, immediate: true }
)
</script>

<style lang="less" scoped>
.path-trail {
  position: relative;
  height: 32px;
  line-height: 30px;
  box-sizing: border-box;
  .input {
    width: 100%;
    position: absolute;
  }
  .trail {
    cursor: text;
    min-width: 180px;
    padding: 0 20px 0 0;
    background-color: var(--color-bg-3);
    // border: solid 1px var(--color-neutral-3);
    border-radius: var(--border-radius-small);
  }
  .hidden {
    top: -50px;
  }
}
</style>
