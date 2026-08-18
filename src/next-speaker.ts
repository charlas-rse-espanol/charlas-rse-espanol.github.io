/**
 * The upcoming session, from src/data/next-speaker.json.
 *
 * Every field is documented in src/data/next-speaker.schema.json, which the
 * editor surfaces as hover text and autocomplete while editing the JSON.
 * In short, three shapes are supported, matching what <NextSpeaker> renders:
 *   1. `name` + `affiliation` + `date`            -> "Save the date" message
 *   2. ...plus `title`, `abstract`, `bio`,
 *      `time`, `location`, `calendarLink`         -> full session card
 *   3. `message` only                             -> that custom message
 * Leave the file as `{}` when nothing is scheduled.
 *
 * SECURITY NOTE: `abstract`, `bio`, `location` and `message` may contain HTML,
 * which is sanitized by <SafeHtml> before rendering. See src/components/SafeHtml.astro
 */
import data from "./data/next-speaker.json";
import { formatEnglishDate } from "./lib/dates";
import { expandLinksIn } from "./lib/links";

export type NextSpeaker = {
  /** Editor-only pointer to the schema; not rendered. */
  $schema?: string;
  name?: string;
  affiliation?: string;
  /** ISO `YYYY-MM-DD`. Formatted for display as e.g. "Monday 21st September 2026". */
  date?: string;
  title?: string;
  abstract?: string;
  bio?: string;
  time?: string;
  location?: string;
  calendarLink?: string;
  message?: string;
};

const { $schema, ...speaker }: NextSpeaker = data;

export const nextSpeaker = {
  ...expandLinksIn(speaker, ["abstract", "bio", "location", "message"]),
  dateLabel: speaker.date ? formatEnglishDate(speaker.date) : "",
};
