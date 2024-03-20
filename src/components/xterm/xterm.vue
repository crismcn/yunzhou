<template>
  <a-dropdown trigger="contextMenu" alignPoint @select="onContextMenu">
    <div :id="xtermId" class="terminal-box" :style="{ backgroundColor: bgColor }"></div>
    <template #content>
      <a-doption value="copy">
        <template #icon><icon-copy /></template> {{ _$t('xterm.copy') }}
      </a-doption>
      <a-doption value="paste">
        <template #icon><icon-paste /></template> {{ _$t('xterm.paste') }}
      </a-doption>
      <a-dsubmenu>
        <template #icon><icon-palette /></template>
        <template #default>{{ _$t('xterm.theme') }}</template>
        <template #content>
          <a-doption value="theme-Dracula"> Dracula </a-doption>
          <a-doption value="theme-Monokai"> Monokai </a-doption>
          <a-doption value="theme-Material"> Material </a-doption>
          <a-doption value="theme-QuietLight"> QuietLight </a-doption>
          <a-doption value="theme-SolarizedLight"> SolarizedLight </a-doption>
          <a-doption value="theme-Cobalt2"> Cobalt2 </a-doption>
          <a-doption value="theme-Nord"> Nord </a-doption>
        </template>
      </a-dsubmenu>
      <a-dsubmenu>
        <template #icon><icon-font-colors /></template>
        <template #default>{{ _$t('xterm.font') }}</template>
        <template #content>
          <a-doption value="font-Consolas"> Consolas </a-doption>
          <a-doption value="font-Courier"> Courier </a-doption>
          <a-doption value="font-FiraCode"> Fira Code </a-doption>
        </template>
      </a-dsubmenu>
      <a-dsubmenu>
        <template #icon><icon-line-height /></template>
        <template #default>{{ _$t('xterm.font-size') }}</template>
        <template #content>
          <a-doption v-for="i in [12, 14, 16, 18, 20, 22]" :key="i" :value="`fontSize-${i}`">
            {{ i }}
          </a-doption>
        </template>
      </a-dsubmenu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { useAppStore } from '@/store'
import { GUID } from '@/common'
import { themes, font } from './themes/themes'
import 'xterm/css/xterm.css'
import { t } from "./locale"

const _$t = (key: string) => {
  return t(key, appStore.locale)
}

/** 初始化终端 */
let xterm: Terminal | null = null
const fitAddon = new FitAddon()
const xtermId = GUID()
const initXterm = () => {
  const terminal: any = document.getElementById(xtermId)

  xterm = new Terminal({
    fontSize: 14,
    fontFamily: 'Consolas, monospace',
    cursorBlink: true,
    cursorStyle: 'underline',
    disableStdin: false,
    theme: themes.Default,
  })
  bgColor.value = themes.Default.background
  /** 填充大小 */
  xterm.loadAddon(fitAddon)

  xterm.open(terminal)
  fitAddon.fit()

  xterm.writeln('\r****************************************')
  xterm.writeln('\r*        WelCome YunZhou Deploy        *')
  xterm.writeln('\r****************************************')

  xterm.onResize((data: any) => {
    resizeSshSession(data)
  })

  // 监听键盘事件
  let Ctrl_C_At = 0
  xterm.onKey(async (e) => {
    // 检查是否按下 Ctrl + C
    if (e.domEvent.ctrlKey && e.key === '\u0003') {
      if (Date.now() - Ctrl_C_At > 200) {
        // console.log(`复制`)
      } else {
        console.log(`退出`)
      }
      Ctrl_C_At = Date.now()
    }
    // 检查是否按下 Ctrl + V
    if (e.domEvent.ctrlKey && e.key === '\x16') {
      // setTimeout(() => onContextMenu('paste'), 0)
    }

    // 检查是否按下了 Ctrl 键和 "+" 键
    if (e.domEvent.ctrlKey && e.key === '+') {
      // 在控制台打印相应的消息
      // 这里可以执行你想要的操作
    }
  })

  xterm.focus()
  xterm.onData((data: string) => {
    // 检查是否按下 Ctrl + C
    if (data === '\u0003') return
    // socket.send({ event: 'message', data })
    // xterm?.setOption('theme', { background: 'red' })
  })

  /** 初始化完成后设置ssh会话窗体大小 */
  setTimeout(() => {
    resizeSshSession(fitAddon.proposeDimensions())
  }, 200)
}

// 设置ssh会话窗体大小
const resizeSshSession = ({ cols, rows }: any) => {
  // console.log({ cols, rows })
  // socket.send({ event: "resize", data: `${cols};${rows}` });
}
// 设置界面xterm会话大小
const resizeXterm = () => {
  setTimeout(() => fitAddon.fit(), 0)
}

// 浏览器大小变化、split变化
const appStore = useAppStore()
watch(
  () => appStore.resize,
  (_newVal, _oldVal) => {
    resizeXterm()
  }
)

onMounted(() => {
  // initSocket()
  setTimeout(initXterm, 0)
})

onBeforeUnmount(() => {
  xterm?.dispose()
  // if (socket.websocket) {
  //   // socket.close()
  //   xterm?.dispose()
  // }
})


/** ----------------------------ContextMenu----------------------------- **/
const bgColor = ref("#282A36");
const onContextMenu: any = async (e: string) => {
  let key = "";
  if (e.split("-").length == 2) {
    [e, key] = e.split("-");
  }
  switch (e) {
    case "copy":
      break;
    case "paste":

      break;
    case "theme":
      bgColor.value = themes[key].background;
      xterm!.options.theme = themes[key];
      break;
    case "font":
      xterm!.options.fontFamily = font[key];
      fitAddon.fit();
      break;
    case "fontSize":
      xterm!.options.fontSize = parseInt(key);
      fitAddon.fit();
      break;
    default:
      break;
  }
};
</script>

<style lang="less" scoped>
.terminal-box {
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: 1;
}

:deep(.xterm .xterm-viewport) {
  opacity: 0;
}
</style>
