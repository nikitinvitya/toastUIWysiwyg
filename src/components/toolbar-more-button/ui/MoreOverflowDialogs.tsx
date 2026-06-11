import type {ToastEditorInstance} from '../../toolbar/model/toastEditorInstance.ts'
import {isCursorInTable} from '../../toolbar/lib/editorSelectionUtils.ts'
import {getLinkDialogValues} from '../../toolbar-link-button/lib/getLinkDialogValues.ts'
import {LinkInsertDialog} from '../../toolbar-link-button/ui/LinkInsertDialog.tsx'
import {TableInsertDialog} from '../../toolbar-table-button/ui/TableInsertDialog.tsx'
import {ImageInsertDialog} from '../../toolbar-image-button/ui/ImageInsertDialog.tsx'
import type {OverflowDialogContext} from './MoreMenuItem.tsx'

export type MoreDialogId = 'table' | 'link' | 'image'

type MoreOverflowDialogsProps = {
  dialogId: MoreDialogId | null
  instance: ToastEditorInstance | null
  dialogContext?: OverflowDialogContext | null
  onClose: () => void
}

export function MoreOverflowDialogs({
  dialogId,
  instance,
  dialogContext = null,
  onClose,
}: MoreOverflowDialogsProps) {
  if (!dialogId || !instance) {
    return null
  }

  if (dialogId === 'table') {
    return (
      <TableInsertDialog
        open
        onClose={onClose}
        instance={instance}
        canRemoveTable={isCursorInTable()}
      />
    )
  }

  if (dialogId === 'link') {
    const linkContext = dialogContext?.link ?? null
    const {text, url} = getLinkDialogValues(instance, linkContext)
    return (
      <LinkInsertDialog
        open
        onClose={onClose}
        instance={instance}
        initialText={text}
        initialUrl={url}
        editContext={linkContext}
      />
    )
  }

  if (dialogId === 'image') {
    const imageContext = dialogContext?.image ?? null
    return (
      <ImageInsertDialog
        open
        onClose={onClose}
        instance={instance}
        initialSrc={imageContext?.previousSrc ?? ''}
        editContext={imageContext}
      />
    )
  }

  return null
}
