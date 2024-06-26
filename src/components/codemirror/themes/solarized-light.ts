import { tags as t } from '@lezer/highlight'
import { createTheme, CreateThemeOptions } from './create-theme'
export const c = {
  background: '#FDF6E3',
  foreground: '#657B83',
  selection: '#E6E6FA',
  selectionMatch: '#E6E6FA',
  cursor: '#657B83',
  dropdownBackground: '#EEE8D5',
  dropdownBorder: '#D3AF86',
  activeLine: '#3d392d11',
  matchingBracket: '#EEE8D5',
  keyword: '#859900',
  storage: '#586E75',
  variable: '#268BD2',
  parameter: '#268BD2',
  function: '#268BD2',
  string: '#2AA198',
  constant: '#CB4B16',
  type: '#859900',
  class: '#268BD2',
  number: '#D33682',
  comment: '#93A1A1',
  heading: '#268BD2',
  invalid: '#DC322F',
  regexp: '#DC322F',
  tag: '#268BD2',
}

export const defaultSettingsSolarizedLight: CreateThemeOptions['settings'] = {
  background: c.background,
  foreground: c.foreground,
  caret: c.cursor,
  selection: c.selection,
  selectionMatch: c.selectionMatch,
  gutterBackground: c.background,
  gutterForeground: c.foreground,
  gutterBorder: 'transparent',
  lineHighlight: c.activeLine,
}

export const solarizedLightInit = (options?: Partial<CreateThemeOptions>) => {
  const { theme = 'light', settings = {}, styles = [] } = options || {}
  return createTheme({
    theme: theme,
    settings: {
      ...defaultSettingsSolarizedLight,
      ...settings,
    },
    styles: [
      { tag: t.keyword, color: c.keyword },
      { tag: [t.name, t.deleted, t.character, t.macroName], color: c.variable },
      { tag: [t.propertyName], color: c.function },
      {
        tag: [
          t.processingInstruction,
          t.string,
          t.inserted,
          t.special(t.string),
        ],
        color: c.string,
      },
      { tag: [t.function(t.variableName), t.labelName], color: c.function },
      {
        tag: [t.color, t.constant(t.name), t.standard(t.name)],
        color: c.constant,
      },
      { tag: [t.definition(t.name), t.separator], color: c.variable },
      { tag: [t.className], color: c.class },
      {
        tag: [
          t.number,
          t.changed,
          t.annotation,
          t.modifier,
          t.self,
          t.namespace,
        ],
        color: c.number,
      },
      { tag: [t.typeName], color: c.type, fontStyle: c.type },
      { tag: [t.operator, t.operatorKeyword], color: c.keyword },
      { tag: [t.url, t.escape, t.regexp, t.link], color: c.regexp },
      { tag: [t.meta, t.comment], color: c.comment },
      { tag: t.tagName, color: c.tag },
      { tag: t.strong, fontWeight: 'bold' },
      { tag: t.emphasis, fontStyle: 'italic' },
      { tag: t.link, textDecoration: 'underline' },
      { tag: t.heading, fontWeight: 'bold', color: c.heading },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: c.variable },
      { tag: t.invalid, color: c.invalid },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      ...styles,
    ],
  })
}

export const solarizedLight = solarizedLightInit()
