import {Box, Divider, Paper, Stack} from '@mui/material'
import {TOOLBAR_VISIBLE_GROUPS} from '../config/toolbarItems.ts'
import {useToolbarLayout} from '../hooks/useToolbarLayout.ts'
import type {ToastEditorInstance} from '../model/toastEditorInstance.ts'
import {ToolbarMoreButton} from '../../toolbar-more-button/ui/ToolbarMoreButton.tsx'
import {ToolbarItemRenderer} from './ToolbarItemRenderer.tsx'
import cls from './Toolbar.module.css'

type ToolbarProps = {
  onCommand: (id: string, payload?: Record<string, unknown>) => void
  getInstance: () => ToastEditorInstance | null
  onMenuOpenChange?: (open: boolean) => void
}

export function Toolbar({onCommand, getInstance, onMenuOpenChange}: ToolbarProps) {
  const {containerRef, layout} = useToolbarLayout()

  return (
    <Box ref={containerRef} className={cls.toolbarSlot}>
      <Paper className={cls.toolbar} elevation={0}>
        <Stack direction="row" alignItems="center">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" className={cls.divider} />}
          >
            {TOOLBAR_VISIBLE_GROUPS.map((groupIds, index) => {
              const ids = groupIds.filter((id) => layout.visibleIds.includes(id))
              if (!ids.length) {
                return null
              }
              return (
                <Stack key={index} direction="row">
                  {ids.map((id) => (
                    <ToolbarItemRenderer
                      key={id}
                      id={id}
                      onCommand={onCommand}
                      getInstance={getInstance}
                    />
                  ))}
                </Stack>
              )
            })}
          </Stack>
          <ToolbarMoreButton
            itemIds={layout.overflowIds}
            onCommand={onCommand}
            getInstance={getInstance}
            onMenuOpenChange={onMenuOpenChange}
          />
        </Stack>
      </Paper>
    </Box>
  )
}
