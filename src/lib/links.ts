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
