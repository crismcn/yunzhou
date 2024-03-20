<template>
  <input ref="inputRef" v-model="value" @input="onSearch" type="text" class="input" :class="[hasPadding ? 'expand' : 'normal']" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

withDefaults(
  defineProps<{
    hasPadding?: boolean
    hanldelFocusIn?: boolean
  }>(),
  {
    hasPadding: true,
    hanldelFocusIn: true,
  }
)
const value = defineModel<string>()

const emits = defineEmits(['onSearch'])
const onSearch = () => {
  emits('onSearch')
}

const inputRef = ref<HTMLInputElement | null>(null)

const select = () => {
  inputRef.value?.focus()
  inputRef.value?.select()
}

defineExpose({
  select,
})
</script>

<style lang="less" scoped>
.input {
  width: 128px;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 1.5715;
  color: #eceff4;
  border-radius: 4px;
  border: 1px solid #434c5e;
  background-color: #3b4252;

  &:focus {
    outline: none;
    border: solid 1px #4c566a;
  }

  &::placeholder {
    color: #eceff4;
    opacity: 0.75;
  }
}
.expand {
  padding-right: 100px;
}
.normal {
  width: 216px;
}
</style>
