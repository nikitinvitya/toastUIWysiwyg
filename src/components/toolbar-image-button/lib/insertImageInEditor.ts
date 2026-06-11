import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import type {ImageEditContext} from './imageEditContext.ts'
import {removeImageFromMarkdown, replaceImageSrcInMarkdown} from './imageMarkdown.ts'

export function insertImage(
  instance: ToastEditorInstance,
  imageUrl: string,
  altText = '',
): boolean {
  const trimmed = imageUrl.trim()
  if (!trimmed) {
    return false
  }

  instance.focus()
  instance.exec('addImage', {imageUrl: trimmed, altText})
  return true
}

export function replaceOrInsertImage(
  instance: ToastEditorInstance,
  newSrc: string,
  context?: ImageEditContext | null,
  altText = '',
): boolean {
  const trimmed = newSrc.trim()
  if (!trimmed) {
    return false
  }

  const previousSrc = context?.previousSrc.trim()
  if (previousSrc) {
    const markdown = instance.getMarkdown()
    const nextMarkdown = replaceImageSrcInMarkdown(markdown, previousSrc, trimmed)
    if (nextMarkdown !== markdown) {
      instance.focus()
      instance.setMarkdown(nextMarkdown)
      return true
    }
  }

  return insertImage(instance, trimmed, altText)
}

export function removeImageFromContext(
  instance: ToastEditorInstance,
  context?: ImageEditContext | null,
): void {
  const previousSrc = context?.previousSrc.trim()
  if (previousSrc) {
    const markdown = instance.getMarkdown()
    const nextMarkdown = removeImageFromMarkdown(markdown, previousSrc)
    if (nextMarkdown !== markdown) {
      instance.focus()
      instance.setMarkdown(nextMarkdown)
      return
    }
  }

  instance.focus()
  instance.deleteSelection()
}
