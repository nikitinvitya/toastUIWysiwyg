import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'

export type EditorTextSelection = [number, number]

export function captureEditorSelection(
  instance: ToastEditorInstance,
): EditorTextSelection | null {
  const selection = instance.getSelection()
  if (!Array.isArray(selection) || selection.length !== 2) {
    return null
  }

  const [from, to] = selection
  if (typeof from !== 'number' || typeof to !== 'number') {
    return null
  }

  return [from, to]
}

export function restoreEditorSelection(
  instance: ToastEditorInstance,
  selection: EditorTextSelection | null,
): void {
  if (!selection) {
    return
  }

  const [from, to] = selection
  instance.setSelection(from, to)
}
