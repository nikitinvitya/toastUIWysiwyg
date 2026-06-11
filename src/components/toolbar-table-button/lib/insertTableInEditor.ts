import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'

export function insertTable(
  instance: ToastEditorInstance,
  rows: number,
  cols: number,
): void {
  instance.focus()
  instance.exec('addTable', {rowCount: rows, columnCount: cols})
}
