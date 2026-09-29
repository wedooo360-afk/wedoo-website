/**
 * Site-wide settings. Everything marked PLACEHOLDER must be replaced before launch.
 */
export const site = {
  name: "WEDOO",
  descriptor: "Branding + Creative Agency",
  title: "WEDOO — Branding & Creative Agency",
  description:
    "WEDOO is a branding and creative agency building meaningful, distinctive and growth-ready brands with a founder's mindset.",
  // PLACEHOLDER: replace with the production URL (used for OpenGraph / canonical URLs).
  url: "https://wedoo.example",
  // PLACEHOLDER: replace with the real inbox.
  email: "hello@yourdomain.com",
  year: 2026,
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ],
  // PLACEHOLDER: replace "#" with real profile URLs.
  social: [
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;
