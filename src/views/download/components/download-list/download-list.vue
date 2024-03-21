<template>
  <div class="download-list">
    <div class="download-header" data-tauri-drag-region>
      <a-space class="left">
        <Radio v-model:status="status" :total="tabelData.length" :check="selectedKeys.length" @toggle="checkAll" />
        <div v-if="selectedKeys.length">已选 {{ selectedKeys.length }} 项</div>
        <div v-else>共 {{ tabelData.length }} 项</div>
        <!-- · 已下载79% -->
      </a-space>
      <a-space class="right">
        <a-button size="mini" @click="initData">
          <template #icon>
            <icon-caret-right />
          </template>
          加载数据
        </a-button>
        <a-button size="mini" @click="onActions({ t: `allStart`, v: {} })">
          <template #icon>
            <icon-caret-right />
          </template>
          {{ [`全部开始`, `开始`, `全部开始`][status] }}
        </a-button>
        <a-button size="mini" @click="onActions({ t: `allStop`, v: {} })">
          <template #icon>
            <icon-pause />
          </template>
          {{ [`全部暂停`, `暂停`, `全部暂停`][status] }}
        </a-button>
        <a-button size="mini" @click="onActions({ t: `allDel`, v: {} })">
          <template #icon>
            <icon-close />
          </template>
          {{ [`全部取消`, `取消`, `全部取消`][status] }}
        </a-button>
      </a-space>
    </div>
    <div class="download-content" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onMouseup"
      @mouseleave="onMouseup">
      <a-table ref="tableRef" v-model:selectedKeys="selectedKeys" @row-click="onRowClick" :data="tabelData" row-key="id"
        size="small" :virtual-list-props="{ height: 662 }" :pagination="false" :bordered="false">
        <template #columns>
          <a-table-column title="名称">
            <template #cell="{ record }">
              <div :id="record.id" class="record-id">
                <FileItemName :name="record.name" class="name" />
                <FileItemOption @actions="onActions" :value="record" class="options" />
              </div>
            </template>
          </a-table-column>
          <a-table-column title="大小" :width="160">
            <template #cell="{ record }">
              <div class="size">{{ FormatBytes(record.downLoadSize) }} / {{ FormatBytes(record.size) }}</div>
            </template>
          </a-table-column>
          <a-table-column title="状态" :width="200">
            <template #cell="{ record }">
              <a-progress :percent="progressPercent(record)" track-color="var(--color-fill-3)"
                :color="['var(--color-neutral-5)', 'rgb(var(--primary-6))'][record.status]" />
            </template>
          </a-table-column>
        </template>
        <!-- <template #empty></template> -->
      </a-table>
      <!-- <a-empty v-if="!tabelData.length" class="empty" /> -->
      <div class="region" :style="regionStyle"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onActivated, ref } from 'vue'
import { Debounce, FormatBytes } from '@/common'
import { ExtensionMap } from '@/assets/icons'
import Radio from '@/components/radio/radio.vue'
import FileItemName from '../file-item-name/file-item-name.vue'
import FileItemOption from '../file-item-option/file-item-option.vue'

const status = ref(0)
const checkAll = (e: any) => {
  e ? tableRef.value.selectAll() : (selectedKeys.value = [])
}

const tableRef = ref()
const tabelData = ref<any>([])
const initData = () => {
  tabelData.value = [
    {
      id: '1',
      name: 'Rob.&.Roll.2024.1080p.WEB-DL.H264.AAC国粤双语-yiih.mkv',
      downLoadSize: 302465335,
      size: 6803986389,
      status: 0,
    },
    {
      id: '2',
      name: '阿里云盘扩容福利码1200枚.txt',
      downLoadSize: 55123621,
      size: 212136211,
      status: 0,
    },
  ]
  const exts = Object.keys(ExtensionMap)
  for (let i = 6; i < 50; i++) {
    tabelData.value.push({
      id: i.toString(),
      name: `${i}.${exts[Math.floor(Math.random() * 60)]}`,
      downLoadSize: 12723621 * i * i,
      size: 51236211 * i * i,
      status: i % 2,
    })
  }
}

const progressPercent = (e: { size: number; downLoadSize: number }) => {
  const { size, downLoadSize } = e
  return parseFloat((downLoadSize / size).toFixed(2))
}

