export function isFocusInsideMuiOverlay(node: Node | null): boolean {
  return (
    node instanceof Element &&
    node.closest('[role="dialog"], [role="menu"], .MuiModal-root, .MuiPopover-root') !== null
  )
}

export function shouldStayFocused(root: HTMLElement | null): boolean {
  if (!root) {
    return false
  }
  const active = document.activeElement
  if (active && root.contains(active)) {
    return true
  }
  return isFocusInsideMuiOverlay(active)
}
