<template>
  <div class="recycle-list">
    <div class="header">
      <a-space>
        <a-switch type="round" @change="onToggleRecycleBin" :checked-value="1" :unchecked-value="0" v-model:model-value="serverInfo.recycleBin">
          <template #checked-icon>
            <icon-check />
          </template>
          <template #unchecked-icon>
            <icon-close />
          </template>
          <template #checked> {{ $t('xsftp.recycle.on') }} </template>
          <template #unchecked> {{ $t('xsftp.recycle.off') }} </template>
        </a-switch>
      </a-space>
      <a-space>
        <a-button size="small" @click="onCancel"> {{ $t('xsftp.recycle.back') }} </a-button>
        <a-popconfirm position="left" type="warning" content="$t('xsftp.recycle.clear-tip')" @ok="onClear">
          <a-button type="primary" status="danger" size="small"> {{ $t('xsftp.recycle.clear') }} </a-button>
        </a-popconfirm>
      </a-space>
    </div>
    <a-table :loading="loading" :data="list" :bordered="false" :pagination="false" size="small" :scroll="{ y: 570 }" :scrollbar="false">
      <template #columns>
        <a-table-column
          :title="$t('xsftp.recycle.file-name')"
          data-index="name"
          ellipsis
          tooltip
          :filterable="{
            filter: (value, record) => record.name.includes(value),
            slotName: 'name-filter',
            icon: () => h(IconSearch),
          }"
        >
          <template #cell="{ record }">
            <span :class="[record.isDir ? 'folder' : 'unfolder', 'name']">
              <icon-folder v-if="record.isDir" size="15" />
              <icon-drive-file v-else size="15" />
              {{ record.name }}
            </span>
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.recycle.origin-path')" data-index="originPath" ellipsis tooltip>
          <template #cell="{ record }">{{ record.originPath }} </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.recycle.file-size')" data-index="size" align="center" :sortable="{ sortDirections: ['descend'] }" :width="100">
          <template #cell="{ record }">
            {{ record.isDir ? '-' : FormatBytes(record.size) }}
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.recycle.del-date')" data-index="size" align="center" :sortable="{ sortDirections: ['descend'] }" :width="140">
          <template #cell="{ record }">{{ record.deleteDate }}</template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.recycle.op')" data-index="status" align="center" :width="80">
          <template #cell="{ record }">
            <a-dropdown @select="(t) => onActions({ t, v: record })">
              <a-button type="text" size="mini"><icon-more class="icon-more" /></a-button>
              <template #content>
                <a-doption value="del">
                  <template #icon><icon-delete /></template> {{ $t('xsftp.recycle.op.delete') }}
                </a-doption>
                <a-doption value="redo">
                  <template #icon><icon-redo /></template> {{ $t('xsftp.recycle.op.restore') }}
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
import { onMounted, h, ref, inject } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
// import { GetRecycleList, OptionRecycleBin, ToggleRecycleBin } from '../../../rpc'
import { FormatBytes } from '@/common'

const serverInfo: any = inject('serverInfo')

const emit = defineEmits(['cancel', 'actions'])
const onCancel = () => {
  emit('actions', { t: 'cancelUpload', v: {} })
}
// 清空回收站文件
const onClear = async () => {
  loading.value = true
  // const params = {
  //   serverId: serverInfo.value.id,
  //   type: 'clear',
  // }
  // const { code } = await OptionRecycleBin(params)
  // if (code == 200) list.value = []
  loading.value = false
}
// 删除/恢复回收站文件
const onActions = async (e: any) => {
  loading.value = true
  // const { t, v } = e
  // const { id, serverId } = v
  // const params = {
  //   id,
  //   serverId,
  //   type: t,
  // }
  // const { code } = await OptionRecycleBin(params)
  // if (code == 200) {
  //   const index = list.value.findIndex((f: any) => f.id == id)
  //   list.value.splice(index, 1)
  // }
  loading.value = false
}

// 开启/关闭回收站功能
const onToggleRecycleBin = async (e: any) => {
  // const serverId = serverInfo.value.id
  // await ToggleRecycleBin(serverId, e)
}

const list = ref([])
const loading = ref(false)
const getData = async () => {
  // const { code, data } = await GetRecycleList(serverInfo.value.id)
  // if (code == 200) list.value = data
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.recycle-list {
  position: relative;
  padding: 10px;
  width: calc(100% - 20px);
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    .options {
      display: flex;
    }
  }
  .icon-more {
    font-size: 16px;
    color: var(--color-text-1);
  }
}
.filter-name {
  padding: 10px 12px;
  background-color: var(--color-bg-1);
  border-radius: var(--border-radius-small);
}
.name {
  cursor: pointer;
  font-size: 13px;
  &:hover {
    color: rgb(var(--primary-6));
  }
}
.folder {
  color: rgb(var(--primary-4));
}
.unfolder {
  color: var(--color-text-2);
}
:deep(.arco-table-tr) {
  background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
}
:deep(.arco-table-size-small .arco-table-td) {
  font-size: 12px;
  color: var(--color-text-2) !important;
}
</style>
