# AUREX — Design audit & redesign strategy

Scope: all 13 routes (EN reviewed in depth, PL/NL/FR spot-checked), captured full-scroll at 1440 × 900 and 390 × 844, plus a code review of the 70 components, the tokens and the copy.

---

## Phase 1 — Audit (ranked by impact)

### J1 · Critical technical defect
**Pages with WebGL crash completely when WebGL is unavailable.** `/`, `/sustainability` and `/global-presence` fall into Next.js's "This page couldn't load" screen the moment a Three.js canvas mounts without a WebGL context (IT-managed browsers, older GPUs, VMs, remote desktops). This affects exactly the institutional audience AUREX is courting. No capability check, no error boundary.

### A · What already works — keep
- **Content discipline.** No invented facts; hedged language; the markets footnote. The institutional tone is right.
- **The cinematic spine.** Hero footage and the pinned sea → air → land chapters are a genuine, memorable brand moment.
- **Custom 3D.** The dotted globe and the AUREX Green maquette are bespoke, not stock.
- **LARP mail-armour showcase.** Specific and crafted.
- **Engineering.** Typed content model, four locales, static generation, skip link, focus rings, reduced-motion support, 44 px targets.

### B · What looks generic / AI-generated
1. **The headline formula.** 55 headings follow "light grotesk + one italic serif word in lime" ("Value in *motion*", "Europe at the *core*", "Structure before *scale*"). This is the single most recognisable AI-landing-page signature.
2. **The label formula.** 76 mono uppercase "01 —— LABEL" eyebrows and 17 "● STRATEGIC FOCUS" pills stamped on every section and card.
3. **The copy formula.** Antithesis slogans ("Resilience over speed", "Reputation over volume", "Partnership over transaction", "value in decades, not transactions"). "Long-term" appears 35 times, "across borders" 10, "patient capital" 6.
4. **The surface formula.** 34 radial teal glows, 49 glass panels, lime pill buttons with a circular arrow knob, 3D-tilting cards, magnetic buttons.
5. **The page formula.** Every inner page is: tilting photo hero → alternating ivory/ink bands → identical indexed heading → CTA band. About, Portfolio and Partnerships are interchangeable.
6. **Card-grid default.** 3-up pillars, 4-up counterparts, 2 × 2 principles, 6 category cards, 4 standards cards, photo-header trade cards with chips that look clickable but are not.
7. **Accent dilution.** Lime is used for headlines, bullets, rules, buttons, focus and progress, so it signals nothing. The hero uses gradient text.
8. **Repeated imagery.** The same four aerial stills (ship, plane, port, highway) appear as hero, section backgrounds, card headers and fallbacks on nearly every page, with an inconsistent colour grade next to stock photography.

### C · What looks unfinished
- "Who we are" pillars render as an empty grey slab until their reveal fires.
- Decorative Roman numerals (I / II / III) standing in for content on About.
- The hero eyebrow pill wraps to two lines on mobile.
- The footer wordmark's foil blooms with a heavy glow and reads as an event badge rather than a premium signature. The GITEX palette was requested, so keep it and refine the execution.
- The hero has nine competing interactive elements: an inquiry panel, two CTAs, a mode rail, pause and a scroll cue.

### D · UX
- The home page is 23,400 px on desktop and 27,400 px on mobile (≈ 26 / 32 screens).
- There are 9+ CTA phrasings for two real actions (contact, explore): "Start a conversation", "Discover the group", "Partner with AUREX", "Explore", "Explore trade", "Explore our businesses", "Submit a partnership inquiry", "Propose a partnership", "Discuss a partnership".
- Section numbering on every page implies a sequence the reader doesn't need.

### E · Mobile
- The desktop layout is stacked rather than redesigned. The Food page runs 20 screens: six tall category cards (≈ 5 screens), standards cards half empty, 44 px counterpart numerals.
- The hero H1 is only ≈ 48 px, and the CTAs are two full-width pills.
- Scroll-dimmed words at 16 % opacity read as broken text on small screens.

### F · Typography
- Inter Tight Light (300) for all display text is thin, generic and low-contrast on dark at mid sizes.
- Three families plus an italic accent device and a mono label fragment the voice.
- Card body copy sits at 13–15 px and 60–70 % opacity; there is no clear step between section title and item title.

### G · Layout
- Almost every section is "heading top-left, grid below". There is no left rail, no data tables, no full-bleed typography.
- 24–28 px radii everywhere, often nested.

