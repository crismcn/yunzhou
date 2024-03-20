import xtermLocale from '@/components/xterm/locale/zh-CN'
import xsftpLocale from '@/components/xsftp/locale/zh-CN'
import menusLocale from '@/layout/components/menus/locale/zh-CN'
import optionsLocale from '@/layout/components/options/locale/zh-CN'
import dragSplitLocale from '@/components/vue-drag-split/locale/zh-CN'
import applicationLocale from '@/views/applications/locale/zh-CN'
import serverLocale from '@/views/servers/locale/zh-CN'
import settingLocale from '@/views/setting/locale/zh-CN'

export default {
  'app-name': 'YunZhou',
  'change-locale': '切换为中文',
  welcome: '欢迎使用 YunZhou (*￣︶￣)*',
  ...menusLocale,
  ...optionsLocale,
  ...xtermLocale,
  ...xsftpLocale,
  ...dragSplitLocale,
  ...applicationLocale,
  ...serverLocale,
  ...settingLocale,
}
