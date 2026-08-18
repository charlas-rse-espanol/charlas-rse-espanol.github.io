/**
 * SECURITY NOTE: All HTML content in this configuration file is automatically
 * sanitized using DOMPurify before being rendered on the website. This prevents
 * Cross-Site Scripting (XSS) attacks and ensures that only safe HTML tags and
 * attributes are allowed. We use a <SafeHtml> component to enforce sanitization.
 * 
 * Allowed tags: a, span, div, br, ul, li, strong, em, i, p
 * Allowed attributes: href, target, rel, style, class
 * 
 * For more details, see src/components/SafeHtml.astro
 */

import { ACCENT_COLOR, createGitHubHandleLink, createLink } from "./lib/links";

// Link constants
const LINKS = {
  github: "https://github.com/charlas-rse-espanol",
  email: "charlas.rse.espanol@gmail.com",
  rsecon24: "https://rsecon24.society-rse.org/",
  mailingList: "https://groups.google.com/g/rse-en-espaniol/",
  AlanTuringInstitute: "https://www.turing.ac.uk/",
  SainsburyWellcomeCentre: "https://www.sainsburywellcome.org/",
} as const;

// Section titles
const SECTIONS = {
  about: {
    id: "about",
    title: "About",
    navTitle: "About",
  },
  nextSpeaker: {
    id: "next-speaker",
    title: "Next session",
    navTitle: "Next session",
  },
  previousSessions: {
    id: "previous-sessions",
    title: "Previous sessions",
    navTitle: "Previous sessions",
  },
  callForSpeakers: {
    id: "speak-with-us",
    title: "Interested in presenting?",
    navTitle: "¡Participa!",
  },
  organizers: {
    id: "organizers",
    title: "Organisers",
    navTitle: "Organisers",
  },
} as const;

export const siteConfig = {
  name: "Charlas RSE en español",
  title: "Tech talks en español",
  description: "Monthly seminar series showcasing Research Software Engineers across the Spanish-speaking world",
  accentColor: ACCENT_COLOR,
  sections: SECTIONS,
  logo: "/images/charlas-logo.png",
  logoAlt: "Charlas RSE en español logo",

  // Hero layout options: "centered" | "inline" | "split"
  // "centered" = large logo above title (Option A)
  // "inline" = logo next to title (Option B)  
  // "split" = logo on left, text on right (Option C)
  heroLayout: "centered" as "centered" | "inline" | "split",

  social: {
    github: LINKS.github,
    email: LINKS.email,
    mailingList: LINKS.mailingList,
  },

  //////////////////////////////////////////////////////////////
  // ABOUT SECTION
  //////////////////////////////////////////////////////////////
  aboutMe:
    "<span style='font-size: 1.25em;'>🤓</span> Keen to connect <i>en español</i> with engineers & researchers in Europe and across the pond? " +
    "<br/>" +
    "<span style='font-size: 1.25em;'>🦉</span> Curious to see how far your Duolingo skills can take you in a tech talk? " +
    "<br/>" +
    "<span style='font-size: 1.25em;'>❓</span> Tired of announcements full of questions? " +
    "<br/><br/>" +
    "<div style='text-align: center;'><strong>Then come join us at the monthly <i>Charlas RSE en español!</i> 👏</strong></div>" +
    "<br/>" +
    "An initiative started by Carlos (" + createGitHubHandleLink('cptanalatriste') + ", from the " +
    createLink(LINKS.AlanTuringInstitute, "Alan Turing Institute") + ") " +
    "and Sofía (" + createGitHubHandleLink('sfmig') + ", from the " +
    createLink(LINKS.SainsburyWellcomeCentre, 'Sainsbury Wellcome Centre') + ") " +
    "from a conversation at the DEI workshop during " + createLink(LINKS.rsecon24, 'RSECon24') + ". " +
    "Our aims are: " +
    "<ul style='margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;'>" +
    "<li>to showcase the RSE role across the Spanish-speaking world</li>" +
    "<li>to connect with the cool research and tech carried out by hispanophones all over the world</li>" +
    "<li>to selfishly speak our mother tongue before we forget it!</li>" +
    "</ul>",

  //////////////////////////////////////////////////////////////
  // NEXT SPEAKER
  //////////////////////////////////////////////////////////////
  // The upcoming session lives in src/data/next-speaker.json.
  // See src/next-speaker.ts for the three shapes it can take.

  //////////////////////////////////////////////////////////////
  // PREVIOUS SESSIONS
  //////////////////////////////////////////////////////////////
  // Past sessions live in one JSON file each, under src/data/sessions/.
  // See src/sessions.ts

  //////////////////////////////////////////////////////////////
  // CALL FOR SPEAKERS
  //////////////////////////////////////////////////////////////
  callForSpeakers: {
    description: "Check out our speaker guidelines and feel free to contact us if you have any questions.",
    email: LINKS.email,
  },

  //////////////////////////////////////////////////////////////
  // ORGANIZERS
  //////////////////////////////////////////////////////////////
  organizers: [
    {
      name: "Sofía Miñano",
      githubHandle: "sfmig",
      githubAvatar: "https://avatars1.githubusercontent.com/u/33267254?v=4?s=100",
      affiliation: "Sainsbury Wellcome Centre at UCL",
      role: "Co-organizer",
    },
    {
      name: "Carlos Gavidia-Calderón",
      githubHandle: "cptanalatriste",
      githubAvatar: "https://avatars.githubusercontent.com/u/1616531?v=4?s=100",
      affiliation: "Alan Turing Institute",
      role: "Co-organizer",
    },
  ],
};
