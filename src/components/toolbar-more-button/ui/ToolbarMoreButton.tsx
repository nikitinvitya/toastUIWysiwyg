import {useState, type MouseEvent} from 'react'
import AddIcon from '@mui/icons-material/Add'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {MoreMenuItem, type OverflowDialogContext} from './MoreMenuItem.tsx'
import {MoreOverflowDialogs, type MoreDialogId} from './MoreOverflowDialogs.tsx'

type ToolbarMoreButtonProps = {
  itemIds: string[]
  onCommand: (id: string, payload?: Record<string, unknown>) => void
  getInstance: () => ToastEditorInstance | null
  onMenuOpenChange?: (open: boolean) => void
}

export function ToolbarMoreButton({
  itemIds,
  onCommand,
  getInstance,
  onMenuOpenChange,
}: ToolbarMoreButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dialogId, setDialogId] = useState<MoreDialogId | null>(null)
  const [dialogContext, setDialogContext] = useState<OverflowDialogContext | null>(null)
  const isOpen = Boolean(anchorEl)

  if (!itemIds.length) {
    return null
  }

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    onMenuOpenChange?.(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    onMenuOpenChange?.(false)
  }

  const handlePickDialog = (id: MoreDialogId, context?: OverflowDialogContext) => {
    setDialogContext(context ?? null)
    setDialogId(id)
  }

  const handleCloseDialog = () => {
    setDialogId(null)
    setDialogContext(null)
  }

  return (
    <>
      <Tooltip title="More">
        <span onMouseDown={(e) => e.preventDefault()}>
          <IconButton size="small" onClick={handleOpen}>
            <AddIcon fontSize="small" />
            <ArrowDropDownIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        autoFocus={false}
        disableAutoFocusItem
      >
        {itemIds.map((id) => (
          <MoreMenuItem
            key={id}
            id={id}
            onCommand={onCommand}
            getInstance={getInstance}
            onDone={handleClose}
            onPickDialog={handlePickDialog}
          />
        ))}
      </Menu>

      <MoreOverflowDialogs
        dialogId={dialogId}
        instance={getInstance()}
        dialogContext={dialogContext}
        onClose={handleCloseDialog}
      />
    </>
  )
}
