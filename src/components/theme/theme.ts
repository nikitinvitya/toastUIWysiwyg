import { createTheme } from "@mui/material/styles"

export type ThemeMode = 'light' | 'dark'

export const getTheme = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode
    }
  })
}