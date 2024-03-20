<template>
  <a-input-group>
    <a-input v-model="form.user" @change="input" @clear="input" allow-clear placeholder="root">
      <template #prepend>
        <span style="width: 60px">SSH</span>
      </template>
    </a-input>
    <a-input v-model="form.host" @change="input" @clear="input" allow-clear placeholder="127.0.0.1"
      style="margin-left: -2px; border-right: none">
      <template #prepend>
        <span style="width: 40px">@</span>
      </template>
    </a-input>
    <a-input-number v-model="form.port" @change="input" :max-length="5" placeholder="22" style="margin-left: -1px">
      <template #prepend>
        <span style="width: 40px">-p</span>
      </template>
    </a-input-number>
  </a-input-group>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: Object
});
const emit = defineEmits(["update:modelValue"]);

interface FORMTYPE {
  user: string
  host: string
  port: number
}
const form: any = ref<FORMTYPE>({
  user: '',
  host: '',
  port: 22
});

const input = (_e: any) => {
  emit("update:modelValue", form.value)
};

const reset = () => {
  form.value = {
    user: '',
    host: '',
    port: 22
  }
}
defineExpose({ reset });

onMounted(() => {
  form.value = props.modelValue
})
watch(() => props.modelValue, (newValue, oldValue) => {
  form.value = newValue
})
</script>

<style lang="less" scoped>
:deep(.arco-input-wrapper,
  .arco-textarea-wrapper) {
  // background: white;
  // background: var(--color-neutral-2);
  background: var(--color-bg-1);
  border: solid 1px var(--color-neutral-3);
}

:deep(.arco-input-focus,
  .arco-textarea-focus) {
  z-index: 2;
  border: solid 1px rgb(var(--primary-6));
}

:deep(.arco-input.arco-input-size-large) {
  line-height: 2;
}

:deep(.arco-input-prepend, .arco-input-append) {
  font-size: 12px;
  color: var(--color-text-2);
  text-align: center;
  border: 1px solid var(--color-neutral-3);
  border-right: none;
  background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
}
</style>
