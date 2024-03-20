<template>
  <div class="container">
    <!-- <div class="sider"></div> -->
    <a-tabs class="content">
      <a-tab-pane key="1">
        <template #title>
          <a-space>
            <icon-common />
            <span>{{ $t('setting.app.label') }}</span>
          </a-space>
        </template>

        <div class="card">
          <div class="item wrap" style="margin-top: -8px">
            <span style="width: 180px">{{ $t('setting.disk-space') }}</span>
            <a-progress size="large" :show-text="false" :percent="spaceInfo.spaceUsagePercent" animation trackColor="var(--color-primary-light-1)" />
            <span style="padding: 0 50px 0 16px">{{ spaceInfo.spaceUsagePercent }}%</span>
            <a-button @click="onClearLogFileSpace">{{ $t('setting.disk-space.clear') }}</a-button>
            <div class="space-info">
              <a-space size="medium">
                <div class="usage"></div>
                <div>{{ $t('setting.disk-space.cache-usage') }} {{ spaceInfo.usageSpace }} GB</div>
                <div class="free"></div>
                <div>{{ $t('setting.disk-space.free-space') }} {{ spaceInfo.freeSpace }} GB</div>
              </a-space>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="item">
            <span>{{ $t('setting.theme') }}</span>
            <a-radio-group @change="OnSetTheme" type="button">
              <a-radio value="light">{{ $t('setting.theme.light') }}</a-radio>
              <a-radio value="dark">{{ $t('setting.theme.dark') }}</a-radio>
              <a-radio value="auto">{{ $t('setting.theme.auto') }}</a-radio>
            </a-radio-group>
          </div>

          <div class="item">
            <span>{{ $t(`setting.background`) }}</span>
            <a-switch type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
        </div>

        <div class="card">
          <div class="item">
            <span>{{ $t('setting.language') }}</span>
            <a-radio-group @change="onChangeLanguage" type="button">
              <a-radio value="zh-CN">中文</a-radio>
              <a-radio value="en-US">English</a-radio>
            </a-radio-group>
          </div>
          <div class="item"></div>
        </div>

        <div class="card">
          <div class="item">
            <span>{{ $t('setting.startup') }}</span>
            <a-switch @change="onSetStartUp" type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
          <div class="item">
            <span>{{ $t('setting.startup.mini') }}</span>
            <a-switch @change="onSetStartUp" type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
        </div>

        <div class="card">
          <div class="item">
            <span>{{ $t(`setting.lock.switch`) }}</span>
            <a-switch type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
          <div class="item">
            <span>{{ $t(`setting.lock.password`) }}</span>
            <PIN></PIN>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>
          <a-space>
            <icon-thunderbolt />
            <span>{{ $t('setting.transfer.label') }}</span>
          </a-space>
        </template>
        <div class="card">
          <div class="item">
            <span>{{ $t('setting.transfer.nosleep') }}</span>
            <a-switch @change="onSetStartUp" type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>

          <div class="item">
            <span>{{ $t('setting.transfer.shutdown') }}</span>
            <a-switch @change="onSetStartUp" type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
        </div>

        <div class="card">
          <div class="item">
            <span>{{ $t('setting.multithreaded') }}</span>
            <a-switch type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
          <div class="item">
            <span>{{ $t('setting.tone') }} </span>
            <a-switch type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
        </div>

        <div class="card">
          <div class="item">
            <span>{{ $t('setting.download.path') }}</span>
            <a-space fill>
              <a-input default-value="E:\BaiduNetdiskDownload" readonly style="min-width: 268px" />
              <a-link>{{ $t('setting.change') }}</a-link>
            </a-space>
          </div>
          <div class="item"></div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #title>
          <a-space>
            <icon-relation />
            <span>{{ $t('setting.data.label') }}</span>
          </a-space>
        </template>
        <div class="card">
          <div class="item">
            <span>数据方式</span>
            <a-radio-group @change="OnSetTheme" type="button">
              <a-radio value="sqlite">Sqlite</a-radio>
              <a-radio value="mysql">Mysql</a-radio>
            </a-radio-group>
          </div>

          <div class="item">
            <span> </span>
            <!-- status="warning" -->
            <a-button>
              <template #icon> <icon-link /> </template>
              测试连接
            </a-button>
          </div>
        </div>
        <div class="card">
          <div class="item">
            <span>主机</span>
            <a-input placeholder="127.x.x.x" class="input" />
          </div>

          <div class="item">
            <span>端口</span>
            <a-input placeholder="3306" class="input" />
          </div>
        </div>
        <div class="card">
          <div class="item">
            <span>账户</span>
            <a-input placeholder="" class="input" />
          </div>

          <div class="item">
            <span>密码</span>
            <a-input placeholder="" class="input" />
          </div>
        </div>
        <div class="card">
          <div class="item">
            <span>存储路径</span>
            <a-input placeholder="" class="input" />
          </div>

          <div class="item">
            <span>数据加密</span>
            <a-switch type="round">
              <template #checked> {{ $t('setting.switch.on') }} </template>
              <template #unchecked> {{ $t('setting.switch.off') }} </template>
            </a-switch>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PIN from './components/pin/pin.vue'

const OnSetTheme = (e: any) => {}

const onSetStartUp = async (e: any) => {}

const onClearLogFileSpace = async () => {}

const onChangeLanguage = async (e: any) => {}

const spaceInfo = ref({
  freeSpace: 10,
  usageSpace: 2.7,
  spaceUsagePercent: 0.27,
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .sider {
    width: 240px;
    box-sizing: border-box;
    border-right: solid 1px var(--color-neutral-2);
    .label {
      cursor: pointer;
      position: relative;
      padding-left: 32px;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      font-size: @font-size-body-2;
      color: var(--color-text-2);
      border-right: solid 1px var(--color-bg-1);
      box-sizing: border-box;
    }
  }
  .content {
    width: 100%;
    // width: calc(100% - 240px);
    .label {
      padding: 0 14px;
      font-size: 14px;
      font-weight: 600;
      line-height: 32px;
    }
    .card {
      margin: 18px 16px;
      margin-top: 2px;
      display: flex;
      min-height: 82px;
      border-radius: 2px;
      border: solid 1px var(--color-neutral-2);
      box-shadow: -1px 3px 5px var(--color-neutral-1);
      box-sizing: border-box;
      .item {
        position: relative;
        width: 50%;
        padding-left: 2rem;
        padding-right: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--color-text-2);
        .space-info {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 12px;
          font-size: 10px;
          color: var(--color-text-3);
          .usage,
          .free {
            height: 10px;
            width: 10px;
          }
          .usage {
            background: rgb(var(--primary-6));
          }
          .free {
            background: var(--color-primary-light-2);
          }
        }
        .link-computer {
          cursor: pointer;
          font-size: 14px;
          &:hover {
            color: rgb(var(--primary-6));
          }
        }
        .input {
          max-width: 68%;
          min-width: 268px;
        }
      }
      .wrap {
        width: 100%;
      }
    }
  }
}
// :deep(.arco-input-wrapper) {
//   background: var(--color-bg-1);
//   border: solid 1px var(--color-neutral-3);
// }
// :deep(.arco-input-focus) {
//   z-index: 1;
//   border: solid 1px rgb(var(--primary-6));
// }
// :deep(.arco-input-append) {
//   border: 1px solid var(--color-neutral-3);
//   border-left: none;
//   background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
// }
</style>
