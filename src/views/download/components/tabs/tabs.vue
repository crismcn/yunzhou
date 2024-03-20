<template>
  <div class="tabs-box">
    <div class="transfer" data-tauri-drag-region>
      <a-space size="medium">
        R：
        <a-progress
          type="circle"
          :percent="0.79"
          :color="{
            '0%': 'rgb(var(--success-4))',
            '100%': 'rgb(var(--warning-3))',
          }"
        />
        <a-space class="rate" direction="vertical">
          <a-space class="arrow-up"><icon-arrow-up /> 1.2K/s</a-space>
          <a-space class="arrow-down"><icon-arrow-down /> 12.3K/s</a-space>
        </a-space>
      </a-space>
    </div>
    <div style="overflow: auto; height: calc(100vh - 100px)">
      <div class="tabs">
        <div class="tabs-item" @click="selectItme(index)" v-for="(item, index) in tabs" :key="item.label" :class="{ 'tabs-item--active': activeIndex == index }">
          <div class="tabs-item-dot" :class="{ 'tabs-item-dot--active': activeIndex == index }"></div>
          <a-space size="medium">
            <IconFont :name="item.icon" :size="24"></IconFont>
            <span>{{ item.label }}</span>
            <a-badge :count="item.num" :max-count="99" :dotStyle="{ background: 'var(--color-neutral-3)', color: 'var(--color-text-1)' }" />
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useServerStore } from '@/store'
import IconFont from '@/components/iconfont/iconfont.vue'

const serverStore = useServerStore()
const add = () => {
  serverStore.showServerInfo = true
}
const tabs = ref([
  {
    label: '上传',
    icon: 'icon-shangchuan1',
    num: 1232,
  },
  {
    label: '下载',
    icon: 'icon-xiazai2',
    num: 2,
  },
  {
    label: '已完成',
    icon: 'icon-xiazaiwancheng',
    num: 0,
  },
])

const activeIndex = ref(0)
const selectItme = (e: number) => {
  activeIndex.value = e
}
</script>

<style lang="less" scoped>
.tabs-box {
  .transfer {
    position: sticky;
    top: 0;
    height: 100px;
    display: flex;
    align-items: end;
    justify-content: space-around;
    padding: 0 @size-2;
    padding-bottom: 14px;
    color: var(--color-text-1);
    box-sizing: border-box;
    z-index: 2;

    .arrow-up {
      .arco-icon {
        stroke-width: 5;
        color: rgb(var(--primary-5));
      }
    }

    .arrow-down {
      .arco-icon {
        stroke-width: 5;
        color: rgb(var(--success-4));
      }
    }
  }

  .tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .tabs-item {
      cursor: pointer;
      position: relative;
      padding-left: 32px;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      font-size: @font-size-body-2;
      color: var(--color-text-2);
      border-right: solid 1px var(--color-bg-1);
      box-sizing: border-box;

      &:hover {
        background-color: var(--color-fill-1);
        border-right: solid 2px var(--color-border-4);
      }

      .tabs-item-dot {
        position: absolute;
        left: 12px;
        width: @size-2;
        height: @size-2;
        border-radius: @size-2;
      }

      .tabs-item-dot--active {
        background-image: linear-gradient(to bottom right, @primary-5, @primary-6, @primary-7);
        // background-image: linear-gradient(to bottom right, #95b9f7, #558ff3);
        // background-image: linear-gradient(to bottom right, @danger-5, @danger-6, @danger-7);
      }

      .tabs-item-label {
        width: 176px;
        padding-top: 2px;
        color: var(--color-text-1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .tabs-item--active {
      background-color: var(--color-fill-2);
      border-right: solid 2px var(--color-border-4);
    }
  }
}

:deep(.arco-progress-circle-text) {
  font-size: 14px;
  color: var(--color-text-1);

  ::before {
    content: attr(data-number);
    /* 使用 ::before 伪元素添加数字 */
    font-size: 24px;
    /* 设置数字的字体大小为24px */
  }
}
</style>
