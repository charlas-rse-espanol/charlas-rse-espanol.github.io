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
```

The development server will be available at `http://localhost:4321`

## Updating content

All website content is managed through the single configuration file: `src/config.ts`

### Adding a new speaker

1. Open `src/config.ts`
2. Move the current `nextSpeaker` object to the top of the `previousSessions` array
3. Update the `nextSpeaker` object with the new speaker's details:

```typescript
nextSpeaker: {
  name: "Speaker Name",
  title: "Talk Title",
  institution: "Institution",
  date: "Day DDth Month YYYY",
  time: "4pm UK time",
  location: "Online and in-person at " + createLink(...),
  abstract: "Talk abstract...",
  bio: "Speaker bio...",
  calendarLink: "https://drive.google.com/...",
  locationLink: "https://maps.app.goo.gl/...",
},
```

4. After the talk, add the slides link to the session in `previousSessions`:

```typescript
slidesLink: "https://...",
```

### Creating HTML links in content

Use the `createLink()` helper function to create links in abstracts, bios, and other content:

```typescript
bio: createLink("https://example.com", "link text") + " more bio text..."
```

Links will automatically open in new tabs with proper security attributes.


### Updating other content

Edit these sections in `src/config.ts`:
- `aboutMe` - Description of the series
- `previousSessions` - Array of past talks (auto-sorted by date)
- `callForSpeakers` - Call for participation text
- `organizers` - Organizer profiles
- `accentColor` - Primary theme color (propagates throughout site)

### Claude command: `/post-talk-update` 

If you use [Claude Code](https://claude.ai/code), you can run the `/post-talk-update` command to handle the full post-talk workflow interactively:

```
/post-talk-update
```

It will: archive the current `nextSpeaker` into `previousSessions` (asking for slides/demo URLs and skill tags), set up the new `nextSpeaker` block, commit the changes on a new branch, open a PR, and start the dev server for visual verification.

## Security

All HTML content in `config.ts` is automatically sanitized using DOMPurify before being rendered on the website. This prevents Cross-Site Scripting (XSS) attacks and ensures website security.

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
│   ├── pages/             # Page routes
│   │   ├── index.astro    # Homepage
│   │   └── sessions.astro # All sessions archive
│   ├── styles/
│   │   └── global.css     # Global styles
│   └── config.ts          # Site configuration (MAIN CONTENT FILE)
├── public/                # Static assets
│   ├── favicon.png
│   └── images/
│       └── charlas-logo.png
└── astro.config.mjs       # Astro configuration
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
