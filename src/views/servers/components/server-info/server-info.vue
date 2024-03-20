<template>
  <a-drawer popup-container="#layoutContent" :visible="visible" width="100%" :mask="false" unmountOnClose @cancel="onClose">
    <template #title>
      <a-space class="title" data-tauri-drag-region> <icon-edit /> {{ $t('server.title.add') }} </a-space>
    </template>

    <div class="container">
      <a-form ref="formRef" size="large" :model="form" :auto-label-width="true" class="content">
        <a-form-item field="name" label="" class="c-form-item" :rules="[{ required: true, message: $t('server.name.placeholder') }]" :validate-trigger="['change', 'input']">
          <div class="c-item-label">{{ $t('server.name') }}</div>
          <a-input v-model="form.name" :placeholder="$t('server.name.placeholder')" />
        </a-form-item>
        <a-form-item field="info" label="" class="c-form-item" :rules="[{ required: true, message: $t('server.address.placeholder') }]" :validate-trigger="['change']">
          <div class="c-item-label">{{ $t('server.address') }}</div>
          <ServerInput ref="cInputRef" v-model="form.info"></ServerInput>
        </a-form-item>
        <a-form-item field="tags" label="" class="c-form-item">
          <div class="c-item-label">{{ $t('server.remark') }}</div>
          <a-input-tag v-model="form.tags" :placeholder="$t('server.remark.placeholder')" />
        </a-form-item>
        <a-form-item field="method" label="" class="c-form-item" :rules="[{ required: true, message: $t('server.auth-method.placeholder') }]">
          <div class="c-item-label">{{ $t('server.auth-method') }}</div>
          <a-select v-model="form.method" :placeholder="$t('server.auth-method.placeholder')">
            <a-option value="secret" :label="$t('server.auth-method.secret')"></a-option>
            <a-option value="passwd" :label="$t('server.auth-method.passwd')"></a-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="form.method == 'passwd'" field="passwd" label="" class="c-form-item" :rules="[{ required: true, message: $t('server.auth-method.passwd.placeholder') }]" :validate-trigger="['change', 'input']">
          <div class="c-item-label">{{ $t('server.auth-method.passwd') }}</div>
          <a-input-password v-model="form.passwd" :placeholder="$t('server.auth-method.passwd.placeholder')" />
        </a-form-item>
        <a-form-item v-else field="secret" label="" class="c-form-item" :rules="[{ required: true, message: $t('server.auth-method.secret.placeholder') }]" :validate-trigger="['change']">
          <div class="c-item-label">{{ $t('server.auth-method.secret') }}</div>
          <a-textarea v-model="form.secret" :placeholder="$t('server.auth-method.secret.placeholder')" allow-clear />
        </a-form-item>
      </a-form>
    </div>

    <template #footer>
      <a-space>
        <a-button @click="onClose">
          <template #icon>
            <icon-left />
          </template>
          {{ $t('application.op.cancel') }}
        </a-button>
        <a-button :loading="loading" type="primary">
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
import ServerInput from '../server-input/server-input.vue'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:visible'])
const onClose = () => {
  emits('update:visible', false)
}

interface FORMTYPE {
  id: string
  name: string
  tags: (string | number)[]
  secret: string
  passwd: string
  method: string | number
  info: {
    user: string
    host: string
    port: number
  }
  recycleBin: number
}
const formRef = ref()
const form = ref<FORMTYPE>({
  id: '',
  name: '',
  tags: [],
  secret: '',
  passwd: '',
  method: 'secret',
  info: {
    user: '',
    host: '',
    port: 22,
  },
  recycleBin: 1,
})

const loading = ref(false)
const cInputRef = ref()
</script>

<style lang="less" scoped>
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

.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-3);
  z-index: 5;

  .header {
    position: relative;
    text-align: left;
    border-bottom: solid 1px var(--color-neutral-2);
    margin-bottom: 10px;

    &::before {
      content: ' ';
      margin: 0 10px;
      border: dashed 1.5px var(--color-text-1);
    }

    .title {
      font-size: 16px;
      color: var(--color-text-1);
      line-height: 80px;
      margin-right: 15px;
    }

    .option-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 40px;
      top: 20px;
      padding: 5px 20px;
      line-height: 32px;
      color: rgb(var(--red-6));
      cursor: pointer;
      border-radius: 20px;
      // background: var(--color-bg-1);
      background-image: linear-gradient(to bottom right, var(--color-bg-2), var(--color-neutral-2));
      // background-image: linear-gradient(to bottom right, #fff, #f8f8f8);
      transition: width 0.2s;

      &:hover {
        color: rgb(var(--red-4));
      }
    }
  }

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

  :deep(.arco-input-wrapper) {
    background: var(--color-bg-1);
    border: solid 1px var(--color-neutral-3);
  }

  .arco-textarea-wrapper,
  .arco-input-tag {
    background: var(--color-bg-1);
    border: solid 1px var(--color-neutral-3);
  }

  .arco-textarea-focus,
  .arco-input-tag-focus {
    z-index: 1;
    border: solid 1px rgb(var(--primary-6));
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

  :deep(.arco-textarea) {
    min-height: 120px;
  }

  :deep(.arco-select-view) {
    background: var(--color-bg-1);
    border: solid 1px var(--color-neutral-3);
  }

  :deep(.arco-select-view-input) {
    line-height: 28px;
  }

  :deep(.arco-select-view-value) {
    line-height: 28px;
  }

  :deep(.arco-select-view-focus) {
    border: solid 1px rgb(var(--primary-6));
  }

  .footer {
    position: relative;
    z-index: 5 !important;
    background-color: var(--color-bg-3);
  }

  :deep(.arco-input-group) {
    width: 100%;
  }
}
</style>
