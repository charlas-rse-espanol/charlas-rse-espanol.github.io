---
description: Archive the current nextSpeaker into previousSessions and set up the new nextSpeaker block.
---

# Post-talk update workflow

You are helping the user update `src/config.ts` after a Charlas RSE en español talk has been delivered. This workflow has two outcomes:

1. The just-delivered talk is moved from `nextSpeaker` into the top of `previousSessions`, correctly reformatted.
2. The `nextSpeaker` block is replaced with an editable placeholder.

**Ground rules (non-negotiable):**

- Work only in `src/config.ts`. Do not touch other files unless the user explicitly asks.
- **Preserve every pre-existing comment verbatim** — the `SECURITY NOTE` header, the section banner comments (`// ABOUT SECTION`, `// NEXT SPEAKER`, `// PREVIOUS SESSIONS`, etc.), the inline guidance comment above `nextSpeaker` that documents the three shapes, and any commented-out lines (e.g. the alternate `calendarLink` URL just below the current one). Do not reword, reformat, or delete them.
- Preserve indentation style (match surrounding entries).
- Never push to `main`.

Use `Edit` for surgical edits to `src/config.ts`. Use `Bash` for git and the dev server.

---

## Step 1 — Read the current nextSpeaker block

Run `grep -n "nextSpeaker:" src/config.ts` to find the line number of the `nextSpeaker` block. Then read only that block (roughly 30–40 lines from that line). Do **not** read the whole file.

## Step 2 — Build the archived entry

Construct a new object to prepend to `previousSessions`:

- Keep `name`, `institution`, `title`, `abstract`, `bio` **verbatim** from the current `nextSpeaker`.
- Convert `date` from English (e.g. `"Monday 20th April 2026"`) to Spanish in the format used by the most recent existing entry — typically `"20 de abril de 2026"` (day + `de` + lowercase Spanish month + `de` + year).
- **Drop** `time`, `location`, `calendarLink`.
- If `$ARGUMENTS` is non-empty, treat it as the slides URL and add: `linkButtons: [{ href: "$ARGUMENTS", label: "View slides" }]`
- Derive 2–4 `skills` tag suggestions from the talk's title and abstract — short, lowercase Spanish phrases matching the style of existing entries (e.g. `"machine learning"`, `"ciencia abierta"`, `"LLMs"`, `"bioinformática"`). Write them directly; the user can edit them.

## Step 3 — Branch and edit

1. Run `git status` and confirm the working tree is clean. If not, warn the user and stop.
2. Derive `YYYYMMDD` from the archived talk's date (the original English `nextSpeaker.date`).
3. Create and switch to a new branch: `git checkout -b post-talk-update-YYYYMMDD` (from `main`).
4. Apply two edits to `src/config.ts` with the `Edit` tool:
   - Prepend the archived entry as the first element inside the `previousSessions: [ ... ]` array.
   - Replace the existing `nextSpeaker: { ... }` block with this placeholder exactly as written:
     ```ts
       nextSpeaker: {
         name: "",
         institution: "",
         date: "", // "Monday 20th April 2026"
         // message: "Custom message",
       },
     ```

## Step 4 — Visual verification

1. Open `src/config.ts` in the editor so the user can fill in the next speaker placeholder: `code src/config.ts`.
2. Start the dev server in the background: `npm run dev` (run_in_background: true).
3. Share `http://localhost:4321` with the user and ask them to confirm visually:
   - The archived speaker appears at the top of **Previous sessions** with the correct Spanish date, any slides button, and the skill tags.
   - The **Next session** section renders the placeholder state.

## Final report

Print a short summary:

- What was archived (name + Spanish date).
- The skill tags added (remind the user they can edit them in `src/config.ts`).
- The branch name.
- The local preview URL.
- **Next steps for the user**:
  - [ ] Review the archived speaker entry at the top of `previousSessions` in `src/config.ts`:
    - Date format matches surrounding entries (e.g. `"20 de abril de 2026"`)
    - Skill tags — edit if needed
    - Slides button present if slides were provided
  - [ ] Fill in the `nextSpeaker` placeholder in `src/config.ts`
  - [ ] Commit, push the branch, and open a PR against `main`
