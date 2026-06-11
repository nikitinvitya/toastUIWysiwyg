import {useState} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {insertTable} from '../lib/insertTableInEditor.ts'
import {removeTableFromEditor} from '../lib/removeTableFromEditor.ts'
import cls from './ToolbarTableButton.module.css'

type TableInsertDialogProps = {
  open: boolean
  onClose: () => void
  instance: ToastEditorInstance
  canRemoveTable?: boolean
}

type TableInsertDialogContentProps = {
  instance: ToastEditorInstance
  canRemoveTable: boolean
  onClose: () => void
}

function TableInsertDialogContent({
  instance,
  canRemoveTable,
  onClose,
}: TableInsertDialogContentProps) {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)

  const handleInsert = () => {
    insertTable(instance, rows, cols)
    onClose()
  }

  const handleRemove = () => {
    removeTableFromEditor(instance)
    onClose()
  }

  return (
    <>
      <DialogTitle className={cls.title}>Insert Table</DialogTitle>
      <DialogContent className={cls.inputs}>
        <TextField
          margin="normal"
          label="Rows"
          type="number"
          value={rows}
          onChange={(e) => {
            const value = Number(e.target.value)
            setRows(Number.isNaN(value) ? 1 : Math.max(1, value))
          }}
        />
        <TextField
          margin="normal"
          label="Columns"
          type="number"
          value={cols}
          onChange={(e) => {
            const value = Number(e.target.value)
            setCols(Number.isNaN(value) ? 1 : Math.max(1, value))
          }}
        />
      </DialogContent>
      <DialogActions className={cls.actions}>
        <Button onClick={handleRemove} disabled={!canRemoveTable}>
          Remove
        </Button>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleInsert}>Insert</Button>
      </DialogActions>
    </>
  )
}

export function TableInsertDialog({
  open,
  onClose,
  instance,
  canRemoveTable = false,
}: TableInsertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      {open && (
        <TableInsertDialogContent
          instance={instance}
          canRemoveTable={canRemoveTable}
          onClose={onClose}
        />
      )}
    </Dialog>
  )
}
