<template>
  <a-popover trigger="click">
    <a-space size="medium">
      <div class="right" v-for="i in 6" :key="i"></div>
    </a-space>
    <template #content>
      <a-space direction="vertical">
        <a-space class="title"> <icon-safe size="20" />{{ title }} </a-space>
        <a-space>
          <div class="label">旧PIN</div>
          <a-verification-code masked style="width: 268px" />
        </a-space>
        <!-- <a-space>
          <span class="label">新PIN</span>
          <a-verification-code masked style="width: 268px" />
        </a-space>
        <a-space>
          <span class="label">确认PIN</span>
          <a-verification-code masked style="width: 268px" />
        </a-space> -->
        <a-space class="option">
          <a-button size="small">重置</a-button>
          <a-button type="primary" size="small">确定</a-button>
        </a-space>
      </a-space>
    </template>
  </a-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

//
const title = ref('设置PIN')
// const pin = ref('')
// const onClick = () => {
//   // console.log('123456')
// }
</script>

<style lang="less" scoped>
.right {
  width: 32px;
  height: 32px;
  background-color: var(--color-fill-2);
  border-radius: var(--border-radius-small);
  cursor: pointer;

  &:hover {
    background-color: var(--color-fill-3);
  }
}

.title {
  font-size: 14px;
  color: var(--color-text-2);
}

.label {
  width: 48px;
  font-size: 12px;
  color: var(--color-text-2);
  text-align: right;
}

.option {
  float: right;
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>
