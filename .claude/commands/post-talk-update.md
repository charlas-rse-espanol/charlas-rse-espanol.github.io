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

## Step 1 — Read only what's needed, then ask Q1 (archive + slides/demo + skills)

1. Run `grep -n "nextSpeaker:" src/config.ts` to find the line number of the `nextSpeaker` block. Then read only that block (roughly 30–40 lines from that line). Do **not** read the whole file.
2. Derive 2–4 skill tag suggestions from the talk's title and abstract — short, lowercase Spanish phrases matching the style of existing `previousSessions` entries (e.g. `"machine learning"`, `"ciencia abierta"`, `"LLMs"`, `"bioinformática"`).
3. Ask `AskUserQuestion` (options: `["Cancel"]`) with this question, substituting values in [brackets]:

   ```
   About to archive: [name] ([institution]) — "[title]" — [date]

   Select Cancel to abort, or fill in the fields below and submit to proceed:

   Slides URL (blank to skip):
   Demo URL (blank to skip):
   Skills (blank to accept suggestions: [suggested1], [suggested2], …):
   ```

   - "Cancel" selected → stop, explain no changes were made.
   - Otherwise: parse the three fields; blank URL = skip; blank Skills = use suggestions.

## Step 2 — Write the next speaker placeholder

Replace the existing `nextSpeaker: { ... }` block with this placeholder exactly as written:

```ts
  nextSpeaker: {
    name: "",
    institution: "",
    date: "", // "Monday 20th April 2026"
    // message: "Custom message",
  },
```

The user will fill it in manually after reviewing the PR.

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
5. Commit with a message like `Claude workflow: archive <name> (YYYY-MM-DD) and update next speaker section`
7. Push with `git push -u origin post-talk-update-YYYYMMDD`.
8. Open a PR against `main` using `gh pr create` with a short summary of the two changes.
9. Capture and share the PR URL with the user.

## Step 5 — Visual verification

1. Open `src/config.ts` in the editor so the user can fill in the next speaker placeholder: `code src/config.ts`.
2. Start the dev server in the background: `npm run dev` (run_in_background: true).
3. Share `http://localhost:4321` with the user and ask them to confirm visually:
   - The archived speaker appears at the top of **Previous sessions** with the correct Spanish date, any slides/demo buttons, and the skill tags.
   - The **Next session** section renders the expected shape.

## Final report

Print a short summary:

- What was archived (name + Spanish date).
- What shape the new `nextSpeaker` has.
- The branch name and PR URL.
- The local preview URL.

That's the end of the workflow. Do not merge the PR yourself.
