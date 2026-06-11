import {useState} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {applyLinkFromDialog} from '../lib/applyLinkFromDialog.ts'
import type {LinkEditContext} from '../lib/linkEditContext.ts'
import {removeLinkFromEditor} from '../lib/removeLinkFromEditor.ts'
import cls from './ToolbarLinkButton.module.css'

type LinkInsertDialogProps = {
  open: boolean
  onClose: () => void
  instance: ToastEditorInstance
  initialText?: string
  initialUrl?: string
  editContext?: LinkEditContext | null
}

type LinkInsertDialogContentProps = {
  instance: ToastEditorInstance
  initialText: string
  initialUrl: string
  editContext: LinkEditContext | null
  onClose: () => void
}

function LinkInsertDialogContent({
  instance,
  initialText,
  initialUrl,
  editContext,
  onClose,
}: LinkInsertDialogContentProps) {
  const [text, setText] = useState(initialText)
  const [url, setUrl] = useState(initialUrl)

  const handleRemove = () => {
    removeLinkFromEditor(instance, editContext)
    onClose()
  }

  const handleApply = () => {
    applyLinkFromDialog(instance, url, text, editContext)
    onClose()
  }

  return (
    <>
      <DialogTitle className={cls.title}>Insert Link</DialogTitle>
      <DialogContent className={cls.inputs}>
        <TextField
          margin="normal"
          label="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          margin="normal"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions className={cls.actions}>
        <Button onClick={handleRemove}>Remove</Button>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </>
  )
}

export function LinkInsertDialog({
  open,
  onClose,
  instance,
  initialText = '',
  initialUrl = '',
  editContext = null,
}: LinkInsertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      {open && (
        <LinkInsertDialogContent
          key={`${initialText}-${initialUrl}-${editContext?.previousUrl ?? ''}`}
          instance={instance}
          initialText={initialText}
          initialUrl={initialUrl}
          editContext={editContext}
          onClose={onClose}
        />
      )}
    </Dialog>
  )
}
