import {getToolbarItem} from '../config/toolbarItems.ts'
import type {ToastEditorInstance} from '../model/toastEditorInstance.ts'
import {ToolbarHeadingMenu} from '../../toolbar-heading-menu/ui/ToolbarHeadingMenu.tsx'
import {ToolbarColorPicker} from '../../toolbar-color-picker/ui/ToolbarColorPicker.tsx'
import {ToolbarImageButton} from '../../toolbar-image-button/ui/ToolbarImageButton.tsx'
import {ToolbarLinkButton} from '../../toolbar-link-button/ui/ToolbarLinkButton.tsx'
import {ToolbarIconButton} from './ToolbarIconButton.tsx'

type ToolbarItemRendererProps = {
  id: string
  onCommand: (id: string, payload?: Record<string, unknown>) => void
  getInstance: () => ToastEditorInstance | null
}

export function ToolbarItemRenderer({id, onCommand, getInstance}: ToolbarItemRendererProps) {
  switch (id) {
    case 'heading':
      return <ToolbarHeadingMenu onCommand={onCommand} />
    case 'color': {
      const instance = getInstance()
      if (!instance) {
        return null
      }
      return <ToolbarColorPicker instance={instance} />
    }
    case 'image': {
      const instance = getInstance()
      if (!instance) {
        return null
      }
      return <ToolbarImageButton instance={instance} />
    }
    case 'link': {
      const instance = getInstance()
      if (!instance) {
        return null
      }
      return <ToolbarLinkButton instance={instance} />
    }
    default: {
      const item = getToolbarItem(id)
      if (!item) {
        return null
      }
      return <ToolbarIconButton item={item} onCommand={onCommand} />
    }
  }
}
