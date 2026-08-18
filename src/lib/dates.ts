/**
 * Date helpers.
 *
 * Session dates are stored once, as an ISO `YYYY-MM-DD` string, and formatted
 * for display here. Storing ISO dates means they sort correctly as plain
 * strings and never need to be hand-translated.
 */

/** Turn "2026-08-10" into a UTC Date (avoids local-timezone off-by-one days). */
const parseIsoDate = (iso: string): Date => new Date(`${iso}T00:00:00Z`);

/** "2026-08-10" -> "10 de agosto de 2026" (used for past sessions). */
export const formatSpanishDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseIsoDate(iso));

const ordinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

/** "2026-08-10" -> "Monday 10th August 2026" (used for the next session). */
export const formatEnglishDate = (iso: string): string => {
  const date = parseIsoDate(iso);
  const parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const day = Number(part("day"));
  return `${part("weekday")} ${day}${ordinalSuffix(day)} ${part("month")} ${part("year")}`;
};
