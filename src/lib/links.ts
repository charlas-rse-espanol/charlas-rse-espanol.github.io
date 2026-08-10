/**
 * Links in content.
 *
 * One definition of what a link in an abstract, bio or about-text looks like,
 * used both by `src/config.ts` (TypeScript, calls `createLink` directly) and by
 * the JSON content under `src/data/` (via `expandLinks`).
 */

/** Accent colour for the whole site; also the colour of links in content. */
export const ACCENT_COLOR = "#E86C5E";

export const createLink = (url: string, text: string, color: string = ACCENT_COLOR) =>
  `<a href='${url}' target='_blank' rel='noopener noreferrer' style='color: ${color}; font-weight: bold;'>${text}</a>`;

/** GitHub profile link, rendered as `@handle`. */
export const createGitHubHandleLink = (handle: string, color: string = ACCENT_COLOR) =>
  createLink(`https://github.com/${handle}`, `@${handle}`, color);

// [link text](https://example.com) — the URL may not contain spaces or ")",
// and the link text may not span lines, so prose like "[2019] (see below)"
// is left alone.
const MARKDOWN_LINK = /\[([^\]\n]+)\]\(([^\s)]+)\)/g;

/**
 * Expand markdown-style links in JSON content into the same markup
 * `createLink` produces. Any other HTML in the string is left untouched, and
 * <SafeHtml> still sanitizes the result before it reaches the page.
 */
export const expandLinks = (content: string): string =>
  content.replace(MARKDOWN_LINK, (_match, text, url) => createLink(url, text));

/** Apply `expandLinks` to the given keys of a content object. */
export const expandLinksIn = <T extends object>(item: T, keys: (keyof T)[]): T => {
  const expanded = { ...item };
  for (const key of keys) {
    const value = expanded[key];
    if (typeof value === "string") {
      expanded[key] = expandLinks(value) as T[keyof T];
    }
  }
  return expanded;
};
