import '@photontest/toast-ui-editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import {Box, FormControl, InputLabel} from '@mui/material'
import {Editor as ToastEditor} from '@photontest/toast-ui-editor-react'
import {useCallback, useEffect, useRef, useState} from 'react'
import {
  applyContentElementState,
  getEditorContentElement,
  isMarkdownEmpty,
} from '../lib/editorContent.ts'
import {isFocusInsideMuiOverlay, shouldStayFocused} from '../lib/focusUtils.ts'
import {editorPlugins} from '../config/editorPlugins.ts'
import cls from './EditorField.module.css'
import {Toolbar} from '../../toolbar/ui/Toolbar.tsx'
import {runCommand, type CommandPayload} from '../../toolbar/lib/runCommand.ts'
import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'

const MIN_EDITOR_AREA = 56
const MAX_EDITOR_AREA = 500

type EditorFieldProps = {
  label: string
  error: boolean
  disabled: boolean
}

export function EditorField({label, error, disabled}: EditorFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<ToastEditor>(null)
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [isToolbarMenuOpen, setIsToolbarMenuOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [editorHeight, setEditorHeight] = useState(MIN_EDITOR_AREA)
  const [isEmpty, setIsEmpty] = useState(true)

  const syncContentElement = useCallback(() => {
    const content = getEditorContentElement(fieldRef.current)
    if (!content) {
      return
    }
    applyContentElementState(content, {disabled, spellCheck: false})
  }, [disabled])

  useEffect(() => {
    syncContentElement()
    if (disabled) {
      getEditorContentElement(fieldRef.current)?.blur()
    }
  }, [disabled, syncContentElement])

  const updateEditorHeight = useCallback((instance?: ToastEditorInstance | null) => {
    const content = getEditorContentElement(fieldRef.current)
    if (!content) {
      return
    }

    content.style.height = '0'
    const measured = content.scrollHeight
    content.style.height = ''

    const next = Math.min(MAX_EDITOR_AREA, Math.max(MIN_EDITOR_AREA, measured))
    setEditorHeight(next)
    const editor = instance ?? editorRef.current?.getInstance() ?? null
    editor?.setHeight(`${next}px`)
  }, [])

  const handleChange = useCallback(() => {
    const instance = editorRef.current?.getInstance()
    if (instance) {
      setIsEmpty(isMarkdownEmpty(instance.getMarkdown()))
    }
    updateEditorHeight()
  }, [updateEditorHeight])

  const handleLoad = useCallback((instance: ToastEditorInstance) => {
    syncContentElement()
    setIsEditorReady(true)
    setIsEmpty(isMarkdownEmpty(instance.getMarkdown()))
    updateEditorHeight(instance)
  }, [syncContentElement, updateEditorHeight])

  const getEditorInstance = useCallback((): ToastEditorInstance | null => {
    return editorRef.current?.getInstance() ?? null
  }, [])

  const handleToolbarCommand = useCallback((id: string, payload?: CommandPayload) => {
    const instance = getEditorInstance()
    if (!instance) {
      return
    }
    runCommand(instance, id, payload)
  }, [getEditorInstance])

  const handleFocus = useCallback(() => {
    if (!disabled) {
      setFocused(true)
    }
  }, [disabled])

  const handleBlur = useCallback((_editorType: string, event: FocusEvent) => {
    const related = event.relatedTarget as Node | null
    const root = fieldRef.current

    if (related && root?.contains(related)) {
      return
    }
    if (related && isFocusInsideMuiOverlay(related)) {
      return
    }
    if (related) {
      setFocused(false)
      return
    }

    requestAnimationFrame(() => {
      if (isToolbarMenuOpen) {
        return
      }
      if (!shouldStayFocused(fieldRef.current)) {
        setFocused(false)
      }
    })
  }, [isToolbarMenuOpen])

  useEffect(() => {
    if (disabled || !focused) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      const root = fieldRef.current
      const target = event.target as Node | null
      if (!root || !target) {
        return
      }
      if (root.contains(target)) {
        return
      }
      if (isFocusInsideMuiOverlay(target)) {
        return
      }
      getEditorContentElement(root)?.blur()
      setFocused(false)
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [disabled, focused])

  const isFieldFocused = focused && !disabled

  const fieldClasses = [
    cls.fieldRoot,
    isFieldFocused && cls.focused,
    error && cls.error,
    disabled && cls.disabled,
    disabled && isEmpty && cls.disabledEmpty,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <FormControl fullWidth>
      <InputLabel disabled={disabled}>
        {label}
      </InputLabel>
      <Box ref={fieldRef} className={fieldClasses}>
        {isFieldFocused && isEditorReady && (
          <Toolbar
            onCommand={handleToolbarCommand}
            getInstance={getEditorInstance}
            onMenuOpenChange={setIsToolbarMenuOpen}
          />
        )}
        <Box className={cls.editorWrapper}>
          <ToastEditor
            ref={editorRef}
            height={`${editorHeight}px`}
            minHeight={`${MIN_EDITOR_AREA}px`}
            initialEditType="wysiwyg"
            initialValue=" "
            hideModeSwitch
            toolbarItems={[]}
            plugins={[...editorPlugins]}
            placeholder="Placeholder"
            usageStatistics={false}
            onLoad={handleLoad}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </FormControl>
  )
}
