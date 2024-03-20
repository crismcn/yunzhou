<template>
  <a-space class="options" @click.stop="1">
    <a-tooltip :content="['开始','暂停'][value!.status]" mini>
      <icon-play-arrow-fill @click.stop="onActions({ t: `status` })" v-if="value!.status" />
      <icon-pause @click.stop="onActions({ t: `status` })" v-else />
    </a-tooltip>

    <a-popconfirm type="error" position="tr" @ok="onActions({ t: 'del' })">
      <a-tooltip content="取消" mini>
        <icon-close />
      </a-tooltip>
      <template #content>
        <div class="tip">确定取消任务：{{ value!.name }} ?</div>
      </template>
    </a-popconfirm>

    <a-tooltip content="在本地目录查看" mini>
      <icon-search @click.stop="onActions({ t: `finder` })" />
    </a-tooltip>
  </a-space>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: Object,
})

const emit = defineEmits(['actions'])
const onActions = (e: any) => {
  const { t } = e
  emit('actions', { t, v: props.value })
}
</script>

<style lang="less" scoped>
.options {
  height: 34px;
  .arco-icon {
    padding: 5px;
    color: var(--color-text-2);
    cursor: pointer;
    &:hover {
      border-radius: 4px;
      background-color: var(--color-bg-1);
    }
  }
}
.tip {
  max-width: 320px;
  color: var(--color-text-2);
  font-size: 13px;
}
</style>
