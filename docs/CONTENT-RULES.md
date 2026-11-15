# TechYuga Labs Content Rules

**Last updated:** 2026-11-10
**Owner:** Akshay C K
**Applies to:** every guide published at `techyugalabs.com/guides/*`, whether written by a human or by the automated content agent

---

## The one rule

**Every guide must help a real person solve a specific problem.** If a guide doesn't do that, don't publish it. This rule overrides every other rule in this document.

The sample guide `book-reading-apps.mdx` (published 2026-11-10) is the reference quality bar. Any new guide should be at least as good on each of the dimensions below.

---

## 1. Structural template (non-negotiable)

Every guide must have, in this order:

1. **Frontmatter** matching the Zod schema in [src/content.config.ts](../src/content.config.ts)
2. **Hook paragraph** (one, ~100 words) — states the problem and the honest thesis
3. **Author disclosure if applicable**: if the guide compares our own apps, say so in paragraph 2. Example: "I build one of the apps in this list (ReadYuga). To stay honest, I've ranked by use case, not by which one I make."
4. **Direct-answer section** (H2) — the one-minute summary, scenario-mapped. Targets Google Featured Snippets.
5. **How this was researched / tested** (H2) — the credibility paragraph. Specific device, specific test files, specific duration. If the guide is informational rather than tested, say so and name the sources.
6. **Main body** (H2s per section)
7. **Comparison table** if the guide compares options
8. **"Which to pick" scenario matcher** if the guide recommends options
9. **FAQ section** (H2) with 4-8 H3s drawn from Search Console/Semrush question keywords
10. **Honest conclusion** (H2) — not marketing, not conversion-pushy
11. **Author byline footer** — real name, role, contact email, date

---

## 2. Length + depth

- **Minimum:** 1,800 words of body text. Enforced culturally; not yet at build time (see Section 10 for the enforcement plan).
- **Typical target:** 2,200 to 2,600 words.
- **Ceiling:** 4,000 words. Longer than that, split into two guides.
- **Thin content is disqualifying.** A guide with 1,200 words and three bullet points is the exact pattern Google's "scaled content abuse" update flags. Don't publish it.

---

## 3. Topic archetypes (the only seven we publish)

Every guide must fit one of these seven archetypes. If it doesn't, we probably shouldn't write it.

1. **Specific-task guides** — "How to [specific thing] on Android"
2. **Head-to-head comparisons** — "App A vs App B vs App C"
3. **Frustration / pain-point guides** — "Why [common frustration]" + the fix
4. **Scenario guides** — "Best [X] for [specific situation]"
5. **Format / file-type guides** — "How to open .FILETYPE on Android"
6. **Language / region guides** — "Reading [language] PDFs with offline dictionary"
7. **Feature-education guides** — "What [feature] actually does" (only when the feature is non-obvious)

**No generic categorical content.** "What is an ebook reader" or "Best apps in 2026" are banned. They don't match an intent, don't convert, and look like SEO filler to Google.

---

## 4. Voice rules

- **No em dashes.** Use commas, colons, periods, or parentheses. (This is a brand voice rule; see memory.)
- **First-person "I" is OK and preferred** for authority. Not "we did X," not "users should X." Just "I did X."
- **Specific numbers over vague adjectives.** "320-page EPUB novel" beats "a large novel." "Three weeks in October and November 2026" beats "recently."
- **Banned phrases (AI-giveaway patterns):**
  - "In today's fast-paced world"
  - "Delve into"
  - "Harness the power of"
  - "Embark on a journey"
  - "Game-changer," "revolutionize," "disrupt"
  - "Literally" (used as filler)
  - "It's important to note that"
- **Honest about competitors.** If a competitor is better for a use case, say so with specifics. Puffing up our own app at the expense of accuracy destroys the trust the guide is trying to build.

---

## 5. SEO rules

- **Primary keyword must appear in:** title, H1, first 100 words, and meta description (the frontmatter `description` field).
- **Question keywords should be H2s or H3s** verbatim (helps Featured Snippets and "People Also Ask" matching).
- **Natural keyword density < 2%.** Don't stuff.
- **Internal links:** 2-5 per guide. Minimum: one to the relevant app page (`/apps/pagesage/`), one to another guide if relevant.
- **External links:** 3-8 per guide. Must be authoritative (official docs, Play Store listings, recognized publications). Not random blogs.
- **Each external competitor mention links to their Play Store listing**, not their marketing site. Direct-action links, not "learn more" indirection.
- **Updated date on revisions.** Bump `updatedDate` in frontmatter whenever the content changes materially.

