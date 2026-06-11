import {createContext, useContext} from "react";
import type {ThemeMode} from "../../components/theme/theme.ts";

export type ThemeModeContextValue = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

export const useThemeMode = () => {
  const value = useContext(ThemeModeContext)
  if(!value) {
    throw new Error('theme error')
  }

  return value
}