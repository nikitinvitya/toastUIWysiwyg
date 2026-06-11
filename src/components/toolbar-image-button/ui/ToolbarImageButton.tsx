import {useRef, useState, type MouseEvent} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {captureImageEditContext, type ImageEditContext} from '../lib/imageEditContext.ts'
import {ImageInsertDialog} from './ImageInsertDialog.tsx'

type ToolbarImageButtonProps = {
  instance: ToastEditorInstance
}

export function ToolbarImageButton({instance}: ToolbarImageButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialSrc, setInitialSrc] = useState('')
  const [editContext, setEditContext] = useState<ImageEditContext | null>(null)
  const pendingContextRef = useRef<ImageEditContext | null>(null)

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    pendingContextRef.current = captureImageEditContext()
  }

  const handleOpen = () => {
    const context = pendingContextRef.current ?? captureImageEditContext()
    setEditContext(context)
    setInitialSrc(context.previousSrc)
    setIsOpen(true)
  }

  return (
    <>
      <Tooltip title="Image">
        <span onMouseDown={handleMouseDown}>
          <IconButton size="small" onClick={handleOpen}>
            <ImageOutlinedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <ImageInsertDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        instance={instance}
        initialSrc={initialSrc}
        editContext={editContext}
      />
    </>
  )
}
