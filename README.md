# Charlas RSE en español

Website for the monthly tech talk series showcasing Research Software Engineers across the Spanish-speaking world.

**Live site**: [charlas-rse-espanol.github.io](https://charlas-rse-espanol.github.io)

## About

Charlas RSE en español is a monthly seminar series that:
- Showcases the RSE role across the Spanish-speaking world
- Connects with research and tech carried out by Spanish speakers worldwide
- Provides a space to speak and learn in Spanish

The series was started by Carlos Gavidia-Calderón ([@cptanalatriste](https://github.com/cptanalatriste), Alan Turing Institute) and Sofía Miñano ([@sfmig](https://github.com/sfmig), Sainsbury Wellcome Centre at UCL) following a conversation at the DEI workshop during [RSECon24](https://rsecon24.society-rse.org/).

## Tech stack

- **[Astro](https://astro.build/)** - Static site generator
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe configuration
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - HTML sanitization library
- **[Tabler Icons](https://tabler.io/icons)** - Icon library

## Getting started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/charlas-rse-espanol/charlas-rse-espanol.github.io.git
cd charlas-rse-espanol.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Archive the talk that just happened (see "Updating content")
npm run post-talk
```

The development server will be available at `http://localhost:4321`

## Updating content

Speaker content lives as JSON under `src/data/`; `src/config.ts` holds the site-level
settings (title, about text, organizers, accent colour).

```
src/data/
├── next-speaker.json          # the upcoming session
├── next-speaker.schema.json   # documents every field of the above
└── sessions/
    ├── 20260810.json          # one file per past session, named YYYYMMDD
    └── ...
```

Dates are always stored as ISO `YYYY-MM-DD` and formatted for display automatically —
`"10 de agosto de 2026"` in the archive, `"Monday 10th August 2026"` for the next session.
Never write a display date by hand.

### Announcing the next speaker

Edit `src/data/next-speaker.json`. Three shapes are supported:

| Fields present | What is rendered |
| --- | --- |
| `name`, `affiliation`, `date` | a "Save the date" message |
| ...plus `title`, `abstract`, `bio`, `time`, `location`, `calendarLink` | the full session card |
| `message` on its own | that custom message |
| `{}` | "No session currently scheduled" |

```json
{
  "$schema": "./next-speaker.schema.json",
  "name": "Speaker Name",
  "affiliation": "Affiliation",
  "date": "2026-09-21"
}
```

Keep the `$schema` line: it is what makes your editor document the file as you edit it.
Hover over the opening `{` and you get the three shapes above; hover over any field name
and you get what it does, what it looks like, and whether it survives archiving. It also
autocompletes field names and flags misspelt ones.

### After the talk

```bash
npm run post-talk -- [slides-url]      # add --no-branch to stay on the current branch
```

This creates a `post-talk-update-YYYYMMDD` branch, moves `next-speaker.json` into
`src/data/sessions/YYYYMMDD.json` (dropping `time`, `location` and `calendarLink`), adds a
"View slides" button if you passed a URL, and resets `next-speaker.json`. It refuses to run
on a dirty working tree.

Afterwards, fill in the session's `skills` tags (2-4 short lowercase Spanish topics), add
the next speaker, then commit, push and open a PR against `main`.

### Adding an older session

Drop a new `src/data/sessions/YYYYMMDD.json` in. Nothing else to edit — the files are
collected and sorted automatically by `src/sessions.ts`.

### Links in content

In the JSON content (`abstract`, `bio`, `location`, `message`), write links in markdown
style:

```json
"bio": "Mantiene [rOpenSci](https://ropensci.org) y escribe en [su blog](https://example.org)."
```

They are expanded into styled links that open in a new tab. Relative links
(`[sesión anterior](sessions#foo)`) and `mailto:` work too. Square brackets that aren't
followed by a parenthesised URL — `[2019]`, `[version 2]` — are left alone.

Raw HTML still works where you need more than a link: `a`, `span`, `div`, `br`, `ul`, `li`,
`strong`, `em`, `i`, `p`.

Content in `src/config.ts` is TypeScript, so it calls the `createLink()` helper instead.
Both routes produce identical markup — see `src/lib/links.ts`.

```typescript
createLink("https://example.com", "link text") + " more text..."
```

### Updating other content

Edit these in `src/config.ts`:
- `aboutMe` - Description of the series
- `callForSpeakers` - Call for participation text
- `organizers` - Organizer profiles
- `accentColor` - Primary theme color (propagates throughout site)

### Claude command: `/post-talk-update`

If you use [Claude Code](https://claude.ai/code), the `/post-talk-update` command wraps the script above and suggests a few items for the `skills` tags.

```
/post-talk-update [slides-url]
```

The command runs `npm run post-talk`, fills in the `skills` tags on the archived session, opens the files you need to review, and starts the dev server at `http://localhost:4321`. Then the user reviews the suggested skill tags, adds the details for the next speaker, then commits and pushes the branch to open a PR against `main`.

To avoid permission prompts during the workflow, you can create a local settings file
(gitignored, personal only):

```json
// .claude/settings.local.json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(npm run *)",
      "Bash(code *)",
      "Edit(src/data/**)"
    ]
  }
}
```

## Security

All HTML content in `src/config.ts` and `src/data/` is automatically sanitized using DOMPurify before being rendered on the website. This prevents Cross-Site Scripting (XSS) attacks and ensures website security.

The site uses a `<SafeHtml>` component that enforces sanitization at the framework level. Direct use of Astro's `set:html` directive should be avoided throughout the codebase.

**Allowed HTML tags**: `a`, `span`, `div`, `br`, `ul`, `li`, `strong`, `em`, `i`, `p`  
**Allowed attributes**: `href`, `target`, `rel`, `style`, `class`

## Project Structure

```
charlas-rse-espanol.github.io/
├── src/
│   ├── components/        # Astro components
│   │   ├── About.astro
│   │   ├── AllSessions.astro
│   │   ├── CallForSpeakers.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── NextSpeaker.astro
│   │   ├── Organizers.astro
│   │   ├── PreviousSessions.astro
│   │   └── SafeHtml.astro # Security component (sanitizes HTML)
│   ├── data/                     # SPEAKER CONTENT
│   │   ├── next-speaker.json     # Upcoming session
│   │   ├── next-speaker.schema.json
│   │   └── sessions/             # One JSON file per past session
│   ├── lib/
│   │   ├── dates.ts              # ISO date -> Spanish / English display strings
│   │   └── links.ts              # createLink() and [text](url) expansion
│   ├── pages/                    # Page routes
│   │   ├── index.astro           # Homepage
│   │   └── sessions.astro        # All sessions archive
│   ├── styles/
│   │   └── global.css            # Global styles
│   ├── config.ts                 # Site settings (title, about, organizers, colour)
│   ├── next-speaker.ts           # Loads next-speaker.json
│   └── sessions.ts               # Loads and sorts src/data/sessions/
├── scripts/
│   └── post-talk-update.mjs      # npm run post-talk
├── public/                       # Static assets
│   ├── favicon.png
│   └── images/
│       └── charlas-logo.png
└── astro.config.mjs              # Astro configuration
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `gh-pages` branch.

### Manual deployment

```bash
# Build the site
npm run build

# The built site will be in the dist/ directory
```


## License

BSD 3-Clause License - see [LICENSE.md](LICENSE.md)

This project was originally based on the [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) template by Ryan Fitzgerald.
