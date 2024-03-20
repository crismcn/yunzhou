<template>
  <div class="tools-box">
    <a-space direction="horizontal" size="small">
      <!-- <a-input placeholder="search..." allow-clear size="small">
                <template #prefix>
                    <icon-search />
                </template>
            </a-input> -->
      <!-- <icon-list size="20" /> -->
      <!-- <icon-refresh size="18" class="icon"/> -->
      <!-- <a-spin>
              <template #icon>
                <icon-refresh size="18" class="icon"/>
              </template>
            </a-spin> -->

      <a-tooltip :content="$t('xsftp.tools.op.paste')" mini>
        <icon-paste v-if="copyFileInfo.fileName" @click="actions('pasteFile')" size="17" class="icon" />
      </a-tooltip>
      <!-- <a-tooltip content="下载" mini>
        <icon-cloud-download @click="actions('openUploader')" size="17" class="icon" />
      </a-tooltip> -->
      <a-tooltip :content="$t('xsftp.tools.op.upload')" mini>
        <icon-upload @click="actions('openUploader')" size="17" class="icon" />
      </a-tooltip>
      <!-- <a-tooltip content="新建文件夹 TODO" mini>
        <icon-folder-add size="17" class="icon" />
      </a-tooltip> -->
      <a-tooltip :content="$t('xsftp.tools.op.recycle-bin')" mini>
        <icon-relation @click="actions('openRecycleBin')" size="17" class="icon" />
      </a-tooltip>
      <a-tooltip :content="$t('xsftp.tools.op.poweroff')" mini>
        <icon-poweroff @click="actions('closeSftp')" size="17" class="icon" />
      </a-tooltip>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const copyFileInfo: any = inject('copyFileInfo')

const emit = defineEmits(['actions'])
const actions = (t: any) => {
  emit('actions', { t })
}
</script>

<style scoped lang="less">
.tools-box {
  display: flex;
  align-items: center;
  .icon {
    cursor: pointer;
    padding: 0 6px;
    height: 28px;
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
    border-radius: var(--border-radius-small);
    &:hover {
      color: rgb(var(--primary-6));
      background-color: var(--color-fill-1);
    }
  }
}
</style>
