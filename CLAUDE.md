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
- **Configuration** (`src/config.ts`): Single source of truth for all content

### Key Architectural Decisions

1. **Single Configuration File**: All speaker data, session details, and site content lives in `src/config.ts`
2. **Static Generation**: All content is static HTML generated at build time
3. **Bilingual Content**: Some UI in English, most content in Spanish
4. **Component Independence**: Each section is self-contained and reads from the config
5. **Accent Color System**: Single `accentColor` in config propagates throughout via CSS custom properties

## Important Implementation Details

- **Content Security**: All HTML content from config.ts is rendered using the `<SafeHtml>` component, which enforces DOMPurify sanitization. The whitelist approach allows only safe tags (a, span, div, br, ul, li, strong, em, i, p) and attributes (href, target, rel, style, class). All sanitization logic is contained within `src/components/SafeHtml.astro`.
- **Session Sorting**: Previous sessions are sorted by date (most recent first) automatically
- **Responsive Design**: Mobile-first approach with tailwind breakpoints
- **External Links**: Calendar invites, slides, and location links open in new tabs with `rel="noopener noreferrer"`
- Font: DM Sans loaded from Google Fonts

## Working with Speaker Content

### Adding a New Speaker

1. Update `src/config.ts`:
   - Update `nextSpeaker` object with new speaker details
   - Move previous nextSpeaker to top of `previousSessions` array
2. Required fields:
   - `name`, `title`, `institution`, `date`, `time`, `location`, `abstract`, `bio`
   - `calendarLink`, `locationLink`
3. Optional fields:
   - `slidesLink` (add after talk is delivered)
   - `skills` array for topic tags

### Content Guidelines

- Abstracts and bios can include HTML links created via `createLink()` helper
- Links automatically open in new tabs with proper security attributes
- Dates in `previousSessions` should use format: "DD de MMMM YYYY" (Spanish)
- Next speaker dates use English format: "Day DDth Month YYYY"

## Configuration Structure

The `src/config.ts` exports a `siteConfig` object with:
- **Basic info**: name, title, description, accentColor, logo
- **Social links**: github, email, mailingList
- **Sections**: IDs and titles for navigation
- **aboutMe**: HTML string describing the charlas initiative
- **nextSpeaker**: Object with upcoming speaker details
- **previousSessions**: Array of past speakers (auto-sorted by date, with optional `skills` tags per session)
- **callForSpeakers**: Description and contact info
- **organizers**: Array of organizer profiles with GitHub info

## Deployment

The site is deployed as a GitHub Pages site. 