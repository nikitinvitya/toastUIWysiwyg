function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildLinkPattern(text: string, url: string): RegExp {
  return new RegExp(`\\[${escapeRegExp(text)}\\]\\(${escapeRegExp(url)}\\)`)
}

export function replaceLinkInMarkdown(
  markdown: string,
  oldText: string,
  oldUrl: string,
  newText: string,
  newUrl: string,
): string {
  if (!oldUrl || !markdown.includes(oldUrl)) {
    return markdown
  }

  if (oldText) {
    const pattern = buildLinkPattern(oldText, oldUrl)
    if (pattern.test(markdown)) {
      return markdown.replace(pattern, `[${newText}](${newUrl})`)
    }
  }

  const urlOnlyPattern = new RegExp(
    `\\[([^\\]]*)\\]\\(${escapeRegExp(oldUrl)}\\)`,
  )
  const replaced = markdown.replace(urlOnlyPattern, `[${newText}](${newUrl})`)
  if (replaced !== markdown) {
    return replaced
  }

  return markdown
}

export function unwrapLinkInMarkdown(
  markdown: string,
  text: string,
  url: string,
): string {
  if (!url) {
    return markdown
  }

  if (text) {
    const pattern = buildLinkPattern(text, url)
    if (pattern.test(markdown)) {
      return markdown.replace(pattern, text)
    }
  }

  const urlOnlyPattern = new RegExp(
    `\\[([^\\]]*)\\]\\(${escapeRegExp(url)}\\)`,
    'g',
  )
  return markdown.replace(urlOnlyPattern, '$1')
}
