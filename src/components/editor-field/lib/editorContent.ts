export const EDITOR_CONTENT_SELECTOR = '.ProseMirror.toastui-editor-contents'

export function getEditorContentElement(root: HTMLElement | null): HTMLElement | null {
  return root?.querySelector<HTMLElement>(EDITOR_CONTENT_SELECTOR) ?? null
}

export function isMarkdownEmpty(text: string): boolean {
  const trimmed = text.trim()
  return trimmed === '' || trimmed === '\u00a0'
}

export function applyContentElementState(
  element: HTMLElement,
  {disabled, spellCheck}: {disabled: boolean; spellCheck: boolean},
): void {
  element.contentEditable = disabled ? 'false' : 'true'
  element.spellcheck = spellCheck
}
