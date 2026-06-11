import {
  PRIMARY_TOOLBARS_IDS,
  SECONDARY_TOOLBAR_IDS,
  COLLAPSE_ORDER,
} from './layout.ts'

export const TOOLBAR_LAYOUT = {
  moreButtonWidth: 40,
  dividerWidth: 17,
  toolbarPaddingX: 16,
  defaultItemWidth: 32,
  dividersCount: 2,
} as const

export type ToolbarLayoutResult = {
  visibleIds: readonly string[]
  overflowIds: string[]
}

function measureWidth(
  visibleIds: readonly string[],
  widths: Record<string, number>,
): number {
  const L = TOOLBAR_LAYOUT
  let w = L.toolbarPaddingX + L.moreButtonWidth + L.dividersCount * L.dividerWidth
  for (const id of visibleIds) {
    w += widths[id] ?? L.defaultItemWidth
  }
  return w
}

export function computeToolbarLayout(
  containerWidth: number,
  itemWidths: Record<string, number> = {},
): ToolbarLayoutResult {
  const hidden = new Set<string>()

  const visible = () => PRIMARY_TOOLBARS_IDS.filter((id) => !hidden.has(id))

  while (measureWidth(visible(), itemWidths) > containerWidth) {
    const next = COLLAPSE_ORDER.find((id) => !hidden.has(id))
    if (!next) break
    hidden.add(next)
  }

  const collapsedList: string[] = []
  for (const id of COLLAPSE_ORDER) {
    if (hidden.has(id)) collapsedList.push(id)
  }

  while (collapsedList.length > 0) {
    const candidate = collapsedList[collapsedList.length - 1]
    const tryVisible = PRIMARY_TOOLBARS_IDS.filter(
      (id) => !hidden.has(id) || id === candidate,
    )
    if (measureWidth(tryVisible, itemWidths) > containerWidth) break
    hidden.delete(candidate)
    collapsedList.pop()
  }

  const visibleIds = visible()
  const collapsedIds = COLLAPSE_ORDER.filter((id) => hidden.has(id))
  const overflowIds = [...collapsedIds.slice().reverse(), ...SECONDARY_TOOLBAR_IDS]

  return { visibleIds, overflowIds }
}