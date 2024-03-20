<template>
  <div>
    <a-spin class="spin-icon" v-if="item.progress" />
    <a-dropdown :hide-on-select="false" v-else>
      <icon-thunderbolt class="deploy-btn" />
      <template #content>
        <a-doption @click="actions('deploy', item)">
          <template #icon>
            <icon-swap />
          </template>
          直接部署
        </a-doption>
        <a-dsubmenu>
          <template #icon>
            <icon-clock-circle />
          </template>
          <template #default> 定时部署 </template>
          <template #content>
            <a-doption>
              <a-date-picker @ok="ok" :default-value="Date.now() + 600000" value-format="timestamp" show-time
                default-popup-visible position="top" style="width: 200px" />
            </a-doption>
          </template>
        </a-dsubmenu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits(["actions"]);
const actions = (t: string, v: any) => {
  emit("actions", { t, v })
};

const ok = (e: any) => {
  emit("actions", { t: 'deploy', v: Object.assign({ deployDate: e }, props.item) })
};
</script>

<style lang="less" scoped>
.spin-icon {
  :deep(.arco-spin-icon) {
    font-size: 16px;
    // color: rgb(var(--primary-6));
  }
}

.deploy-btn {

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
</style>
