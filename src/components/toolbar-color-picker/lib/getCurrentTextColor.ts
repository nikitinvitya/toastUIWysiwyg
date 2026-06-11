import {getEditorContentRoot} from '../../toolbar/lib/findNodeAtCursor.ts'

function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (!match) {
    return null
  }

  const [, red, green, blue] = match
  return `#${[red, green, blue]
    .map((value) => Number(value).toString(16).padStart(2, '0'))
    .join('')}`
}

function normalizeColor(color: string): string {
  const trimmed = color.trim().toLowerCase()
  if (trimmed.startsWith('#')) {
    return trimmed.length === 4
      ? `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`
      : trimmed
  }

  const hex = rgbToHex(trimmed)
  return hex ?? trimmed
}

export function getCurrentTextColor(): string | null {
  const selection = window.getSelection()
  if (!selection?.rangeCount) {
    return null
  }

  const root = getEditorContentRoot()
  let node: Node | null = selection.anchorNode
  while (node && node !== root) {
    if (node instanceof HTMLElement) {
      const inlineColor = node.style.color
      if (inlineColor) {
        return normalizeColor(inlineColor)
      }
    }
    node = node.parentNode
  }

  return null
}
