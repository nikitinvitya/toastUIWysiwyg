import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {findNodeAtCursor} from '../../toolbar/lib/findNodeAtCursor.ts'
import type {LinkEditContext} from './linkEditContext.ts'

export function getLinkDialogValues(
  instance: ToastEditorInstance,
  context?: LinkEditContext | null,
): {
  text: string
  url: string
} {
  if (context?.previousUrl) {
    return {
      text: context.previousText,
      url: context.previousUrl,
    }
  }

  const link = findNodeAtCursor<HTMLAnchorElement>('a')
  if (link) {
    return {
      text: link.textContent?.trim() ?? '',
      url: link.getAttribute('href') ?? '',
    }
  }

  return {
    text: instance.getSelectedText(),
    url: '',
  }
}
