<template>
  <div ref="scrollRef" @scroll="onScroll" class="deploy-timeline">
    <a-timeline v-bind="deployPending" mode="alternate">
      <a-watermark v-bind="watermarkCfg" content="部署历史">
        <a-timeline-item v-for="item in deployLogList" :key="item.id" @click="onSelectLog(item)" :dotColor="['#00B42A', '#F53F3F'][item.status]">
          <a-popover trigger="click" position="top">
            <div class="timeline-item-content">
              <div class="timeline-item-title">
                {{ item.message }}
              </div>
              <div class="timeline-item-time">
                {{ item.time }}
              </div>
            </div>
            <template #content>
              <div class="item-info">
                <div class="item-rows">
                  <div class="item-label">ID</div>
                  <a-tag size="small" class="item-value">
                    98aa4bfa24e
                    <template #icon>
                      <icon-copy />
                    </template>
                  </a-tag>
                </div>
                <a-divider :margin="16" />
                <div class="item-rows">
                  <div class="item-label">主机</div>
                  <div class="item-value">
                    <span>{{ servers.join(' , ') }}</span>
                  </div>
                </div>
                <a-divider :margin="12" />
                <a-space fill class="item-actions">
                  <icon-storage />
                  <icon-thunderbolt />
                  <icon-delete />
                </a-space>
              </div>
            </template>
          </a-popover>
        </a-timeline-item>
      </a-watermark>
    </a-timeline>
  </div>
</template>

<script lang="ts" setup>
import { onActivated, ref } from 'vue'
import { Debounce } from '@/common'

const deployPending = ref({
  pending: 'feat: 布局修改layout-v2',
  reverse: true,
})
const deployLogList = ref([
  {
    id: 'c3ff57',
    time: '2017-05-22 10:22:32:32',
    status: 0,
    message: 'refactor: 修改部分样式',
  },
  {
    id: 'f654ff',
    time: '2017-05-22 10:25:32:32',
    status: 0,
    message: 'refactor: 应用列表重新布局',
  },
  {
    id: '67916a',
    time: '2017-05-23 09:22:32:32',
    status: 0,
    message: 'refactor: xterm无法引入i18n，修改使用方式',
  },
  {
    id: '7a20b6',
    time: '2017-05-27 19:32:32',
    status: 0,
    message: 'refactor: 修改了部分样式',
  },
  {
    id: 'a1e0b0',
    time: '2017-05-28 10:02:32',
    status: 1,
    message: 'refactor: merge split code',
  },
  {
    id: '1bab52',
    time: '2017-06-02 12:02:32',
    status: 0,
    message: 'feat: applications-page',
  },
  {
    id: 'c5a1b4',
    time: '2017-06-03 22:02:32',
    status: 0,
    message: 'refator: 修改拖拽结束事件',
  },
  {
    id: '7c1c2b',
    time: '2017-06-05 12:52:32',
    status: 1,
    message: 'fixs: 修复bug 当仅剩一个窗口时不需要重新布局',
  },
  {
    id: 'c5a2e4',
    time: '2017-06-08 14:53:32',
    status: 0,
    message: 'refactor: 存在窗口交互bug',
  },
])

const servers = ref(['127.17.17.17', '47.0.22.132', '153.0.110.27'])

const watermarkCfg: any = ref({
  font: { fontSize: 16 },
  offset: [Math.floor(Math.random() * 800), Math.floor(Math.random() * 500)],
  gap: [520, 320],
  zIndex: 1,
})

const showPanel = ref(false)
const onSelectLog = (e: any) => {
  showPanel.value = true
}

const scrollRef = ref()
const scrollTop = ref(0)
const onScroll = (e: any) => {
  Debounce(() => (scrollTop.value = e.target.scrollTop))()
}

onActivated(() => {
  scrollRef.value.scrollTop = scrollTop.value
})
</script>

<style lang="less" scoped>
.deploy-timeline {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 12px;
  box-sizing: border-box;

  .timeline-item-content {
    display: inline-block;
    box-sizing: border-box;

    .timeline-item-title {
      padding-bottom: 4px;
      font-size: 13px;
      color: var(--color-text-1);
    }

    .timeline-item-time {
      font-size: 12px;
      line-height: 20px;
      color: var(--color-text-3);
    }
  }
}

.item-info {
  .item-actions {
    padding-top: 12px;
    justify-content: end;

    svg {
      padding: 8px;
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

  .item-rows {
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item-label {
    width: 48px;
    font-size: 12px;
    color: var(--color-text-1);
  }

  .item-value {
    cursor: pointer;
    font-size: 11px;
    line-height: 24px;
    color: var(--color-text-2);

    &:hover {
      color: var(--color-text-1);
    }
  }
}

:deep(.arco-timeline-item-dot-custom) {
  background-color: var(--color-bg-1);
}

:deep(.arco-timeline-item-content-wrapper) {
  cursor: pointer;
}

:deep(.arco-timeline-item-dot-line) {
  display: block !important;
}
</style>
