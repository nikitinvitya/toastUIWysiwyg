import {useRef, useState, type MouseEvent} from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Tooltip from '@mui/material/Tooltip'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import {useThemeMode} from '../../../app/hooks/useThemeMode.ts'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {colorPickerConfig} from '../config/colorPickerConfig.ts'
import {applyTextColor} from '../lib/applyTextColor.ts'
import {captureEditorSelection, type EditorTextSelection} from '../lib/editorSelection.ts'
import {isDefaultColor} from '../lib/defaultTextColor.ts'
import {getCurrentTextColor} from '../lib/getCurrentTextColor.ts'
import cls from './ToolbarColorPicker.module.css'

type ToolbarColorPickerProps = {
  instance: ToastEditorInstance
}

export function ToolbarColorPicker({instance}: ToolbarColorPickerProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currentColor, setCurrentColor] = useState<string | null>(null)
  const selectionRef = useRef<EditorTextSelection | null>(null)
  const {mode} = useThemeMode()
  const isOpen = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    selectionRef.current = captureEditorSelection(instance)
    setCurrentColor(getCurrentTextColor())
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title="Color">
        <span
          onMouseDown={() => {
            selectionRef.current = captureEditorSelection(instance)
          }}
        >
          <IconButton size="small" onClick={handleOpen}>
            <FormatColorTextIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <MenuList className={cls.colorMenuList} disablePadding>
          {colorPickerConfig.map((color) => (
            <MenuItem
              key={color.id}
              title={color.title}
              selected={
                color.id === 'default'
                  ? isDefaultColor(currentColor, mode)
                  : currentColor === color.value
              }
              onClick={() => {
                applyTextColor({
                  color,
                  instance,
                  currentColor,
                  mode,
                  selection: selectionRef.current,
                })
                handleClose()
              }}
            >
              <Box className={`${cls.colorPaletteItem} ${cls[color.id]}`} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}
