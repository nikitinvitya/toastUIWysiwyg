import {useRef} from 'react'
import {ListItemIcon, ListItemText, MenuItem} from '@mui/material'
import {getToolbarItem} from '../../toolbar/config/toolbarItems.ts'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {MoreHeadingMenuItem} from '../../toolbar-heading-menu/ui/MoreHeadingMenuItem.tsx'
import {
  captureImageEditContext,
  type ImageEditContext,
} from '../../toolbar-image-button/lib/imageEditContext.ts'
import {
  captureLinkEditContext,
  type LinkEditContext,
} from '../../toolbar-link-button/lib/linkEditContext.ts'
import {MoreColorMenuItem} from '../../toolbar-color-picker/ui/MoreColorMenuItem.tsx'
import {MoreImageMenuItem} from './MoreImageMenuItem.tsx'
import {MoreLinkMenuItem} from './MoreLinkMenuItem.tsx'
import {MoreTableMenuItem} from './MoreTableMenuItem.tsx'
import type {MoreDialogId} from './MoreOverflowDialogs.tsx'

export type OverflowDialogContext = {
  link?: LinkEditContext
  image?: ImageEditContext
}

type MoreMenuItemProps = {
  id: string
  onCommand: (id: string, payload?: Record<string, unknown>) => void
  getInstance: () => ToastEditorInstance | null
  onDone: () => void
  onPickDialog: (id: MoreDialogId, context?: OverflowDialogContext) => void
}

export function MoreMenuItem({
  id,
  onCommand,
  getInstance,
  onDone,
  onPickDialog,
}: MoreMenuItemProps) {
  const linkContextRef = useRef<LinkEditContext | null>(null)
  const imageContextRef = useRef<ImageEditContext | null>(null)

  if (id === 'heading') {
    return <MoreHeadingMenuItem onCommand={onCommand} onDone={onDone} />
  }

  if (id === 'color') {
    const instance = getInstance()
    if (!instance) {
      return null
    }
    return <MoreColorMenuItem instance={instance} onDone={onDone} />
  }

  if (id === 'link') {
    return (
      <MoreLinkMenuItem
        onPrepare={() => {
          linkContextRef.current = captureLinkEditContext()
        }}
        onSelect={() => {
          onPickDialog('link', {link: linkContextRef.current ?? undefined})
          onDone()
        }}
      />
    )
  }

  if (id === 'image') {
    return (
      <MoreImageMenuItem
        onPrepare={() => {
          imageContextRef.current = captureImageEditContext()
        }}
        onSelect={() => {
          onPickDialog('image', {image: imageContextRef.current ?? undefined})
          onDone()
        }}
      />
    )
  }

  if (id === 'table') {
    return (
      <MoreTableMenuItem
        onSelect={() => {
          onPickDialog('table')
          onDone()
        }}
      />
    )
  }

  const item = getToolbarItem(id)
  if (!item) {
    return null
  }

  const Icon = item.icon

  return (
    <MenuItem
      onClick={() => {
        onCommand(id)
        onDone()
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{item.title}</ListItemText>
    </MenuItem>
  )
}
