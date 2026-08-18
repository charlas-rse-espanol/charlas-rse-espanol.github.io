---
description: Archive the current next speaker into the past sessions and set up the next-speaker slot.
---

# Post-talk update workflow

The mechanical part of this is a script. Your job is the part it can't do: the `skills` tags.

## Step 1 — Run the script

```bash
npm run post-talk -- $ARGUMENTS
```

`$ARGUMENTS`, if non-empty, is the slides URL (it becomes a "View slides" button). Pass
nothing if there are no slides yet.

The script archives `src/data/next-speaker.json` into `src/data/sessions/YYYYMMDD.json`,
resets the next-speaker slot, and creates a `post-talk-update-YYYYMMDD` branch. It refuses
to run on a dirty working tree — if that happens, report it and stop rather than stashing.

## Step 2 — Add the skills tags

Read the session file the script just wrote. Fill its empty `skills` array with 2–4 short,
lowercase Spanish topic phrases derived from the `title` and `abstract` — matching the style
of the other files in `src/data/sessions/` (e.g. `"machine learning"`, `"ciencia abierta"`,
`"LLMs"`, `"bioinformática"`). Edit only that field.

## Step 3 — Visual verification

1. Open the two files the user needs to review: `code src/data/next-speaker.json src/data/sessions/YYYYMMDD.json`
2. Start the dev server in the background: `npm run dev` (run_in_background: true)

## Final report

- The branch name and the session file that was written.
- The `skills` tags you chose.
- Whether a slides button was added.
- `http://localhost:4321`
- Next steps for the user:
  - [ ] Review the `skills` tags — edit if needed
  - [ ] Fill in `src/data/next-speaker.json` with the next speaker
  - [ ] Commit, push the branch, and open a PR against `main` (never push to `main`)
