import {useRef, useState, type ChangeEvent} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import type {ImageEditContext} from '../lib/imageEditContext.ts'
import {removeImageFromContext, replaceOrInsertImage} from '../lib/insertImageInEditor.ts'
import {readImageFileAsDataUrl} from '../lib/readImageFileAsDataUrl.ts'
import cls from './ToolbarImageButton.module.css'

type ImageInsertDialogProps = {
  open: boolean
  onClose: () => void
  instance: ToastEditorInstance
  initialSrc?: string
  editContext?: ImageEditContext | null
}

type ImageInsertDialogContentProps = {
  instance: ToastEditorInstance
  initialSrc: string
  editContext: ImageEditContext | null
  onClose: () => void
}

function ImageInsertDialogContent({
  instance,
  initialSrc,
  editContext,
  onClose,
}: ImageInsertDialogContentProps) {
  const [url, setUrl] = useState(initialSrc)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleApply = () => {
    if (replaceOrInsertImage(instance, url, editContext)) {
      onClose()
    }
  }

  const handleRemove = () => {
    removeImageFromContext(instance, editContext)
    onClose()
  }

  const handlePickFile = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    try {
      const dataUrl = await readImageFileAsDataUrl(file)
      if (replaceOrInsertImage(instance, dataUrl, editContext, file.name)) {
        onClose()
      }
    } catch {
      return
    }
  }

  return (
    <>
      <DialogTitle className={cls.title}>Insert image</DialogTitle>
      <DialogContent className={cls.inputs}>
        <TextField
          margin="normal"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <Typography>or</Typography>
        <Button variant="outlined" onClick={handlePickFile}>
          Upload from computer
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
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

export function ImageInsertDialog({
  open,
  onClose,
  instance,
  initialSrc = '',
  editContext = null,
}: ImageInsertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      {open && (
        <ImageInsertDialogContent
          key={`${initialSrc}-${editContext?.previousSrc ?? ''}`}
          instance={instance}
          initialSrc={initialSrc}
          editContext={editContext}
          onClose={onClose}
        />
      )}
    </Dialog>
  )
}
