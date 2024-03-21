<template>
  <a-dropdown trigger="contextMenu" alignPoint @select="onContextMenu">
    <div ref="editorRef" class="editor"></div>
    <template #content>
      <a-dsubmenu>
        <template #icon><icon-palette /></template>
        <template #default>语言</template>
        <template #content>
          <a-doption v-for="lang in langs" :key="lang.label" :value="`lang-${lang.value}`"> {{ lang.label }}
          </a-doption>
        </template>
      </a-dsubmenu>
      <a-dsubmenu>
        <template #icon><icon-palette /></template>
        <template #default>主题</template>
        <template #content>
          <a-doption v-for="theme in themes" :key="theme.label" :value="`theme-${theme.value}`"> {{ theme.label }}
          </a-doption>
        </template>
      </a-dsubmenu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { ref, onMounted, createApp } from 'vue'
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { EditorState } from '@codemirror/state'
import { highlightSelectionMatches, search } from '@codemirror/search' //searchKeymap,
import { crosshairCursor, drawSelection, dropCursor, EditorView, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, rectangularSelection } from '@codemirror/view'
import SearchPanel from './search-replace/search-panel.vue'
// import { nord, xcodeDark, dracula, bbedit, material, githubDark, githubLight, solarizedLight, vscodeDark, xcodeLight } from './themes/index'
import { useThemes } from './themes/themes'
import { useLangs } from './langs/langs'
import { useSearchReplace } from './search-replace/search-replace'

const { searchKeymap } = useSearchReplace()

const data =
  "class AppBoot {\r\n  constructor(app) {\r\n   this.appBoots = app \r\n   this.app = app;\r\n  }\r\n\r\n  didReady() {\r\n    const app = this.app;\r\n    const {\r\n      options: { serverScope },\r\n      config: { basicAuthHooks, ignoreRouter, customStorage },\r\n      router,\r\n    } = app;\r\n\r\n    // custom console\r\n    if (serverScope === 'console') {\r\n      // auth hooks\r\n      if (basicAuthHooks) {\r\n        let index = 0;\r\n        const middlewares = app.middleware;\r\n        for (const length = middlewares.length; index < length; index++) {\r\n          const { _name } = middlewares[index];\r\n          if (_name && _name.includes('basicAuth')) {\r\n            break;\r\n          }\r\n        }\r\n\r\n        if (basicAuthHooks.before) {\r\n          middlewares.splice(index, 0, basicAuthHooks.before);\r\n        }\r\n\r\n        if (basicAuthHooks.after) {\r\n          middlewares.splice(index + 1, 0, basicAuthHooks.after);\r\n        }\r\n      }\r\n\r\n      // ignore routes\r\n      if (ignoreRouter.length) {\r\n        const layers = router.stack;\r\n        for (const layer of layers) {\r\n          if (ignoreRouter.every(router => (typeof router === 'string'\r\n            ? router !== layer.path\r\n            : router.path !== layer.path || !layer.methods.includes(router.method.toUpperCase())))) {\r\n            continue;\r\n          }\r\n\r\n          this.app.logger.info('[devtoolx-console] ignore router: %s, methods: %s', layer.path, layer.methods.join(','));\r\n          layer.stack.pop();\r\n        }\r\n      }\r\n\r\n      // app extension\r\n      if (customStorage) {\r\n        const originStorage = app.storage;\r\n        Object.defineProperty(app, 'storage', {\r\n          get() {\r\n            return customStorage.call(app, originStorage);\r\n          },\r\n        });\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = AppBoot;\r\n"

const editor = ref()
const editorRef = ref()

const initEditor = () => {
  editor.value = new EditorView({
    parent: editorRef.value,
    state: EditorState.create({
      doc: data,
      extensions: [
        lineNumbers(),
        EditorView.lineWrapping, // 自动换行
        defaultTheme(),
        initLang(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter({
          closedText: '+',
          openText: '-',
        }), // 折叠器
        drawSelection(), // 选中背景
        dropCursor(),
        EditorState.allowMultipleSelections.of(true), // 允许多处选中
        indentOnInput(), // 输入缩进
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }), // 语法高亮样式
        bracketMatching(), // 光标至于括号盘高亮展示
        closeBrackets(), // 用于启用括号关闭行为扩展 键入括号后，立即插入其右括号
        autocompletion(),
        rectangularSelection(), // 创建一个支持矩形选择的扩展
        crosshairCursor(), // 返回一个扩展，将指针光标变成按住给定修饰键（默认为 Alt）时的十字准线向下。 可以作为矩形选择的视觉提示
        highlightActiveLine(), // 高亮激活当前指针光标的行
        highlightSelectionMatches(),
        keymap.of([...searchKeymap, ...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap, ...lintKeymap]),
        search({
          createPanel(view) {
            const dom = document.createElement('div')
            const app = createApp(SearchPanel)
            app.provide('view', view)
            app.mount(dom)
            return {
              dom,
              top: true,
            }
          },
        }),
      ],
    }),
  })
}
onMounted(() => {
  initEditor()
})

const { getLangs, setLang, initLang } = useLangs()
const langs = getLangs()

const { getThemes, setThemes, defaultTheme } = useThemes()
const themes = getThemes()
const onContextMenu: any = (e: string) => {
  let key = ''
  if (e.split('-').length == 2) {
    ;[e, key] = e.split('-')
  }

  // 修改语言
  if (e == 'lang') {
    setLang(editor.value, key)
  }
  // 修改主题
  if (e == 'theme') {
    setThemes(editor.value, key)
  }

  // 改变内容
  // editor.value.dispatch({
  //   changes: { from: 0, to: 9, insert: "#!/usr/bin/env node\n" }
  // })
}
</script>

<style lang="less" scoped>
.editor {
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;
}
</style>
