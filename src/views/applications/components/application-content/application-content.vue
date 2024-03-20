<template>
  <div class="application-content" v-if="applicationStore.applicationInfo">
    <div class="application-header">
      <div class="flex-row" data-tauri-drag-region>
        <a-space>
          <div class="application-header-title">AIoT-Admin</div>
          <a-tag checkable :default-checked="false">应用平台界面</a-tag>
        </a-space>
        <a-space class="application-header-actions" size="mini">
          <deployActionServer />
          <deployAction />
          <icon-edit @click="showApplicationInfo" />
          <a-popconfirm :content="`确定删除应用吗?`" type="error">
            <icon-delete />
          </a-popconfirm>
        </a-space>
      </div>
      <div class="flex-row">
        <a-space class="application-header-item">
          <div>路径：</div>
          <div class="application-reveal-path">D:\WorkSpace\AIoT-Web\Server</div>
        </a-space>
        <a-space class="application-header-item">
          <div>部署次数:</div>
          <div>192</div>
        </a-space>
      </div>
    </div>
    <div class="application-content-body">
      <deployList />
    </div>
    <applicationInfo v-model:visible="applicationStore.showApplicationInfo" />
  </div>
  <a-empty class="empty" v-else />
</template>

<script lang="ts" setup>
import deployAction from '../deploy-action/deploy-action.vue'
import deployActionServer from '../deploy-action-server/deploy-action-server.vue'
import deployList from '../deploy-list/deploy-list.vue'
import applicationInfo from '../application-info/application-info.vue'

import { useApplicationStore } from '@/store'

const applicationStore = useApplicationStore()
const showApplicationInfo = () => {
  applicationStore.showApplicationInfo = true
}
</script>

<style lang="less" scoped>
.application-content {
  height: 100vh;
  position: relative;

  .application-header {
    height: 100px;
    box-sizing: border-box;

    .flex-row {
      padding: 0 12px;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;

      .application-header-title {
        padding: 6px 12px;
        font-size: 16px;
        color: var(--color-text-1);
        border-radius: 2px;
        box-sizing: border-box;
        background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
      }

      .application-header-actions {
        // border-radius: 50px;
        // border-bottom: solid 1px var(--color-neutral-2);

        svg {
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
      }

      .application-header-item {
        padding: 0 12px;
        font-size: 12px;
        color: var(--color-text-2);

        .application-reveal-path {
          cursor: pointer;
          padding: 2px 4px;
          color: var(--color-text-3);
          // border-radius: 2px;
          // background-image: linear-gradient(to bottom right,
          //     var(--color-bg-1),
          //     var(--color-neutral-1));
        }
      }
    }
  }

  .application-content-body {
    height: calc(100% - 100px);
    box-sizing: border-box;
  }
}

.empty {
  padding-top: 40vh;
}
</style>
