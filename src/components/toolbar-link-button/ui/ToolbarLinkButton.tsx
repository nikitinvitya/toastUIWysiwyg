import {useRef, useState, type MouseEvent} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LinkIcon from '@mui/icons-material/Link'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {captureLinkEditContext, type LinkEditContext} from '../lib/linkEditContext.ts'
import {getLinkDialogValues} from '../lib/getLinkDialogValues.ts'
import {LinkInsertDialog} from './LinkInsertDialog.tsx'

type ToolbarLinkButtonProps = {
  instance: ToastEditorInstance
}

export function ToolbarLinkButton({instance}: ToolbarLinkButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialText, setInitialText] = useState('')
  const [initialUrl, setInitialUrl] = useState('')
  const [editContext, setEditContext] = useState<LinkEditContext | null>(null)
  const pendingContextRef = useRef<LinkEditContext | null>(null)

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    pendingContextRef.current = captureLinkEditContext()
  }

  const handleOpen = () => {
    const context = pendingContextRef.current ?? captureLinkEditContext()
    const values = getLinkDialogValues(instance, context)
    setEditContext(context)
    setInitialUrl(values.url)
    setInitialText(values.text)
    setIsOpen(true)
  }

  return (
    <>
      <Tooltip title="Link">
        <span onMouseDown={handleMouseDown}>
          <IconButton size="small" onClick={handleOpen}>
            <LinkIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <LinkInsertDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        instance={instance}
        initialText={initialText}
        initialUrl={initialUrl}
        editContext={editContext}
      />
    </>
  )
}
