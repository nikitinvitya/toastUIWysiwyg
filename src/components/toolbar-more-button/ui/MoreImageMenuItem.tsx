import {ListItemIcon, ListItemText, MenuItem} from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

type MoreImageMenuItemProps = {
  onPrepare: () => void
  onSelect: () => void
}

export function MoreImageMenuItem({onPrepare, onSelect}: MoreImageMenuItemProps) {
  return (
    <MenuItem
      onMouseDown={(event) => {
        event.preventDefault()
        onPrepare()
      }}
      onClick={onSelect}
    >
      <ListItemIcon>
        <ImageOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Image</ListItemText>
    </MenuItem>
  )
}
