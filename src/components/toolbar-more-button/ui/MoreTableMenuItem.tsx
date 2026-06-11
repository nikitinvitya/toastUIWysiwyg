import {ListItemIcon, ListItemText, MenuItem} from '@mui/material'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'

type MoreTableMenuItemProps = {
  onSelect: () => void
}

export function MoreTableMenuItem({onSelect}: MoreTableMenuItemProps) {
  return (
    <MenuItem onClick={onSelect} onMouseDown={(e) => e.preventDefault()}>
      <ListItemIcon>
        <TableChartOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Table</ListItemText>
    </MenuItem>
  )
}
