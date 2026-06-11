import {EDITOR_CONTENT_SELECTOR} from '../../editor-field/lib/editorContent.ts'

export function getEditorContentRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>(EDITOR_CONTENT_SELECTOR)
}

export function findNodeAtCursor<T extends Element>(
  selector: string,
  root: HTMLElement | null = getEditorContentRoot(),
): T | null {
  const selection = window.getSelection()
  if (!root || !selection?.rangeCount) {
    return null
  }

  const range = selection.getRangeAt(0)
  const nodes = root.querySelectorAll(selector)

  for (const node of nodes) {
    if (range.intersectsNode(node)) {
      return node as T
    }
  }

  return null
}
