import {useRef, useState} from 'react'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import {useThemeMode} from '../../../app/hooks/useThemeMode.ts'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {colorPickerConfig} from '../config/colorPickerConfig.ts'
import {applyTextColor} from '../lib/applyTextColor.ts'
import {captureEditorSelection, type EditorTextSelection} from '../lib/editorSelection.ts'
import {isDefaultColor} from '../lib/defaultTextColor.ts'
import {getCurrentTextColor} from '../lib/getCurrentTextColor.ts'
import cls from './ToolbarColorPicker.module.css'

type MoreColorMenuItemProps = {
  instance: ToastEditorInstance
  onDone: () => void
}

export function MoreColorMenuItem({instance, onDone}: MoreColorMenuItemProps) {
  const [paletteAnchor, setPaletteAnchor] = useState<null | HTMLElement>(null)
  const [currentColor, setCurrentColor] = useState<string | null>(null)
  const selectionRef = useRef<EditorTextSelection | null>(null)
  const {mode} = useThemeMode()
  const isPaletteOpen = Boolean(paletteAnchor)

  return (
    <>
      <MenuItem
        selected={Boolean(currentColor) && !isDefaultColor(currentColor, mode)}
        onMouseDown={() => {
          selectionRef.current = captureEditorSelection(instance)
        }}
        onClick={(event) => {
          event.stopPropagation()
          selectionRef.current = captureEditorSelection(instance)
          setCurrentColor(getCurrentTextColor())
          setPaletteAnchor(event.currentTarget)
        }}
      >
        <ListItemIcon>
          <FormatColorTextIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Color</ListItemText>
      </MenuItem>

      <Menu
        open={isPaletteOpen}
        anchorEl={paletteAnchor}
        onClose={() => setPaletteAnchor(null)}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'left'}}
      >
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
                setPaletteAnchor(null)
                onDone()
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