### H · Visual hierarchy
- Glows compete with content, every card carries an arrow circle, and the accent colour is everywhere.

### I · Conversion
- There is no single primary action per page. Proof has to come from specificity (standards, process, principles), not claims, but that material is buried in cards.

### J · Other technical
- 245 reveal wrappers: content is invisible until IntersectionObserver fires, which hurts perceived speed and causes empty slabs.
- Photography is hot-linked from Unsplash; self-host before launch.
- The Three.js chunk (≈ 900 KB) is lazy-loaded (OK). The hero video is 4.5 MB and the frame sequence 7.8 MB (lazy, OK).

---

## Phase 2 — Design strategy

### Visual concept — "Manifest"
The precision of a trade document, the scale of the horizon. The site speaks in two registers and nothing in between:

- **Document.** Warm paper, hairline rules, references, serif statements, registers and tables. Authority through precision.
- **Horizon.** Full-bleed footage, the globe, the Green maquette. Emotion through scale.

Pages alternate deliberately between the two. There are no glows, glass cards or decorative gradients.

### Typography
| Role | Face | Use |
|---|---|---|
| Display | **Source Serif 4** (display optical size), 400, roman only | Headlines are plain statements. No accent words, no italics. |
| Text / UI | **Hanken Grotesk** 400 / 500 / 600 | Body, navigation, buttons, item titles |
| Data | **IBM Plex Mono** 400 | Only for references, counters, coordinates and regulation numbers |

- **Section label.** A running head: a top hairline, a tabular number and a 13 px sans label. It replaces the mono eyebrow.
- **Scale.** Display XL → L → M → S; Title 20–24 px / 500; Body 17 px / 1.6; Small 14 px; Label 13 px / 500.

### Colour
- **Ink** (teal-black) carries the cinematic register; **paper** (warm off-white) carries the document register.
- **Brand teal** is the line colour: rules, links on paper, data marks.
- **Lime** has one job: the primary action and "active" states. It is never used in headlines and never as gradient text.
- The AUREX Green sub-palette (forest, graphite, cream, brass) is unchanged.
- **Photography** gets one grade site-wide: desaturated, with teal-leaning shadows.

### Spacing & grid
- 8-pt base. Section tiers: L (9–10 rem), M (6–7 rem), S (4 rem).
- 12-column grid inside a 90 rem container. Labels go in a 3-column left rail; the reading measure is capped at ≈ 42 rem.
- Radii: 0 for rules and registers, 4 px for buttons, inputs and chips, 12 px for media frames. No pills except status dots.

### Components
- **Button.** Primary is a lime rectangle; secondary is an outline; tertiary is an underlined text link. No knob, no magnetic pull.
- **RunningHead.** The section label described above.
- **Register.** Hairline rows (a list or table) for principles, standards, counterparts, categories and trade lines.
- **Statement.** A large serif paragraph.
- **MediaFrame.** A graded image in a 12 px frame with a clip-path reveal.

### Motion
Fewer, better:
- **Keep:** hero title reveal, pinned footage chapters, globe, Green maquette, line-draw sequences and image clip reveals.
- **Remove:** card tilt, magnetic buttons, per-card stagger, pulsing and floating.
- **Rule:** headings and blocks reveal; body text never waits on JavaScript. Reduced motion is respected everywhere.

### CTA language
- Two verbs site-wide: **"Start a conversation"** (primary, goes to contact) and **"Explore …"** (navigation).
- Forms say **"Send inquiry"**.

### Mobile
Redesign, don't stack:
- Categories become a compact register.
- Standards become a two-line list.
- Counterparts become a definition list.
- Tighter section tiers, H1 ≥ 44 px, a single primary CTA per screen, no scroll-dimmed text.

### Implementation order
0. Fix the WebGL crash: capability check plus error boundary with poster fallback.
1. Type, colour, tokens, label system and buttons. Remove the accent device and gradient text.
2. Surfaces: remove glows, glass, tilt and magnetic effects; apply the radius scale; reduce reveals.
3. Home: rebuild the hero, "Who we are" and the trade index; retune section rhythm and length.
4. Inner pages: typographic vs image heroes, trade-line registers, About principles, partnerships.
5. Mobile pass at 1024 / 768 / 430 / 390 / 375.
6. Visual QA and polish, then iterate.
