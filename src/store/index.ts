import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useCodeMirrorStore from './modules/codemirror'
import useApplicationStore from './modules/applications'
import useServerStore from './modules/servers'

const pinia = createPinia()

export { useAppStore, useCodeMirrorStore, useApplicationStore, useServerStore }
export default pinia
