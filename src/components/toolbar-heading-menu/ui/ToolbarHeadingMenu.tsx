import {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TitleIcon from '@mui/icons-material/Title'
import {headingMenuConfig} from '../config/headingMenuConfig.ts'

type ToolbarHeadingMenuProps = {
  onCommand: (id: string, payload?: Record<string, unknown>) => void
}

export function ToolbarHeadingMenu({onCommand}: ToolbarHeadingMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (level?: number) => {
    onCommand('heading', level ? {level} : {})
    handleClose()
  }

  return (
    <>
      <Tooltip title="Heading">
        <span onMouseDown={(e) => e.preventDefault()}>
          <IconButton size="small" onClick={handleOpen}>
            <TitleIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        autoFocus={false}
        disableAutoFocusItem
      >
        {headingMenuConfig.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleSelect(item.level)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
