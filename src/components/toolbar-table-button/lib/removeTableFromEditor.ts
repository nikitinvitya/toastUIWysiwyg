import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'

export function removeTableFromEditor(instance: ToastEditorInstance): void {
  instance.focus()
  instance.exec('removeTable')
}
