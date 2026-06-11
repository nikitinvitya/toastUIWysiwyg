import type {ThemeMode} from '../../theme/theme.ts'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import type {ColorPickerItem} from '../model/colorPickerTypes.ts'
import {defaultTextColor, isDefaultColor} from './defaultTextColor.ts'
import {restoreEditorSelection, type EditorTextSelection} from './editorSelection.ts'

type ApplyTextColorParams = {
  color: ColorPickerItem
  instance: ToastEditorInstance
  currentColor: string | null
  mode: ThemeMode
  selection: EditorTextSelection | null
}

export function applyTextColor({
  color,
  instance,
  currentColor,
  mode,
  selection,
}: ApplyTextColorParams): void {
  restoreEditorSelection(instance, selection)
  instance.focus()

  let selectedColor: string | undefined

  if (color.id === 'default') {
    if (currentColor && !isDefaultColor(currentColor, mode)) {
      selectedColor = defaultTextColor[mode]
    } else if (mode === 'light') {
      selectedColor = defaultTextColor.light
    } else {
      selectedColor = defaultTextColor.dark
    }
  } else {
    selectedColor = color.value
  }

  if (selectedColor) {
    instance.exec('color', {selectedColor})
  }
}
