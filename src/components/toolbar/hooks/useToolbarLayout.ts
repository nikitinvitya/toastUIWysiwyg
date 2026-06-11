import { useLayoutEffect, useRef, useState } from 'react'
import { computeToolbarLayout, type ToolbarLayoutResult } from '../config/computeToolbarLayout.ts'
import { PRIMARY_TOOLBARS_IDS, SECONDARY_TOOLBAR_IDS } from '../config/layout.ts'

const defaultLayout: ToolbarLayoutResult = {
  visibleIds: PRIMARY_TOOLBARS_IDS,
  overflowIds: [...SECONDARY_TOOLBAR_IDS],
}

export function useToolbarLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<ToolbarLayoutResult>(defaultLayout)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const width = el.getBoundingClientRect().width
      if (width === 0) {
        return
      }
      setLayout(computeToolbarLayout(width))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { containerRef, layout }
}