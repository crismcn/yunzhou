<template>
  <div id="xsftp" ref="dragRef" @drop="handleDrop" @dragleave="onDragLeave" @dragenter="onDragOver" @dragover="onDragOver" class="xsftp-box">
    <div class="xsftp-header">
      <PathTrail v-model="routes" @change="cdDir"></PathTrail>
      <ToolsBar @actions="onActions"></ToolsBar>
    </div>
    <div class="xsftp-list">
      <FtpContainer :data="listData" :loading="loading" @actions="onActions"></FtpContainer>
    </div>
    <div id="dragBox" :class="['drag-box', dragMask || traverseLoading ? 'drag-hover' : 'drag-leave']">
      {{ dragMask ? $t('xsftp.drag.tip') : '' }}
      <a-spin v-if="traverseLoading" :tip="$t('xsftp.loading.tip')" style="color: white" />
    </div>

    <!-- 弹窗会话框 -->
    <a-drawer popup-container="#container" placement="bottom" :visible="visible == 'openUploader'" :footer="false" :height="709" @cancel="visible = false" style="z-index: 2">
      <template #title> {{ $t('xsftp.upload-to.tip') }} 【 {{ pathRoute }} 】 </template>
      <div>
        <UploadList :list="uploadFileList" @actions="onActions"></UploadList>
      </div>
    </a-drawer>
    <a-drawer popup-container="#container" placement="bottom" :title="$t('xsftp.recycle.tip')" :visible="visible == 'openRecycleBin'" :footer="false" :height="709" @cancel="visible = false" style="z-index: 2">
      <div>
        <RecycleBin v-if="visible == 'openRecycleBin'" @actions="onActions"></RecycleBin>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { inject, provide, ref } from 'vue'
import { Notification } from '@arco-design/web-vue'
import PathTrail from './path-trail/path-trail.vue'
import ToolsBar from './tools-bar/tools-bar.vue'
import FtpContainer from './ftp-container/ftp-container.vue'
import UploadList from './upload-list/upload-list.vue'
import RecycleBin from './recycle-bin/recycle-bin.vue'
import { GUID, TraverseFiles } from '@/common'

const props = defineProps({
  sftpId: {
    type: String,
    default() {
      return ''
    },
  },
  serverId: {
    type: String,
    default() {
      return ''
    },
  },
})

const listData = ref([])
const loading = ref(false)
const getListData = async () => {
  loading.value = true
  listData.value = []
  loading.value = false
}

const pathRoute = ref()
// const routes = ref<any[]>(["/"]);
const routes: any = inject('routes')

const onActions = (e: any) => {
  const { t, v }: { t: string; v: any } = e
  switch (t) {
    case 'cd':
      routes.value.push(v)
      break
    case 'delete':
      deleteFile(v)
      break
    case 'rename':
      onRename(v)
      break
    case 'compress':
      onCompress(v)
      break
    case 'download':
      onDownload(v)
      break
    case 'copy':
    case 'clip':
      onCopy(t, v)
      break
    case 'pasteFile':
      onPaste()
      break
    case 'openUploader':
    case 'openRecycleBin':
      visible.value = t
      break
    case 'cancelUpload':
      cancelUpload()
      break
    case 'closeSftp':
      closeSftp()
      break
    case 'closeRecycleBin':
      visible.value = false
      break
    case 'upload-progress':
      onProgress(v)
      break
    case 'add-upload-files':
      addUploadFiles(v)
      break
    case 'refresh-list':
      getListData()
      break
    default:
      break
  }
}

const cdDir = (e: string) => {
  pathRoute.value = e
  getListData()
}

/* ------------------------ 拖拽 ---------------------------- */
const dragMask = ref(false)
const traverseLoading = ref(false)
const handleDrop = async (e: any) => {
  e.preventDefault()
  dragMask.value = false
  const items = e.dataTransfer.items
  traverseLoading.value = true
  const { dirList, fileList }: any = await TraverseFiles(items)
  const list = [...dirList, ...fileList]
  if (list.length > 1000) {
    Notification.warning({
      title: '上传提示',
      content: `上传文件数量过多(共${list.length}个文件)，建议压缩后上传！`,
    })
    // console.log("文件太多，建议压缩后上传！", list.length)
    traverseLoading.value = false
    return
  }

  const files: any = await Promise.all(
    list.map((item: any) => {
      let remotePath = pathRoute.value + item.fullPath
      if (remotePath[0] == remotePath[1]) remotePath = remotePath.slice(1)
      return {
        id: GUID(),
        sftpId: props.sftpId,
        isDir: item.isDirectory,
        name: item.name,
        size: !item.isDirectory ? item.size : 0,
        remotePath,
        data: item,
        percent: 0,
      }
    })
  )

  traverseLoading.value = false
  uploadFileList.value = files
  visible.value = 'openUploader'
}
const onDragLeave = (e: any) => {
  if (e.target.id == 'dragBox') dragMask.value = false
  // @TIP 该语句不安全： 在MacOs下 e.relatedTarget永远为null
  // if (!e.currentTarget.contains(e.relatedTarget)) dragMask.value = false;
  // @TIP 该语句无法监听ESC按键松开
  // // 获取目标元素的位置信息
  // const { clientX, clientY } = e;
  // // 检查鼠标位置是否在目标元素外部
  // const { left, right, top, bottom } = e.target.getBoundingClientRect();
  // if (clientX < left || clientX > right - 10 || clientY < top || clientY > bottom - 10) {
  //   dragMask.value = false;
  // }
  e.preventDefault()
}
const onDragOver = (e: any) => {
  dragMask.value = true
  e.preventDefault()
}

/* ------------------------ 上传对话框 ---------------------------- */
const visible = ref<boolean | string>('')
const uploadFileList = ref<any>([])
const cancelUpload = () => {
  visible.value = false
  uploadFileList.value = []
}

const emit = defineEmits(['update:sftpId'])
const closeSftp = async () => {}

/* ------------------------ 重命名 ------------------------------ */
const onRename = async (e: any) => {}
/* ------------------------ 压缩 ------------------------------ */
const onCompress = async (e: any) => {}
/* ------------------------ 下载 ------------------------------ */

const onDownload = async (e: any) => {}
const refreshDownLoadList = async () => {}

/* ------------------------ 删除文件 ------------------------------ */
const deleteFile = async (e: any) => {}

const addUploadFiles = async (list: any) => {}

/* ------------------------ 拷贝/剪切 - 粘贴文件 ------------------------------ */
const copyFileInfo = ref<any>({})
provide('copyFileInfo', copyFileInfo)
const onCopy = async (t: string, e: any) => {}
const onPaste = async () => {}

/* ------------------------ 上传文件 ------------------------------ */
const onProgress = async (e: any) => {
  const { id, percent } = e
  uploadFileList.value.forEach((f: any, _i: number) => {
    if (f.id == id) f.percent = percent
  })
}
</script>

<style scoped lang="less">
.xsftp-box {
  position: relative;
  padding: 10px;
  padding-bottom: 0;
  width: calc(100% - 20px);
  height: calc(100% - 10px);
  flex: 1;
  z-index: 1;
  overflow-x: hidden;
  .xsftp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .drag-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    :deep(.arco-spin-icon) {
      color: white;
    }
    :deep(.arco-spin-tip) {
      color: white;
    }
  }
  .drag-hover {
    z-index: 1;
    color: white;
    background-color: var(--color-mask-bg);
  }
  .drag-leave {
    z-index: -10;
    color: transparent;
  }
}
</style>
