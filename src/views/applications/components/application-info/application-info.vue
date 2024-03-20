<template>
  <a-drawer popup-container="#layoutContent" :visible="visible" width="100%" :mask="false" unmountOnClose @cancel="onClose">
    <template #title>
      <a-space class="title" data-tauri-drag-region><icon-edit /> {{ $t('application.title.add') }}</a-space>
    </template>
    <a-carousel :current="carouselIndex" class="container" animation-name="fade" show-arrow="never" direction="vertical">
      <a-carousel-item>
        <a-form ref="formRef" class="content" size="large" :model="form" :auto-label-width="true">
          <a-form-item field="localPath" label="" class="c-form-item" :rules="[{ required: true, message: $t('application.localPath.placeholder') }]" :validate-trigger="['change', 'input']">
            <div class="c-item-label">{{ $t('application.localPath') }}</div>
            <SelectDirectory v-model="form.localPath" :dialogTitle="$t('application.localPath.placeholder')" />
          </a-form-item>
          <a-form-item field="name" label="" class="c-form-item" :rules="[{ required: true, message: $t('application.name.placeholder') }]" :validate-trigger="['change', 'input']">
            <div class="c-item-label">{{ $t('application.name') }}</div>
            <a-input v-model="form.name" :placeholder="$t('application.name.placeholder')" />
          </a-form-item>
          <a-form-item field="buildCmd" label="" class="c-form-item" :rules="[{ required: true, message: $t('application.buildCmd.tip') }]" :validate-trigger="['change']">
            <div class="c-item-label">{{ $t('application.buildCmd') }}</div>
            <a-input v-model="form.buildCmd" :placeholder="$t('application.buildCmd.placeholder')" allow-clear />
          </a-form-item>
          <!-- <a-form-item field="remotePath" label="" class="c-form-item"
            :rules="[{ required: true, message: $t('application.remotePath.placeholder') }]"
            :validate-trigger="['change', 'input']">
            <div class="c-item-label">{{ $t('application.remotePath') }}</div>
            <a-input v-model="form.remotePath" :placeholder="$t('application.remotePath.placeholder')" />
          </a-form-item> -->
          <a-form-item field="deployCmd" label="" class="c-form-item">
            <div class="c-item-label">{{ $t('application.deployCmd') }}</div>
            <a-input v-model="form.deployCmd" :placeholder="$t('application.deployCmd.placeholder')" allow-clear />
          </a-form-item>
          <a-form-item field="description" label="" class="c-form-item">
            <div class="c-item-label">{{ $t('application.remark') }}</div>
            <a-input v-model="form.description" :placeholder="$t('application.remark.placeholder')" />
          </a-form-item>
          <a-form-item field="backupNum" label="" class="c-form-item">
            <div class="c-item-label">{{ $t('application.backupNum') }}</div>
            <a-slider v-model="form.backupNum" :max="20" :marks="marks" />
          </a-form-item>
        </a-form>
      </a-carousel-item>
      <a-carousel-item>
        <a-form ref="serverFormRef" class="content" size="large" :model="serverForm" :auto-label-width="true">
          <a-form-item field="servers" label="" class="c-form-item" :rules="[{ required: true, message: $t('application.servers.placeholder') }]" :validate-trigger="['change', 'input']">
            <div class="c-item-label">{{ $t('application.servers') }}</div>
            <a-select v-model="serverForm.servers" :options="serversDicts" :placeholder="$t('application.servers.placeholder')" multiple />
          </a-form-item>

          <a-form-item class="c-form-item" v-if="serverForm.servers.length == 0">
            <div class="c-item-label">主机</div>
            <a-form-item no-style>
              <a-input readonly placeholder="部署路径" />
            </a-form-item>
            <a-form-item no-style>
              <a-input readonly placeholder="部署命令" style="margin-left: -2px; width: 70%" />
            </a-form-item>
          </a-form-item>
          <a-form-item class="c-form-item" v-for="(server, index) in serverForm.servers" :key="server">
            <div class="c-item-label">{{ server }}</div>
            <a-form-item no-style>
              <a-input placeholder="/home/web/test-server" />
            </a-form-item>
            <a-form-item no-style>
              <a-input placeholder="pm2 restart your-project" style="margin-left: -2px; width: 70%" />
            </a-form-item>
          </a-form-item>
        </a-form>
      </a-carousel-item>
    </a-carousel>

    <template #footer>
      <a-space class="footer">
        <a-button-group>
          <a-button :disabled="carouselIndex == 1" @click="carouselIndex = 1"> <icon-left />{{ $t('application.op.back') }} </a-button>
          <a-button :disabled="carouselIndex == 2" @click="carouselIndex = 2"> {{ $t('application.op.next') }}<icon-right /> </a-button>
        </a-button-group>
        <a-button @click="onOk" :loading="loading" :disabled="carouselIndex == 1" type="primary">
          <template #icon>
            <icon-check />
          </template>
          {{ $t('application.op.ok') }}
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SelectDirectory from '@/components/select-directory/select-directory.vue'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:visible'])

