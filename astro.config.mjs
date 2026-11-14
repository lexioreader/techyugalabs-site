// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Techyuga Labs studio site Astro config.
//
// `site` drives the sitemap generator, canonical URLs, and OG tags.
// Image optimization uses Sharp (installed via package.json). Astro's
// built-in image service handles modern format conversion (WebP/AVIF)
// + responsive srcset generation automatically.

export default defineConfig({
  site: 'https://techyugalabs.com',
  trailingSlash: 'ignore',

  integrations: [
    mdx(),
    sitemap({
      // Exclude draft pages + 404 from sitemap
      filter: (page) => !page.includes('/draft/') && !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    // Allow external hosts (Cloudflare quick tunnels, ngrok, LAN IPs)
    // to reach the dev server during mobile UX testing. Vite 5+ blocks
    // unknown Host headers by default as a DNS-rebinding defense;
    // `true` accepts any host for local dev. Zero effect on production
    // (`astro build` doesn't touch the dev server at all).
    server: {
      // `['.trycloudflare.com']` whitelists any subdomain of the quick-
      // tunnel host. If you switch to ngrok, add `'.ngrok-free.app'`
      // too. Leaving `true` as a fallback for Vite versions that accept
      // the boolean shorthand.
      allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', 'localhost', '127.0.0.1'],
    },
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  build: {
    // Inline small CSS for faster first paint; larger stylesheets stay external.
    inlineStylesheets: 'auto',
    // Format HTML output for readability in build inspection (zero runtime cost).
    format: 'file',
  },

  // Explicit output for Cloudflare Pages / Netlify / Vercel static hosts.
  output: 'static',

  // Prefetch strategy — hover-based for internal links so navigation feels instant
  // without burning bandwidth on every link on every page load.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  // SEO + accessibility: redirect all asset paths through Astro's build pipeline
  // so they get content-hashed filenames (long cache + safe invalidation).
  compressHTML: true,
})
