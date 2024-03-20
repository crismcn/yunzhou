import { ref } from 'vue'
import { Compartment } from '@codemirror/state'
import { sql } from '@codemirror/lang-sql'
import { php } from '@codemirror/lang-php'
import { css } from '@codemirror/lang-css'
import { less } from '@codemirror/lang-less'
import { sass } from '@codemirror/lang-sass'
import { yaml } from '@codemirror/lang-yaml'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'

const LangConf = new Compartment()
const LangMap: Record<string, any> = {
  js: javascript(),
  css: css(),
  less: less(),
  sass: sass(),
  json: json(),
  html: html(),
  yml: yaml(),
  yaml: yaml(),
  py: python(),
  php: php(),
  sql: sql(),
}
const lang = ref<any>(javascript())

export const useLangs = () => {
  const initLang = (key?: string) => {
    return LangConf.of(LangMap[key || 'js'])
  }

  const getLangs = () => {
    return Object.keys(LangMap).map((e) => ({ value: e, label: e }))
  }

  const setLang = (editor: any, key: string) => {
    lang.value = LangMap[key]
    editor.dispatch({
      effects: LangConf.reconfigure(LangMap[key]),
    })
  }

  return {
    initLang,
    getLangs,
    setLang,
  }
}
