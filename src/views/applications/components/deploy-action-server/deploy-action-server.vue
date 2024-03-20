<template>
  <a-popover trigger="click" position="bottom">
    <icon-storage class="icon" />
    <template #content>
      <a-space direction="vertical">
        <a-alert type="warning" class="warning">执行部署任务时同步到以下所勾选主机</a-alert>
        <a-checkbox-group :default-value="[1]" direction="vertical">
          <a-checkbox v-for="item in servers" :key="item" :value="item">
            <template #checkbox="{ checked }">
              <div class="item-rows" :class="{ 'item-checked': checked }">
                <icon-check class="item-checked-icon" />
                <div class="item-value">{{ item }}</div>
              </div>
            </template>
          </a-checkbox>
        </a-checkbox-group>
      </a-space>
    </template>
  </a-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return [];
    },
  },
});
const emit = defineEmits(["update:modelValue"]);
// const toggleCollspan = () => {
//   emit("update:modelValue", !props.modelValue);
// };

const checkedAll = ref(false);

const servers = ref(["127.17.17.17 测试环境", "47.0.22.132 演示环境", "153.0.110.27 生产环境"])

</script>

<style lang="less" scoped>
.icon {
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
  color: var(--color-text-2);
  border-radius: 4px;

  &:hover {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
  }
}

.warning {
  font-size: 11px;
}

.item-rows {
  display: flex;
  align-items: center;
  width: 240px;
  padding: 0 12px;
  box-sizing: border-box;
  margin-bottom: 1px;
  border-radius: 4px;
}

.item-checked-icon {
  color: var(--color-bg-popup);
}

.item-value {
  padding: 10px;
  cursor: pointer;
  font-size: 12px;
  color: var(--color-text-2);

  &:hover {
    color: var(--color-text-1);
  }
}

.item-checked {
  background-color: var(--color-primary-light-1);

  .item-checked-icon {
    color: rgb(var(--arcoblue-6));
  }

  .item-value {
    color: rgb(var(--arcoblue-6));

    &:hover {
      color: rgb(var(--arcoblue-6));
    }
  }
}
</style>