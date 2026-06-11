import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import type {LinkEditContext} from './linkEditContext.ts'
import {unwrapLinkInMarkdown} from './linkMarkdown.ts'

export function removeLinkFromEditor(
  instance: ToastEditorInstance,
  context?: LinkEditContext | null,
): void {
  if (context?.previousUrl) {
    const markdown = instance.getMarkdown()
    const nextMarkdown = unwrapLinkInMarkdown(
      markdown,
      context.previousText,
      context.previousUrl,
    )

    if (nextMarkdown !== markdown) {
      instance.focus()
      instance.setMarkdown(nextMarkdown)
      return
    }
  }

  instance.focus()
  instance.exec('toggleLink')
}
