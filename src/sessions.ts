/**
 * Past sessions.
 *
 * One JSON file per session under `src/data/sessions/`, named `YYYYMMDD.json`.
 * They are collected here, sorted most-recent-first, and given a `dateLabel`
 * for display. To add a session, drop in a new file — nothing else to edit.
 *
 * SECURITY NOTE: `affiliation`, `abstract` and `bio` may contain HTML, which is sanitized by
 * the <SafeHtml> component before rendering. See src/components/SafeHtml.astro
 */
import { formatSpanishDate } from "./lib/dates";
import { expandLinksIn, stripLinks } from "./lib/links";

export type LinkButton = {
  href: string;
  label: string;
};

export type Session = {
  name: string;
  affiliation: string;
  /** ISO `YYYY-MM-DD`. Sorts as a plain string; formatted for display. */
  date: string;
  title: string;
  abstract: string;
  bio: string;
  skills?: string[];
  linkButtons?: LinkButton[];
};

const sessionFiles = import.meta.glob<Session>("./data/sessions/*.json", {
  eager: true,
  import: "default",
});

export const previousSessions = Object.values(sessionFiles)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((session) => ({
    ...expandLinksIn(session, ["affiliation", "abstract", "bio"]),
    /** Affiliation with links reduced to their text, for use inside a link. */
    affiliationText: stripLinks(session.affiliation),
    dateLabel: formatSpanishDate(session.date),
  }));
