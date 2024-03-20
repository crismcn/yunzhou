import { defineStore } from 'pinia'
import { ServerState } from './types'

const useServerStore = defineStore('app', {
  state: (): ServerState => ({
    showServerInfo: false,
  }),
  getters: {},
  actions: {},
})

export default useServerStore
