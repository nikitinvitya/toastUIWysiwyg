import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import LinkIcon from '@mui/icons-material/Link'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import CodeIcon from '@mui/icons-material/Code'
import DataObjectIcon from '@mui/icons-material/DataObject'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import TitleIcon from '@mui/icons-material/Title'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import type {ToolbarItem} from '../model/toolbarTypes.ts'

export const TOOLBAR_ITEMS: ToolbarItem[] = [
  {id: 'heading', icon: TitleIcon, title: 'Heading'},
  {id: 'bold', icon: FormatBoldIcon, title: 'Bold'},
  {id: 'italic', icon: FormatItalicIcon, title: 'Italic'},
  {id: 'color', icon: FormatColorTextIcon, title: 'Color'},
  {id: 'strike', icon: StrikethroughSIcon, title: 'Strike'},
  {id: 'ul', icon: FormatListBulletedIcon, title: 'Bulleted list'},
  {id: 'ol', icon: FormatListNumberedIcon, title: 'Ordered list'},
  {id: 'link', icon: LinkIcon, title: 'Link'},
  {id: 'image', icon: ImageOutlinedIcon, title: 'Image'},
  {id: 'table', icon: TableChartOutlinedIcon, title: 'Table'},
  {id: 'code', icon: CodeIcon, title: 'Code'},
  {id: 'codeblock', icon: DataObjectIcon, title: 'Code block'},
  {id: 'quote', icon: FormatQuoteIcon, title: 'Blockquote'},
  {id: 'hr', icon: HorizontalRuleIcon, title: 'Horizontal rule'},
]

const toolbarItemsById: Record<string, ToolbarItem> = Object.fromEntries(
  TOOLBAR_ITEMS.map((item) => [item.id, item]),
)

export function getToolbarItem(id: string): ToolbarItem | undefined {
  return toolbarItemsById[id]
}

export const TOOLBAR_VISIBLE_GROUPS = [
  ['heading', 'bold', 'italic', 'color', 'strike'],
  ['ul', 'ol'],
  ['link', 'image'],
] as const
