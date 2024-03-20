<template>
  <div v-if="!edit" :class="[value.isDir ? 'folder' : 'unfolder', 'name']" @click="onCdDir">
    <icon-folder v-if="value.isDir" size="15" />
    <icon-drive-file v-else size="15" />
    {{ value.name }}
  </div>
  <a-input v-else ref="renameRef" v-model="name" :placeholder="placeholder" @change="onRename" @press-enter="onRename" @blur="onBlur" size="mini" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps({
  value: {
    type: Object,
    default() {
      return {}
    },
  },
  edit: {
    type: Boolean,
    default: false,
  },
})

const name = ref('')
const placeholder = computed(() => {
  name.value = props.value.name
  setTimeout(() => renameRef.value?.focus(), 20)
  return props.value.name
})

const emit = defineEmits(['actions', 'blur'])
const onBlur = () => {
  emit('blur', -1)
}

const renameRef = ref()
const onRename = () => {
  const params = {
    originName: props.value.name,
    updateName: name.value,
  }
  // 无变化则不修改
  if (!params.updateName || params.originName == params.updateName) return
  emit('actions', { t: 'rename', v: params })
  emit('blur', -1)
}
const onCdDir = () => {
  if (props.value.isDir) emit('actions', { t: 'cd', v: props.value.name })
}
</script>

<style lang="less" scoped>
.name {
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: rgb(var(--primary-6));
  }
}
.folder {
  color: rgb(var(--primary-4));
}
.unfolder {
  color: var(--color-text-2);
}
</style>