const onActions = (e: any) => {
  const { t, v } = e
  switch (t) {
    case `status`:
      downloadItem(v, [1, 0][v.status])
      break
    case `del`:
      delItem(v)
      break
    case `allDel`:
      if (selectedKeys.value.length) {
        selectedKeys.value.forEach((id: any) => delItem({ id }))
      } else {
        tabelData.value = []
      }
      selectedKeys.value = []
      break
    case `allStart`:
      if (status.value == 1) {
        selectedKeys.value.forEach((id: any) => {
          downloadItem({ id }, 1)
        })
      } else {
        tabelData.value.forEach((td: any) => downloadItem(td, 1))
      }
      break
    case `allStop`:
      if (status.value == 1) {
        selectedKeys.value.forEach((id: any) => {
          downloadItem({ id }, 0)
        })
      } else {
        tabelData.value.forEach((td: any) => downloadItem(td, 0))
      }
      // else tabelData.value.forEach((td: any) => (td.status = 0))
      break
    case `finder`:
      break
    default:
  }
}

const downloadItem = (e: any, s: number) => {
  const rowIndex = tabelData.value.findIndex((td: any) => td.id == e.id)
  tabelData.value[rowIndex].status = s
  // TODO Start DownLoad Or Stop DownLoad
}

const delItem = (e: any) => {
  const rowIndex = tabelData.value.findIndex((td: any) => td.id == e.id)
  tabelData.value.splice(rowIndex, 1)
  // TODO Del Item
}

/** ------------ 表格行的快捷操作 ------------ **/
const ctrlIndex = ref<number>(0)
const shiftIndex = ref<number>(-1)
const selectedKeys = ref<any>([])
const onRowClick = (r: any, e: any) => {
  const { ctrlKey, metaKey, shiftKey } = e
  // 按下shift键
  if (shiftKey) {
    // 1. 第一轮去除状态
    let startPointIndex = ctrlIndex.value
    let endIndex = shiftIndex.value
    if (endIndex > -1 && startPointIndex != endIndex) {
      if (startPointIndex > endIndex) [startPointIndex, endIndex] = [endIndex, startPointIndex]
      for (let i = startPointIndex; i <= endIndex; i++) {
        const valueIndex = selectedKeys.value.indexOf(tabelData.value[i].id)
        selectedKeys.value.splice(valueIndex, 1)
      }
    }
    // 2. 第二轮添加状态
    shiftIndex.value = tabelData.value.findIndex((td: { id: any }) => td.id == r.id)
    startPointIndex = ctrlIndex.value
    endIndex = shiftIndex.value
    if (startPointIndex > endIndex) [startPointIndex, endIndex] = [endIndex, startPointIndex]
    for (let i = startPointIndex; i <= endIndex; i++) {
      if (!selectedKeys.value.includes(tabelData.value[i].id)) {
        selectedKeys.value.push(tabelData.value[i].id)
      }
    }
  }
  //  按下ctrl键
  else if (ctrlKey || metaKey) {
    const valueIndex = selectedKeys.value.indexOf(r.id)
    if (valueIndex > -1) {
      selectedKeys.value.splice(valueIndex, 1)
      if (selectedKeys.value.length > 1) {
        const val = selectedKeys.value[selectedKeys.value.length - 1]
        ctrlIndex.value = tabelData.value.findIndex((td: { id: any }) => td.id == val)
        shiftIndex.value = ctrlIndex.value
      }
    } else {
      ctrlIndex.value = tabelData.value.findIndex((td: { id: any }) => td.id == r.id)
      shiftIndex.value = ctrlIndex.value
      selectedKeys.value.push(r.id)
    }
  }
  // 未按键盘
  else {
    ctrlIndex.value = tabelData.value.findIndex((td: { id: any }) => td.id == r.id)
    selectedKeys.value = []
    selectedKeys.value.push(r.id)
  }
}

// 鼠标起点
const startPoint = ref({
  x: 0,
  y: 0,
})
// 圈选区域样式
const regionStyle = ref({
  top: '0px',
  left: '0px',
  width: '0px',
  height: '0px',
})

const mousedown = ref(false)
const onMousedown = (e: any) => {
  const { pageX, pageY } = e
  startPoint.value.x = pageX
  startPoint.value.y = pageY
  mousedown.value = true
}

