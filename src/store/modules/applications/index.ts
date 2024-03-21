import { defineStore } from 'pinia'
import { ApplicationState } from './types'

const useApplicationStore = defineStore('app', {
  state: (): ApplicationState => ({
    applicationInfo: {
      name: '222',
    },
    showApplicationInfo: false,
  }),
  getters: {},
  actions: {
    setApplicationInfo(v: any) {
      this.applicationInfo = v
    },
  },
})

export default useApplicationStore
