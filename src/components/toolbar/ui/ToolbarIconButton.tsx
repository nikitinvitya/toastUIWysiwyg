import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import type {ToolbarItem} from '../model/toolbarTypes.ts'

type ToolbarIconButtonProps = {
  item: ToolbarItem
  onCommand: (id: string) => void
}

export function ToolbarIconButton({item, onCommand}: ToolbarIconButtonProps) {
  const Icon = item.icon

  return (
    <Tooltip title={item.title}>
      <span onMouseDown={(e) => e.preventDefault()}>
        <IconButton size="small" onClick={() => onCommand(item.id)}>
          <Icon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  )
}
