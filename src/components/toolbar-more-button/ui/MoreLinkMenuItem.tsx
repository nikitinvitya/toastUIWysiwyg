import {ListItemIcon, ListItemText, MenuItem} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'

type MoreLinkMenuItemProps = {
  onPrepare: () => void
  onSelect: () => void
}

export function MoreLinkMenuItem({onPrepare, onSelect}: MoreLinkMenuItemProps) {
  return (
    <MenuItem
      onMouseDown={(event) => {
        event.preventDefault()
        onPrepare()
      }}
      onClick={onSelect}
    >
      <ListItemIcon>
        <LinkIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Link</ListItemText>
    </MenuItem>
  )
}