---

## 6. Trust / E-E-A-T rules

Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is now the ranking frontier. Every guide must support it:

- **Full author name in frontmatter.** `author: "Akshay C K"` (or future contributor's real name).
- **Author bio box** at the end of every guide (auto-rendered by [AuthorBio.astro](../src/components/AuthorBio.astro)).
- **Person JSON-LD schema with sameAs array** pointing to real social profiles. Already wired.
- **Explicit commercial disclosure** when we discuss our own apps. Not hidden in small print; in paragraph 2 of the guide where everyone will see it.
- **Testing methodology** if we claim to test. Name the device, the test files, the duration. If we haven't tested, say "based on documented behavior and reviews" and name the sources.
- **Named sources** for all substantive claims. If we say "ReadEra has 50M installs," link to where that number came from.

---

## 7. Automation guardrails (for when the AI content agent is on)

**During the first 90 days of agent operation:**
- Every agent-written guide must be reviewed by Akshay before publish.
- Maximum publish rate: 1 guide per day, period.
- Topic source: only from Search Console gap-keyword data (not from generic keyword lists).
- If a guide fails any rule in this document on human review, it's revised or rejected.

**After 30+ guides have cleared human review cleanly:**
- Transition to spot checks (review every 5th guide).
- Still 1 per day maximum.
- If quality regressions appear in analytics (bounce rate up, dwell time down), revert to full human review.

**Hard rules the agent cannot bypass:**
- Minimum word count (1,800)
- Required frontmatter fields (enforced at build time by schema)
- No scraping / verbatim copying from other sites
- Must fit one of the seven archetypes
- Author field must be a real named person

**What the agent CANNOT do:**
- Publish without human review in the first 90 days
- Write about topics outside the TechYuga Labs topic orbit (reading, privacy, on-device AI, attention)
- Publish multiple guides in a single day
- Scrape or rewrite competitor content
- Make unverifiable factual claims about volumes, rankings, or performance

---

## 8. Topic orbit (what we write about)

TechYuga Labs writes about the topics our apps touch. Today, that means:

- Ebook / PDF reading on Android
- On-device AI (any domain, but especially reading-adjacent)
- Privacy and data sovereignty in consumer apps
- Focus, attention, reading habits
- Format conversion and interoperability (MOBI, EPUB, PDF, DJVU, etc.)
- Study tools and productivity for readers
- Accessibility (dyslexia, low vision, reading aids)
- Language learning via reading

As new apps ship, the orbit expands to include their adjacent topics. **Topics outside the orbit do not get published, even if they're good SEO opportunities.** Staying topically coherent is itself a Google signal.

---

## 9. Pre-publish checklist (run this on every guide)

Copy-paste this into a comment at the top of every PR or self-review:

```
[ ] Frontmatter fields present + valid (title, description, pubDate, category, tags, author, sourceKeyword)
[ ] Word count >= 1,800 (body only)
[ ] Matches one of the 7 archetypes
[ ] Primary keyword in title + H1 + first 100 words + meta description
[ ] Direct-answer section is 100-200 words and scenario-mapped
[ ] If comparing options, a Comparison Table is present
[ ] FAQ section has 4-8 H3s drawn from real question keywords
[ ] No em dashes anywhere
[ ] No banned phrases (section 4)
[ ] If we recommend our own app, explicit disclosure is in paragraph 2
[ ] At least one internal link to a studio page
[ ] 3+ external links to authoritative sources (Play Store, docs, publications)
[ ] Author byline footer present with contact email
[ ] Updated date bumped if this is a revision, not a new guide
[ ] If agent-written: human review complete
```

---

## 10. Build-time enforcement (planned, not yet shipped)

Currently the Zod schema in [src/content.config.ts](../src/content.config.ts) enforces frontmatter structure only. A future prebuild script will add body-level validation:

- Word count minimum (fail build if body < 1,800 words)
- H1 present
- H2 count >= 4
- Comparison table OR FAQ section present
- No banned phrases

Until that script ships, these rules live in this document and are enforced by human review.

---

## 11. Changes to this document

This file is the source of truth. When quality rules change, update this file first, then update any related memory files, then update the schema if the change requires build-time enforcement.

Git log on this file is the version history. No sub-documents, no shadow rules.

If an AI agent is reading this file as part of its grounding context, it should refuse to publish a guide that violates any rule in sections 1-9.
