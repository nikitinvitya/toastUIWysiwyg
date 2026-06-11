import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

export const COLOR_SYNTAX_PRESET = [
  '',
  '#e03131',
  '#2f9e44',
  '#1971c2',
  '#f08c00',
  '#8049ff',
] as const

export const editorPlugins = [
  [colorSyntax, {preset: [...COLOR_SYNTAX_PRESET]}],
] as const
