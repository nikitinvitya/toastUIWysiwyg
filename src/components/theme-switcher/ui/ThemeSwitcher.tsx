import {useThemeMode} from "../../../app/hooks/useThemeMode.ts";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const ThemeSwitcher = () => {
  const {mode, toggleMode} = useThemeMode()

  return (
    <IconButton
      onClick={toggleMode}
      title={'Switch Theme'}
    >
      {mode === 'light' ?
        <DarkModeIcon fontSize={'small'} /> :
        <LightModeIcon fontSize={'small'} />
      }
    </IconButton>
  )
}