export type HeadingMenuItem = {
  id: string
  title: string
  level?: number
}

export const headingMenuConfig: HeadingMenuItem[] = [
  {id: 'paragraph', title: 'Paragraph'},
  {id: 'h1', title: 'Heading 1', level: 1},
  {id: 'h2', title: 'Heading 2', level: 2},
  {id: 'h3', title: 'Heading 3', level: 3},
  {id: 'h4', title: 'Heading 4', level: 4},
  {id: 'h5', title: 'Heading 5', level: 5},
  {id: 'h6', title: 'Heading 6', level: 6},
]
