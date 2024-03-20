import { defineStore } from 'pinia'
import { AppState } from './types'
import { setItem, getItem } from '@/common'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    resize: 'auto',
    activeMenu: getItem('activeMenu'),
    locale: getItem('locale') || 'zh-CN',
    locked: getItem('locked') || false,
  }),
  getters: {},
  actions: {
    onResize(v: string) {
      this.resize = v
    },
    setActiveMenu(v: string) {
      setItem('activeMenu', v)
      this.activeMenu = v
    },
    setLocale(v: string) {
      setItem('locale', v)
      this.locale = v
    },
    setLock(v: boolean) {
      this.locked = v
    },
    unlock() {
      this.locked = false
    },
  },
})

export default useAppStore
