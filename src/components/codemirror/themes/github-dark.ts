/**
 * @name github
 */
import { tags as t } from '@lezer/highlight'
import { createTheme, CreateThemeOptions } from './create-theme'

export const defaultSettingsGithubDark: CreateThemeOptions['settings'] = {
  background: '#0d1117',
  foreground: '#c9d1d9',
  caret: '#c9d1d9',
  selection: '#003d73',
  selectionMatch: '#003d73',
  lineHighlight: '#36334280',
}

export const githubDarkInit = (options?: Partial<CreateThemeOptions>) => {
  const { theme = 'dark', settings = {}, styles = [] } = options || {}
  return createTheme({
    theme: theme,
    settings: {
      ...defaultSettingsGithubDark,
      ...settings,
    },
    styles: [
      { tag: [t.standard(t.tagName), t.tagName], color: '#7ee787' },
      { tag: [t.comment, t.bracket], color: '#8b949e' },
      { tag: [t.className, t.propertyName], color: '#d2a8ff' },
      {
        tag: [t.variableName, t.attributeName, t.number, t.operator],
        color: '#79c0ff',
      },
      {
        tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
        color: '#ff7b72',
      },
      { tag: [t.string, t.meta, t.regexp], color: '#a5d6ff' },
      { tag: [t.name, t.quote], color: '#7ee787' },
      { tag: [t.heading, t.strong], color: '#d2a8ff', fontWeight: 'bold' },
      { tag: [t.emphasis], color: '#d2a8ff', fontStyle: 'italic' },
      { tag: [t.deleted], color: '#ffdcd7', backgroundColor: 'ffeef0' },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab70' },
      { tag: t.link, textDecoration: 'underline' },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      { tag: t.invalid, color: '#f97583' },
      ...styles,
    ],
  })
}

export const githubDark = githubDarkInit()
