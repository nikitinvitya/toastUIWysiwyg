import type {ToastEditorInstance} from '../model/toastEditorInstance.ts'

export type CommandPayload = Record<string, unknown>

export function runCommand(
  instance: ToastEditorInstance,
  id: string,
  payload?: CommandPayload,
): void {
  instance.focus()

  switch (id) {
    case 'bold':
      instance.exec('bold')
      break
    case 'italic':
      instance.exec('italic')
      break
    case 'strike':
      instance.exec('strike')
      break
    case 'ul':
      instance.exec('bulletList')
      break
    case 'ol':
      instance.exec('orderedList')
      break
    case 'quote':
      instance.exec('blockQuote')
      break
    case 'hr':
      instance.exec('hr')
      break
    case 'code':
      instance.exec('code')
      break
    case 'codeblock':
      instance.exec('codeBlock')
      break
    case 'heading':
      instance.exec('heading', payload ?? {})
      break
    default:
      break
  }
}
