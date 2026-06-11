import {ListItemText, MenuItem} from '@mui/material'
import TitleIcon from '@mui/icons-material/Title'
import {headingMenuConfig} from '../config/headingMenuConfig.ts'

type MoreHeadingMenuItemProps = {
  onCommand: (id: string, payload?: Record<string, unknown>) => void
  onDone: () => void
}

export function MoreHeadingMenuItem({onCommand, onDone}: MoreHeadingMenuItemProps) {
  return (
    <>
      {headingMenuConfig.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => {
            onCommand('heading', item.level ? {level: item.level} : {})
            onDone()
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <TitleIcon fontSize="small" sx={{mr: 1}} />
          <ListItemText>{item.title}</ListItemText>
        </MenuItem>
      ))}
    </>
  )
}
