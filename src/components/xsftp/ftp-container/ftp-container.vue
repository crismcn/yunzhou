<template>
  <div class="xsftp-list">
    <a-table :data="list" :bordered="false" :loading="loading" :pagination="false" size="small" :scroll="{ y: 570 }" :scrollbar="false">
      <!-- :virtual-list-props="{height:570}" -->
      <template #columns>
        <a-table-column
          :title="$t('xsftp.ftp.file-name')"
          data-index="name"
          :filterable="{
            filter: (value, record) => record.name.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch),
          }"
          ellipsis
        >
          <template #cell="{ record, rowIndex }">
            <NameInput :value="record" :edit="rowIndex == renameIndex" @actions="onActions" @blur="renameIndex = -1"></NameInput>
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.ftp.file-zize')" data-index="size" :sortable="{ sortDirections: ['descend'] }" align="center" :width="100">
          <template #cell="{ record }">
            {{ record.isDir ? '-' : FormatBytes(record.size) }}
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.ftp.file-mode')" data-index="mode" align="center" :width="120">
          <template #cell="{ record }">
            {{ record.mode }}
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.ftp.file-modify-time')" data-index="modTime" :sortable="{ sortDirections: ['descend'] }" align="center" :width="180">
          <template #cell="{ record }">
            {{ record.modTime }}
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.ftp.op')" align="center" :width="80">
          <template #cell="{ record, rowIndex }">
            <!-- TODO DEV -->
            <a-progress :steps="5" size="small" style="line-height: 24.8px" :percent="10" v-if="record.stamp" />
            <a-dropdown>
              <a-button type="text" size="mini" :style="{ display: record.stamp ? 'none' : '' }"><icon-more class="icon-more" /></a-button>
              <template #content>
                <a-doption value="delete" @click="onActions({ t: 'delete', v: record })"
                  ><template #icon><icon-delete /></template> {{ $t('xsftp.ftp.op.delete') }}
                </a-doption>
                <a-doption value="compress" @click="onActions({ t: 'compress', v: record })" v-if="record.isDir"
                  ><template #icon><icon-layers /></template> {{ $t('xsftp.ftp.op.compress') }}
                </a-doption>
                <a-doption value="download" @click="onActions({ t: 'download', v: record })" v-else
                  ><template #icon><icon-download /></template> {{ $t('xsftp.ftp.op.download') }}
                </a-doption>
                <a-doption value="copy" @click="onActions({ t: 'copy', v: record })"
                  ><template #icon><icon-copy /></template> {{ $t('xsftp.ftp.op.copy') }}
                </a-doption>
                <a-doption value="clip" @click="onActions({ t: 'clip', v: record })"
                  ><template #icon><icon-scissor /></template> {{ $t('xsftp.ftp.op.clip') }}
                </a-doption>
                <a-doption value="rename" @click="setRenameIndex(rowIndex)"
                  ><template #icon><icon-edit /></template> {{ $t('xsftp.ftp.op.rename') }}
                </a-doption>
              </template>
            </a-dropdown>
          </template>
        </a-table-column>
      </template>
      <template #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
        <div class="filter-name">
          <a-input-search :model-value="filterValue[0]" @input="(value: any) => setFilterValue([value])" @change="handleFilterConfirm" @clear="handleFilterReset" size="small" style="width: 320px" allow-clear search-button />
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import NameInput from '../name-input/name-input.vue'
import { FormatBytes } from '@/common'
// import { useStorageStore } from '../../../store'

const props = defineProps({
  data: {
    type: Array<any>,
    default() {
      return []
    },
  },
  loading: {
    type: Boolean,
    default() {
      return false
    },
  },
})

// const storageStore = useStorageStore()
const list = computed(() => {
  return props.data.sort(sortRule)
})

const sortRule = (a: any, b: any) => {
  var nameA = a.name.toUpperCase()
  var nameB = b.name.toUpperCase()
  var typeA = a.isDir
  var typeB = b.isDir
  // 如果名称相同，则比较类型
  if (typeA < typeB) {
    return 1 // 如果 a 的类型小于 b 的类型，则 a 在 b 前面
  }
  if (typeA > typeB) {
    return -1 // 如果 a 的类型大于 b 的类型，则 a 在 b 后面
  }
  if (nameA < nameB) {
    return -1 // 如果 a 的名称小于 b 的名称，则 a 在 b 前面
  }
  if (nameA > nameB) {
    return 1 // 如果 a 的名称大于 b 的名称，则 a 在 b 后面
  }
  return 0 // 如果名称和类型都相同，则保持原有顺序
}

const emit = defineEmits(['actions'])
const onActions = (e: any) => {
  const { t, v } = e
  emit('actions', { t, v })
}

const renameIndex = ref(-1)
const setRenameIndex = (i: number) => {
  renameIndex.value = i
}
</script>

<style lang="less" scoped>
.xsftp-list {
  position: relative;
  width: 100%;
  padding-top: 10px;
}
.filter-name {
  padding: 10px 12px;
  background-color: var(--color-bg-1);
  border-radius: var(--border-radius-small);
}
.icon-more {
  font-size: 16px;
  color: var(--color-text-1);
}
:deep(.arco-table-tr) {
  background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
}
:deep(.arco-table-size-small .arco-table-td) {
  font-size: 12px;
}
</style>
