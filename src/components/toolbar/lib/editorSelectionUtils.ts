import {findNodeAtCursor} from './findNodeAtCursor.ts'

export function isCursorInTable(): boolean {
  return findNodeAtCursor<HTMLTableElement>('table') !== null
}