const caclcell = ref(false)
const cellList = ref<any>([])
const onMousemove = (e: any) => {
  caclScrollTop()
  if (!mousedown.value) return false
  const { pageX, pageY } = e
  if (!caclcell.value && pageX != startPoint.value.x && pageY != startPoint.value.y) {
    caclcell.value = true
    cellList.value = []
    // +2为了预防表格被region遮挡导致onRowClick不触发
    regionStyle.value.top = `${startPoint.value.y + 2}px`
    regionStyle.value.left = `${startPoint.value.x}px`

    // 首次拖拽需要计算表格行坐标与行ID
    document.querySelectorAll('.arco-table-tr').forEach((el, _index) => {
      if (el.getElementsByClassName(`record-id`).length) {
        const id = el.getElementsByClassName(`record-id`)[0].id
        const rect = el.getClientRects()[0]
        cellList.value.push({ id, rect })
      }
    })
  }
  if (caclcell.value && cellList.value.length) {
    const region = {
      x: Math.min(startPoint.value.x, pageX),
      y: Math.min(startPoint.value.y, pageY),
      width: Math.abs(pageX - startPoint.value.x),
      height: Math.abs(pageY - startPoint.value.y),
    }
    selectedKeys.value = []
    cellList.value.forEach((c: any) => {
      if (collide(c.rect, region) && !selectedKeys.value.includes(c.id)) {
        selectedKeys.value.push(c.id)
      }
    })
  }
  // 当前鼠标移动的位置减开始位置得到区域块宽高
  const x = pageX - startPoint.value.x
  const y = pageY - startPoint.value.y + 2 // +2为了预防表格被region遮挡导致onRowClick不触发
  regionStyle.value.width = `${Math.abs(x)}px`
  regionStyle.value.height = `${Math.abs(y)}px`

  // 鼠标移动的位置小于开始位置，当前鼠标的位置是区域块的位置
  if (x < 0) {
    regionStyle.value.left = pageX + 'px'
  }

  if (y < 0) {
    regionStyle.value.top = pageY + 'px'
  }
}

const onMouseup = (_e: any) => {
  /* ------- 初始化画框配置 ------- */
  caclcell.value = false
  mousedown.value = false
  startPoint.value = {
    x: 0,
    y: 0,
  }
  regionStyle.value = {
    top: '0px',
    left: '0px',
    width: '0px',
    height: '0px',
  }
}

// 比较checkbox盒子边界和遮罩层边界最大最小值
const collide = (rect1: any, rect2: { x: number; width: any; y: number; height: any }) => {
  const maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width)
  const maxY = Math.max(rect1.y + rect1.height, rect2.y + rect2.height)
  const minX = Math.min(rect1.x, rect2.x)
  const minY = Math.min(rect1.y, rect2.y)
  return maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height
}

const scrollTop = ref(0)
const caclScrollTop = () => {
  Debounce(() => {
    const tableBox = document.querySelector('.arco-table-body')
    scrollTop.value = tableBox!.scrollTop
  })()
}
onActivated(() => {
  const tableBox = document.querySelector('.arco-table-body')
  tableBox!.scrollTop = scrollTop.value
})
</script>

<style lang="less" scoped>
.download-list {
  position: relative;

  .download-header {
    position: sticky;
    top: 0;
    height: 62px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding: 0 12px;
    padding-bottom: 14px;
    box-sizing: border-box;
    z-index: 2;

    .left {
      font-size: 12px;
      color: var(--color-text-2);
    }

    // .right {}
  }

  .download-content {
    position: relative;
    padding: 0 12px;

    .empty {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 248px;
    }

    .region {
      position: fixed;
      z-index: 10;
      border: 1px solid rgb(var(--primary-6));
      background-color: rgba(0, 148, 255, 0.1);
    }

    .record-id {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        width: calc(100% - 120px);
      }

      .options {
        opacity: 0;
      }
    }

    .size {
      font-size: 11.5px;
      color: var(--color-text-2);
    }

    .progress {
      position: relative;
      padding-top: 10px;

      .text {
        position: absolute;
        top: 2px;
        font-size: 11px;
        color: var(--color-text-3);
      }
    }

    :deep(.arco-table-th) {
      font-size: 13px;
      line-height: 26px;
      background: none;
      border-top: solid 1px var(--color-border);
      border-bottom: solid 1px var(--color-border);
    }

    :deep(.arco-table-header) {
      background: none;
    }

    :deep(.arco-table-body) {
      background-color: transparent !important;
    }

    :deep(.arco-table-td) {
      background: none;
    }

    :deep(.arco-table-tr-checked .arco-table-td) {
      background-color: var(--color-fill-2);
    }

    :deep(.arco-table-tr:hover) {
      .options {
        opacity: 1;
        transition: all 0.1s cubic-bezier(0, 0, 1, 1);
      }
    }
  }
}
</style>
