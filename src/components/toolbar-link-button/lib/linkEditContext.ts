import {findNodeAtCursor} from '../../toolbar/lib/findNodeAtCursor.ts'

export type LinkEditContext = {
  previousUrl: string
  previousText: string
}

export function captureLinkEditContext(): LinkEditContext {
  const link = findNodeAtCursor<HTMLAnchorElement>('a')
  if (!link) {
    return {previousUrl: '', previousText: ''}
  }

  return {
    previousUrl: link.getAttribute('href') ?? '',
    previousText: link.textContent?.trim() ?? '',
  }
}
