import {type ReactNode, useEffect, useMemo, useState} from "react";
import {ThemeModeContext, type ThemeModeContextValue} from "./hooks/useThemeMode.ts";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme, type ThemeMode} from "../components/theme/theme.ts";

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({children}: AppProvidersProps) {
  const [mode, setMode] = useState<ThemeMode>('light')
  const theme = useMemo(() => getTheme(mode), [mode])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  const contextValue = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => {
        setMode((current) => current === 'light' ? 'dark' : 'light')
      }
    }), [mode])

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}