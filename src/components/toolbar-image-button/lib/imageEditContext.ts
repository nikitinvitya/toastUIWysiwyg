import {findNodeAtCursor} from '../../toolbar/lib/findNodeAtCursor.ts'

export type ImageEditContext = {
  previousSrc: string
}

export function captureImageEditContext(): ImageEditContext {
  const image = findNodeAtCursor<HTMLImageElement>('img')
  if (!image) {
    return {previousSrc: ''}
  }

  return {previousSrc: image.getAttribute('src') ?? ''}
}
