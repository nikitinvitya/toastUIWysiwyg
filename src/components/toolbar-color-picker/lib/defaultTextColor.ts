import type {ThemeMode} from '../../theme/theme.ts'

export const defaultTextColor = {
  light: '#1a1a1a',
  dark: '#e0e0e0',
} as const

export function isDefaultColor(current: string | null, mode: ThemeMode): boolean {
  if (!current) {
    return true
  }
  return current === defaultTextColor[mode]
}
