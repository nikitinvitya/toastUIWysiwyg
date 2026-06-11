function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function replaceImageSrcInMarkdown(markdown: string, oldSrc: string, newSrc: string): string {
  if (!oldSrc || !markdown.includes(oldSrc)) {
    return markdown
  }

  const imagePattern = new RegExp(
    `!\\[([^\\]]*)\\]\\(${escapeRegExp(oldSrc)}\\)`,
  )
  const replaced = markdown.replace(imagePattern, `![$1](${newSrc})`)
  if (replaced !== markdown) {
    return replaced
  }

  return markdown.replace(oldSrc, newSrc)
}

export function removeImageFromMarkdown(markdown: string, src: string): string {
  if (!src) {
    return markdown
  }

  const imagePattern = new RegExp(
    `!\\[[^\\]]*\\]\\(${escapeRegExp(src)}\\)`,
    'g',
  )
  return markdown.replace(imagePattern, '')
}
