# AUREX — corporate website

The public website of **AUREX**, a European-rooted international trading, holding and investment group. It is written for investors, corporates, strategic partners, suppliers, distributors and institutions, so the tone is institutional and long-term. Its master line is *Value in motion* and its supporting line is *European standards. Global reach.*

The site runs in four locales (English, Polish, Dutch and French). It has a scroll-driven cinematic home page, a WebGL globe of the group's markets of focus, and an inquiry system that delivers to email and/or a CRM webhook.

> **Content rule.** The site states only facts that AUREX has confirmed. Anything unconfirmed (people, offices, holdings, figures, addresses, partners) stays empty, and the UI shows a neutral empty state instead of placeholder data. See [`docs/SOURCE_OF_TRUTH.md`](docs/SOURCE_OF_TRUTH.md).

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4. Design tokens and type utilities live in `src/app/globals.css` (`@theme`, `@utility`) |
| Motion | [`motion`](https://motion.dev) (`motion/react`) for reveals and scroll-linked transforms; [Lenis](https://lenis.darkroom.engineering) for inertia scrolling |
| 3D | three.js via `@react-three/fiber` v9 and `@react-three/drei` v10 |
| Validation | zod v4, shared by the inquiry form and the API route |
| i18n | Locale-prefixed routes (`/en`, `/pl`, `/nl`, `/fr`) with typed locale modules; language negotiation in `src/proxy.ts` |
| Fonts | Inter Tight (sans), Instrument Serif (accent), IBM Plex Mono (labels) via `next/font` |

Requires **Node.js 20.9 or later**.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional in development, see "Environment variables"
npm run dev
```

Open <http://localhost:3000>. The proxy redirects `/` to the visitor's preferred locale: the `AUREX_LOCALE` cookie set by the language switcher wins, then `Accept-Language`, then English.

In development the inquiry form works without any configuration. Submissions are validated and printed to the server console instead of being delivered.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (type-checks, pre-renders every locale × page, the OG images and the metadata routes) |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npx tsc --noEmit` | Type-check only |
| `node scripts/build-globe-data.mjs` | Regenerates `public/data/globe.json`, the dotted-globe dataset (uses the `world-atlas`, `d3-geo` and `topojson-client` dev dependencies) |
| `scripts/process-media.sh <source.mp4> [out]` | Rebuilds `public/media` (hero loop, frame sequences, stills) from the source clip with ffmpeg. See the script header |

## Project structure

```
src/
  app/
    [locale]/                 Localized routes. layout.tsx is the root layout (html/body, header, footer, JSON-LD)
      page.tsx                Home
      about/ businesses/ portfolio/ global-presence/ leadership/ partnerships/ contact/ privacy/
      not-found.tsx           Branded, localized 404
      [...rest]/page.tsx      Sends unknown paths to the localized 404
      opengraph-image.tsx     Localized 1200×630 social image
    api/inquiry/route.ts      POST endpoint for the inquiry form
    sitemap.ts robots.ts manifest.ts icon.svg apple-icon.tsx
    globals.css               Design tokens, type scale, surfaces, utilities
    fonts.ts
  components/
    home/                     Home page sections (hero, value-in-motion, global reach, …)
    sections/                 Inner-page sections, grouped by page
    page/                     PageHero and CtaBand, shared by inner pages
    ui/                       Buttons, eyebrow, section heading, icons, interactive card
    motion/                   Reveal, RevealGroup, MaskText, ScrollText
    three/                    WebGL scenes (globe, emblem) and their lazy loaders
    inquiry/                  Inquiry form and fields
    layout/ providers/ brand/ seo/
  content/
    types.ts                  SiteContent: the typed content model
    locales/{en,pl,nl,fr}.ts  All user-facing copy, one module per locale
    facts.ts                  Locale-independent facts. Confirmed information only
    repository.ts             ContentSource interface and the local implementation
  i18n/config.ts              Locales, labels, hreflang codes, locale cookie
  lib/                        routes, SEO helpers, page loader, inquiry delivery/validation/rate limit
  proxy.ts                    Locale negotiation and redirect (Next.js 16 "proxy", formerly middleware)
public/
  media/                      Hero video, frame sequences, stills (generated, see scripts/process-media.sh)
  data/globe.json             Globe dataset (generated, see scripts/build-globe-data.mjs)
docs/
  SOURCE_OF_TRUTH.md          What may be published, what must not, and what is still unknown
  CMS.md                      Moving content to a headless CMS (Payload CMS 3 mapping)
  DEPLOYMENT.md               Vercel deployment, environment, inquiry delivery, caching
scripts/                      Data and media build scripts
```

## Content and i18n

- **One typed model.** Every user-visible string, including aria-labels, lives in `src/content/locales/<locale>.ts`, and each module must satisfy `SiteContent` (`src/content/types.ts`). A missing or misspelled key in any language is a type error, not a runtime gap. Components never hardcode copy.
- **Locales:** `en` (source), `pl`, `nl`, `fr`. They are listed in `src/i18n/config.ts` together with their `hreflang` and `og:locale` codes. To add a locale, add it there, create the module, and register it in `src/content/repository.ts`.
- **Facts are separate from copy.** `src/content/facts.ts` holds the locale-independent structure: divisions, sectors, markets of focus, corridors and partner models. It also holds the lists that stay empty until AUREX confirms them: `leaders`, `holdings`, `offices`, and `company.legalName` / `registeredOffice` / `registration`. Empty lists render the empty-state copy from the locale files, never placeholder names or silhouettes. Only confirmed information may be added here.
- **Accent words.** Headings can mark words for the serif-italic accent (`accent: ["motion."]`). Translators set these per locale.
- **Loading content.** Pages call `loadPage(params)` (`src/lib/page.ts`), which validates the locale and returns `{ locale, content }`. Metadata comes from `metadataFor(route)`.
- **CMS-ready.** Components depend only on `getContent(locale)`. To move content to a headless CMS, implement the `ContentSource` interface; see [`docs/CMS.md`](docs/CMS.md).

## Inquiry system

The contact page and the home contact section post JSON to `POST /api/inquiry` (`src/app/api/inquiry/route.ts`):

1. **Guards:** same-origin only (`Sec-Fetch-Site`), JSON only, 32 KB body limit, and a rate limit of 6 requests per minute per IP. The limiter keeps its state in memory for each server instance; see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md#rate-limiting) for a shared store.
2. **Spam:** a honeypot field and a minimum fill time. Suspected bots get a silent `200`.
3. **Validation:** the same zod schema as the form (`src/lib/inquiry/schema.ts`). Errors come back as content keys, so the form shows them in the visitor's language and announces them to screen readers.
4. **Delivery** (`src/lib/inquiry/deliver.ts`) runs every configured channel in parallel:
   - **Email via Resend:** `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`. Staff-facing email is in English, and `Reply-To` is set to the sender.
   - **Webhook** (CRM or automation): `INQUIRY_WEBHOOK_URL`, plus an optional `INQUIRY_WEBHOOK_SECRET` that is sent as `X-Inquiry-Secret` and used for the `X-Inquiry-Signature: sha256=…` HMAC of the body.

   One successful channel counts as delivered. With no channel configured, development logs the payload, while production answers `503` so that an inquiry is never silently lost.

### Environment variables

See [`.env.example`](.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin for canonical URLs, hreflang, sitemap, robots and JSON-LD. On Vercel, the production domain is used when this is unset |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Public inquiries mailbox. The UI hides the address while this is empty |
| `RESEND_API_KEY` | For email | Resend API key |
| `INQUIRY_TO_EMAIL` | For email | Recipient(s), comma-separated |
| `INQUIRY_FROM_EMAIL` | For email | Sender on a Resend-verified domain |
| `INQUIRY_WEBHOOK_URL` | For webhook | Endpoint that receives `inquiry.created` events |
| `INQUIRY_WEBHOOK_SECRET` | No | Shared secret and HMAC key for the webhook |

At least one delivery channel (email or webhook) must be configured in production.

## Motion, video and 3D

The home page tells one story (sea → air → land → connected) in four media layers. Each layer loads only when it is needed.

- **Hero loop video** (`components/home/hero.tsx`): a muted, seamless 9-second loop in VP9 WebM and H.264 MP4 at 1280 px, with an 854 px MP4 served to viewports up to 767 px wide and a WebP poster. A visible pause/play control is provided, and the video starts paused when the visitor prefers reduced motion. The chapter rail follows the playhead.
- **Canvas frame-sequence scrub** (`components/home/value-in-motion.tsx`): a pinned section draws still frames to a `<canvas>` in step with scroll progress. It uses 120 frames at 1280×720 on desktop and 80 centre-cropped 720×576 frames on mobile. Loading starts only as the section approaches, coarse to fine (every 16th frame, then every 8th, and so on), so scrubbing works before the full set has arrived.
- **Globe** (`components/three/globe-scene.tsx`): a React Three Fiber dotted globe that shows the markets of focus and illustrative corridors. It is built from `public/data/globe.json`, which `scripts/build-globe-data.mjs` precomputes by sampling a Fibonacci sphere against Natural Earth land polygons (`world-atlas`) and tagging points by market. No geometry is computed at runtime.
- **Emblem** (`components/three/emblem-scene.tsx`): the 3D AUREX mark with slow orbits, beside the investment principles.
- **Loading:** both WebGL scenes are client-only dynamic imports (`components/three/lazy.tsx`). They mount only once the section is within half a viewport (`useViewportPresence`) and switch R3F `frameloop` to `"never"` when off-screen, so nothing renders out of view. Device pixel ratio is capped at 2.

Scroll-linked `useTransform` input ranges must stay within `[0, 1]` and be non-decreasing, because motion hands them to WAAPI, which throws otherwise.

## Performance and accessibility

- Server Components by default; `"use client"` only where state, effects or motion hooks are needed.
- **Reduced motion:** `MotionConfig reducedMotion="user"`, a global CSS override for animations and transitions, Lenis smoothing turned off, the hero video paused, and scene drift and idle rotation frozen.
- Lazy WebGL and frame sequences (see above). Images go through `next/image` as AVIF/WebP. Fonts are self-hosted by `next/font` with `display: swap`.
- One `h1` per page, ordered headings, landmarks (`header`, `nav`, `main`, `footer`), a skip link and a visible focus ring. Touch targets are at least 44 px. Decorative imagery uses `alt=""`. Form errors are announced.
- Contrast-checked token pairs. The accent colour is used as text only on dark surfaces; ivory surfaces use `gold-ink` and `stone` via `tone="dark"`.

## SEO and platform

- Per-page localized title and description, canonical URL and `hreflang` alternates (including `x-default`) via `pageMetadata` in `src/lib/seo.ts`.
- `sitemap.xml` covers every route in every locale, with language alternates. `robots.txt` allows everything except `/api/`.
- A localized Open Graph image for each locale (`[locale]/opengraph-image.tsx`). It uses the ImageResponse default font, so it renders without network access.
- JSON-LD `Organization` + `WebSite` (`components/seo/json-ld.tsx`) with confirmed fields only: no address, phone, founders, founding date or social profiles.
- Icons: `app/icon.svg` (vector favicon), `app/apple-icon.tsx` (180×180 PNG) and `manifest.webmanifest`.
- `next.config.ts` sets security headers (`nosniff`, `strict-origin-when-cross-origin`, `SAMEORIGIN` framing, a restrictive `Permissions-Policy`), turns off `X-Powered-By`, and gives `/media` and `/data` immutable one-year caching in production.
- Unknown URLs under a locale render the branded, localized 404 with a `404` status.

## Deployment

The recommended host is Vercel: import the repository, set the environment variables, and attach the domain. Full steps, Resend domain verification, the rate-limit store and media caching rules are in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Content still required from AUREX

The site is built to launch without these items and fills in as each one is supplied. Until then the corresponding UI shows a neutral state. The complete list, with context, is in `docs/SOURCE_OF_TRUTH.md` §18.

- [ ] **Registered legal entity name**, legal form and jurisdiction (footer, privacy notice, JSON-LD `legalName`)
- [ ] **Registered office address** and registration/VAT numbers (legal notice, privacy notice)
- [ ] **Owned domain and public contact mailbox** (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`), plus the mailbox that receives inquiry notifications (`INQUIRY_TO_EMAIL`)
- [ ] **Leadership profiles**: names, titles, bios and portraits, with consent to publish (`facts.ts → leaders`)
- [ ] **Holdings and investments** approved for disclosure (`facts.ts → holdings`)
- [ ] **Offices or representations**, if any (`facts.ts → offices`)
- [ ] **Logo files**: SVG primary and mono versions for dark and light backgrounds, or approval of the interim mark used in the header, favicon and OG image
- [ ] **Native-speaker review** of the Polish, Dutch and French copy, including taglines and accent words
- [ ] **Confirmation of the "Medical / LARP" vertical scope**: whether Medical and LARP & Historical Goods are separate sectors, and the boundaries of each
- [ ] **Privacy notice details** (data controller, retention period) and legal review of the investment-inquiry wording
