import { ref } from 'vue'
import { bbedit } from './bbedit'
import { githubLight } from './github-light'
import { githubDark } from './github-dark'
import { vscodeDark } from './vscode-dark'
import { dracula } from './dracula'
import { nord } from './nord'
import { material } from './material'
import { xcodeLight } from './xcode-light'
import { xcodeDark } from './xcode-dark'
import { solarizedLight } from './solarized-light'
import { Compartment } from '@codemirror/state'

const themeCompartment = new Compartment()

const THEMES: any = { bbedit, dracula, nord, material, githubLight, githubDark, solarizedLight, vscodeDark, xcodeDark, xcodeLight }
const theme = ref<any>(xcodeLight)

export const useThemes = () => {
  const getThemesCfg = () => {
    return theme
  }

  const getThemes = () => {
    return Object.keys(THEMES).map((e) => ({ value: e, label: e }))
  }

  const setThemes = (editor: any, key: string) => {
    theme.value = THEMES[key]
    editor.dispatch({
      effects: themeCompartment.reconfigure(theme.value),
    })
  }

  return {
    defaultTheme: () => themeCompartment.of(nord),
    setThemes,
    getThemes,
    getThemesCfg,
  }
}
