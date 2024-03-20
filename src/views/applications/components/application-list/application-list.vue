<template>
  <div class="application-list">
    <div class="application-header" data-tauri-drag-region>
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
      <div class="applications">
        <div class="application-item" @click="selectItme(index)" v-for="(item, index) in applications" :key="item.name" :class="{ 'application-item--active': activeIndex == index }">
          <div class="application-dot" :class="{ 'application-dot--active': activeIndex == index }"></div>
          <div class="application-label">{{ item.name }}</div>
          <div class="application-describ">{{ item.describ }}</div>
        </div>
        <a-empty class="empty" description=" " v-show="applications.length == 0">
          <template #image>
            <icon-layers />
          </template>
        </a-empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useApplicationStore } from '@/store'

const applicationStore = useApplicationStore()

const applications = ref([
  {
    name: 'AIoT-Admin',
    describ: '应用平台界面',
  },
  {
    name: 'AIoT-Admin-Api',
    describ: '应用平台接口',
  },
  {
    name: 'EEOP-Admin',
    describ: '运营平台界面',
  },
  {
    name: 'EEOP-Admin-Api',
    describ: '运营平台接口xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  {
    name: 'DEVOPS-Admin',
    describ: '运维平台界面',
  },
  {
    name: 'DEVOPS-Admin-Api',
    describ: '运维平台接口',
  },
])

const activeIndex = ref(-1)
const selectItme = (e: number) => {
  activeIndex.value = e
  applicationStore.applicationInfo = applications.value[e]
}

const add = () => {
  applicationStore.applicationInfo = { name: '' }
  applicationStore.showApplicationInfo = true
}
</script>

<style lang="less" scoped>
.application-list {
  .application-header {
    position: sticky;
    top: 0;
    height: 62px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 0 @size-2;
    padding-bottom: 14px;
    box-sizing: border-box;
    // background-color: var(--color-bg-1);
    z-index: 2;
    // border-bottom: 1px solid var(--color-border-1);
  }

  .applications {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .application-item {
      cursor: pointer;
      position: relative;
      padding-left: 32px;
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: @font-size-body-2;
      border-right: solid 1px var(--color-bg-1);
      box-sizing: border-box;

      &:hover {
        background-color: var(--color-fill-1);
        border-right: solid 2px var(--color-border-4);
      }

      .application-dot {
        position: absolute;
        left: 12px;
        width: @size-2;
        height: @size-2;
        border-radius: @size-2;
      }

      .application-dot--active {
        background-image: linear-gradient(to bottom right, @primary-5, @primary-6, @primary-7);
      }

      .application-label {
        width: 176px;
        padding-top: 2px;
        color: var(--color-text-1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .application-describ {
        width: 176px;
        padding-top: 2px;
        font-size: 11px;
        color: var(--color-text-2);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .application-item--active {
      background-color: var(--color-fill-2);
      border-right: solid 2px var(--color-border-4);
    }
  }

  .empty {
    width: 240px;
    padding-top: 200px;
  }
}
</style>
