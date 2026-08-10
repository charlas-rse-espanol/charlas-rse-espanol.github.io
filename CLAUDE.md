# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for **Charlas RSE en español**, a monthly tech talk series showcasing Research Software Engineers across the Spanish-speaking world. The site is built with Astro and Tailwind CSS v4, displaying information about upcoming speakers and archives of previous sessions.

## Tech Stack

- **Astro**: Static site generator
- **Tailwind CSS v4**: Utility-first CSS framework using the new @tailwindcss/vite plugin
- **TypeScript**: For type-safe configuration
- **DOMPurify**: Content sanitization for security
- **Tabler Icons**: Icon library for SVG icons
- **DM Sans**: Google Font used throughout the site

## Development Commands

```bash
npm run dev       # Start development server at http://localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build
npm run post-talk # Archive the delivered talk (see "Working with Speaker Content")
```

## Architecture

The project follows a component-based architecture with all content centralized in `src/config.ts`:

- **Components** (`src/components/`): Individual Astro components for each section
  - `Hero.astro`: Landing section with logo and title
  - `About.astro`: Information about the charlas series
  - `NextSpeaker.astro`: Upcoming speaker details with abstract, bio, and session info
  - `PreviousSessions.astro`: Grid of recent talks (last 6)
  - `AllSessions.astro`: Complete archive of all past sessions (separate page)
  - `CallForSpeakers.astro`: Call for participation
  - `Organizers.astro`: Organizer profiles
  - `Header.astro`: Fixed navigation header (hidden on mobile)
  - `Footer.astro`: Social links and footer
- **Pages**:
  - `src/pages/index.astro`: Main landing page with all sections
  - `src/pages/sessions.astro`: Dedicated page showing all past sessions
- **Content data** (`src/data/`): Speaker content, as JSON
  - `src/data/next-speaker.json`: the upcoming session
  - `src/data/sessions/YYYYMMDD.json`: one file per past session
- **Data loaders**:
  - `src/next-speaker.ts`: reads `next-speaker.json`, adds the English `dateLabel`
  - `src/sessions.ts`: globs `src/data/sessions/*.json`, sorts most-recent-first, adds the Spanish `dateLabel`
  - `src/lib/dates.ts`: ISO date -> Spanish / English display strings
- **Configuration** (`src/config.ts`): Site chrome — name, sections, about text, organizers

### Key Architectural Decisions

1. **Content as data, chrome as config**: Speaker content is JSON under `src/data/`; `src/config.ts` holds only site-level settings. Adding a session means adding one file.
2. **Dates stored once, as ISO**: `YYYY-MM-DD` everywhere; Spanish and English display strings are derived in `src/lib/dates.ts`. Never hand-write a display date.
3. **Static Generation**: All content is static HTML generated at build time
4. **Bilingual Content**: Some UI in English, most content in Spanish
5. **Component Independence**: Each section is self-contained and reads from the config
6. **Accent Color System**: Single `accentColor` in config propagates throughout via CSS custom properties

## Important Implementation Details

- **Content Security**: All HTML content from `src/config.ts` and `src/data/` is rendered using the `<SafeHtml>` component, which enforces DOMPurify sanitization. The whitelist approach allows only safe tags (a, span, div, br, ul, li, strong, em, i, p) and attributes (href, target, rel, style, class). All sanitization logic is contained within `src/components/SafeHtml.astro`.
- **Session Sorting**: Previous sessions are sorted by date (most recent first) automatically
- **Responsive Design**: Mobile-first approach with tailwind breakpoints
- **External Links**: Calendar invites, slides, and location links open in new tabs with `rel="noopener noreferrer"`
- Font: DM Sans loaded from Google Fonts

## Working with Speaker Content

### Announcing the next speaker

Edit `src/data/next-speaker.json`. Three shapes are supported (see `src/next-speaker.ts`):

- `name` + `institution` + `date` -> "Save the date" message
- ...plus `title`, `abstract`, `bio`, `time`, `location`, `calendarLink` -> full session card
- `message` alone -> that custom message
- `{}` -> "No session currently scheduled"

`date` is ISO `YYYY-MM-DD`; it is rendered as "Monday 21st September 2026".

### After a talk has been delivered

```bash
npm run post-talk -- [slides-url]     # add --no-branch to stay on the current branch
```

This archives `next-speaker.json` into `src/data/sessions/YYYYMMDD.json` (dropping `time`,
`location` and `calendarLink`), appends a "View slides" button if a URL was given, resets
`next-speaker.json`, and creates a `post-talk-update-YYYYMMDD` branch. Afterwards, fill in
the session's `skills` tags by hand and add the next speaker.

### Content Guidelines

- `abstract` and `bio` may contain HTML. Since they live in JSON, links are written out in
  full rather than via `createLink()` — match its output so styling stays consistent:
  `<a href='URL' target='_blank' rel='noopener noreferrer' style='color: #E86C5E; font-weight: bold;'>text</a>`
- `skills` is 2-4 short lowercase Spanish topic tags
- Never hand-write a display date — store ISO and let `src/lib/dates.ts` format it

## Configuration Structure

`src/config.ts` exports a `siteConfig` object with:
- **Basic info**: name, title, description, accentColor, logo
- **Social links**: github, email, mailingList
- **Sections**: IDs and titles for navigation
- **aboutMe**: HTML string describing the charlas initiative
- **callForSpeakers**: Description and contact info
- **organizers**: Array of organizer profiles with GitHub info

Speaker content is *not* here — it lives in `src/data/` (see above).

## Deployment

The site is deployed as a GitHub Pages site. 