# Handoff — continuing work on the AUREX website

Read this first when picking the project up in a new session (local or cloud).

## Where things stand
- **Branch.** All work is on `claude/dazzling-fermi-0jxg4y`. There is no `main` branch yet.
- **Stack.** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, motion, Lenis, three.js with react-three-fiber. This Next.js version differs from older releases, so see `AGENTS.md`.
- **Locales.** EN (primary), PL, NL, FR under `/[locale]/…`. All copy lives in `src/content/locales/*.ts`, typed by `src/content/types.ts`.
- **Design system.** The "Manifest" direction is described in `docs/design/REDESIGN.md`, which holds the audit, the strategy and the implementation log.
- **Facts and the "do not invent" rule.** `docs/SOURCE_OF_TRUTH.md`. Never add revenue, offices, partners, certifications, years or other unconfirmed claims.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /en)
npm run lint
npx tsc --noEmit
npm run build && npm start   # production check
```
- No environment variables are needed for local work.
- In development, inquiries are logged to the terminal.
- `.env.example` lists the production variables.

## Map of the code
| Area | Where |
|---|---|
| Tokens, type scale, surfaces | `src/app/globals.css`, `src/app/fonts.ts` |
| Primitives | `src/components/ui/*` (button, eyebrow/running head, section heading, cards), `src/components/motion/*` |
| Home sections | `src/components/home/*` (order in `src/app/[locale]/page.tsx`) |
| Trade lines | `src/app/[locale]/trade/[slug]/page.tsx`, `src/components/trade/*` |
| AUREX Green | `src/components/green/*`, `src/components/sections/sustainability/*`, `src/components/three/green-scene.tsx` |
| 3D (guarded, with fallbacks) | `src/components/three/lazy.tsx` (`useWebGL`, error boundary) |
| Routes, links | `src/lib/routes.ts` |
| Inquiry API | `src/app/api/inquiry/route.ts`, `src/lib/inquiry/*` |

## Conventions
- **Headlines.** Serif (`t-display-*`), set in one voice. No accent words, no gradient text.
- **Labels.** Section labels use `SectionHeading`/`Eyebrow`, which render as running heads. Use mono (`t-meta`) only for numbers and references.
- **Colour.** Lime (`gold` token) is reserved for the primary action and active states.
- **Layout.** Prefer registers (hairline rows and columns) over card grids. Radii are 4 / 8 / 12 px.
- **Copy changes.** Any copy change goes to all four locale files.
- **Before committing.** Run `tsc` and `lint`, and check the page at 1440 px and 390 px.

## Open items
- Create `main` from this branch and open a pull request.
- Replace the hot-linked Unsplash photos with self-hosted or commissioned imagery.
- Configure inquiry delivery (Resend or webhook) and `NEXT_PUBLIC_SITE_URL` before launch (`docs/DEPLOYMENT.md`).
- Native-speaker review of the PL/NL/FR strings changed in the redesign (hero title, Why AUREX, About principles).
- Optional: shorten the home page further, for example by merging Why AUREX and Leadership.
