<template>
  <div class="upload-list">
    <div class="header">
      <a-dropdown trigger="hover">
        <a-button size="small" :disabled="uploading">
          <a-space>{{ $t('xsftp.upload.dropdown') }}<icon-down /></a-space>
        </a-button>
        <template #content>
          <a-doption @click="selectFileRef.click()">
            <icon-folder size="15" /> {{ $t('xsftp.upload.dropdown.select-file') }}
            <input @change="selectFile" ref="selectFileRef" type="file" multiple style="display: none" />
          </a-doption>
          <a-doption @click="selectDirRef.click()">
            <icon-drive-file size="15" /> {{ $t('xsftp.upload.dropdown.select-dir') }}
            <input @change="selectDir" ref="selectDirRef" type="file" webkitdirectory multiple style="display: none" />
          </a-doption>
        </template>
      </a-dropdown>
      <a-space>
        <a-popconfirm v-if="list.length && ![0, 1].includes(progress)" position="left" type="warning"
          :content="$t('xsftp.upload.cancel.tip')" @ok="onCancel">
          <a-button size="small">{{ $t('xsftp.upload.cancel') }}</a-button>
        </a-popconfirm>
        <a-button v-else size="small" @click="onCancel">{{ progress == 1 ? $t('xsftp.upload.bcak') :
          $t('xsftp.upload.cancel')
          }}</a-button>
        <a-button :loading="uploading" @click="onUpload" type="primary" size="small">{{
          $t('xsftp.upload.start-uploading')
        }}</a-button>
      </a-space>
    </div>
    <a-table :data="list" :bordered="false" :pagination="false" size="small" :scroll="{ y: 530 }" :scrollbar="false">
      <!-- :virtual-list-props="{height:300}" -->
      <template #columns>
        <a-table-column :title="$t('xsftp.upload.file-name')" data-index="name" align="left" ellipsis tooltip>
          <template #cell="{ record }">
            {{ record.remotePath }}
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.upload.file-size')" data-index="size" align="center" :width="100">
          <template #cell="{ record }">
            {{ record.isDir ? '-' : FormatBytes(record.size) }}
          </template>
        </a-table-column>
        <a-table-column :title="$t('xsftp.upload.status')" data-index="status" align="center" :width="100">
          <template #cell="{ record }">
            <a-progress type="circle" size="mini" :percent="record.percent" />
          </template>
        </a-table-column>
      </template>
    </a-table>
    <div class="progress">
      <a-progress :percent="progress" animation
        :color="{ '0%': 'rgb(var(--primary-6))', '100%': 'rgb(var(--success-6))' }" size="small" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { FormatBytes } from '@/common'
// import { AbortUploadChunkFile, UploadChunkFile } from '../../../rpc'

const props = defineProps({
  list: {
    type: Array<any>,
    default() {
      return []
    },
  },
})

const selectFileRef = ref()
const selectFile = async (e: any) => {
  const list: any[] = []
  for (let i = 0, len = e.target.files.length; i < len; i++) {
    list[i] = e.target.files[i]
    list[i].fullPath = list[i].name
  }
  emit('actions', { t: 'add-upload-files', v: list })
}
const selectDirRef = ref()
const selectDir = async (e: any) => {
  const list: any[] = []
  for (let i = 0, len = e.target.files.length; i < len; i++) {
    list[i] = e.target.files[i]
    list[i].fullPath = list[i].webkitRelativePath
  }
  emit('actions', { t: 'add-upload-files', v: list })
}

const progress: any = ref(0)
const uploading = ref(false)
const onUpload = async () => {
  cancelFlag.value = false
}

// const uploadFileToServer = async (e: any) => { }

const emit = defineEmits(['cancel', 'actions'])
const cancelFlag = ref(false)
const onCancel = () => {
  uploading.value = false
  progress.value = 0
  cancelFlag.value = true
  emit('actions', { t: 'cancelUpload', v: {} })
}

// const onProgress = (id: string, percent: number, status: boolean) => {
//   // 更新单项进度条
//   emit('actions', { t: 'upload-progress', v: { id, percent, status } })
//   // 更新总体进度条
//   const rate = (1 / props.list.length) * 100
//   const index = props.list.findIndex((f: any) => f.id == id)
//   const val = parseFloat(((index * rate + rate * percent) / 100).toFixed(2))
//   progress.value = val
//   // 上传完成后刷新列表
//   if (val == 1) {
//     uploading.value = false
//     emit('actions', { t: 'refresh-list', v: {} })
//   }
// }

watch(
  () => props.list,
  (newVal, _oldVal) => {
    if (newVal.length) progress.value = 0
  }
)
</script>

<style lang="less" scoped>
.upload-list {
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

  .progress {
    padding-top: 10px;
  }
}

:deep(.arco-table-tr) {
  background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
}

:deep(.arco-table-size-small .arco-table-td) {
  font-size: 12px;
  color: var(--color-text-2) !important;
}
</style>
