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

**AskUserQuestion style rule:** Always pass **no `options`** so the tool renders a clean text input. Never pass predefined options.

---

## Step 1 — Read config and ask Question 1 (archive inputs)

1. Read `src/config.ts` and locate the `nextSpeaker` block.
2. Derive 2–4 skill tag suggestions from the talk's title and abstract. Match the style of existing `previousSessions` entries: short, lowercase Spanish phrases (e.g. `"machine learning"`, `"ciencia abierta"`, `"LLMs"`, `"bioinformática"`).
3. Ask a **single** `AskUserQuestion` (no options) that shows the talk summary and collects everything needed to build the archived entry:

   > About to archive: **[name]** ([institution]) — "[title]" — [date]
   >
   > Proceed? (yes / no):
   > Slides URL (blank to skip):
   > Demo URL (blank to skip):
   > Skills (comma-separated — blank to accept: "[suggested1], [suggested2], [suggested3]"):

4. Parse the four labelled lines:
   - If "Proceed?" is "no" → stop and explain you've made no changes.
   - Blank URL line → skip that field.
   - Blank skills line → use the suggestions as-is.

## Step 2 — Ask Question 2 (next speaker setup)

Ask a **single** `AskUserQuestion` (no options):

> Next speaker — fill in what you know (leave ALL fields blank for "no session scheduled"):
>
> Name:
> Institution:
> Date (Day DDth Month YYYY):
> Title:
> Abstract:
> Bio:
> Time:
> Location:
> Calendar link:
> Custom message (used only if Name/Institution/Date are all blank):

Parse the response and apply these rules:

- All blank → write `nextSpeaker: {}` (renders "No session currently scheduled").
- Only "Custom message" filled, rest blank → write `nextSpeaker: { message: "<text>" }`.
- Name + Institution + Date present, all six optionals blank → **save-the-date** shape: `{ name, institution, date }`.
- Name + Institution + Date + all six optionals present → **full card** shape. For `abstract`, `bio`, and `location`, any embedded links should use the `createLink()` helper already defined in the file.
- Name / Institution / Date missing but other fields present → **stop and error**: list which required fields are missing.
- Name + Institution + Date present but **some-but-not-all** optionals filled → **stop and error**: list the missing optional fields and offer either (a) provide them now, or (b) downgrade to save-the-date.

## Step 3 — Build the archived entry

Construct a new object to prepend to `previousSessions`:

- Keep `name`, `institution`, `title`, `abstract`, `bio` **verbatim** from the current `nextSpeaker`.
- Convert `date` from English (e.g. `"Monday 20th April 2026"`) to Spanish in the format used by the most recent existing entry — typically `"20 de abril de 2026"` (day + `de` + lowercase Spanish month + `de` + year).
- **Drop** `time`, `location`, `calendarLink`.
- If slides and/or demo URLs were provided, add a `linkButtons` array:
  - Slides: `{ href: "<url>", label: "View slides" }`
  - Demo: `{ href: "<url>", label: "View demo ✨" }`
- Add `skills: [...]` from the confirmed tags.
- Insert as the **first** element of the `previousSessions` array.

## Step 4 — Branch, edit, commit, PR

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

## Step 5 — Visual verification

1. Start the dev server in the background: `npm run dev` (run_in_background: true).
2. Share `http://localhost:4321` with the user and ask them to confirm visually:
   - The archived speaker appears at the top of **Previous sessions** with the correct Spanish date, any slides/demo buttons, and the skill tags.
   - The **Next session** section renders the expected shape.

## Final report

Print a short summary:

- What was archived (name + Spanish date).
- What shape the new `nextSpeaker` has.
- The branch name and PR URL.
- The local preview URL.

That's the end of the workflow. Do not merge the PR yourself.
