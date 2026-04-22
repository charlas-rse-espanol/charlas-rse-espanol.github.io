---
description: Archive the current nextSpeaker into previousSessions and set up the new nextSpeaker block, then open a PR.
---

# Post-talk update workflow

You are helping the user update `src/config.ts` after a Charlas RSE en español talk has been delivered. This workflow has three outcomes:

1. The just-delivered talk is moved from `nextSpeaker` into the top of `previousSessions`, correctly reformatted.
2. The `nextSpeaker` block is replaced with one of three valid shapes (full card, save-the-date, or empty/custom-message) based on what the user knows.
3. All changes land on a new branch with a PR open for review, and a local dev server running so the user can eyeball the result.

**Ground rules (non-negotiable):**

- Work only in `src/config.ts`. Do not touch other files unless the user explicitly asks.
- **Preserve every pre-existing comment verbatim** — the `SECURITY NOTE` header, the section banner comments (`// ABOUT SECTION`, `// NEXT SPEAKER`, `// PREVIOUS SESSIONS`, etc.), the inline guidance comment above `nextSpeaker` that documents the three shapes, and any commented-out lines (e.g. the alternate `calendarLink` URL just below the current one). Do not reword, reformat, or delete them.
- Preserve indentation style (match surrounding entries).
- Never push to `main`. Always work on a feature branch and open a PR.

Use the `AskUserQuestion` tool for user-facing choices. Use `Edit` for surgical edits to `src/config.ts`. Use `Bash` for git/gh and for the dev server.

---

## Step 1 — Read and confirm

1. Read `src/config.ts` and locate the `nextSpeaker` block.
2. Summarise to the user: the speaker's `name`, `title`, and `date`.
3. Ask via `AskUserQuestion` whether this is the talk to archive (yes / no). If no, stop — explain you've made no changes.

## Step 2 — Gather archive-side inputs

Ask the user (one `AskUserQuestion` call where possible):

- Optional **slides URL** (free text; empty → skip).
- Optional **demo URL** (free text; empty → skip).

Then suggest **2–4 skill tags** based on the archived talk's title and abstract. Match the style of existing entries in `previousSessions`: short, lowercase Spanish phrases (e.g. `"machine learning"`, `"ciencia abierta"`, `"LLMs"`, `"bioinformática"`). Show the suggestions and ask the user to confirm, edit, add, or replace them.

## Step 3 — Build the archived entry

Construct a new object to prepend to `previousSessions`:

- Keep `name`, `institution`, `title`, `abstract`, `bio` **verbatim** from the current `nextSpeaker`.
- Convert `date` from English (e.g. `"Monday 20th April 2026"`) to Spanish in the format used by the most recent existing entry — typically `"20 de abril de 2026"` (day + `de` + lowercase Spanish month + `de` + year). Derive day/month/year from the source string.
- **Drop** `time`, `location`, `calendarLink`.
- If slides and/or demo URLs were provided, add a `linkButtons` array. Default labels:
  - Slides: `{ href: "<url>", label: "View slides" }`
  - Demo: `{ href: "<url>", label: "View demo ✨" }` (sparkles emoji by default)
- If skills were confirmed, add `skills: [...]`.
- Insert as the **first** element of the `previousSessions` array.

## Step 4 — Decide the new `nextSpeaker` shape

Do **not** offer the three shapes up front. Infer from the user's state:

1. Ask via `AskUserQuestion`: **"Do you have details for the next speaker yet?"** — yes / no.

2. **If no** → ask for an optional **custom announcement message** (free text).
   - Empty → write `nextSpeaker: {}` (renders "No session currently scheduled").
   - Non-empty → write `nextSpeaker: { message: "<text>" }`.

3. **If yes** → explicitly state that the **minimum required fields** are `name`, `institution`, and `date` (English format `"Day DDth Month YYYY"`). Then ask which optional fields they can also supply. The optional full-card fields are **all or nothing**: `title`, `abstract`, `bio`, `time`, `location`, `calendarLink`.

   Outcomes:
   - Minimum three only → write the **save-the-date** shape: `{ name, institution, date }`.
   - All three + all six optionals → write the **full card** shape. For `abstract`, `bio`, and `location`, any embedded links should use the `createLink()` helper already defined in the file.
   - Minimum three missing → **stop and error**: list which of `name`/`institution`/`date` are missing. Do not proceed.
   - Minimum three present but **some-but-not-all** optionals → **stop and error**: list which optional fields are still missing for a full card, and offer either (a) complete them now, or (b) downgrade to save-the-date (discarding the partial extras). Proceed only after the user picks.

## Step 5 — Branch, edit, commit, PR

1. Run `git status` and confirm the working tree is clean. If not, warn the user and stop.
2. Derive `YYYYMMDD` from the archived talk's date (the original English `nextSpeaker.date`).
3. Create and switch to a new branch: `git checkout -b post-talk-update-YYYYMMDD` (from `main`).
4. Apply two edits to `src/config.ts` with the `Edit` tool:
   - Replace the existing `nextSpeaker: { ... }` block with the chosen new shape.
   - Prepend the archived entry as the first element inside the `previousSessions: [ ... ]` array.
5. Re-read the file and sanity-check that **all pre-existing comments are still present** (section banners, the `// If only name, institution and date are provided...` guidance comment, the commented `calendarLink` line if it was there, etc.).
6. Commit with a message like `Archive <name> (YYYY-MM-DD) and update next speaker section` — include `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`.
7. Push with `git push -u origin post-talk-update-YYYYMMDD`.
8. Open a PR against `main` using `gh pr create` with a short summary of the two changes.
9. Capture and share the PR URL with the user.

## Step 6 — Visual verification

1. Start the dev server in the background: `npm run dev` (run_in_background: true).
2. Share `http://localhost:4321` with the user and ask them to confirm visually:
   - The archived speaker appears at the top of **Previous sessions** with the correct Spanish date, any slides/demo buttons, and the skill tags.
   - The **Next session** section renders the expected shape (full card / save-the-date message / no-session placeholder / custom message).

## Final report

Print a short summary:

- What was archived (name + Spanish date).
- What shape the new `nextSpeaker` has.
- The branch name and PR URL.
- The local preview URL.

That's the end of the workflow. Do not merge the PR yourself.
