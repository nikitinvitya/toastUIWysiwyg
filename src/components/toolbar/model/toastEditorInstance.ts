export type EditorTextSelection = [from: number, to: number]

export type ToastEditorInstance = {
  focus: () => void
  exec: (command: string, payload?: Record<string, unknown>) => void
  deleteSelection: () => void
  getSelectedText: () => string
  getSelection: () => EditorTextSelection | unknown
  setSelection: (start: number, end?: number) => void
  getMarkdown: () => string
  setMarkdown: (markdown: string) => void
}