const marks = {
  0: '∞',
  5: '5',
  10: '10',
  15: '15',
  20: '20',
}

interface FORMTYPE {
  id: string
  name: string
  localPath: string
  remotePath: string
  description: string
  buildCmd: string
  deployCmd: string
  backupNum: number
  logs: any[]
  servers: []
  currentLog: string
}
const formRef = ref()
const form = ref<FORMTYPE>({
  id: '',
  name: '',
  localPath: '',
  remotePath: '',
  description: '',
  buildCmd: '',
  deployCmd: '',
  backupNum: 10,
  logs: [],
  servers: [],
  currentLog: '',
})

const serversDicts = ref([
  {
    label: '测试环境 106.14.106.74',
    value: '106.14.106.74',
  },
  {
    label: '演示环境 106.14.105.52',
    value: '106.14.105.52',
  },
  {
    label: '灰度环境 119.20.105.102',
    value: '119.20.105.102',
  },
  {
    label: '生产环境 119.20.105.122',
    value: '119.20.105.122',
  },
])
interface SERVERFORMTYPE {
  remotePath: []
  servers: []
}
const serverFormRef = ref()
const serverForm = ref<SERVERFORMTYPE>({
  remotePath: [],
  servers: [],
})

const carouselIndex = ref(1)
const loading = ref(false)
const onOk = () => {
  loading.value = true
  setTimeout(() => {
    onClose()
    loading.value = false
    carouselIndex.value = 1
  }, 1500)
}
const onClose = () => {
  emits('update:visible', false)
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-3);
  z-index: 5;

  .content {
    padding: 10px 0;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }

  .c-form-item {
    margin: 24px 0;
  }

  :deep(.arco-form-item-content, .arco-form-item-content-flex) {
    position: relative;

    .c-item-label {
      position: absolute;
      left: 14px;
      top: -14px;
      padding: 0 10px;
      font-size: 12px;
      color: var(--color-text-1);
      // background: white;
      background: var(--color-bg-1);
      z-index: 2;
    }
  }

  :deep(.arco-input-wrapper, .arco-textarea-wrapper, .arco-input-tag) {
    // background: white;
    background: var(--color-bg-1);
    border: solid 1px var(--color-neutral-3);
    // margin-bottom: 15px;
  }

  :deep(.arco-input-tag-inner) {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  :deep(.arco-input-focus, .arco-textarea-focus, .arco-input-tag-focus) {
    z-index: 1;
    border: solid 1px rgb(var(--primary-6));
  }

  :deep(.arco-input.arco-input-size-large) {
    line-height: 2;
  }

  :deep(.arco-select-view-inner) {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  :deep(.arco-select-view) {
    background: var(--color-bg-1);
    border: solid 1px var(--color-neutral-3);
  }

  :deep(.arco-select-view-input) {
    line-height: 28px;
  }

  :deep(.arco-select-view-value) {
    line-height: 30px;
  }

  :deep(.arco-select-view-focus) {
    border: solid 1px rgb(var(--primary-6));
  }
}

.title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: 12px;
  font-size: 14px;
  line-height: 48px;
  box-sizing: border-box;
}

.footer {
  position: relative;
  z-index: 5 !important;
  background-color: var(--color-bg-3);
}

:deep(.arco-slider-marks .arco-slider-mark) {
  width: 48px;
}

:deep(.arco-carousel-indicator-wrapper-bottom) {
  display: none !important;
}

:deep(.arco-input-group) {
  width: 100% !important;
}
</style>
