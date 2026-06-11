import {useState} from 'react'
import {Button} from '@mui/material'
import {EditorField} from './components/editor-field/ui/EditorField.tsx'
import {ThemeSwitcher} from './components/theme-switcher/ui/ThemeSwitcher.tsx'

function App() {
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)

  return (
    <>
      <ThemeSwitcher />

      <EditorField
        label="Input label"
        error={error}
        disabled={disabled}
      />

      <Button onClick={() => setError((prev) => !prev)}>
        Error status
      </Button>
      <Button onClick={() => setDisabled((prev) => !prev)}>
        Disable status
      </Button>
    </>
  )
}

export default App
