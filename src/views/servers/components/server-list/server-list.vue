<template>
  <div class="servers-list">
    <div class="servers-header" data-tauri-drag-region>
      <a-space>
        <a-input size="small" allow-clear>
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
        <a-button size="small" @click="add">
          <template #icon>
            <icon-plus />
          </template>
        </a-button>
      </a-space>
    </div>
    <div style="overflow: auto; height: calc(100vh - 62px)">
      <div class="servers">
        <div class="servers-item" @click="selectItme(index)" v-for="(item, index) in servers" :key="item.ip" :class="{ 'servers-item--active': activeIndex == index }">
          <div class="servers-item-dot" :class="{ 'servers-item-dot--active': activeIndex == index }"></div>
          <div class="servers-item-label">{{ item.label + ` ` + item.ip }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onActivated, ref } from 'vue'
import { useServerStore } from '@/store'

const serverStore = useServerStore()
const add = () => {
  serverStore.showServerInfo = true
}
const servers = ref([
  {
    label: '测试环境',
    ip: '106.14.106.74',
  },
  {
    label: '演示环境',
    ip: '106.14.105.52',
  },
  {
    label: '生产环境',
    ip: '119.20.105.102',
  },
  {
    label: '生产环境',
    ip: '119.20.105.122',
  },
])

const activeIndex = ref(0)
const selectItme = (e: number) => {
  activeIndex.value = e
}

onActivated(() => {
  // console.log('--------------- activated ---------------')
})
</script>

<style lang="less" scoped>
.servers-list {
  .servers-header {
    position: sticky;
    top: 0;
    height: 62px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 0 @size-2;
    padding-bottom: 14px;
    box-sizing: border-box;
    z-index: 2;
    // background-color: var(--color-bg-1);
    // border-bottom: 1px solid var(--color-border-1);
  }

  .servers {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .servers-item {
      cursor: pointer;
      position: relative;
      padding-left: 32px;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      font-size: @font-size-body-2;
      border-right: solid 1px var(--color-bg-1);
      box-sizing: border-box;

      &:hover {
        background-color: var(--color-fill-1);
        border-right: solid 2px var(--color-border-4);
      }

      .servers-item-dot {
        position: absolute;
        left: 12px;
        width: @size-2;
        height: @size-2;
        border-radius: @size-2;
      }

      .servers-item-dot--active {
        background-image: linear-gradient(to bottom right, @primary-5, @primary-6, @primary-7);
        // background-image: linear-gradient(to bottom right, #95b9f7, #558ff3);
        // background-image: linear-gradient(to bottom right, @danger-5, @danger-6, @danger-7);
      }

      .servers-item-label {
        width: 176px;
        padding-top: 2px;
        color: var(--color-text-1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .servers-item--active {
      background-color: var(--color-fill-2);
      border-right: solid 2px var(--color-border-4);
    }
  }
}
</style>
