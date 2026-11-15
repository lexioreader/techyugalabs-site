# TechYuga Labs — Studio Site

Astro 5 + Tailwind v4 + MDX. Static output, dark-first editorial design, Aptabase analytics.
Parent studio marketing site, hosting [ReadYuga](src/pages/apps/pagesage.astro)
(formerly PageSage; Play Store slug kept) today and future apps as they ship. Long-form SEO guide library lives at `/guides/`.

Production URL: `https://techyugalabs.com` (domain registration pending).

---

## Quickstart

```bash
bun install          # or npm / pnpm install
cp .env.example .env # then paste the Aptabase key (see Analytics below)
bun run dev          # http://localhost:4321
```

## Commands

| Command            | What it does                                     |
|--------------------|--------------------------------------------------|
| `bun run dev`      | Dev server with HMR at `localhost:4321`          |
| `bun run build`    | Production build to `./dist/`                    |
| `bun run preview`  | Preview the production build locally             |
| `bun run check`    | Type-check + content-collection schema validation|

## Analytics (Aptabase)

Same provider the ReadYuga mobile app uses. Privacy-first, no cookies, no per-user tracking.

- Web app: **PageSage-Web** at [us.aptabase.com](https://us.aptabase.com) (name predates the ReadYuga rename; the Aptabase project ID is stable so we keep the existing name)
- Key is in `.env` as `PUBLIC_APTABASE_KEY` (already set to `A-US-3968646962` locally)
- For deployment (Cloudflare Pages), set the same env var in the Pages project's
  environment variables. The `PUBLIC_` prefix is what Astro inlines into the client bundle.

The `<Analytics>` component ([src/components/Analytics.astro](src/components/Analytics.astro))
only renders the script tag when the key is present, so dev-without-env is silent.

## Project layout

```
studio-site/
├── astro.config.mjs       # site URL, integrations, image service
├── src/
│   ├── consts.ts          # SITE_NAME, AUTHOR, APPS, CATEGORIES, NAV — one source of truth
│   ├── content.config.ts  # guides collection schema (build fails if frontmatter invalid)
│   ├── styles/global.css  # Tailwind v4 @theme + design tokens
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── SeoHead.astro  # OG + Twitter + canonical + JSON-LD
│   │   ├── Analytics.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── AppCard.astro
│   │   ├── GuideCard.astro
│   │   └── AuthorBio.astro
│   ├── content/
│   │   └── guides/        # MDX files (content agent appends here)
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── privacy.astro
│       ├── colophon.astro
│       ├── 404.astro
│       ├── apps/
│       │   ├── index.astro
│       │   └── pagesage.astro
│       └── guides/
│           ├── index.astro
│           ├── [...slug].astro
│           └── rss.xml.ts
└── public/
    ├── robots.txt
    ├── favicon.svg
    ├── site.webmanifest
    └── rss-styles.xsl
```

## Content pipeline

Daily guides will be appended by a content agent (planned for a later phase, see
`../ReadMaster.AI/lexio/docs/SAGELABS-SITE-PLAN.md` in the ReadYuga repo). The content
collection schema in [src/content.config.ts](src/content.config.ts) is the quality gate:
a guide with missing or invalid frontmatter fails the build, not production.

Guide frontmatter contract:

```yaml
---
title: ...                 # 10-80 chars
description: ...           # 50-180 chars (also used for OG + meta description)
pubDate: 2026-11-09        # ISO date
category: ebook-readers    # one of: ebook-readers | privacy | productivity
tags: [...]
appCta: pagesage           # optional, renders CTA card at end of guide
draft: false               # draft:true = excluded from sitemap, RSS, listings
sourceKeyword: ...         # optional, records the Search Console gap keyword
---
```

## Deployment (Cloudflare Pages)

Build command: `bun run build`
Output directory: `dist`
Node / Bun version: 20+ / 1.1+
Env vars: `PUBLIC_APTABASE_KEY`

Static hosting, no Workers / Functions. Avoids the CPU budget / compute cost issues
that hit `playzarcade-next` earlier.

## Launch checklist

- [ ] Register `techyugalabs.com` domain
- [ ] Push repo to `github.com/lexioreader/techsagelabs-site` (or similar)
- [ ] Create Cloudflare Pages project, connect repo, set env vars
- [ ] Point DNS: `techyugalabs.com` + `www.techyugalabs.com` to the Pages project
- [ ] Set up `hello@techyugalabs.com` mailbox in GoDaddy
- [ ] Update `CONTACT_EMAIL` in `src/consts.ts` from `pagesage007@gmail.com` to `hello@techyugalabs.com`
- [ ] Replace `public/favicon.svg` with final brand mark (current is a gold-square placeholder)
- [ ] Add `public/og-default.png` (1200x630 brand card for social shares)
- [ ] Fill in `AUTHOR.handles` URLs in `src/consts.ts` (X, GitHub, LinkedIn, etc.)
- [ ] Optional: add `public/author/akshay.jpg` (400x400) and set `AUTHOR.avatar`

## SEO baseline (already wired)

- Auto sitemap via `@astrojs/sitemap` at `/sitemap-index.xml`
- OG + Twitter cards per route via `<SeoHead>`
- Canonical URLs per route
- JSON-LD: `Organization` + `Person` (founder) on home, `SoftwareApplication` on ReadYuga page,
  `Article` + `Person` (author) + `BreadcrumbList` on each guide
- RSS feed at `/guides/rss.xml` with pretty XSL stylesheet
- `robots.txt` with sitemap autodiscovery
- Image optimization via Sharp (WebP + AVIF + responsive srcset)
- `prefetch` on hover for internal links (not prefetch-all, bandwidth-conscious)
- E-E-A-T: real named author with verifiable sameAs links, published + updated dates, author bio box on each guide, dedicated privacy + colophon pages
