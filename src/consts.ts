// Site-wide constants.
// TechYuga Labs: same legal entity registered on Google Play. Consolidating
// brand, entity, and domain removes trademark and compliance friction
// (privacy policies, App Store developer name, invoices all align on one name).
// Renamed from TechSage Labs on 2026-11-13 to mirror the ReadYuga app brand
// (shared "yuga" stem, which means era / epoch in Sanskrit).

export const SITE_NAME = 'TechYuga Labs';
export const SITE_TAGLINE = 'Software that puts you first.';
export const SITE_URL = 'https://techyugalabs.com';
export const SITE_DESCRIPTION =
  'TechYuga Labs builds independent software, designed with intent. Each app is considered end-to-end and shipped only when it is actually ready.';

// --------------------------------------------------------------------------
// AUTHOR — one person, named, with verifiable identity across the web.
// This is the primary E-E-A-T signal (Experience, Expertise, Authoritativeness,
// Trustworthiness) that Google indexes for ranking. Keep it accurate.
//
// Fill in `handles` with actual URLs — empty strings are filtered out of the
// Person JSON-LD `sameAs` array so there's no harm in leaving some blank.
// Avatar: drop a 400x400 JPG/PNG at `public/author/akshay.jpg` and uncomment.
// --------------------------------------------------------------------------
export const AUTHOR = {
  name: 'Akshay C K',                       // matches Google Play + privacy policy
  role: 'Founder, TechYuga Labs',           // shown on about + guide bylines
  bio:
    'Founder of TechYuga Labs. Writes about reading tools, privacy, on-device AI, ' +
    'and the mechanics of attention. Ships software that respects the people who use it.',
  avatar: '',                               // e.g. '/author/akshay.jpg' — leave blank until you add the file
  // The page that represents the author on this site. /about/ doubles as the
  // author page (search engines treat it as such via Person schema).
  url: '/about/',
  // Social + verifiable-identity URLs. Google uses these as sameAs entries in
  // the Person schema to cross-verify authorship. Fill what you have; the
  // unchecked ones get stripped at render time.
  handles: {
    instagram: 'https://www.instagram.com/akshay.techyugalabs/',
    x: '',           // e.g. 'https://x.com/yourhandle'
    github: '',      // e.g. 'https://github.com/yourhandle'
    linkedin: '',    // e.g. 'https://linkedin.com/in/yourhandle'
    mastodon: '',    // e.g. 'https://mastodon.social/@yourhandle'
    bluesky: '',     // e.g. 'https://bsky.app/profile/yourhandle.bsky.social'
    threads: '',     // e.g. 'https://threads.net/@yourhandle'
    website: '',     // personal site (if separate from the studio)
  },
} as const;

// Studio contact. Separate from the ReadYuga app support email
// (pagesage007@gmail.com) which stays live forever as the Play Store listing
// address. Both inboxes forward to the same Gmail; reply from whichever
// identity matches where the mail originated.
export const CONTACT_EMAIL = 'support@techyugalabs.com';

// Apps grid data: the source of truth for /apps/ pages + homepage grid.
// Note on the pagesage slug + Play Store URL below: the Google Play package
// `com.pagesage.app` is immutable once published, so the Play Store URL
// keeps that path forever. The app itself is now branded ReadYuga; the slug
// stays `pagesage` for URL stability (SEO + historical links) and because
// the Play package is still the source of truth for the install URL.
export const APPS = [
  {
    slug: 'pagesage',
    name: 'ReadYuga',
    tagline: 'The offline AI ebook reader.',
    description:
      'Read PDFs and EPUBs (including scanned PDFs) with an AI companion that lives entirely on your device. No subscription. No account. No cloud.',
    platforms: ['android'] as const,
    status: 'live' as const,
    storeUrl: 'https://play.google.com/store/apps/details?id=com.pagesage.app',
    accentColor: '#c8a56b',
  },
] as const;

export type App = (typeof APPS)[number];

// Guide categories — keep in sync with content frontmatter `category` field.
// Studio-wide: new categories can be added as new apps ship.
export const CATEGORIES = [
  { slug: 'ebook-readers', name: 'Ebook Readers', description: 'Reading well on screens.' },
  { slug: 'privacy', name: 'Privacy & On-Device AI', description: 'Keeping data where it belongs.' },
  { slug: 'productivity', name: 'Productivity', description: 'Attention, workflow, focus.' },
] as const;

export type Category = (typeof CATEGORIES)[number];

// Navigation: one source of truth for header + footer.
// Deliberately generic: "Apps" scales to N; no single-app name in primary nav.
// "Guides" (not "Writing") matches the URL path `/guides/` and reads faster for
// visitors who are scanning nav looking for how-to / comparison content.
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/apps/', label: 'Apps' },
  { href: '/guides/', label: 'Guides' },
  { href: '/about/', label: 'About' },
] as const;

// Secondary nav — trust / meta links, rendered in the footer.
export const FOOTER_META = [
  { href: '/privacy/', label: 'Privacy' },
  { href: '/colophon/', label: 'Colophon' },
  { href: '/guides/rss.xml', label: 'RSS' },
] as const;

// --------------------------------------------------------------------------
// Helpers — derive secondary values from AUTHOR. Keep callers simple.
// --------------------------------------------------------------------------

/** Filter AUTHOR.handles to a `sameAs` array for Person JSON-LD. */
export function authorSameAs(): string[] {
  return Object.values(AUTHOR.handles).filter((url): url is string => !!url);
}
