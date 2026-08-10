#!/usr/bin/env node
/**
 * Post-talk update: archive the delivered talk and clear the next-speaker slot.
 *
 *   npm run post-talk -- [slides-url] [--no-branch] [--force]
 *
 * Moves src/data/next-speaker.json into src/data/sessions/YYYYMMDD.json,
 * dropping the fields that only make sense before the talk (time, location,
 * calendarLink), then resets next-speaker.json to `{}`.
 *
 * By default it also creates a `post-talk-update-YYYYMMDD` branch from the
 * current HEAD, and refuses to run on a dirty working tree.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const NEXT_SPEAKER_FILE = "src/data/next-speaker.json";
const SESSIONS_DIR = "src/data/sessions";

const die = (message) => {
  console.error(`✗ ${message}`);
  process.exit(1);
};

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8" }).trim();

// --- Arguments --------------------------------------------------------------

const args = process.argv.slice(2);
const noBranch = args.includes("--no-branch");
const force = args.includes("--force");
const slidesUrl = args.find((arg) => !arg.startsWith("--"));

if (slidesUrl && !/^https?:\/\//.test(slidesUrl)) {
  die(`Expected the slides URL to start with http(s)://, got: ${slidesUrl}`);
}

// --- Read the talk that just happened ---------------------------------------

const speaker = JSON.parse(readFileSync(NEXT_SPEAKER_FILE, "utf8"));

if (!speaker.date) {
  die(`${NEXT_SPEAKER_FILE} has no date — nothing to archive.`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(speaker.date)) {
  die(`Expected an ISO date (YYYY-MM-DD) in ${NEXT_SPEAKER_FILE}, got: ${speaker.date}`);
}

const stamp = speaker.date.replaceAll("-", "");
const sessionFile = `${SESSIONS_DIR}/${stamp}.json`;

if (existsSync(sessionFile) && !force) {
  die(`${sessionFile} already exists. Re-run with --force to overwrite it.`);
}

// --- Branch -----------------------------------------------------------------

if (!noBranch) {
  if (git("status", "--porcelain")) {
    die("Working tree is not clean. Commit or stash first, or pass --no-branch.");
  }
  const branch = `post-talk-update-${stamp}`;
  git("checkout", "-b", branch);
  console.log(`✓ Created branch ${branch}`);
}

// --- Archive ----------------------------------------------------------------

// Explicit key order so session files read consistently. `time`, `location`
// and `calendarLink` are deliberately dropped.
const session = {
  name: speaker.name,
  institution: speaker.institution,
  date: speaker.date,
  title: speaker.title,
  abstract: speaker.abstract,
  bio: speaker.bio,
  skills: speaker.skills ?? [],
  ...(speaker.linkButtons ? { linkButtons: speaker.linkButtons } : {}),
};

if (slidesUrl) {
  session.linkButtons = [
    ...(session.linkButtons ?? []),
    { href: slidesUrl, label: "View slides" },
  ];
}

const missing = ["name", "institution", "title", "abstract", "bio"].filter(
  (key) => !session[key],
);

writeFileSync(sessionFile, JSON.stringify(session, null, 2) + "\n");
writeFileSync(NEXT_SPEAKER_FILE, "{}\n");

// --- Report -----------------------------------------------------------------

console.log(`✓ Archived ${speaker.name ?? "the talk"} to ${sessionFile}`);
if (slidesUrl) console.log(`✓ Added a "View slides" button`);
console.log(`✓ Reset ${NEXT_SPEAKER_FILE}`);
if (missing.length) {
  console.log(`\n⚠ The archived session is missing: ${missing.join(", ")}`);
}
console.log(`
Next steps:
  1. Add 2-4 "skills" tags to ${sessionFile}
  2. Fill in ${NEXT_SPEAKER_FILE} with the next speaker
  3. npm run dev  →  http://localhost:4321
  4. Commit, push, and open a PR against main`);
