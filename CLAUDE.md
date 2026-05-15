# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project

Official website for 台灣移民青年倡議陣線協會 (Taiwan Immigration Youth Alliance, TIYA). A fully static Astro site — no backend, no database. Deployed to Cloudflare Workers Static Assets via `git push` to `main`.

Live: https://tiya-website.leepolung1.workers.dev/  
Repo: https://github.com/polungcs/tiya-website

## Commands

```bash
npm install        # first-time setup (Node 18+ required)
npm run dev        # local dev server at http://localhost:4321
npm run build      # output static files to dist/
npm run preview    # preview the build output
```

There is no test suite and no lint script.

Deployment is automatic: `git push` to `main` triggers Cloudflare to build and deploy (30s–2min). Build logs are in the Cloudflare dashboard under Workers & Pages → tiya-website → Deployments.

## Architecture

### i18n pattern

Every component accepts a `lang` prop (`'zh-TW'` or `'en'`). Bilingual content is resolved inline with `const isEn = lang === 'en'` and then `isEn ? 'English text' : '中文'` throughout the template. There are exactly two entry pages:

- `src/pages/index.astro` → `/` (Traditional Chinese)
- `src/pages/en/index.astro` → `/en/` (English)

Both pages are identical in structure — they import the same components and pass the appropriate `lang` prop.

### Content Collections

Dynamic content comes from three Astro Content Collections defined in `src/content/config.ts`:

| Collection | Directory | Key fields |
|---|---|---|
| `events` | `src/content/events/*.md` | `date` (sorts newest-first), `featured` (false = hidden), `fbEmbedUrl` (optional FB embed) |
| `columns` | `src/content/columns/*.md` | `publishedDate` (auto-generates sequential numbering oldest-first), `url` (links to 天下獨立評論) |
| `news` | `src/content/news/*.md` | `date`, `image` (path under `/public`), `sourceZh`/`sourceEn` |

All three collections have `featured: boolean` — setting it `false` hides the entry from the homepage without deleting the file.

Column article numbers (01, 02, 03…) are computed at build time from `publishedDate` ascending order; do not add a number field manually.

### Styling

CSS custom properties are the primary styling tool, defined in `src/styles/global.css` and imported globally via `BaseLayout.astro`. Tailwind is available but plays a secondary role — most components use scoped `<style>` blocks with `var(--*)` variables. Do not mix Tailwind utility classes and custom-property CSS arbitrarily; follow whichever approach the existing component uses.

Brand colors:
- `--orange` `#EF9F27` — primary/Hero background
- `--terra` `#CE5942` — accent, underlines, section heading bar
- `--terra-deep` `#B8401E` — hover states, emphasis
- `--cream` `#FFFAF0` — main background
- `--cream-warm` `#FAEEDA` — alternating section background
- `--ink` `#2A1A0A` — body text
- `--ink-soft` `#5C4317` — secondary text
- `--line` `rgba(206,89,66,0.18)` — borders, dividers

Fonts (loaded via Google Fonts in `BaseLayout.astro`):
- `Noto Serif TC` — headings (`h1`–`h5`)
- `Noto Sans TC` — body text
- `Cormorant Garamond` italic — decorative English accent text
- `IBM Plex Sans` — labels, tags, metadata

### Section heading pattern

Every section heading repeats the same visual pattern:
```html
<h2 class="section-h">
  {isEn ? 'English Title' : '中文標題'}
  <span class="accent">english-keyword</span>
</h2>
```
The `::before` pseudo-element on `.section-h` renders a terra-colored bar, and `.accent` uses Cormorant Garamond italic in `--terra-deep`.

## Critical legal constraint — Donate section

The association **does not hold a public solicitation permit** under Taiwan's 《公益勸募條例》. Any copy touching the Donate section (`src/components/Donate.astro`) must be purely informational — passive disclosure of bank details for people who independently choose to donate. Do not add:
- Calls-to-action ("Support us", "Donate now", "捐款支持我們")
- Donation tiers or impact framing ("NT$100 covers…")
- Prominent colored CTA buttons in the donation section

The existing disclaimer text in `Donate.astro` is the approved legal wording; do not change its substance.

## Pending placeholders (not yet live)

- `src/components/Donate.astro` — `bankInfo` object is all `'待確認'`/`'TBD'`; fill after account opens
- `src/components/Donate.astro` — `notifyFormUrl` is `'https://forms.gle/PLACEHOLDER'`
- `astro.config.mjs` — `site` URL is the Workers preview domain; update to `tiya.org.tw` once registered
- `public/robots.txt` — also uses the preview domain
- `src/layouts/BaseLayout.astro` — favicon is the square logo PNG; proper 16×16/32×32/Apple Touch Icon versions not yet created
