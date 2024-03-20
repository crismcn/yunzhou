import { defineStore } from 'pinia'
import { CodeMirrorState } from './types'
import { setItem, getItem } from '@/common'

const useCodeMirrorStore = defineStore('app', {
  state: (): CodeMirrorState => ({
    theme: 'auto',
  }),
  getters: {},
  actions: {
    setTheme(v: string) {},
  },
})

export default useCodeMirrorStore
