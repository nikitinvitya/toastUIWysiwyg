import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import type {LinkEditContext} from './linkEditContext.ts'
import {replaceLinkInMarkdown} from './linkMarkdown.ts'
import {removeLinkFromEditor} from './removeLinkFromEditor.ts'

export const applyLinkFromDialog = (
  instance: ToastEditorInstance,
  href: string,
  label: string,
  context?: LinkEditContext | null,
) => {
  const trimmedHref = href.trim()
  const trimmedLabel = label.trim()

  if (!trimmedHref) {
    removeLinkFromEditor(instance, context)
    return
  }

  if (context?.previousUrl) {
    const markdown = instance.getMarkdown()
    const nextText = trimmedLabel || context.previousText || trimmedHref
    const nextMarkdown = replaceLinkInMarkdown(
      markdown,
      context.previousText,
      context.previousUrl,
      nextText,
      trimmedHref,
    )

    if (nextMarkdown !== markdown) {
      instance.focus()
      instance.setMarkdown(nextMarkdown)
      return
    }
  }

  instance.focus()
  const selectedText = instance.getSelectedText()

  if (selectedText) {
    const displayText = trimmedLabel || selectedText || trimmedHref
    const linkText = displayText === selectedText ? '' : displayText
    instance.exec('addLink', {linkUrl: trimmedHref, linkText})
    return
  }

  if (trimmedLabel) {
    instance.exec('addLink', {linkUrl: trimmedHref, linkText: trimmedLabel})
    return
  }

  instance.exec('addLink', {linkUrl: trimmedHref, linkText: trimmedHref})
}
