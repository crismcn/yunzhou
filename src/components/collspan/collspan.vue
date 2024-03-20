<template>
  <div @click="toggleCollspan" :class="[modelValue ? 'expand' : 'shrink']" shape="circle">
    <icon-left v-if="modelValue" />
    <icon-right v-else />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

const emit = defineEmits(["update:modelValue"]);
const toggleCollspan = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<style lang="less" scoped>
.expand,
.shrink {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0px;
  bottom: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text-2);
  background-color: var(--color-bg-5);
  box-shadow: 0 4px 10px #0000001a;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
  z-index: 999;

  &:hover {
    background-color: var(--color-neutral-2);
  }
}

.expand {
  width: 26px;
}

.shrink {
  width: 28px;
  right: -26px;
  border-radius: 0;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  // border: solid 1px @color-bg-5;
  transition: all 0.35s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}
</style>
