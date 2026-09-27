# AUREX — Source of Truth

Compiled 2026-09-27 for the AUREX website build. Revised 2026-09-27 (rev. 2). It covers all copy, content, data and design decisions on the site.

**Rule of use.** A statement may appear on the site as fact only if it is listed in [§16 Confirmed facts](#16-confirmed-facts). Anything in [§17](#17-draft-claims-found-in-drive-that-must-not-be-published-as-fact) must never be published. Anything in [§18](#18-unknown--to-be-supplied-by-aurex) stays empty in the CMS and code (`null` or an empty list) until AUREX supplies it. Placeholder or demo values must not be used to fill those gaps. Dated client decisions (§1, `client`) override the brief where the two conflict.

---

## Change log

| Date | Rev. | Change |
|---|---|---|
| 2026-09-27 | 2 | **Audit fixes.** Two independent audits (a fabrication auditor and a completeness critic) raised 34 issues. All critical and major issues are applied. Minor issues are applied where the fix is correct. Main changes: §2 no longer states operations as fact. §5's causal model is now a proposed narrative, and phrasing that implies existing partners is removed. PL/NL/FR are recorded as "discussed", not "confirmed" (F10, §15.5). Sector scope lines are marked as proposals (§7). Source citations are corrected (F13, F15, §15.4, §15.6). New sections: §7.2 sector pages, §14.8 layout tokens, §14.9 motion, §15.5.1 prior i18n, §15.9 chrome and URL map, §15.10 build and operations, §19.0 copy style, and §20 build conformance. Other additions: SEO strings (§15.7), a full form specification (§15.4), claims X52–X61 (§17), new open questions (§18), and edits to §19. Values from Drive files that were not retained as raw copies are marked **†**. |
| 2026-09-27 | 2 | **Auditor fixes softened.** In these places the auditor's fix would have added an unsupported claim, so more conservative wording is used. (1) The starter copy for "What AUREX looks for" on sector pages is not adopted, because no source supplies criteria. The block is omitted until AUREX supplies them (§7.2). (2) The starter overviews avoid "looks for… opportunities", "spanning supply and technology" and "sourcing" (§7.2). (3) Layout values from `gold/styles.css` are recorded as reference values, not requirements, because the file was not retained and the build uses its own values (§14.8). (4) The `.env` file in the Drive CMS folder is recorded as *reported in the Drive inventory*, not as verified (§15.10). (5) Unsplash ID `1431540015161` is not in the retained copies, so it is not listed (§14.6). (6) The auditor's public sector names ("Food & Agri-Food", "Medical & Healthcare", "Sustainability") are replaced by the client's names (§7). (7) The auditor's fix to revert the teal re-theme and the `larp` sector in the build (issue 6) is superseded by client decisions (a) and (b) below. The document is updated to match instead. |
| 2026-09-27 | 2 | **Client decisions** (override the brief and rev. 1). (a) The site uses the **teal palette** of the Aurex-Teal build. Only the palette is adopted (§14.1–14.3, §14.10, F6). (b) **LARP & Historical Goods** is added as a sixth sector. This resolves the "Medical / LARP" ambiguity: LARP means live-action role-play, and it is separate from Medical (§7, §7.1, F8, F14). (c) **All pages and buttons must be interactive**: interactive cards, working buttons and no dead links (§15.3.1, F19). |
| 2026-09-27 | 1 | Initial compilation from the brief and the Drive drafts. |

---

## 1. Sources reviewed

| # | Source | Label used below | Files reviewed | Last modified (UTC) | Status |
|---|---|---|---|---|---|
| C | **Client decisions** | `client` | Written instructions for this build: teal palette, LARP & Historical Goods sector, interactivity | 2026-09-27 | **Highest authority** where they conflict with the brief. Scope is limited to what each decision states (§16 F6, F8, F14, F19, F20). |
| 0 | **Current client brief** | `brief` | Brief text supplied for this build | Sept 2026 | **Authority** for everything the client decisions do not change. Overrides every Drive file. |
| 1 | Static site v1 "Aurex Global", black/gold. Drive folder `Aurex/` (`1vHOX_WHutttcCwb8UNI25xGNvtQuht5W`) | `gold` | `index.html`, `about.html`, `sectors.html`, `leadership.html`, `portfolio.html`, `contact.html`, `script.js` (i18n EN/PL/DE), `styles.css`. All 8 were read in the Drive. `styles.css` was not kept as a raw copy (†). | 2026-06-21 10:57–10:58 | AI-assisted draft. It was the draft closest to the brief: the brief's black/gold palette (per the Drive read of `styles.css`†), two of the brief's taglines, and an institutional tone. It remains the reference for tone and copy. None of its facts are verified. |
| 2 | Static site v2 "Aurex-Teal" (Teal Edition). Drive folder `Aurex-Teal/` (`1ArQBkXHh-d3XUHSTyaAp2kbTwiFdOmr2`); live at `ownit24.shop/Aurex/Aurex-Teal/` | `teal` | `index.html`, `about.html`, `trade.html`, `services.html`, `sustainability.html`, `contact.html`, `script.js` (i18n EN/PL/DE), `styles.css`, `pages.css`. All 9 were read in the Drive. `styles.css` and `pages.css` were not kept as raw copies (†). | 2026-06-21 15:27–15:29 | Draft. **Superseded, except its colour palette**, which the client adopted on 2026-09-27 (§14.1). It contradicts the brief on positioning, contact details, WhatsApp, languages and the missing inquiry form, and all of those remain excluded. Its origin is unknown. |
| 3 | Payload CMS 3 + Next.js 15 code. Drive folder `blue-harbor-cms/` (`1AZdMasbE_J_Ijtky4o2apANDWRF9pI_r`) | `cms` | `README.md`, `package.json`, `payload.config.ts`, `Settings.ts`, `Sectors.ts`, `seo.ts`, `Header.tsx`, `Footer.tsx`, `page.tsx`, `globals.css`, `api/inquiries/route.ts`, `.env.example` (variable names only), `docker-compose.yml`, `Dockerfile`, `custom.scss` | 2026-06-17 → 2026-06-20 | Technical scaffold built on a "Blue Harbor Group" maritime template. **Architecture is reusable. Theme and template leftovers are superseded.** |
| 4 | CMS seed script | `seed` | `src/seed/run.ts`, `src/payload-types.ts` | `run.ts` 2026-06-20 09:28 | Demo content generator. Nearly all of its factual content is invented. |
| 5 | CMS database and remaining CMS source | `db` / `discovery` | `blue-harbor.db` (content tables; it also holds 2 `users`, 1 `users_sessions` row and 3 `submissions`), about 35 `src/` files (collections, globals, blocks, views, lib, layout, 404), 3 media samples, 1 video | `blue-harbor.db` 2026-06-21 05:36 | Seeded demo content that mirrors `seed`. The media files are procedural placeholder art. `Animated_Tech_Logo_Reveal.mp4` shows another client's logo ("mobi hub") with a Veo watermark. This was confirmed from frames of the retained copy. |
| 6 | Other Drive content | — | OWNIT project folders, Mobi Hub outreach, "New folder (2)" images, personal documents | — | Unrelated to AUREX. Checked in the Drive and ruled out. Not retained. |

All Drive files were uploaded on 2026-06-23. "Last modified" is the local edit time that Drive preserved.

**†** marks a value taken from a Drive file read on 2026-09-27 whose raw copy was not retained (`gold/styles.css`, `teal/styles.css`, `teal/pages.css`). It cannot be re-checked from the retained copies. The teal palette hex values in §14.1 do not depend on this: they come from the client decision.

**Not found anywhere in the Drive:** a brand guidelines document, an AUREX logo file (SVG/PNG/JPG), company-owned photography, and any document written by AUREX itself (Docs, Slides or PDF). A full-text search for "Aurex" matches only the three draft builds above.

### Authority order

1. **Client decisions (dated, from 2026-09-27).** Each overrides the brief only within its stated scope.
2. **Current brief (Sept 2026).**
3. **Neutral structural decisions** that appear consistently across the drafts and are not contradicted by the brief (for example the page set, locale set and inquiry types).
4. **Newest drafts** (2026-06-21): `teal`, `gold`, `db`.
5. **Older drafts** (2026-06-17 → 06-20): `cms` code, `seed`.

How the order was applied:
- A draft can never establish a fact. Numbers, offices, HQs, people, partners, portfolio items, emails, phone numbers and certifications found in drafts are unconfirmed unless they only restate the brief.
- Recency between drafts only settles structural or stylistic questions that the brief leaves open. `teal` is the newest file set by about 4.5 hours, but it loses on every point where it conflicts with the brief. In practice `gold` is the reference draft for tone and copy, and `cms`/`db` are the reference for architecture.
- The palette. The brief's palette clause ("unless newer Aurex material specifies otherwise") did not admit the teal draft on its own, because every draft predates the brief. The client's decision of 2026-09-27 now adopts the teal palette explicitly (§14.10). **It adopts the palette only.**

---

## 2. Company positioning

AUREX is a premium international trading, holding and investment group with a European-rooted, institutional and long-term outlook. Its name joins value (gold) with exchange: the movement of value across borders. The group is structured around two sides: trade (international trade, import and export, distribution and logistics) and long-term ownership (holdings, investments and capital). Its sectors of focus are food; property and real estate; medical; electronic components; sustainability and the green transition; and LARP and historical goods. Its markets of focus are the European Union (including Poland), the UAE and the wider Middle East, India and Africa. The site should read as an institution: measured, discreet and built for decades. It must never read as a startup, a dropshipping or generic import-export business, a small trading agency, a sales company, a commodity marketplace, a cheap logistics provider or a generic corporate template.

*Sentence 1, the brand concept and the exclusion list come from the brief. The sector list combines the brief's verticals with the client's 2026-09-27 addition (§7). The two-sided structure and the "of focus" wording are this document's framing of the brief's "discussed" lists, and they await AUREX approval (§18). This paragraph is a positioning statement, not a claim of current operations. See §6.*

---

## 3. Brand story

> **AUREX brings two ideas together.**
> **AUR** evokes *aurum*, the Latin word for gold (chemical symbol Au). It stands for value: quality, trust and what endures.
> **EX** stands for exchange: the movement of goods, capital and opportunity across borders, and the expansion that follows.
> Together they describe what the group is built to do: move value between markets, to European standards, with a long-term view.
> **Value in Motion.**

Usage notes:
- Present AUR = gold/value and EX = exchange as the brand's reading, not as etymology, pending AUREX approval (§18). The `gold` draft's gloss "Ex — Latin for 'beyond'" must not be reused. Latin *ex* means "out of / from", and the brief's concept is **exchange**.
- The story contains no founding date, founder, origin narrative or history. The `teal` claim of a "merger of two longstanding companies" (X3) and the `gold` founding narrative (X53) are excluded.
- The teal palette does not change the story. "Gold" here is the idea of value, not a colour instruction. The only gold in the palette is the logo-arrow accent `#F5B323` (§14.1).
- Short form (one line): *"AUREX: gold and exchange. Value, moving across borders."*

---

## 4. Tagline direction

### Decision

| Role | Line | Where it is used |
|---|---|---|
| **Master line** | **Value in Motion.** | Wordmark lockup, hero signature, footer, OG image, closing CTA eyebrow |
| **Supporting line** | **European Standards. Global Reach.** | Hero or about eyebrow, footer second line, meta title suffix on the home page |
| Descriptor (not a tagline) | Connecting value across borders. | Meta descriptions, hero sub-line, and a heading for the markets section |

Reasoning:
1. **"Value in Motion."** carries both halves of the name: *Aur* (value) and *ex* (exchange/movement). It covers both sides of the group, since goods move through trade and capital moves through investment. It does not narrow AUREX to trade the way "Trade Beyond Borders" does. It is short and not transactional, and it is the primary signature of the `gold` draft, the one closest to the brief. A Polish version already exists in `gold` ("Wartość w ruchu.").
2. **"European Standards. Global Reach."** carries the brief's two positioning anchors: a European-rooted outlook and international scope. It adds what the master line lacks, namely where the group comes from and how it behaves. It is used as the supporting line in `gold`.
3. Both lines are among the taglines the brief says were explored, and neither contains a factual claim. "Global reach" describes scope and ambition. It must not be illustrated with office pins or market counts (§9).

Language handling. Keep the master line in English in the wordmark lockup and footer signature in every locale, because it acts as the brand signature. Use the translations below only where the line sits inside running copy. Casing: Title Case as shown ("Value in Motion.", not "Value in motion."), see §19.0.

| Locale | Master line | Supporting line | Status |
|---|---|---|---|
| EN | Value in Motion. | European Standards. Global Reach. | Recommended; awaits AUREX approval (§18) |
| PL | Wartość w ruchu. | Europejskie standardy. Globalny zasięg. | From the `gold` draft; needs native review |
| NL | Waarde in beweging. | Europese standaarden. Wereldwijd bereik. | Proposed; needs native review |
| FR | La valeur en mouvement. | Standards européens. Portée mondiale. | Proposed; needs native review |

### Rejected options

| Option | Source | Decision | Reason |
|---|---|---|---|
| Trade Beyond Borders | brief (explored) | Rejected | Trade-only. It drops the holding and investment side. "Beyond borders" is a stock phrase in freight and import-export marketing, which is the generic tone the brief excludes. |
| Global Trade. Real Value. | brief (explored) | Rejected | Trade-led. "Real value" can read as a price or bargain promise, a commodity-marketplace register. |
| Connecting Value Across Borders. | brief (explored) | Kept as a **descriptor**, not a tagline | Accurate but explanatory and long. It works better as a sub-line or meta description than as a signature. |
| Connecting European Quality with Global Markets. | `gold` hero sub-line | Rejected | Product-export framing ("European quality" shipped outward). It omits holdings and investment. |
| A trusted international trading group delivering premium products, strategic distribution, and compliant cross-border solutions… | `gold` `hero.text` | Rejected | Sales framing and a compliance claim (X55) |
| A modern international trading house, built for long-term global growth. | `gold` `overview.title` | Rejected | Trade-only; "trading house" register (X55) |
| One trusted global network. | `gold` `stats.network` | Rejected | Implies an existing network (X55) |
| Five verticals where we build enduring value. | `gold` `sectors.title` | Rejected | States activity. Use "Six sectors. One disciplined approach." (§19). |
| Expand Your Horizons / Sustainable Solutions for Global Growth | `teal` hero | Rejected | Generic, with a consumer or travel register and no link to the name. |
| Global Trade Meets Reliable Logistics / Ready to expand your horizons? / Partner for a sustainable future. | `teal` | Rejected | Generic and logistics-led |
| Global solutions for import and export needs. | `teal` footer | Rejected | This is the generic import-export tone the brief excludes. |
| Building enduring value across Europe, the Gulf and India. | `seed` / `db` home hero | Rejected | It implies an established footprint and omits Africa and Poland. |
| Experienced operators and investors. / Let's talk. | `seed` / `db` | Rejected | The first implies a team (§11). The second is too casual. |
| Welcome to Aurex | `cms` `page.tsx` | Rejected | Development fallback |
| Built to be the most trusted. / Not the loudest. The most trusted. | `gold` | Rejected as a tagline; allowed as a section heading | As a signature it reads as a superlative claim. Use it only inside the "built to be" framing (§19). |
| Five divisions. One disciplined group. | `gold` | Rejected | It implies divisions or subsidiaries that are not confirmed. |

---

## 5. Business model & architecture

**Status:** the seven strategic areas are the ones the brief lists as discussed. None is confirmed as an operating business (§6). Describe them as the group's model and capabilities. Never attach volumes, counts, named entities or claims of operated assets.

```
                                  AUREX (group)
                                       │
          ┌────────────────────────────┴────────────────────────────┐
   TRADE: value in motion                               OWNERSHIP: value held
   ─ International Trade                                ─ Holdings
   ─ Import & Export (EXIM)                             ─ Investments
   ─ Distribution                                       ─ Capital
   ─ Logistics
          └────────────────────────────┬────────────────────────────┘
      Sectors of focus:  Food · Property & Real Estate · Medical · Electronic Components ·
                         Sustainability & Green Transition · LARP & Historical Goods
      Markets of focus:  European Union (incl. Poland) · UAE / Middle East · India · Africa
```

| Area | Role in the model | Describe as | Never say |
|---|---|---|---|
| International Trade | Cross-border trade between the markets of focus (one of the group's two sides) | "international trade", "cross-border trade" | Product counts ("100+ products traded"), catalogues, "we go beyond our catalogue", "sourcing" as a service line |
| Import & Export (EXIM) | The cross-border mechanism of trade. Part of Trade, not a separate business | "import and export across the markets of focus" | "import-export solutions provider", "customs clearance services" or "customs & documentation" (implies licensing), trade lanes presented as active |
| Distribution | Market access and channel development in destination markets | "market access", "channel development" | "our distribution network across N countries", "distribution partners" or "established partners" as existing |
| Logistics | Coordinating the movement of goods in support of trade and distribution | "logistics coordination" | "Aurex Freight", "we operate freight forwarding / warehousing", "air, sea, land" or "sea, air and land" lists, "partner network", cheap-freight imagery |
| Holdings | Long-term ownership of stakes in businesses and assets | "long-term holdings", "ownership with a long horizon" | Named holdings, "portfolio companies", "every holding", any count |
| Investments | Deploying capital into the sectors of focus | "investment", "patient capital", "open to co-investment" | Amounts, returns, "capital deployed", ticket sizes, "we invest" or "AUREX invests" as ongoing fact |
| Capital | The capital side of the group, and the basis for working with capital partners if AUREX confirms this (§18) | "capital", "open to capital partnerships" | AUM, fund language, "investor relations", "fund", "capital partners" as existing |

For every area: never use phrasing that presents partners as existing ("our partners", "working with [partner type]", "established partners", "partners selected for…") until AUREX names them (§18).

**Proposed narrative (awaits AUREX approval, §18):**
1. **Trade** is designed to build relationships and market knowledge between the markets of focus.
2. **Distribution and logistics** are designed to turn trade flows into lasting market access.
3. **Holdings and investments** are designed to turn that access and knowledge into long-term ownership in the same sectors.
4. **Capital** is the group's financial side. Its exact role (own balance sheet, co-investment with partners, or something else) is to be confirmed (§18). Until then, do not say that capital "funds" either side.
5. The brand idea: value that moves (trade) and value that is held (ownership). *Value in Motion.*

Presentation on the site: use two pillars, **Trade & Distribution** (International Trade, Import & Export, Distribution, Logistics) and **Holdings & Investments** (Holdings, Investments, Capital). The six sectors run across both pillars. The client has not said which pillar applies to which sector, so do not map sectors to pillars.

- In public copy, call these "business areas" or "how the group works". Do not call them "divisions", which implies legal entities. `src/content/facts.ts` uses `divisions` as an internal identifier only.
- Do not use sub-brand names: *Aurex Trading, Aurex Distribution, Aurex Beverages, Aurex Brands, Aurex Ventures* (`gold`) and *Aurex Freight* (`teal`) are all unconfirmed.

---

## 6. Current divisions

**No division, business area or sector is established as active.**

- The brief lists the strategic areas and verticals as "discussed". It does not say any of them are currently operating.
- The client's 2026-09-27 addition of LARP & Historical Goods adds a sector of focus. It does not confirm activity.
- The drafts describe all five original verticals in the present tense ("Aurex sources and trades…", "Five verticals where we invest, operate and trade."), but the drafts are not evidence.
- The `gold` portfolio page shows only "Project in preparation" placeholders. This suggests there were no projects that could be shown as of June 2026.
- The only thing established at group level is the **positioning** (§2), which comes from the brief.

How the site must phrase areas and sectors until AUREX confirms activity in writing:

| Context | Use | Avoid |
|---|---|---|
| Section label | "Sectors of focus", "Business areas", "How the group works" | "Our divisions", "Our businesses", "Current operations", "Global presence" |
| Sector sentence | "Food is one of AUREX's sectors of focus." / "AUREX is open to trade and investment conversations in food." | "Aurex sources and trades premium food…", "Aurex invests in and operates…" |
| Area sentence | "AUREX is structured around trade and long-term ownership." / "The group is built to…" | "Aurex operates…", "Aurex Freight delivers…", "AUREX creates and moves value." |
| Activity evidence | Nothing. Leave it out. | "Current projects", "Portfolio companies", stats, case studies, "coming soon" cards, "will be published here" |
| Verbs | *focuses on, is built to, is designed to, seeks, aims to, is open to, looks for* (as intent or criteria, never as a pipeline), *will* (as an intention) | *operates, trades, supplies, sources, manages, delivers, invests (in), works with, grows alongside, connects* as completed or ongoing fact |
| Participles and passives | "built to connect…", "designed to reinforce…", "meant to be held…" | "connecting markets, partners and capital", "Capital is directed…", "Movement coordinated across…", "Routes to market developed with…" used as present fact |
| "We" | "we aim to", "we hold ourselves to", "we favour", "we would like to hear from you" | "we invest", "we connect", "we work with", "our partners" |
| Service commitments | "Start a conversation with AUREX." | "Every inquiry is reviewed and answered…", "We will respond…", response times |

"Looks for" and "seeks" are allowed because they state intent. For sector sentences the more conservative "is open to" is used (audit issue 8).

CMS rule: each sector and business area has a `status` field.
- `focus` is the default. The public label is "Sector of focus", "Strategic focus", or no label.
- `active` may be set only after AUREX confirms in writing. The confirming statement and its date must be added to §16 at the same time.
- `status` must never default to `active`. The drafts' `featured: true` and "Current projects" defaults are not status evidence.
- The build currently uses `status: "strategic"`. See §20.1 C3.

---

## 7. Future / strategic divisions (verticals)

Six sectors of focus: the brief's five verticals, with LARP separated out as its own sector by the client on 2026-09-27. **Scope lines are proposals and await AUREX confirmation (§18). The one exception is the LARP & Historical Goods scope, which the client defined.**

| Sector (public name) | Brief name | Names used in drafts | Status label | Scope line |
|---|---|---|---|---|
| Food | Food | Food & Agriculture (`gold`), Food Products (`teal`), Food Industry (`seed`) | **Strategic focus. Activity not confirmed.** | Proposal: "Food, approached with a long-term view across the markets of focus." |
| Property & Real Estate | Property / Real Estate | Property & Real Estate (`gold`), Real Estate (`seed`) | **Strategic focus. Activity not confirmed.** | Proposal: "Property and real estate, approached as long-term value." |
| Medical | Medical / LARP (medical part) | Medical & Healthcare (`gold`), Medical Sector (LARP) (`seed`) | **Strategic focus. Activity not confirmed.** | Proposal: "Medical: a sector where quality and compliance come first." |
| Electronic Components | Electronic Components | Electronics & Components (`gold`), Electronic Components & Parts Trading (`seed`) | **Strategic focus. Activity not confirmed.** | Proposal: "Electronic components, approached with a long-term view." |
| Sustainability & Green Transition | Green Revolution / Sustainability | Sustainability & Green Revolution (`gold`), Sustainability page (`teal`), Green Revolution / Sustainability (`seed`) | **Strategic focus. Activity not confirmed.** | Proposal: "Sustainability and the green transition." |
| LARP & Historical Goods | Medical / LARP (LARP part), defined by `client` 2026-09-27 | LARP & Costuming (`teal`), "LARP solutions" (`gold`), "LARP healthcare platform" (`seed`/`db`) | **Strategic focus (added by client 2026-09-27). Activity not confirmed.** | Client-defined scope: "Costumes, armour, props and historical reproductions for live-action role-play (LARP), re-enactment and theatrical markets." |

Public names come from the client's list of 2026-09-27. Use them verbatim in navigation, form options and SEO.

Notes:
- **"Green Revolution"** is the established name for the mid-20th-century transformation of agricultural yields, so as a public sector name it can be misread. The public name is "Sustainability & Green Transition" (client). Keep "Green Revolution" as the brief or internal label unless AUREX asks for it publicly.
- The drafts attach **sub-areas** to each vertical. None of them may be published: food production facilities, cold chain, Baltics; build-to-rent, Grade-A offices, DIFC; MedTech, diagnostics, clinical supply; *used / refurbished* equipment and spare parts; utility-scale solar, recycling. Sub-areas the build adds itself (for example "Medical supplies", "Equipment", "Parts & equipment") are also unconfirmed scope (§20). LARP & Historical Goods is the exception: its client-defined scope may be published, but nothing beyond it.
- **Electronic components** copy must avoid "new & used", "refurbished", "remarketing", "parts & equipment" and "24h quote time". These read as a small trading agency, which the brief excludes.

### 7.1 Resolution of "Medical / LARP" (client decision, 2026-09-27)

- **LARP means live-action role-play.** "LARP & Historical Goods" is a separate sector covering costumes, armour, props and historical reproductions for LARP, re-enactment and theatrical markets. It is **distinct from Medical**. The brief's slash joined two separate items.
- **Medical carries no LARP content.** The db's localised sector names "Sektor medyczny (LARP)", "Medische sector (LARP)" and "Secteur médical (LARP)" must not be used.
- **Status:** strategic focus, activity not confirmed. The client has not said it is an active trade line (§18).
- **Withdrawn rule:** rev. 1's instruction to "keep 'LARP' out of all public copy, navigation, forms and SEO" no longer applies. "LARP" may appear in the sector name, scope line, navigation, form options and SEO. Spell it out at first use on each page as "live-action role-play (LARP)".
- **Still excluded:** the `teal` "LARP & Costuming" trade-line copy (X13, X39). It states activity ("Aurex sources and supplies…", "serving… communities… worldwide") and it includes cosplay, which is outside the client's scope. Cosplay stays out unless AUREX adds it (§18).
- **Register guard:** present this sector in the same institutional register as the others. Do not use product catalogues, shop patterns, prices or "shop now" CTAs (§15.8). Do not use fantasy or cosplay imagery. Do not reuse product images from the unrelated OWNIT medieval-shop project, which the Drive inventory reported (Corinthian helmet images; not retained).

How the three prior readings resolve:

| Reading | Source (date) | What it says | Outcome |
|---|---|---|---|
| **Live-action role-play** (costumes, armour, props) | `teal` (2026-06-21 15:27) | "LARP & Costuming … serving live-action role-play communities, theatrical productions, and cosplay markets worldwide" | **Confirmed as the meaning** by the client. The sector is renamed LARP & Historical Goods. The draft's activity claims stay excluded (X13, X39). |
| **A named healthcare platform** | `seed` (06-20), `db` (06-21 05:36) | "Investments in medical technology, diagnostics and the LARP healthcare platform", plus a portfolio item "LARP MedTech Platform" | **Rejected.** Invented demo content (X38). |
| **Unspecified "LARP solutions"** inside medical | `gold` (06-21 10:57) | "Aurex connects medical supplies, healthcare products, and LARP solutions…" | **Rejected.** LARP is not part of Medical. |

### 7.2 Sector detail pages

| Slug (= build `SectorId`) | Icon | Public name | Draft tagline decision | Overview starter (claim-free; awaits AUREX approval) |
|---|---|---|---|---|
| `food` | grain | Food | Reject "From farm to global table" (generic; supply-chain claim) | "Food is one of AUREX's sectors of focus, approached with a long-term view across the European Union, the Middle East, India and Africa." |
| `property` | building | Property & Real Estate | Reject "Income-generating real assets" (reads as a return promise and implies owned assets) | "Property and real estate are one of AUREX's sectors of focus, approached as long-term value rather than a trading opportunity." |
| `medical` | health | Medical | Reject "Healthcare innovation & LARP" | "Medical is one of AUREX's sectors of focus: a sector where quality and compliance come first." |
| `electronics` | chip | Electronic Components | Reject "New & used electronics trade" | "Electronic components are one of AUREX's sectors of focus, approached with the same long-term discipline as the rest of the group." |
| `sustainability` | leaf | Sustainability & Green Transition | Reject "Investing in the energy transition" (implies activity) | "Sustainability and the green transition are one of AUREX's sectors of focus, approached with a long-term view." |
| `larp` | New icon needed (the `cms` enum `grain, building, health, chip, leaf, globe, chart, spark` has none that fits; for example a shield outline) | LARP & Historical Goods | No `seed`/`db` tagline. Reject the `teal` copy (X13). | "LARP and historical goods are one of AUREX's sectors of focus: costumes, armour, props and historical reproductions for live-action role-play, re-enactment and theatrical markets." |

- **"What AUREX looks for"**: no source supplies partner or investment criteria. Omit this block until AUREX supplies criteria (§18). If the layout needs a block, use a §19 principle line (for example "Built for decades, not transactions.") and the CTA. *The auditor's starter criteria were not adopted, because they would invent criteria.*
- "Why the sector matters" is general context only: no statistics, market sizes or forecasts.
- CTA "Discuss this sector" → `/{locale}/contact?type=partnership&sector={slug}#inquiry` (§15.4).
- Sector cards and pages follow §15.3.1: the whole card is a link, and every CTA resolves.
- Starter copy needs AUREX approval (§18).

### Verticals in drafts that are out of scope (not in the brief or the client decisions)

- Beverages and Brands (`gold`).
- From `teal`: Paper Products, and General Supplies (office supplies, hotel supplies, printers, commercial appliances and advertising supplies).
- Consulting and technology services (`teal`): Global Trade Advisory, Market Analysis & Mapping, International Business Consulting, Technology Services.
- Cosplay, which was part of `teal`'s LARP line.

These are excluded unless AUREX reinstates them.

---

## 8. Industries

These are the industries the site may name. They are sector vocabulary for navigation, the inquiry form's "sector of interest" field and SEO. They are **not** claims of activity. Terms marked *pending* are SEO vocabulary awaiting AUREX confirmation of scope (§18).

| Industry vocabulary | Linked sector / area |
|---|---|
| Food; agri-food (*pending*) | Food |
| Real estate / property | Property & Real Estate |
| Medical; healthcare (*pending*); medical technology (*pending*) | Medical |
| Electronic components; industrial electronics (*pending*) | Electronic Components |
| Sustainability, green transition; renewable energy (*pending*); resource efficiency (*pending*) | Sustainability & Green Transition |
| LARP (live-action role-play), re-enactment, theatrical costume and props, armour, historical reproductions | LARP & Historical Goods (client-defined scope) |
| International trade, import & export, distribution, logistics | Trade & Distribution pillar (cross-sector) |
| Holdings and investment | Holdings & Investments pillar (cross-sector) |

Industries named in drafts that are excluded: beverages; paper and packaging; cosplay; office, hotel and hospitality supplies; advertising and promotional products; trade consulting; technology services; freight forwarding and customs brokerage offered as operated services.

---

## 9. Markets

Classification key:
- **Market of focus**: named in the brief. May be presented as a market the group focuses on. The "focus" framing itself awaits AUREX approval (§18).
- **Presence claim, unconfirmed**: a draft asserts offices, an HQ, operations or projects. Excluded.
- **Language only**: appears as a site language, not as a market.
- **Out of scope**: not in the brief.

| Market | In brief | Draft mentions | Classification | Site treatment |
|---|---|---|---|---|
| European Union | Yes | "European Union (HQ)" (`gold`); "Headquarters and core operations across the Netherlands, Poland and France", "3 EU hubs" (`seed`/`db`) | **Market of focus.** The draft HQ and operations claims are unconfirmed presence claims. | "European Union". The site may say "European-rooted" (brief) but must not name an HQ country or city. |
| Poland | Yes (named) | "Riverside Residences, Warsaw" (`seed`/`db`) | **Market of focus.** The Warsaw project is excluded. | Name it within the EU focus ("European Union, including Poland"). Whether the separate listing signals the HQ country is a §18 question. |
| UAE / Middle East | Yes | "United Arab Emirates" listed under "Headquarters" (`gold`); "Dubai regional HQ", "DIFC corridor", "Gulf Electronics Trading Hub" (`seed`/`db`) | **Market of focus.** All presence claims are excluded. | "The UAE and the wider Middle East". Do not use "the Gulf" as the market name: it is narrower than the brief's "UAE / Middle East". |
| India | Yes | "India" listed under "Headquarters" (`gold`); "5+ active projects", "SolarBridge India" (`seed`/`db`) | **Market of focus.** Presence and project claims are excluded. | "India". |
| Africa | Yes | Absent from every draft except a form country dropdown | **Market of focus.** | "Africa" at continent level. Name no countries until AUREX specifies them. |
| Netherlands | No (Dutch is a language) | "Zuidas Business District, Amsterdam" HQ, "Rotterdam Cold Chain" (`seed`/`db`) | **Language only.** The presence claims are unconfirmed and excluded. | Not presented as a market. |
| France | No (French is a language) | "core operations" (`seed`/`db`) | **Language only.** Presence claim excluded. | Not presented as a market. |
| Egypt (Cairo) | No (Africa only at continent level) | "Offices in Cairo", a Cairo street address, +20 and (02) phone numbers (`teal`) | **Presence claim, unconfirmed.** Ownership unknown. Excluded. Adopting the teal palette does not change this. | Not presented. See §18. |
| Baltics | No | "Baltic Food Distribution … 6 countries" (`seed`/`db`) | **Presence claim, unconfirmed.** Excluded. | Not presented. |
| Germany / DACH | No | Only implied by the German translation (`gold`, `teal`) | **Out of scope.** | Not presented. German is dropped. |
| "Asia", "3 continents", "15+ markets", "worldwide" | No | `gold`, `teal` | **Excluded as counts or claims.** "Asia" is broader than the brief's India. | Not presented. |

Rules:
- Use the label "**Markets of focus**" and never "presence", "global presence", "offices", "hubs", "headquarters", "regional HQ", "footprint" or "where we operate".
- On a globe or map, highlight regions only. Do not use pins labelled as offices or cities. Any trade corridors shown are illustrative and must not be labelled as active routes or volumes. "Corridor" is allowed as orientation ("the corridors that connect Europe with the Middle East, India and Africa"). It is not allowed as an asset ("our corridors", "where value moves").
- Do not use market counts or continent counts, including "Five markets of focus".

---

## 10. Audience

The three inquiry types come from the brief. The audience categories come from drafts (`gold`: "investor, manufacturer, distributor, or institution"; `seed`: "investor, founder or strategic partner"). They are used here as target audiences, not as claims that such relationships exist.

| Audience | What they need from the site | Inquiry type |
|---|---|---|
| Producers, manufacturers and suppliers in the sectors of focus (including LARP, re-enactment and theatrical goods) | A clear sense of how AUREX works and what it stands for. A clear route to discuss supply and trade. | Partnership |
| Distributors and importers in the markets of focus | An understanding of the group model. A route to discuss market access and distribution. | Partnership |
| Investors and co-investors (family offices, institutions), subject to legal review (§18) | Positioning, principles and sectors. A discreet route to an investment conversation. | Investment |
| Businesses and founders interested in a long-term partner | How AUREX thinks about long-term partnership, and how to start a conversation | Investment or Partnership |
| Corporate counterparties (financial institutions, advisers, service providers, media) | Who AUREX is, and a general contact route | Corporate |

Notes:
- Careers is excluded by the brief, so candidates are not a target audience.
- Private (retail) investors are not a target audience. Targeting them carries financial-promotion risk, and the brief gives no basis for AUREX raising outside capital.
- Investment inquiries are only the start of a conversation. The site must not solicit amounts, promise returns or describe investment products (§15.4).

---

## 11. Leadership information

**Known:** nothing. No name, title, biography, photo, board or advisory board is confirmed by any source.

| Item | Status |
|---|---|
| Executive names and titles | Unknown |
| Board / advisory board | Unknown. Whether one exists is also unconfirmed. |
| Photos, biographies, LinkedIn profiles | Unknown |
| Consent to be named publicly | Unknown |

Excluded draft material:
- `seed`/`db` demo personas: Aleksander Nowak (Group CEO), Sophie Laurent (CFO), Rajesh Menon (MD, Asia & Middle East), Dr. Anna Visser (Advisory Board, Healthcare), Pieter De Vries (Advisory Board, Real Estate). All five share a templated bio and a bare `https://linkedin.com` link.
- `gold` placeholder roles: Chief Executive Officer, Managing Director, Head of Investments, and three "Strategic Advisor" cards marked "Full profile and biography coming soon."

Site treatment:
- Keep a Leadership collection and template in the CMS, but leave the page **unpublished and out of navigation** until AUREX supplies names with consent (`src/content/facts.ts` → `leaders: []`).
- A home or about section may cover **governance principles** without names, roles or headcount.
- Do not use placeholder role cards or "coming soon" / "will be published here" states. They imply a structure that is not confirmed and make the site look unfinished. The current build breaks this rule (§20.1 C9).

---

## 12. Portfolio information

**Known:** nothing. No holding, investment, joint venture, project, partner company or metric is confirmed.

Excluded draft material:
- `seed`/`db`: eight demo items with metrics. These are Baltic Food Distribution, Riverside Residences Warsaw, LARP MedTech Platform, Gulf Electronics Trading Hub, SolarBridge India, Rotterdam Cold Chain, Dubai Prime Offices and GreenLoop Recycling. The metrics include €48M revenue, 240 units, 80 MW and 94% occupancy.
- `gold`: six "Project in preparation" cards, and the intro "A curated view of Aurex investments and holdings…".

Site treatment:
- **Do not publish a Portfolio page at launch.** Keep the CMS collection (types `investment | holding | partnership | project`, statuses `active | in-development | exited`, sector relation) unpublished, with `holdings: []` in `facts.ts`.
- On the site, "how the group is built to invest" is expressed through principles (§19) and sectors (§7), not through listed items or empty registers.
- Publish an item only once AUREX confirms it, approves disclosure and supplies any figures shown.

---

## 13. Contact information

**Known:** nothing. No email, domain, phone, address, legal entity or social account is confirmed.

| Item in drafts | Value | Source | Status | Action |
|---|---|---|---|---|
| Email | `info@aurex.com` | `gold` | Unconfirmed. Ownership of the domain is unknown. | Do not publish; ask AUREX (§18) |
| Email | `info@aurex-trading.com` | `teal` | Unconfirmed. A "-trading" domain also conflicts with the holding/investment positioning. | Do not publish; ask AUREX (§18) |
| Email | `invest@aurex.example`, `admin@aurex.example`, `ir@aurex.example`, `noreply@aurex.example` | `seed`, `db`, `cms` `.env.example` | **Placeholder.** `.example` is a reserved domain (RFC 2606) and can never receive mail. | Never publish |
| Email | `*@blueharbor.example` | `cms` | **Template leftover** | Remove |
| Phone | `+31 20 000 0000` | `seed`/`db` | **Placeholder** (zero-filled Amsterdam number) | Never publish |
| Phone | `+20 150 106 5557`, `+20 150 106 5556`, `(02) 2180 4158` | `teal` | Egyptian numbers. Ownership unknown. | Never publish unless AUREX confirms them (§18) |
| Address | "Zuidas Business District, Amsterdam, Netherlands" + Google Maps embed | `seed`/`db` | Unconfirmed office | Never publish |
| Address | "14 Mahmoud Ahmed El-Meligy, Al Matar, El Nozha, Cairo Governorate" + Maps embed | `teal` | Unconfirmed. Ownership unknown. | Never publish unless AUREX confirms it (§18) |
| WhatsApp | `wa.me/201501065557` floating button | `teal` | Excluded by the brief. The client's palette decision does not reinstate it. | Remove |
| Social | LinkedIn, X, Facebook, Instagram → `#` or `https://linkedin.com` | `gold`, `teal`, `seed` | **Placeholder** | Show no social icons until real URLs exist |
| Response time | "we'll respond within one business day" | `seed`/`db` | Unconfirmed service commitment | Do not publish |

Site treatment:
- The **inquiry form** is the primary contact route.
- Display an email address only after AUREX confirms the domain and mailbox. The build reads it from `NEXT_PUBLIC_CONTACT_EMAIL`. If that is unset, no email block is displayed: no "will be published here" text (§20.1 C9).
- Show no phone number, address, map or "our offices" block until these are confirmed.
- Form notifications need a confirmed recipient mailbox (§18).

---

## 14. Visual identity

### 14.1 Palette decision (client, 2026-09-27)

**The site uses the palette of the Aurex-Teal build.** The client supplied the values from the `:root` of `https://ownit24.shop/Aurex/Aurex-Teal/services`, which is the same build as the Drive `Aurex-Teal` folder. This supersedes the brief's black/gold palette and rev. 1's "black/gold wins" (§14.10).

| Source token (teal build) | Hex | Role in AUREX |
|---|---|---|
| teal | `#009999` | Brand teal. Decoration, glows, large display and non-text UI only (white on it is 3.49:1) |
| teal-dark | `#006666` | Accent on light surfaces: text, links, eyebrows, focus rings; button fill on light with white text |
| teal-darker | `#004D4D` | Deeper accent; small text on light where more contrast is wanted |
| lime | `#8DC63F` | **Primary accent on dark surfaces**: hairlines, eyebrows, icons, italic accent words, primary button fill with dark text, focus rings on dark |
| lime-bright | `#99CC00` | Hover and highlight state of lime elements on dark |
| gold | `#F5B323` | **Logo arrow only.** Not used anywhere else in the UI. |
| white | `#FFFFFF` | Text on dark; email and print backgrounds |
| charcoal | `#222222` | Teal build body text. Not used in the AUREX build, which uses ink `#013333` on light. |
| gray | `#666666` | Teal build muted text. Not used; the build uses stone `#566260`. |
| light-gray | `#F5F5F5` | Teal build light surface. Not used; the build uses `#F7FAF9`. |

**Scope: palette only.** The following teal elements are **not** adopted and remain excluded: the positioning ("data-driven global trading enterprise", X58), the Cairo contact details (X26, X47), WhatsApp and its green (X48), the German locale, the services and trade lines (X12–X15), the "Global Trading" wordmark (X2), Poppins, and the orbit, Ken Burns and AOS motion (§14.9).

### 14.2 Implemented token mapping (`src/app/globals.css` `@theme`, commit `b6e2b2c`)

The build maps the teal palette onto deep-teal surfaces. The mapping below is the reference.

| CSS token | Hex | Role | Derivation |
|---|---|---|---|
| `--color-ink-950` | `#012626` | Deepest surface: footer, deep bands | Derived deep teal |
| `--color-ink` | `#013333` | Primary dark surface (`html`/`body` background); text on light surfaces | Derived deep teal |
| `--color-ink-850` | `#023D3D` | Alternate dark band, cards | Derived deep teal |
| `--color-ink-800` / `-700` / `-600` | `#004747` / `#0A5656` / `#16605F` | Raised surfaces, borders (see contrast limits) | Derived |
| `--color-teal` | `#009999` | Brand teal: decoration and large display only | Palette |
| `--color-teal-dark` | `#006666` | Same as `gold-ink` | Palette |
| `--color-teal-darker` | `#004D4D` | Deep accent | Palette |
| `--color-gold` → rename `--color-accent` | `#8DC63F` | Accent (lime) | Palette |
| `--color-gold-bright` → `--color-accent-bright` | `#99CC00` | Accent hover | Palette |
| `--color-gold-soft` → `--color-accent-soft` | `#C3E28F` | Soft accent tint on dark | Derived (not in the source palette) |
| `--color-gold-ink` → `--color-accent-ink` | `#006666` | Accent text on light surfaces (6.47:1 on `#F7FAF9`) | Palette (teal-dark) |
| `--color-sun` | `#F5B323` | Logo arrow only | Palette |
| `--color-ivory` | `#F7FAF9` | Light surface; text on dark | Derived light surface |
| `--color-ivory-200` / `-300` | `#EDF3F2` / `#DCE8E6` | Alternate light surfaces | Derived |
| `--color-stone` | `#566260` | Muted text on light | Derived |
| `--color-mist` / `--color-mist-dim` | `#A9C9C6` / `#86ABA8` | Muted text on dark | Derived |
| `text-gold-gradient` utility → rename `text-accent-gradient` | `#00A8A8 → #8DC63F → #99CC00 → #1FB3A3` | Gradient display text | Two stops (`#00A8A8`, `#1FB3A3`) are not in the palette. Large display only. |

**Naming.** The `gold*` token names and the `text-gold-gradient` utility are left over from the black/gold phase. **In code, `gold` currently means lime.** Rename them to `accent`, `accent-bright`, `accent-soft`, `accent-ink` and `text-accent-gradient`. Also update the comment on `Heading.accent` in `src/content/types.ts` ("rendered in the gold serif accent").

### 14.3 Contrast (WCAG 2.x relative luminance, computed 2026-09-27)

Foreground on dark surfaces:

| Foreground | ink-950 `#012626` | ink `#013333` | ink-850 `#023D3D` | ink-800 `#004747` | ink-700 `#0A5656` | ink-600 `#16605F` |
|---|---|---|---|---|---|---|
| ivory `#F7FAF9` | 15.31 | 13.13 | 11.51 | 10.04 | 8.07 | 6.96 |
| lime `#8DC63F` | 7.87 | 6.75 | 5.92 | 5.16 | 4.15 | 3.58 |
| lime-bright `#99CC00` | 8.41 | 7.22 | 6.33 | 5.52 | 4.43 | 3.83 |
| accent-soft `#C3E28F` | 11.17 | 9.59 | 8.40 | 7.33 | 5.89 | 5.08 |
| mist `#A9C9C6` | 9.08 | 7.79 | 6.82 | 5.95 | 4.78 | 4.13 |
| mist-dim `#86ABA8` | 6.43 | 5.52 | 4.84 | 4.22 | 3.39 | 2.93 |
| teal `#009999` | 4.60 | 3.95 | 3.46 | 3.02 | 2.43 | 2.09 |
| sun `#F5B323` | 8.69 | 7.46 | 6.54 | 5.70 | 4.58 | 3.95 |

Foreground on light surfaces:

| Foreground | ivory `#F7FAF9` | ivory-200 `#EDF3F2` | ivory-300 `#DCE8E6` | white |
|---|---|---|---|---|
| ink `#013333` | 13.13 | 12.28 | 10.99 | 13.79 |
| teal-darker `#004D4D` | 9.22 | 8.62 | 7.71 | 9.68 |
| accent-ink `#006666` | 6.47 | 6.05 | 5.41 | 6.79 |
| stone `#566260` | 6.04 | 5.65 | 5.05 | 6.34 |
| teal `#009999` | 3.32 | 3.11 | 2.78 | 3.49 |
| lime `#8DC63F` | 1.94 | 1.82 | 1.63 | 2.04 |
| lime-bright `#99CC00` | 1.82 | 1.70 | 1.52 | 1.91 |
| sun `#F5B323` | 1.76 | 1.65 | 1.47 | 1.85 |

Fills (label on fill): ink `#013333` on lime **6.75**; ink-950 on lime **7.87**; white on lime 2.04 (**fails**); ivory on lime 1.94 (**fails**); white on `#006666` **6.79**; ivory on `#006666` **6.47**; white on `#004D4D` **9.68**; white on `#009999` 3.49 (large text only); ink on `#009999` 3.95 (large text only).

Rules:
- Body text (under 24 px regular, or under 18.66 px bold) needs at least 4.5:1. Large text and non-text UI (icons, input borders, focus rings) need at least 3:1.
- **Lime text** is allowed on ink-950, ink, ink-850 and ink-800 (≥ 5.16:1). On ink-700 (4.15) and ink-600 (3.58) it is for large text and UI only. **Never use lime on light surfaces** (≤ 2.04:1).
- **Accent on light surfaces** is `#006666`: text, links, eyebrows and focus rings (6.47:1 on `#F7FAF9`, 6.05:1 on `#EDF3F2`). Use `#004D4D` for fine print if more contrast is wanted.
- **Brand teal `#009999`** is for decoration, glows, large display and non-text UI only, and only where it reaches 3:1: ink-950, ink, ink-850, ivory and white. Avoid it on ink-800 (3.02, marginal) and never use it on ink-700 or ink-600. Never use it for body text. **No white-on-`#009999` buttons with body-size labels** (3.49:1).
- **Buttons.** On dark surfaces: lime fill with an ink `#013333` label (6.75:1). White or ivory labels on lime fail. On light surfaces: `#006666` fill with a white or ivory label.
- **Focus rings.** Lime works on dark surfaces. On light surfaces lime fails the 3:1 non-text minimum (1.94:1), so light sections must use `#006666`. The build's global `:focus-visible` currently uses lime everywhere (§20.1 C1).
- **Muted text.** On light: stone `#566260` (6.04 / 5.65 / 5.05). On dark: mist `#A9C9C6` is body-safe on ink-950 to ink-700 (≥ 4.78). mist-dim `#86ABA8` is body-safe only on ink-950, ink and ink-850 (≥ 4.84). On ink-800 (4.22) it is for large text only.
- **Sun `#F5B323`** is reserved for the logo arrow. It fails as text on light surfaces (1.76).
- **Gradient text:** the off-palette stops `#00A8A8` (4.71 on ink, 4.12 on ink-850) and `#1FB3A3` (5.28 / 4.62) limit it to large display text.
- The client's figures are confirmed: `#006666` on `#F7FAF9` = 6.47 (≈ 6.5:1) and white on `#009999` = 3.49. The `globals.css` comments are also confirmed: lime on deep teal 6.75 (≈ 6.8), stone 6.04 (≈ 6.0), mist 7.79 (≈ 7.8).
- Every new token must be re-checked before use.

### 14.4 Typography

| Source | Display | Body | Notes |
|---|---|---|---|
| `gold` | Fraunces (serif, 400–700) | Manrope (300–800) | Eyebrows in Manrope 700, 12.5 px, tracking 3.5 px, uppercase†. Italic serif accents in headings. |
| `cms` / `discovery` layout | Fraunces | Inter | latin + latin-ext subsets |
| `teal` | Poppins (300–900) | Poppins | **Not adopted.** The client adopted the teal palette only. |
| Current build (`src/app/fonts.ts`) | Instrument Serif (400, with italic) | Inter Tight (300–600), plus IBM Plex Mono (400, 500) for eyebrows | This is the current choice. All three load `latin` + `latin-ext`. The brief does not specify typography. |

The prior drafts point to one direction: a **high-contrast serif for display** with a **neutral grotesk for body**, and an italic serif for accent words. That direction is what matters, not the specific typefaces. Hard requirement: fonts must load the **latin-ext** subset so Polish (ą ć ę ł ń ó ś ź ż) and French diacritics render. The current build meets this.

### 14.5 Motifs

Reuse (from `gold`, re-coloured to the teal palette):
- A dark-first layout, with deep-teal sections (ink) alternating with ink-850 and ink-950 bands and light contrast sections (`#F7FAF9`).
- An accent hairline system: a short accent line before each eyebrow, a short 64 × 2 px rule†, and an animated hero rule. Use lime on dark and `#006666` on light.
- Framed imagery: a 1 px accent-tint border plus an offset solid accent shadow†.
- Cards with a hairline border and an accent top line that grows on hover.
- A subtle film-grain overlay and a restrained teal (`#009999`) radial glow in the hero and CTA band.
- Italic serif accent words inside display headings: lime on dark, `#006666` on light.
- Motion built from rise/fade entrances and scroll reveals, with `prefers-reduced-motion` respected (§14.9).

The logo arrows: the `teal` wordmark has **two opposing arrows** (import ↔ export), and the palette reserves `#F5B323` for a logo arrow. An arrow mark expresses the brief's "exchange" idea. Its use needs AUREX approval (§14.7, §18). The `teal` wordmark text ("Aurex / Global Trading") is not adopted.

Reject: the green sustainability sub-palette and WhatsApp green (`teal`). The navy/sea/port-teal theme, anchor, ship and wave icons, wave dividers and the "back to port" 404 copy (`cms`/`db`, Blue Harbor template). Stats bands and animated counters. Dashed "scaffold" placeholder cards.

### 14.6 Imagery

- No AUREX-owned photography exists. `gold` and `teal` hotlinked Unsplash stock. `cms`/`db` used procedurally generated abstract placeholder art (`seed/imageArt.ts`). The current build uses its own stills (`/media/stills/still-sea`, `still-coast`, `still-land`, `still-connected`).
- Imagery must not imply owned assets, offices, fleets, warehouses or specific projects. Use no identifiable buildings presented as "ours" and no vessels or trucks carrying branding.
- Show logistics subjects (ports, containers, ships) sparingly and in an abstract, premium treatment (desaturated, grain, low opacity, teal-tinted grading), to avoid a cheap-logistics feel.
- Grading (from `gold`†, re-tinted): content and sector images at grayscale(.3) brightness(.85), full colour on hover. Page banners at grayscale(.4) brightness(.5) under a deep-teal gradient (`#012626` → `#013333`). A hero photo may sit at about 14 % opacity with `mix-blend-mode: luminosity` over the deep-teal gradient and a teal radial glow.
- Subjects:
  - Hero: architecture or abstract texture, with no identifiable "HQ".
  - Name section: gold material macro (a texture; not bullion bars or coins, which read as commodity trading).
  - Trade & Distribution: ports, containers and routes, abstract and graded.
  - Holdings & Investments: architectural detail, no posed people.
  - Food: fields or produce at origin, no retail shelves.
  - Property: architectural detail, not a named building.
  - Medical: lab or clinical detail, no identifiable patients.
  - Electronic Components: macro of components or boards, no piles of used equipment.
  - Sustainability & Green Transition: solar, wind or landscape, no named project.
  - LARP & Historical Goods: craft and material detail (leather, textile, stitching, metalwork, armour plates, props), no identifiable people in costume, no fantasy, cosplay or battle scenes, and no OWNIT product images (§7.1).
- Mood references: the `gold` Unsplash photo IDs found in the retained copies are `1486406146926` (hero), `1487958449943` (overview), `1500382017468` (food), `1576091160399` (medical), `1518770660439` (electronics), `1473341304170` (sustainability), `1521791136064` (partnerships), `1450101499163` (story) and `1454165804606` (about banner). If any is used, download it under the Unsplash licence, self-host it as AVIF/WebP with explicit width and height, and never present it as an AUREX asset.
- Alt text describes the subject, never ownership ("Container terminal at dusk", not "Our terminal"). Decorative images use `alt=""`.
- No people presented as "our team". No procedural placeholder art.
- Default OG image: 1200 × 630, `#013333` background with grain, the "AUREX" wordmark in `#F7FAF9`, and "Value in Motion." in lime `#8DC63F` (6.75:1). One image serves all locales, since the tagline stays in English (§4).
- Self-host all images; do not hotlink them.

### 14.7 Logo status

- **No AUREX logo exists** in any source. There is no SVG, PNG or JPG, and none was uploaded to the CMS Settings.
- The drafts show three things: a `gold` typographic wordmark ("AUREX" in Fraunces 600 plus "GLOBAL" in gold Manrope†); a `teal` wordmark ("Aurex / Global Trading" with two arrow icons); and the `cms` fallback (an anchor icon plus "Aurex"), which is a template leftover.
- `media/Animated_Tech_Logo_Reveal.mp4` in the CMS media library is the **Mobi Hub** logo, which belongs to another client, and it carries a Veo watermark. This was confirmed from frames of the retained copy. **Never use it; delete it from any AUREX library.** `media/Video Project 7.mp4` (40 MB, the CMS home hero video) was not inspected and must not be used until someone confirms what it shows.
- **Interim decision:** use a typographic wordmark "AUREX" with no descriptor. Drop "GLOBAL" and "Global Trading", since both name variants are unconfirmed. Replace it when AUREX supplies a logo. An arrow element in `#F5B323` may be added only if AUREX approves an arrow mark (§18).
- Accessibility: write the name as "Aurex" in the markup and apply `text-transform: uppercase` where the design needs capitals, or give the wordmark an `aria-label="AUREX"`. This stops screen readers from spelling out the letters.

### 14.8 Layout, type and wordmark tokens

The `gold` values below are **reference values** from `gold/styles.css`†. The build's values are the ones in use. Keep one value per token across the site.

| Token | `gold` reference† | Current build | Decision |
|---|---|---|---|
| Max content width | 1240 px (`cms`: 1320 px) | `container-x` max 90 rem (1440 px) | Keep the build value unless design review changes it |
| Header height | 80 px | `--header-h` 4.5 rem (72 px) | Build value |
| Section padding | 110 px desktop / 76 px mobile | `section-y` clamp(5.5 rem, 12 vw, 11 rem) | Build value |
| Side gutter | 32 px; 20 px below 480 px | clamp(1.25 rem, 4 vw, 3.5 rem), so 20–56 px | Never under 16 px (met) |
| Breakpoints | 1100 / 991 / 767 / 479 px | Tailwind defaults plus `3xl` 112 rem | Build value |
| Easing | cubic-bezier(.22,.61,.36,1) | `--ease-out-expo` cubic-bezier(0.16,1,0.3,1); `--ease-in-out-quart` | Build value; use one easing per interaction type |
| Hero H1 | fluid 48–116 px, tracking −1.5 px | `t-display-xl` clamp(3 rem, 7.6 vw, 7.75 rem), tracking −0.04 em | Build value |
| Eyebrow | 12.5 px / 700 / 3.5 px tracking, uppercase, Manrope | `t-eyebrow` IBM Plex Mono 11 px / 500 / 0.2 em, uppercase | Build value |
| Corner radius | Hairline system (square) | Mixed | 0–2 px for cards, frames and inputs. `rounded-full` is fine for dots, pills and icon buttons. The `cms` 12 px rounded cards are rejected as a template style. |

- Interim wordmark: "AUREX" in the display serif (Instrument Serif in the build; `gold` used Fraunces 600 at 25 px in the header and 28 px in the footer†), tracking ≈ 0.04 em, no descriptor. Ivory `#F7FAF9` on dark and ink `#013333` on light. Clear space at least the cap height.
- Interim favicon and app icon: a serif "A" in lime `#8DC63F` on `#013333` (6.75:1), replaced when AUREX supplies a logo (§18).

### 14.9 Motion & interaction

Keep (from `gold`†, re-coloured):
- A hero rise-and-fade entrance, and a hero accent rule drawing from 0 to 90 px.
- Scroll reveals: a fade plus a rise of 24 px or less.
- After 30 px of scroll, the header becomes deep teal (`#013333` at about 92 %) with a backdrop blur and an accent hairline.
- On hover, cards lift up to 8 px and their 2 px accent top line grows.
- Sector images go from grayscale(.3) brightness(.85) to full colour on hover.
- A bobbing scroll cue labelled "Value in Motion.".
- Film grain at 3.5–4.5 % opacity (the build uses 4.5 %).

Timing: 200–300 ms for hover and focus, 600–900 ms for reveals. Stagger ≤ 80 ms.

Allowed with conditions (current build):
- Lenis inertia scroll, the WebGL globe and emblem (`three`, `@react-three/fiber`), and `motion`.
- The `InteractiveCard` pointer spotlight with a restrained tilt: ±2.5° at the default `tilt = 5`. Never exceed ±3°.
- Magnetic and fill-sweep buttons.

Conditions:
- All of these are off under `prefers-reduced-motion` and on touch input.
- WebGL is lazy-loaded and is never the LCP element. A static SVG or image fallback is shown when WebGL is unavailable or the device is low-power.
- There is no layout shift.
- The globe shows regions only (§9): no city pins, labels or auto-highlighted "offices". Corridors are unlabelled and decorative.
- Keyboard and scroll are never hijacked.

Reject:
- From `cms`: glare overlays, shine sweeps, floating orbs and the animated gradient pan (template/SaaS register).
- From `teal`: orbit circles, Ken Burns zoom, and AOS loaded from unpkg.
- Animated counters (§15.8) and parallax on text.

All motion must pass WCAG 2.2 AA: no flashing, a pause control for anything that runs longer than 5 s (the hero video has one), and focus that stays visible during transitions.

### 14.10 Palette history: black/gold (brief) → teal (client)

| Phase | Palette | Basis | Build |
|---|---|---|---|
| Rev. 1 (superseded) | Matte Black `#111111`, Rich Gold `#C8A24A`, Champagne Gold `#D4AF37`, Ivory `#F8F6F0`. Supporting `gold` neutrals† `#0B0B0B`, `#141414`, `#1A1A1A`/`#232323`. Derived text variant `gold-ink` `#7D5F1A`. | The brief specified these hex values, and every Drive draft predated the brief, so the teal draft could not count as "newer Aurex material". | Implemented from commit `f074e0b` through `8fe74a6` |
| **Current** | Teal palette (§14.1) with the token mapping in §14.2 | **Client decision 2026-09-27.** It explicitly supersedes the brief's palette. | Implemented at commit `b6e2b2c` |

- Rev. 1's reasoning still holds for everything except the palette. The teal build's positioning, Egyptian contact details, WhatsApp, German locale, services and trade lines, and missing inquiry form remain excluded.
- The `cms` navy `#0C2340`, sea `#1F6F8B` and accent `#0C8A7B` ("port teal") are Blue Harbor template defaults and are superseded. `#0C8A7B` is not the AUREX teal. If the Payload Settings theme fields are reused, set them to the §14.2 tokens or remove them.
- The black/gold values must not reappear anywhere, including the build's inquiry notification email, which still uses `#7D5F1A`, `#F8F6F0` and `#111111` (§20.1 C14).

---

## 15. Website requirements

### 15.1 Pages

| Page | Status | Content | Basis |
|---|---|---|---|
| Home | **Required** | See §15.2 | All drafts; brief |
| About (the group) | **Required** | Positioning, brand story, how the group works, principles and governance approach (no names) | `gold`, `seed`/`db` |
| Business areas (`/business-areas`) | **Recommended** | Trade & Distribution pillar (International Trade, Import & Export, Distribution, Logistics). Holdings & Investments pillar (Holdings, Investments, Capital). How the pillars relate (§5 proposed narrative). | Brief strategic areas. No draft had a dedicated page, so this is a proposal. |
| Sectors: index plus **6** detail pages | **Required** | Per sector: overview, why the sector matters (general, no statistics), and a CTA "Discuss this sector" that pre-selects the sector in the form (§7.2). No "What AUREX looks for" block until AUREX supplies criteria (§18). | `gold`, `cms` `Sectors.ts`, `seed`/`db`; brief verticals; `client` (sixth sector) |
| Contact / Inquiries | **Required** | Inquiry form (§15.4). Email only once confirmed. | Brief |
| Privacy notice | **Required** | GDPR notice for form data: controller identity, purpose, retention, rights | The form may collect personal data of EU residents, so GDPR applies wherever AUREX is established. **Launch blocker:** controller identity (§18). |
| Legal notice / imprint | **Required** | Legal name, registered office, registration numbers | Required content depends on the legal entity's jurisdiction (§18). |
| 404 | **Required** | On-brand copy (below). Replace the nautical "back to port" copy. | `discovery` |
| Markets of focus (`/markets`) | Optional | Regions only (§9). May instead be folded into Home and About. | Current build has `/global-presence` (§20.1 C4) |
| Partnerships | Optional, not in the main navigation | Partnership models as an invitation (§10). Criteria and process only with AUREX approval (§18). | Current build |
| Leadership | **Deferred** | Template built but unpublished and out of navigation until names are supplied | §11 |
| Portfolio | **Deferred** | Template built but unpublished until items are confirmed | §12 |

Navigation: About · Business Areas · Sectors · Contact, plus a CTA "Start a conversation". Do not use "Investor enquiry" as the primary CTA (the `seed` choice), because it skews the site toward a fund feel.

404 copy (EN; translate for PL/NL/FR): eyebrow "Error 404"; heading "This page has moved on."; body "The page you are looking for does not exist or is no longer available."; links "Return home" (→ `/{locale}`) and "Start a conversation" (→ contact). Return HTTP status 404, set `noindex`, and include no search box. The current build's `notFound` copy already matches, apart from the eyebrow ("404").

### 15.2 Homepage story

1. **Hero**: the AUREX wordmark, "Value in Motion.", the eyebrow "European-rooted international group", a one-sentence positioning line (trading, holding and investment group), and CTAs "Explore the group" and "Start a conversation".
2. **The name**: Aur + Ex, meaning value and exchange (§3).
3. **Who we are**: the positioning paragraph (§2), with no numbers.
4. **How the group works**: the two pillars and how value is designed to move between them (§5).
5. **Sectors of focus**: the six sectors with their scope lines (§7). Cards link to the sector pages (§15.3.1). No status badges claiming activity.
6. **Markets of focus**: the EU (including Poland), UAE / Middle East, India and Africa as highlighted regions, with no office pins and no counts (§9).
7. **Principles / Why AUREX**: long-term, disciplined, built to be trusted (§19), stated as commitments. No certifications.
8. **Partnership invitation**: who AUREX wants to hear from (§10) and the three inquiry types.
9. **Contact**: the form, or a CTA to it. Closing line: "European Standards. Global Reach."

Not on the homepage: a stats band, partner logo strip, portfolio grid, leadership grid, news, social feed or WhatsApp.

### 15.3 Functionality

| Requirement | Specification | Basis |
|---|---|---|
| Contact / inquiry form | Server-side submission, validation, notification email to a confirmed mailbox, confirmation email to the sender | Brief. The `gold` form was demo-only; `cms` `route.ts` is the reference. |
| Inquiry types | Partnership · Investment · Corporate (general) | Brief; `seed` forms |
| Spam protection | Honeypot field, time-trap, per-IP rate limit, optional Cloudflare Turnstile (§15.10) | `cms` `route.ts` |
| CMS-ready content | All copy and collections editable without a redeploy (§15.6) | Brief |
| Responsive | From 320 px up. No horizontal scroll. Touch-friendly navigation. | Brief |
| SEO | §15.7 | Brief |
| Multilingual | §15.5 | Brief |
| Accessibility | WCAG 2.2 AA: contrast (§14.3), keyboard access, visible focus, labelled fields, skip link, reduced motion | Standard, and present in `cms` |
| **Interactivity** | All pages and buttons interactive; interactive cards; working buttons; no dead links (§15.3.1) | `client` 2026-09-27 |
| Analytics | Not requested. Optional (the CMS has GA4 and Plausible fields). If added, it needs a consent approach under GDPR. | AUREX to decide (§18) |

### 15.3.1 Interactivity (client decision, 2026-09-27)

- **Every page is interactive.** Every interactive element has visible hover, focus and active states. Nothing depends on hover alone.
- **Cards.** Sector, business-area and market cards link to their page or section. Each card is one link (a single `<a>` whose accessible name is the card title) with no nested interactive elements. Cards that lead nowhere (for example principles) may animate, but must not look clickable.
- **Buttons.** Every button either navigates or performs an action. Not allowed: `href="#"`, `javascript:void(0)`, buttons without a handler, and "disabled" CTAs used as decoration.
- **No dead links.** Every internal link resolves to a published route in the same locale. **Do not link to deferred pages** (Leadership, Portfolio) while they are deferred. Do not link to external placeholders (`https://linkedin.com`, `#`).
- **CTAs deep-link** to the form with the type and sector pre-selected (§15.4).
- **Globe / map.** Region highlighting on hover, focus and tap shows the market name and its line from §9. Provide a keyboard-accessible list as the alternative. No office pins.
- **Language switcher** keeps the same page and query string (§15.5.1).
- Touch targets are at least 44 × 44 px, everything is keyboard operable, and `prefers-reduced-motion` is respected (§14.9).
- **Interactive does not mean placeholder.** Do not make "coming soon" cards or empty registers clickable (§15.8).
- **Verification before launch:** run an automated link check across all four locales that fails on any 404 or placeholder target, and click through every CTA.

### 15.4 Inquiry form specification

- **One form.** Render the inquiry type as a 3-option segmented control (tabs). §15.6 "ContactForms (tabs)" means this control, not three separate forms.
  - Values and labels: `partnership` "Partnership", `investment` "Investment", `corporate` "Corporate & general".
  - A fourth type ("General" in the build, "Strategic collaboration" in `gold`) is a §18 question.
- **Legacy mapping:** `gold` "General Business Inquiry" → corporate; "Investment Inquiry" → investment; "Partnership Opportunity" and "Strategic Collaboration" → partnership (pending §18).
- **Fields:**
  - Required: Full name\*, Email\*, Inquiry type\*, Message\*, and a privacy consent checkbox\* that links to the privacy notice.
  - Optional: Company / organisation, Role (optional; present in the build), Country.
  - Sector of interest (Food · Property & Real Estate · Medical · Electronic Components · Sustainability & Green Transition · LARP & Historical Goods · Multiple · Not sure).
- **Deep links:** `/{locale}/contact?type={partnership|investment|corporate}&sector={food|property|medical|electronics|sustainability|larp}#inquiry` pre-selects both. Invalid values are ignored.
- **Intros per type (claim-free):**
  - Partnership: "For producers, distributors and strategic partners in AUREX's sectors and markets of focus."
  - Investment: "For investors, co-investors and businesses interested in a long-term partner." (Subject to legal review, §18.)
  - Corporate: "For general and corporate matters, including media."
- **Optional conditional fields:**
  - Partnership → "Partnership type" (Joint venture · Distribution · Co-investment · Supply · Other; from `seed`).
  - Corporate → "Topic" (General · Media · Corporate · Other; `seed`'s "Procurement" is dropped).
  - No phone or website field at launch.
- **Country:** the full ISO 3166-1 list, with labels localised through `Intl.DisplayNames` per locale and sorted by locale collation. Do not reuse the 73-name English list in `cms` `lib/countries.ts`.
- **Localisation:** all labels, errors, success text and the confirmation email are localised EN/PL/NL/FR.
- **Confirmation email:**
  - Subject: "We have received your inquiry — AUREX".
  - Body: the confirmation line below and nothing else. It must not echo the submitted message or any links, so the form cannot be used as a spam relay.
  - Send it only when the honeypot is empty and the spam score is 0. The `cms` route sent it to any submitted address, and the subject used "enquiry" and "Aurex".
- **Validation:** server-side validation (zod) mirrors the client rules.
- **Excluded:**
  - "Indicative ticket size" (`seed`). It solicits investment amounts, which carries regulatory implications and a fund feel.
  - File upload at launch.
  - The "Custom sourcing request" page (`cms`), which has an agency or sales feel.
- **Confirmation copy** must not name teams or service levels. Remove "Our investor relations team…", "Our corporate development team…" and "within one business day". Use: *"Thank you for contacting AUREX. We have received your inquiry and will be in touch."*
- **Submission status names** in the admin: use `new → in-review → responded → closed` instead of the `cms` sales pipeline `new → in-review → quoted → won/lost` (`cms` README, `payload.config.ts`).

### 15.5 Languages

| Locale | Role | Status |
|---|---|---|
| `en` | Primary and default | Confirmed (brief) |
| `pl` | Secondary | Discussed (brief); built in; launch per §18. `gold/script.js` lines 154–282 hold a complete Polish translation of all `gold` copy (107 keys, the same as EN). `db` holds partial PL. |
| `nl` | Secondary | Discussed (brief); built in; launch per §18. Only partial `db` translations exist (home hero, sector names). |
| `fr` | Secondary | Discussed (brief); built in; launch per §18. Only partial `db` translations exist. |
| `de` | — | **Dropped.** It appears only in `gold` and `teal` and is not in the brief. The client's palette decision does not reinstate it. |
| `ar` (RTL) | — | **Dropped.** It is a Blue Harbor template leftover in the `cms` README and the `route.ts` types. |

Requirements:
- Crawlable per-locale URLs (`/en`, `/pl`, `/nl`, `/fr`).
- `hreflang` alternates plus `x-default` → `en`.
- Localised `<title>` and meta description. The static drafts did not translate these.
- Professional translation of all copy. Machine or draft translations must be reviewed by a native speaker.
- Whether all four locales go live at launch is a question for AUREX (§18).

The current build's `src/i18n/config.ts` already defines `en, pl, nl, fr` with `ogLocale` `en_GB`, `pl_PL`, `nl_NL`, `fr_FR` and the cookie `AUREX_LOCALE`, which is consistent with this section.

### 15.5.1 Prior implementations and lessons

| Draft | Mechanism | Lesson |
|---|---|---|
| `gold` | Client-side dictionary (en/pl/de). `data-i18n` (textContent) and `data-i18n-html` (innerHTML). The choice is stored in localStorage `aurex-lang`, and the first visit uses `navigator.language`. Flag-emoji switcher. | No crawlable locale URLs. Title and meta untranslated. Hero H1 and division names hard-coded. Flags stand for countries, not languages. |
| `teal` | Same pattern, key `aurex-teal-lang` | The HTML fallback text was truncated: content must be complete without JS. |
| `cms` / `db` | Payload localisation en/pl/nl/fr with `fallback: true`. Middleware redirects locale-less paths to `/en`. `seo.ts` uses `og:locale` `en_US`. | The fallback silently serves English under `/pl`, `/nl` and `/fr`. |

Rules:
- Use the `gold` PL as translation memory for the §19 lines, after removing X5 ("Ex — po łacinie „poza”"), X20 and X22 and after native review.
- Switcher: native names (English · Polski · Nederlands · Français) with codes EN/PL/NL/FR and no flags. Switching keeps the same page and query string.
- `/` → 307 redirect to the locale in the `AUREX_LOCALE` cookie, else Accept-Language, else `/en`. `x-default` = `/en`. The build's `src/proxy.ts` implements this order.
- No English fallback under a non-English URL. A locale goes live only when all its public pages are translated and reviewed. Until then it is excluded from the switcher, the sitemap and `hreflang`.
- Slugs: English slugs in every locale at launch (for example `/pl/sectors/food`).
- `og:locale`: `en_GB`, `pl_PL`, `nl_NL`, `fr_FR`.
- Sector names. The starting point is the current build's locale files (`src/content/locales/{pl,nl,fr}.ts`), and all need native review:

| EN | PL | NL | FR |
|---|---|---|---|
| Food | Żywność | Voeding | Alimentaire |
| Property & Real Estate | Nieruchomości | Vastgoed | Foncier & immobilier |
| Medical | Medycyna | Medisch | Médical |
| Electronic Components | Komponenty elektroniczne | Elektronische componenten | Composants électroniques |
| Sustainability & Green Transition | Zrównoważony rozwój i zielona transformacja | Duurzaamheid & groene transitie | Durabilité & transition écologique |
| LARP & Historical Goods | LARP i artykuły historyczne | LARP & historische goederen | LARP & objets historiques |

Do not use the `db` names that contain "(LARP)" or that mean "electronics trade" (Elektronicahandel, Négoce d’électronique).

### 15.6 CMS model worth reusing (from `cms` / `seed` / `discovery`)

| Keep | Change | Drop |
|---|---|---|
| **Settings global**: brandName, tagline, logo, logoDark, favicon, contact fields (left empty), SEO defaults (defaultTitle, titleSuffix " — AUREX", defaultDescription, defaultOgImage) | Theme fields: set to the §14.2 tokens or remove. Social enum: remove `whatsapp`. | Brand name variants "Aurex Global" (`gold`) and "Global Trading" (`teal`). The `cms` Settings default is "Aurex"; use "AUREX". |
| **Navigation global**: items, cta, footerColumns, footerNote | Footer note: "© {year} AUREX" plus the legal name once supplied | `autoPillarMenu` mega-menu (legacy) |
| **Pages** built from blocks, with drafts, versions and live preview | — | — |
| Blocks: Hero, AboutSplit, SectorsGrid, FeatureCards, RichText, CTABanner, ContactForms (the tabs control, §15.4), FAQ, Spacer | GlobalPresence → rebuild as "Markets of focus" with no stat fields and no "HQ" labels | Stats (counters), LogoStrip, SubsidiaryBand, PortfolioGrid and LeadershipGrid (until content exists), PillarsGrid, CategoryGrid, ServicesGrid, SpecsTable, Gallery |
| **Sectors** collection: name, slug, icon, tagline, summary, heroImage, overview, marketOpportunity, futureGrowth, seo, order | **Add `status` (`focus` default, `active`)**. Six records, including `larp`. Add an icon for LARP & Historical Goods (§7.2). Hide `currentProjects` and `stats` until real content exists. | Default `featured: true` treated as evidence of activity |
| — | Repurpose **Pillars** as **Business Areas** (the 7 areas grouped into 2 pillars) | Categories, Services, Subsidiaries (legacy trading/catalogue model) |
| **Markets** (new, small collection): name, region, `status` (`focus` or `presence`), description | `presence` only when AUREX confirms it | — |
| **Leadership**, **Portfolio** collections (schemas) | Keep unpublished | Seeded demo records |
| **Forms + Submissions** (form-builder, auto-tagging, internal notes, CSV export) | Rename statuses (§15.4). Rename role `sales` → `inquiries`. | Ticket-size field, file upload at launch |
| Roles: admin, editor, inquiries | — | — |
| Media: webp conversion, focal point, sizes up to OG 1200 × 630 | — | Procedural placeholder art, the Mobi Hub video, the uninspected hero video |

Remove all Blue Harbor leftovers: package and DB names, `blueharbor.example` emails, the anchor fallback logo, the nautical 404, and Arabic locale types.

Current build: there is no Payload. Content lives in the typed repository (`src/content/locales/*.ts`, `src/content/facts.ts`, `src/content/types.ts`, `src/content/repository.ts`), whose shapes are meant to mirror the collections above so they can migrate 1:1. Whether this counts as "CMS-ready" at launch, or an editable CMS is needed on day one, is a §18 decision.

### 15.7 SEO

- Per-page title and meta description in every locale, falling back to Settings defaults. Title pattern: `{Page} — AUREX`. Home: `AUREX — Value in Motion`.
- Limits: title ≤ 60 characters, description ≤ 155 characters.
- Canonical URLs, `hreflang` alternates, `x-default`, `sitemap.xml` covering all live locales, and `robots.txt` (disallow `/admin`, `/api`).
- Open Graph and Twitter `summary_large_image` with the teal 1200 × 630 default image (§14.6). `og:site_name` "AUREX". `og:locale` `en_GB` / `pl_PL` / `nl_NL` / `fr_FR`. No Twitter `@handle` until a profile exists.
- JSON-LD: `Organization` using **confirmed fields only**: `name` ("AUREX"), `url`, and `logo` once supplied. Omit `address`, `telephone`, `foundingDate`, `founder`, `numberOfEmployees` and `sameAs` until they are supplied. Add `WebSite` (name, url, inLanguage) and `BreadcrumbList`. No `SearchAction`.
- The default meta description must use the positioning wording (§2) and the descriptor "connecting value across borders". It must not contain counts or presence claims.
- Keyword themes: international trading, holding and investment group; European-rooted; the sector names; the markets of focus. Keep "import export" as a secondary term only, to avoid the generic import-export register.
- Deferred and unpublished pages (Leadership, Portfolio) stay `noindex` and out of the sitemap. So do locales that are not yet fully translated (§15.5.1).
- Retire every `gold` title and description ("Aurex Global — …", "…across Europe, the Middle East, and Asia").

EN strings (translate for PL/NL/FR):

| Page | Title | Description (≤ 155 characters) |
|---|---|---|
| Home | AUREX — Value in Motion | AUREX is a European-rooted international trading, holding and investment group, built to connect value across borders for the long term. |
| About | About the group — AUREX | The positioning, principles and governance behind AUREX, a European-rooted international trading, holding and investment group. |
| Business Areas | Business areas — AUREX | How AUREX is structured: international trade, import and export, distribution and logistics, alongside holdings, investments and capital. |
| Sectors | Sectors of focus — AUREX | Food, property, medical, electronic components, sustainability and the green transition, and LARP and historical goods: the sectors AUREX focuses on. |
| Sector detail | {Sector} — AUREX | {Overview starter from §7.2, trimmed to ≤ 155 characters} |
| Markets of focus (if kept) | Markets of focus — AUREX | The markets AUREX focuses on: the European Union, including Poland, the UAE and the wider Middle East, India and Africa. |
| Contact | Contact — AUREX | Start a conversation with AUREX about partnership, investment or corporate matters. Use the inquiry form and choose the type that fits. |

### 15.8 Explicit exclusions

From the brief: blog, newsroom, IR portal, careers, WhatsApp, social feeds, live stock data.

Also excluded by this document:
- Statistics and counters of any kind.
- Partner or client logo strips.
- Office, HQ or presence maps.
- "Coming soon", "to be published" or "will be published here" cards, sections and empty registers.
- Social icons until real URLs exist.
- An investor ticket-size field.
- A custom sourcing request page, product catalogues, shops, price lists and supply pages, for every sector including LARP & Historical Goods.
- German and Arabic locales.
- Named sub-brands or divisions.
- Any use of seeded demo content.
- Dead links, placeholder links and links to deferred pages (§15.3.1).

### 15.9 Global chrome & URL map

**URLs.** The same route keys are used in every locale:
- Published: `/{locale}` · `/about` · `/business-areas` · `/sectors` · `/sectors/{food|property|medical|electronics|sustainability|larp}` · `/contact` · `/privacy` · `/legal`.
- Optional: `/markets` and `/partnerships` (§15.1).
- Deferred: `/leadership` and `/portfolio` (unlinked, `noindex`, not in the sitemap).

**Header.** Wordmark (→ home) · About · Business Areas · Sectors (a dropdown of the six sectors on desktop, a list in the drawer) · Contact · language switcher · CTA "Start a conversation".
- Transparent over the hero. After 30 px of scroll† it becomes ink `#013333` at about 92 % with a backdrop blur and an accent hairline.
- Mobile drawer: focus-trapped, Esc closes it, tap targets ≥ 44 px.

**Footer** (ink-950 `#012626`):
- Column 1: the wordmark, "Value in Motion." and "European Standards. Global Reach.".
- Group (About, Business Areas, Contact).
- Sectors (6 links).
- Markets of focus, as plain text: European Union, including Poland · UAE / Middle East · India · Africa.
- Bottom bar: "© {year} AUREX" plus the legal name when supplied · Privacy · Legal notice.
- Not in the footer: social icons, an address, a phone number, a sub-brand "Businesses" column (`gold`), or links to deferred pages. §13 items are added only once confirmed.

**Breadcrumbs** on every inner page (Home › Sectors › Food), with `BreadcrumbList` JSON-LD.

### 15.10 Build & operations

- **Spam parameters** (from `cms` `route.ts`):
  - Per-IP limit of 6 submissions per 60 s, backed by a shared store in production. The in-memory limiters in `discovery` `lib/rateLimit.ts` and in the current build reset per instance.
  - Honeypot: silently return success and do not store.
  - Time-trap: a submission under 2,000 ms adds +3.
  - Two or more links add +1 per link. A keyword match adds +5.
  - Store `spamScore`, and send no confirmation email when it is above 0.
  - Cloudflare Turnstile is optional.
  - The current build discards honeypot and time-trap hits without delivery (`src/lib/inquiry/schema.ts` `spamReason`).
- **Environment variables** (names only):
  - Current build: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`, `INQUIRY_WEBHOOK_URL`, `INQUIRY_WEBHOOK_SECRET`.
  - Optional: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`.
  - If a CMS is added: `PAYLOAD_SECRET`, `DATABASE_URI` and the `S3_*` variables.
  - The sender address must use the confirmed AUREX domain, never `aurex.example`.
- **Email templates:** use the teal palette with web-safe fonts: a `#F7FAF9` background, `#013333` text, and `#006666` for links and accents (6.47:1). Replace the `cms` navy `#0C2340`, `#51677C` and `#E2EBF2`, and the build's leftover black/gold values (§20.1 C14).
- **Security and privacy:**
  1. The Drive inventory reported a `blue-harbor-cms/.env` file (not read, not retained). If it exists, treat every secret in it as exposed. Rotate the Resend, S3, Turnstile, Payload and Postgres credentials before any reuse, and remove the file from shared storage.
  2. Never run `seed/run.ts` against a live environment. It hard-codes fallback passwords for two user accounts (verified in the retained copy).
  3. Do not migrate or deploy `blue-harbor.db`. It holds user accounts (2), a session and form submissions (3). Delete it from shared storage (GDPR data minimisation).

---

## 16. Confirmed facts

Only these statements may appear on the site as fact. Items marked *structural* are neutral decisions, consistent across sources and not contradicted by the brief. They are not claims about the business. Items marked *client* are dated client decisions.

| # | Fact | Source |
|---|---|---|
| F1 | The brand name is **AUREX**. | brief |
| F2 | AUREX is positioned as a premium international trading, holding and investment group with a European-rooted, institutional, long-term outlook. | brief |
| F3 | AUREX must not feel like a startup, dropshipping, generic import-export, a small trading agency, a sales company, a commodity marketplace, cheap logistics, or a generic corporate template. | brief |
| F4 | Brand concept: Aurex = value / gold + exchange, expansion, movement across borders. | brief |
| F5 | Taglines explored: "Value in Motion", "European Standards. Global Reach.", "Trade Beyond Borders", "Global Trade. Real Value.", "Connecting Value Across Borders." The master and supporting choice in §4 is this document's recommendation and awaits AUREX approval. | brief |
| F6 | *Client:* the palette is the Aurex-Teal build's: teal `#009999`, teal-dark `#006666`, teal-darker `#004D4D`, lime `#8DC63F`, lime-bright `#99CC00`, gold `#F5B323` (logo arrow only), white `#FFFFFF`, charcoal `#222222`, gray `#666666`, light-gray `#F5F5F5`. It supersedes the brief's Matte Black `#111111`, Rich Gold `#C8A24A`, Champagne Gold `#D4AF37` and Ivory `#F8F6F0`. | client 2026-09-27 (supersedes brief) |
| F7 | Strategic areas discussed: International Trade, EXIM / Import & Export, Distribution, Logistics, Holdings, Investments, Capital. Operating status is not established. | brief |
| F8 | Verticals discussed: Food, Property / Real Estate, Medical / LARP, Electronic Components, Green Revolution / Sustainability. *Client clarification:* LARP means live-action role-play, and "LARP & Historical Goods" is a separate sector, distinct from Medical. **None is established as active.** | brief; client 2026-09-27 |
| F9 | Markets discussed: European Union, Poland, UAE / Middle East, India, Africa. **No office, subsidiary or operation is confirmed in any of them.** | brief |
| F10 | Languages: English primary. Polish, Dutch and French previously discussed. Multilingual support is required; which locales launch is for AUREX to decide (§18). | brief; *structural*, matching `cms` `payload.config.ts` locales `en, pl, nl, fr` |
| F11 | Required functionality: contact form; partnership, investment and corporate inquiry; CMS-ready content; responsive; SEO; multilingual. | brief |
| F12 | Excluded: blog, newsroom, IR portal, careers, WhatsApp, social feeds, live stock data. | brief |
| F13 | *Structural:* the inquiry types are Partnership, Investment and Corporate. | brief; `seed` forms (Investor Inquiry, Partnership Inquiry, Corporate Contact). `gold` has four related types (General Business Inquiry, Investment Inquiry, Partnership Opportunity, Strategic Collaboration). |
| F14 | *Structural / client:* the sector taxonomy has six sectors: Food, Property & Real Estate, Medical, Electronic Components, Sustainability & Green Transition, LARP & Historical Goods. | brief verticals; client 2026-09-27 |
| F15 | *Structural:* the core page set is Home, About, Sectors, Contact. | `gold`, `seed`/`db`. (The `cms` README lists Home, About, Services, Contact and Custom request, with no Sectors page.) |
| F16 | *Source fact:* no AUREX logo file, brand guidelines document or company-owned photography exists in the Drive. | `discovery` inventory |
| F17 | *Source fact:* no draft contains confirmed contact details, people, portfolio items, partners, figures, certifications or licences. | All reader groups |
| F18 | *Source fact:* the Drive drafts date from 2026-06-17 to 2026-06-21, before the Sept 2026 brief. | Drive metadata |
| F19 | *Client:* all pages and buttons must be interactive: interactive cards, working buttons, no dead links. | client 2026-09-27 |
| F20 | *Client:* only the palette is adopted from the teal build. Its positioning, contact details (Cairo), WhatsApp, German locale, services and trade lines remain excluded. | client 2026-09-27 |
| F21 | *Client:* the scope of LARP & Historical Goods is costumes, armour, props and historical reproductions for LARP, re-enactment and theatrical markets. This is scope, not activity. | client 2026-09-27 |

---

## 17. Draft claims found in Drive that MUST NOT be published as fact

Rows X52–X61 were added in rev. 2 and sit inside their category, so the numbering is not sequential.

| # | Claim | Verbatim | File | Why excluded |
|---|---|---|---|---|
| **Identity** | | | | |
| X1 | Brand name "Aurex Global" | `AUREX <span class="gold">GLOBAL</span>` / "Aurex Global © 2025" | `gold/index.html`, `gold/script.js` | The brief uses AUREX. This variant is unconfirmed. |
| X2 | Descriptor "Global Trading" | `<span class="logo-sub">Global Trading</span>` | `teal/script.js` | Unconfirmed, with a trading-agency feel. Not adopted with the teal palette. |
| X3 | Merger origin | "Established as a merger of two longstanding companies" | `teal/about.html`, `teal/script.js` | Unsourced corporate history, likely from a template |
| X4 | Ownership | "A privately held investment and trading group." | `seed/run.ts`, `db` | Not stated in the brief |
| X5 | Name etymology | "Ex — Latin for “beyond”" | `gold/index.html`, `gold/script.js` | Contradicts the brief's "exchange", and the Latin is inaccurate |
| X6 | Named divisions / sub-brands | "Five divisions. One disciplined group." (Aurex Trading, Distribution, Beverages, Brands, Ventures) | `gold/index.html` | Subsidiaries not confirmed. Beverages and Brands are not in the brief. |
| X7 | Freight subsidiary | "Aurex operates Aurex Freight, our specialized logistics and freight service." | `teal/index.html`, `teal/about.html` | Subsidiary claim; implies operated freight |
| X52 | Name variants | "Aurex Trade — quality food products and premium paper products, sourced and delivered worldwide." / "Aurex" + "Global Trading" lockup / "Aurex Global — Value in Motion \| European Standards. Global Reach." / "— Aurex CMS" | `teal/trade.html` meta, `teal` logo, `gold/index.html` `<title>`, `cms/payload.config.ts` | Unconfirmed name variants. Use "AUREX" only (§19.0). |
| X53 | Founding narrative | "Aurex was founded on a conviction that global trade should be built on trust…" / "…Aurex was established to serve that role." | `gold/about.html`, `gold/script.js` (`story.p1`, `story.p2`) | Implies a history. See the edited versions in §19. |
| X54 | Year as founding evidence | "Aurex Global © 2025. All rights reserved." / "Aurex © 2025. All rights reserved." | `gold/script.js:150`, `teal/script.js:61` | A copyright line is not evidence of a founding or operating year. Use "© {current year} AUREX". |
| **Activity** | | | | |
| X8 | Verticals active | "Aurex sources and trades premium food and agricultural products…" | `gold/sectors.html` | Activity not established |
| X9 | Verticals active | "Five verticals where we invest, operate and trade." / "Business verticals Aurex invests in and operates." | `seed/run.ts`, `db`; `cms/Sectors.ts` | Activity not established |
| X10 | Existing green investments | "Aurex invests in green-revolution initiatives and sustainable ventures…" | `gold/sectors.html` | Implies existing investments |
| X11 | Joint ventures and holdings exist | "Investments, holdings, joint ventures, and strategic projects." / "A curated view of Aurex investments and holdings…" | `gold/portfolio.html` | No holdings or JVs confirmed |
| X12 | Paper trade line | "Aurex supplies premium paper and packaging products…" | `teal/script.js` | Not a brief vertical |
| X13 | LARP costuming trade | "Aurex sources and supplies high-quality LARP and costuming products — from authentic costumes and armor to props, textiles, and accessories…" | `teal/script.js:97`, `teal/trade.html` | Activity not established. LARP & Historical Goods is now a sector of focus (client 2026-09-27), but this draft's activity claim stays excluded (§7.1). |
| X14 | Supply and consulting services | "General Supplies Service", "Global Trade Advisory", "Technology Services" | `teal/services.html` | Not in the brief; agency or supply-shop feel |
| X15 | Operated freight and customs | "Freight Forwarding (Air, Sea, Land)", "Customs & Compliance Services" | `teal/script.js` | Implies operations and licensing |
| X16 | Owned production | "Owned and partnered food production facilities." | `seed/run.ts` | Invented |
| X17 | Manufacturing | "embedding environmental responsibility across manufacturing, supply chains, and innovation" | `teal/script.js` | AUREX is not established as a manufacturer |
| X18 | Owned businesses and decarbonisation | "We modernise and decarbonise the businesses we own." | `seed/run.ts` | Implies owned companies; greenwashing risk |
| X19 | Acquisition strategy | "Our roadmap focuses on selective acquisitions, geographic expansion…" | `seed/run.ts` | Invented strategy claim |
| X20 | Existing partnerships | "We cultivate enduring partnerships with premium manufacturers, distributors, and institutions across Europe, the Middle East, and Asia" | `gold/script.js` | Partnerships not confirmed; "Asia" not in the brief |
| X21 | Existing partners | "We partner with founders, families and institutions to grow businesses…" | `seed/run.ts` | Counterparties not confirmed. Rephrase as an invitation. |
| X55 | Trading-house self-descriptions | "A modern international trading house, built for long-term global growth." / "A trusted international trading group delivering premium products, strategic distribution, and compliant cross-border solutions across emerging and established markets." / "One trusted global network." | `gold/index.html`, `gold/script.js` | Trade-only register; implies an existing network and compliance status |
| X56 | Current operations | "We operate as a European-rooted international group focused on connecting premium manufacturers, strategic partners, and growth markets…" | `gold/about.html` (`philosophy.text`) | States operations and partners as fact |
| X57 | Sector activity | "Through disciplined property investment and real-estate development, Aurex builds tangible long-term value…" / "Aurex facilitates the international trade of electronics and components, serving industry and enterprise…" | `gold/sectors.html` | Activity not established |
| X58 | Teal self-description | "Aurex is a data-driven global trading enterprise, managing products from discovery and procurement to supply chain optimization and sales." / "Partner with Aurex for sourcing, trade advisory, and worldwide logistics." | `teal/index.html`, `teal/about.html` | Contradicts the brief's positioning; implies operated services. Not adopted with the palette. |
| **Markets and presence** | | | | |
| X22 | HQ and presence | "European Union (HQ) · United Arab Emirates · India" + "Regional Presence" pills | `gold/contact.html` | Office claims not confirmed |
| X23 | EU HQ and operations | "Headquarters and core operations across the Netherlands, Poland and France." / "3 EU hubs" | `seed/run.ts`, `db` | Office claims not confirmed |
| X24 | Dubai HQ | "Our trading and investment gateway, based in Dubai." / "1 Regional HQ" | `seed/run.ts`, `db` | Office claim not confirmed |
| X25 | Amsterdam address | "Zuidas Business District\nAmsterdam, Netherlands" | `seed/run.ts`, `db` | Office claim not confirmed |
| X26 | Cairo office | "Offices in Cairo, serving clients worldwide." + "14 Mahmoud Ahmed El-Meligy, Al Matar, El Nozha, Cairo Governorate" | `teal/contact.html`, `teal/script.js` | Office claim not confirmed; ownership unknown (§18) |
| X27 | Offices plural | "Our offices and direct contacts." | `seed/run.ts`, `db` | Implies offices |
| X28 | Footprint | "Building enduring value across Europe, the Gulf and India." | `seed/run.ts`, `db` | Implies an established footprint; omits Africa |
| X29 | Local projects | Baltics (6 countries), Rotterdam, Warsaw, DIFC, "5+ active projects" in India | `seed/run.ts`, `db` | Invented |
| **Numbers** | | | | |
| X30 | Home stats | "15+ Markets Served", "50+ Strategic Partners", "100+ Products Traded", "3 Continents Connected" | `gold/index.html` | Round demo numbers |
| X31 | Investment stats | `{ value: '250', suffix: '€M+', label: 'Capital deployed' }`, "20+ Portfolio companies", "3 Regions" | `seed/run.ts`, `db` | Invented financial and portfolio figures |
| X32 | Sector stats | "6 operating companies", "12+ export markets", "180k m² under management", "4 active developments", "2 R&D partnerships", "40+ supplier countries", "24h avg. quote time", "120 MW renewable pipeline", "5+ green projects" | `seed/run.ts`, `db` | Invented. Also internally inconsistent (for example 120 MW against 80 MW). |
| X33 | Portfolio metrics | "€48M Revenue", "40% YoY", "€30M throughput", "80 MW", "120k homes", "18k pallet positions", "24k m² GLA", "94% occupancy", "60k t" | `seed/run.ts`, `db` | Invented; the brief forbids financial figures |
| X34 | Operating history | Portfolio years 2020–2024 | `seed/run.ts`, `db` | Implies years of experience |
| **People** | | | | |
| X35 | Named leadership | "Aleksander Nowak — Group Chief Executive Officer", "Sophie Laurent — CFO", "Rajesh Menon — MD, Asia & Middle East", "Dr. Anna Visser", "Pieter De Vries" (advisory) | `seed/run.ts`, `db` | Demo personas |
| X36 | Leadership structure | "Chief Executive Officer … Managing Director … Head of Investments — Full profile and biography coming soon." + Advisory Board | `gold/leadership.html` | Structure not confirmed |
| X37 | Named teams | "Our investor relations team will be in touch…" / "Our corporate development team will review and respond." | `seed/run.ts`, `db` | Teams not confirmed. The brief excludes an IR portal. |
| X59 | "Our team" | "Whether you’re an investor, manufacturer, distributor, or institution, our team is ready to explore opportunities across our markets." | `gold/contact.html`, `gold/leadership.html` | Implies a team and existing markets |
| **Portfolio and partners** | | | | |
| X38 | Portfolio items | Baltic Food Distribution, Riverside Residences Warsaw, LARP MedTech Platform, Gulf Electronics Trading Hub, SolarBridge India, Rotterdam Cold Chain, Dubai Prime Offices, GreenLoop Recycling | `seed/run.ts`, `db` | Demo content. The "LARP MedTech" reading is also rejected by the client's definition (§7.1). |
| X39 | Client segments | "serving live-action role-play communities, theatrical productions, and cosplay markets worldwide" / "supports printing, packaging, and hospitality industries at scale" | `teal/script.js` | Clients not confirmed. Cosplay is outside the client's LARP scope. |
| X40 | Demo inquiries | "Meridian Capital", "Greenfield Energy … solar JV in India" | `seed/run.ts` | Demo data |
| X60 | Holdings and portfolio exist | "Strong governance and integrity underpin every holding." / "Our holdings, investments and projects." + "A diversified portfolio across five sectors and three regions." / "Our vision is to be a trusted long-term partner across Europe, the Gulf and India." | `seed/run.ts:532`, `:570`, `:527` | Implies holdings and a portfolio; omits Africa |
| **Compliance and quality** | | | | |
| X41 | Certification | "International quality certification" | `teal/script.js` | Invented; the brief forbids it |
| X42 | Certified resale | "Certified resale of industrial electronic equipment." | `seed/run.ts` | Invented certification |
| X43 | Sustainability claims | "Sustainably sourced fibre" / "Transparent, ethical, and low-carbon logistics that move goods responsibly worldwide." | `teal/script.js` | Not evidenced; greenwashing risk |
| X44 | QA and traceability systems | "Excellence at origin, verified and maintained across every supply chain." / "Clear, traceable global movement across supply chains." | `gold/about.html` | Implies verification systems |
| X45 | Compliance management | "We manage cold-chain handling, certification, and compliance" | `teal/script.js` | Implies operations and certification |
| X61 | Regulatory compliance status | "Aurex operates with disciplined governance, regulatory compliance, and accountability at the core of every decision…" | `gold/leadership.html` (`leader.govText`) | Implies compliance status. See the edit in §19. |
| **Contact** | | | | |
| X46 | Emails | `info@aurex.com`, `info@aurex-trading.com`, `invest@aurex.example` | `gold`, `teal`, `seed`/`db` | Domain unconfirmed or `.example` placeholder |
| X47 | Phones | `+20 150 106 5557`, `+20 150 106 5556`, `(02) 2180 4158`, `+31 20 000 0000` | `teal`, `seed`/`db` | Unconfirmed or placeholder |
| X48 | WhatsApp | `https://wa.me/201501065557` | `teal` (all pages) | Excluded by the brief |
| X49 | Response time | "we’ll respond within one business day." | `seed/run.ts`, `db` | Commitment not confirmed |
| **Assets** | | | | |
| X50 | Logo video | `Animated_Tech_Logo_Reveal.mp4` (Mobi Hub logo, Veo watermark) | `blue-harbor-cms/media` | Belongs to another client |
| X51 | Template identity | "Blue Harbor Group", anchor icon, "Let's get you back to port." | `cms`, `discovery` | Template leftover |

---

## 18. Unknown — to be supplied by AUREX

**Identity and legal**
- [ ] Public name and styling: "AUREX" only, or with a descriptor ("Aurex Global" appears in `gold`)
- [ ] Registered legal name, legal form and jurisdiction
- [ ] Registered office address
- [ ] Registration and tax numbers for the legal notice (for example KRS/NIP, KvK, trade licence, VAT)
- [ ] Ownership statement, if any should be made public
- [ ] Founding year, if it should be stated
- [ ] Trademark clearance for "AUREX" and "Value in Motion" in the EU, UAE and India (check before registering or printing)

**Brand**
- [ ] Logo files (SVG: primary, mono, for dark and light backgrounds) and favicon, or approval of the interim typographic wordmark
- [ ] Whether an arrow mark (import ↔ export) using `#F5B323` is wanted; the palette reserves that colour for a logo arrow (§14.1, §14.7)
- [ ] Approval of the master and supporting lines (§4) and of the name story, including the AUR = gold/value and EX = exchange readings (§3)
- [ ] Native review of the PL, NL and FR taglines and copy
- [ ] Photography: owned or licensed imagery, and any image restrictions
- [x] ~~Palette: black/gold (brief) or teal~~. Resolved by client decision 2026-09-27: teal palette only (§14.1)

**Business**
- [ ] Which strategic areas (International Trade, EXIM, Distribution, Logistics, Holdings, Investments, Capital) are active today, with a written statement for each
- [ ] Which sectors are active, planned or exploratory, including LARP & Historical Goods (the client has not said it is an active trade line)
- [x] ~~What "LARP" means in "Medical / LARP"~~. Resolved by client decision 2026-09-27: live-action role-play; a separate sector, LARP & Historical Goods (§7.1)
- [ ] LARP & Historical Goods scope boundaries: is cosplay in or out? Are historical reproductions for museums or collectors in scope?
- [ ] Approval to describe the discussed areas, sectors and markets publicly as "of focus" (§2, §9)
- [ ] Approval of the sector scope lines and the sector-page starter copy (§7, §7.2)
- [ ] Partner and investment criteria per sector, if any are to be published (§7.2). Until they are supplied, the "What AUREX looks for" block is omitted, and the build's criteria lists need approval (§20)
- [ ] Approval of the proposed narrative in §5
- [ ] Meaning of "Capital": does AUREX provide capital or trade finance to others, raise capital from investors, or only use its own balance sheet? This decides the wording in §5 and any licensing or financial-promotion review. §5 is an interpretation until this is answered.
- [ ] May the Holdings & Investments pillar be presented as a model before any holding exists, or should it read "in development"?
- [ ] Confirmation that Beverages, Brands, Paper and General Supplies are out of scope
- [ ] Whether any subsidiaries, sub-brands or joint ventures exist, with names and approval to publish
- [ ] Logistics: coordinated with partners, or operated. Any licences held (customs, trade, financial)
- [ ] Any certifications or licences, with documents

**Markets**
- [ ] HQ or registered office country and city
- [ ] The brief names Poland separately from the EU: is Poland the intended registered or HQ country?
- [ ] Any offices, subsidiaries or representatives in Poland, UAE / Middle East, India or Africa
- [ ] Which African countries (if any) to name
- [ ] Confirmation that the Netherlands and France are languages only, not markets

**People**
- [ ] Leadership names, titles, bios and photos, with consent to publish
- [ ] Whether an advisory board exists, with members and consent

**Portfolio and partners**
- [ ] Any holdings, investments or projects approved for disclosure, and any figures approved for publication
- [ ] Named partners or clients with written consent to display names or logos

**Contact and operations**
- [ ] Owned web domain
- [ ] Public email address(es), per inquiry type if desired
- [ ] Mailbox(es) that receive form notifications
- [ ] Phone and postal address, if they should be public
- [ ] Are the Cairo address, the +20 numbers, `info@aurex-trading.com` (`teal`) or `info@aurex.com` (`gold`) AUREX's own? If so, which may be published?
- [ ] LinkedIn or other official profile URLs, if any exist
- [ ] Any response-time commitment

**Legal and compliance**
- [ ] Privacy notice content (data controller details, retention period). This blocks launch of the privacy page.
- [ ] Legal review of the investment inquiry wording and the investor audience (financial-promotion rules in the EU, UAE and India)
- [ ] Analytics: yes or no, and which tool (determines cookie consent)

**Website operations**
- [ ] Launch locales: all four at launch, or EN first
- [ ] Translation provider or reviewer per locale
- [ ] Hosting and domain access
- [ ] CMS at launch: is the typed content repository acceptable, or is an editable CMS (Payload) required on day one? Who edits content?
- [ ] Inquiry types: three (Partnership / Investment / Corporate & general), or a fourth ("Strategic collaboration" in `gold`, "General" in the current build)?
- [ ] English variant: British spelling (current build `en_GB`), with "inquiry" used throughout?
- [ ] Is a 3D/WebGL globe with illustrative trade corridors wanted, or a static map of regions?
- [ ] Confirmation of the content of `Video Project 7.mp4` (40 MB) before any use, and deletion of the Mobi Hub video from the media library

**Security**
- [ ] Who controls the credentials in the Drive file `blue-harbor-cms/.env` (reported in the inventory), and confirmation that they have been rotated

---

## 19. Reusable copy

### 19.0 Copy style rules

- **Name.** Write "AUREX" in capitals in running copy in every locale. When reusing §19 lines, replace "Aurex" with "AUREX". Never write "Aurex Global", "Aurex Trade" or "Aurex Global Trading". For wordmark markup and screen readers see §14.7.
- **English.** Use British spelling (organisation, modernise, prioritise, colour). The noun is always "inquiry", including in CTAs and emails. Never "enquiry".
- **Names.** Sector and area names are used exactly as in §7 and §5, in navigation, form options and SEO alike.
- **Tense and voice.** Follow §6. Use "we" only for intentions and commitments ("we aim to", "we hold ourselves to"), never for completed or ongoing activity. The present tense describes what AUREX *is built to*, *is designed to*, *focuses on*, *seeks* or *looks for*, never what it *does*.
- **Taglines.** They end with a full stop in display use ("Value in Motion.") and drop it in `<title>`. Use Title Case as in §4. No exclamation marks, and no superlatives outside the "built to be" framing.
- **Placeholders.** Never write "will be published here", "to be published" or "coming soon" (§15.8).

### Usable as written

These lines come from prior drafts. They make no factual claims when used as written below, with "Aurex" replaced by "AUREX" (§19.0). Any line in the present tense must be checked against §6 before use.

| Line | Source | Suggested use |
|---|---|---|
| "Value in Motion." | `gold` | Master line |
| "European Standards. Global Reach." | `gold` | Supporting line |
| "European-Rooted International Group" | `gold` (hero eyebrow) | Hero eyebrow |
| "Together, a singular idea — AUREX: Value in Motion." | `gold` | Payoff of the name section |
| "A name that reflects the disciplined creation, movement, and stewardship of value across international markets." | `gold` | Lead of the name section |
| "Value, excellence, trust, and enduring quality." | `gold` (Aurum description) | Name section, AUR |
| "Expansion, movement, and connection across borders." | `gold` (Ex description) | Name section, EX |
| "Built for decades, not transactions." | `gold` | Section heading (principles or partnerships) |
| "AUREX is not built to be the loudest company in the room. It is built to be the most trusted. Our approach prioritises resilience over speed, reputation over volume, and long-term value over short-term gain." | `gold` | Why AUREX body. Pair the heading "Not the loudest. The most trusted." only with this body, so the superlative stays inside the "built to be" framing. |
| "Create sustainable value today while preserving trust for tomorrow." | `gold` | Principle quote |
| "Begin a conversation with AUREX." | `gold` | Contact heading |
| "Enduring value, responsibly created" | `seed` / `db` | About sub-heading |
| "Whether you are an investor, founder or strategic partner, we would like to hear from you." | `seed` / `db` | Closing CTA text |
| "Start a conversation" | `discovery` (`SectorView.tsx`) | CTA label |

### Usable with the edit shown

| Draft line | Source | Use instead | Why |
|---|---|---|---|
| "We invest with patience and conviction, not on a fund clock." | `seed` / `db` | "AUREX is built to invest with patience and conviction, not on a fund clock." | The original states ongoing investment (§6). Holdings & Investments pillar only. |
| "Five sectors. One disciplined approach." | `seed` / `db` | "Six sectors. One disciplined approach." | Six sectors since the client decision of 2026-09-27 |
| "Global trade, built on trust and structure." | `gold` | "International trade and long-term ownership, built on trust and structure." | The original is trade-only and echoes the rejected "Global Trade. Real Value." |
| "A different standard of international commerce." | `gold` | "A disciplined standard for international business." | The original claims existing commerce at a superior standard |
| "By combining European standards, disciplined execution, and global market expertise, Aurex creates enduring value that moves confidently across borders, industries, and generations." | `gold` | "Combining European standards with disciplined execution, AUREX is built to create enduring value that moves confidently across borders, industries and generations." | Removes the claimed "global market expertise" and the present-tense result |
| "Every relationship, every product, and every market we enter is evaluated through a single principle." | `gold` | "Every relationship and every opportunity will be measured against a single principle." | Removes "every product / market we enter" and the implied existing pipeline |
| "We work alongside management to build, not just to allocate." | `seed` | "We aim to build, not just to allocate." | Removes the implied portfolio companies |
| "We strengthen governance, support management and compound value across cycles and across borders." | `seed` | "Our aim: to compound value across cycles and across borders." | Removes the implied existing holdings and investee companies |
| "A disciplined investment group with an operator’s mindset" | `seed` / `db` | "A disciplined group with an operator’s mindset" | Restores the trading/holding balance |
| "We build data-driven processes that turn complexity into clarity across every trade lane." | `teal` | "Turning complexity into clarity across borders." | Removes the claimed processes and trade lanes |
| Mission: "To connect world-class products, businesses, and opportunities through trusted global trade networks that create lasting economic value." | `gold` | "To connect businesses, markets and opportunities across borders, and to create lasting value through trade and long-term ownership." | Removes the implied existing network; adds the holding side |
| Vision: "To become one of the most respected international trading groups by setting the benchmark for quality, compliance, and reliability across global markets." | `gold` | "To become one of the most respected international trading, holding and investment groups, known for quality, integrity and reliability across borders." | Adds holding/investment; removes the compliance-benchmark claim |
| Story: "Aurex was founded on a conviction that global trade should be built on trust, structure, and long-term partnerships — not short-term opportunity." | `gold` | "AUREX is built on a conviction: that international trade and investment should rest on trust, structure and long-term partnership, not short-term opportunity." | "Was founded" implies history (X53) |
| Story: "In an increasingly interconnected world, businesses require more than suppliers and distributors. They require partners capable of navigating complexity, maintaining compliance, managing risk… Aurex was established to serve that role." | `gold` | "In an increasingly interconnected world, businesses need more than suppliers and distributors. They need partners able to navigate complexity, manage risk and deliver consistent quality across borders. AUREX is built to serve that role." | Removes "was established" and "maintaining compliance" |
| Governance: "Aurex operates with disciplined governance, regulatory compliance, and accountability at the core of every decision…" | `gold` | "AUREX is built to place disciplined governance and accountability at the core of every decision: the foundation of a trusted international group." | Removes the claimed compliance status (X61) |
| Sectors lead: "Aurex builds across complementary sectors — combining trading expertise…" | `gold` | "AUREX focuses on complementary sectors, where trade and disciplined investment are designed to build resilient, long-term value." | Removes the claimed expertise and activity |
| Who we are: "We bridge the gap between high-quality producers and high-growth markets through disciplined execution, regulatory excellence…" | `gold` | "AUREX is built to bridge high-quality producers and high-growth markets through disciplined execution and long-term partnership." | Removes "regulatory excellence" and the ongoing activity |
| Partnerships body (replaces X20) | `gold` | "AUREX seeks long-term partnerships with manufacturers, distributors and institutions across the European Union, the Middle East, India and Africa, built on trust, integrity and shared long-term value." | An invitation, not a claim |
| Values: "Gold-Standard Quality · Transparent Movement · Regulatory Excellence · Strategic Partnerships · Measured Growth" | `gold` | Titles: "Gold-Standard Quality · Transparent Movement · Integrity · Long-Term Partnership · Measured Growth". Descriptions are written as commitments ("We hold ourselves to a gold standard…"). | The original descriptions imply verification and compliance status (X44). "Regulatory Discipline" (rev. 1) is replaced by "Integrity". |
| Philosophy titles: "Long-term capital · Operator partnership · Disciplined governance · Sustainable growth" | `seed` / `db` | Usable as titles. Rewrite the descriptions as intentions. | The original descriptions reference owned businesses (X18) and "every holding" (X60) |
| "…lasting value with a lighter footprint." | `teal` (per rev. 1; not found in the retained copies) | **Dropped** until AUREX substantiates a sustainability claim | A generic environmental claim (X43 risk) |

---

## 20. Current build conformance

Repository state on 2026-09-27 (HEAD `6caf45a`). Files checked: `src/content/locales/en.ts`, `src/content/facts.ts`, `src/content/types.ts`, `src/lib/routes.ts`, `src/app/globals.css`, `src/app/[locale]/*`, `src/lib/inquiry/*`, and the links in `src/components/**`.

**Precedence.** Where the build and this document disagree, this document wins. Where the build implements a client decision (the teal palette, the LARP & Historical Goods sector, interactive UI), the build is conformant.

**All four locales.** `pl.ts`, `nl.ts` and `fr.ts` use the same key paths as `en.ts`. Apply every rewrite below in all four locales; translations need native review (§15.5). When a rewrite changes a word listed in the sibling `accent` array, update that array too.

### 20.1 Structural items

| # | Area | Current build | Rule | Required change |
|---|---|---|---|---|
| C1 | Palette | Teal tokens (`b6e2b2c`); `:focus-visible` uses lime on every surface; the `gold*` token names are kept | §14.1–14.3 | **Conforms**, except for three points. Rename `gold*` → `accent*`. Use a `#006666` focus ring on light surfaces, where lime is 1.94:1. Keep `text-gold-gradient` (off-palette stops) to large display. |
| C2 | Sectors | `larp` in `facts.ts`, `types.ts` and all locales; copy says "Six sectors" | §7, F14, F21 | **Conforms** (client decision). Sector names match the client list. |
| C3 | Sector status vocabulary | `status: "strategic"` only | §6 CMS rule | Rename to `focus`, or document that `strategic` ≡ `focus`. The type must allow only `focus \| active`, default `focus`. `active` requires a §16 entry. |
| C4 | Navigation and routes | `navRoutes` = about, businesses, portfolio, presence, leadership, partnerships. Routes `/businesses`, `/portfolio`, `/global-presence`, `/leadership`, `/partnerships` | §15.1, §15.9, §9, §11, §12 | Nav = About · Business Areas · Sectors · Contact, plus the CTA. Rename `/businesses` → `/business-areas`. Rename `/global-presence` → `/markets` ("Markets of focus") or fold it into Home and About. Take Leadership and Portfolio out of nav, footer, sitemap and internal links. Partnerships becomes optional and leaves the main nav. |
| C5 | Links to deferred pages | `home/sectors.tsx:34` → portfolio; `home/leadership-teaser.tsx:28` → leadership; `home/partnerships.tsx:30` → partnerships; `[locale]/page.tsx:40` → presence; `layout/site-footer.tsx:16,20` → leadership, presence, portfolio, partnerships | §15.3.1 (no links to deferred pages) | Retarget: the sectors link → `/sectors`; the leadership teaser → About (governance); partnerships → `/contact?type=partnership#inquiry` (or the optional page); presence → `/markets` or remove. The footer follows §15.9. |
| C6 | Missing routes | No `/sectors`, `/sectors/{slug}`, `/legal`; no `sitemap.ts` or `robots.ts` | §15.1, §15.7 | Build the Sectors index, six detail pages, the Legal notice, the sitemap and robots. |
| C7 | Business-area model | `facts.ts` `divisions`: 4 (trade, logistics, distribution, holdings) with `mode: sea \| air \| land \| connected`; `home.hero.modes` | §5 | Model two pillars and seven areas. Remove the sea/air/land modes and copy (§20.3). |
| C8 | Inquiry types | 4 (`partnership`, `investment`, `corporate`, `general`); `contactHref` has no `sector` parameter | §15.4 | 3 types: merge `general` into `corporate` ("Corporate & general") unless AUREX adds a fourth (§18). Add the `sector` deep-link parameter. |
| C9 | Placeholder states | `common.comingSoon` rendered in `presence/office-register.tsx:33`, `portfolio/holdings-register.tsx:41`, `leadership/leader-profiles.tsx:41`; `contact/page.tsx:36` renders `direct.emailPending` | §11, §12, §13, §15.8 | Render nothing when offices, holdings or leaders are empty or the email is unset. |
| C10 | Privacy notice | Data controller: "will be published on this page" | §15.1, §18 | **Launch blocker:** needs the legal entity and controller details. |
| C11 | CMS | Typed repository; no Payload. `types.ts` refers to `docs/CMS.md`, which does not exist. | §15.6, §18 | Accept the typed repository pending §18. Add `docs/CMS.md` or remove the reference. |
| C12 | Motion | `lenis`, `three`/`@react-three/fiber`, `motion`; `InteractiveCard` spotlight + tilt (±2.5°); magnetic buttons | §14.9 | Conforms if the §14.9 conditions hold. Verify reduced motion, touch, the WebGL fallback and LCP. |
| C13 | Confirmation email | Notification to `INQUIRY_TO_EMAIL` only; no confirmation to the sender | §15.3, §15.4 | Add the localised sender confirmation (§15.4), gated on the spam checks. |
| C14 | Email template colours | `src/lib/inquiry/email.ts` uses `#7D5F1A`, `#F8F6F0`, `#111111`, `#E4DFD2` (black/gold) | §14.10, §15.10 | Re-theme to `#F7FAF9` / `#013333` / `#006666`. |
| C15 | Interactivity | No `href="#"` found in `src`. The links in C5 point to deferred pages. | §15.3.1 | Fix C5, then run the §15.3.1 link check in all locales. |

### 20.2 Copy that states unconfirmed activity as fact (must fix)

Line numbers refer to `en.ts` at HEAD `6caf45a`. Items on pages that §15.1 defers or makes optional are marked *(deferred page)*. Apply them if the content is kept or moved; delete the keys if the page is removed.

| # | Key path (line) | Current | Proposed | Rule |
|---|---|---|---|---|
| R1 | `meta.description` (9) | "AUREX is a European-rooted international trading, holding and investment group, connecting markets, partners and capital across borders for the long term." | "AUREX is a European-rooted international trading, holding and investment group, built to connect markets and capital across borders for the long term." | §6 participle as fact; §5 partners as existing |
| R2 | `meta.pages.home.description` (14) | "A European-rooted international trading, holding and investment group, connecting markets, partners and capital across borders for the long term." | "A European-rooted international trading, holding and investment group, built to connect markets and capital across borders for the long term." | §6; §5 |
| R3 | `footer.statement` (795) | "A European-rooted international trading, holding and investment group, connecting markets, partners and capital across borders." | "A European-rooted international trading, holding and investment group, built to connect value across borders." | §6; §5 |
| R4 | `home.hero.intro` (93) | "AUREX is a European-rooted group connecting markets, partners and capital across borders, held to institutional standards and built for the long term." | "AUREX is a European-rooted group built to connect markets and capital across borders, to institutional standards and for the long term." | §6; §5 |
| R5 | `home.who.statement` (106) | "AUREX is an international trading, holding and investment group. European in origin and in standards, global in outlook, we connect producers, markets and capital, and we measure value in decades, not transactions." | "AUREX is an international trading, holding and investment group. European-rooted in outlook and standards, global in reach, it is built to connect producers, markets and capital, and to measure value in decades, not transactions." | §6 "we" + ongoing verb |
| R6 | `home.who.pillars[2].text` (118) | "Patient capital directed towards sectors where trade, infrastructure and growth meet." | "Patient capital, intended for sectors where trade, infrastructure and growth meet." | §6 participle as fact |
| R7 | `home.motion.chapters[0].text` (132) | "Sourcing, import and export across borders: structured, documented and executed to European standards." | "Import and export across the markets of focus, designed to be structured, documented and executed to European standards." | §6; §5 "sourcing" register |
| R8 | `home.motion.chapters[2].text` (144) | "Routes to market developed with distribution partners, connecting supply with demand across markets of focus." | "Market access and channel development, designed to connect supply with demand across the markets of focus." | §6; §5 partners as existing |
| R9 | `home.motion.chapters[3].text` (150) | "Long-term ownership and patient capital that bind the platform together and compound value across cycles and across borders." | "Long-term ownership and patient capital, designed to bind the group together and to compound value across cycles and across borders." | §6 |
| R10 | `home.capital.intro` (178) | "AUREX invests with patience and conviction, not on a fund clock. Capital is directed where it strengthens the platform, and held for as long as it creates value." | "AUREX is built to invest with patience and conviction, not on a fund clock. Capital is meant to go where it strengthens the group, and to be held for as long as it creates value." | §6 "invests"; §19 |
| R11 | `home.capital.principles[0].text` (182) | "We invest to build, not merely to allocate, and measure outcomes over cycles rather than quarters." | "We aim to build, not merely to allocate, and to measure outcomes over cycles rather than quarters." | §6 "we invest"; §19 |
| R12 | `home.capital.principles[1].text` (186) | "Investments that reinforce trade, distribution and market access across the group." | "A preference for investments designed to reinforce trade, distribution and market access across the group." | §6 implies existing investments |
| R13 | `home.why.pillars[0].text` (204) | "European norms of compliance, documentation and conduct, applied consistently wherever AUREX engages." | "European norms of compliance, documentation and conduct, which AUREX is built to apply wherever it engages." | §6; implies compliance practice (X44) |
| R14 | `home.why.pillars[1].text` (208) | "Clear ownership, clear mandates and clear reporting to partners. Trust is built into the structure before it is earned in results." | "Clear ownership, clear mandates and a commitment to clear reporting to partners. Trust is built into the structure before it is earned in results." | §5 partners as existing |
| R15 | `home.why.pillars[2].text` (212) | "A group designed around corridors rather than single markets, connecting Europe with the Gulf, India and Africa." | "A group designed around corridors rather than single markets, to connect Europe with the Middle East, India and Africa." | §6 participle; §9 market naming |
| R16 | `home.partnerships.intro` (225) | "AUREX works with producers, distributors, corporates, institutions and co-investors whose standards and horizon match our own." | "AUREX seeks to work with producers, distributors, corporates, institutions and co-investors whose standards and horizon match its own." | §6 "works with" (X21) |
| R17 | `home.leadership.intro` (233) | "AUREX is led with a long-term mandate: clear responsibilities, documented decisions and a governance culture built before scale, not after it." | "AUREX is built to be led with a long-term mandate: clear responsibilities, documented decisions and a governance culture established before scale, not after it." | §11 leadership not confirmed |
| R18 | `divisions.trade.summary` (257) | "Cross-border sourcing, import and export, structured with European standards of documentation, compliance and counterparty diligence." | "Cross-border trade, import and export, designed around European standards of documentation, compliance and counterparty diligence." | §6; §5 "sourcing" |
| R19 | `divisions.distribution.summary` (271) | "Routes to market developed with distribution partners, connecting supply with demand across markets of focus." | "Market access and channel development, designed to connect supply with demand across the markets of focus." | §6; §5 partners |
| R20 | `divisions.holdings.summary` (278) | "The ownership layer of the group: long-term holdings and patient capital that bind trade, logistics and distribution into one platform." | "The ownership side of the group: long-term holdings and patient capital, designed to bind trade, logistics and distribution into one platform." | §6 |
| R21 | `sectors.electronics.summary` (301) | "Trade in electronic components and parts, connecting qualified suppliers with industrial demand." | "Electronic components, with a focus on qualified supply for industrial demand." | §6 participle; §7 "parts" register |
| R22 | `about.story.paragraphs[0]` (384) | "AUREX was conceived as an international group rather than a single-market business: a structure able to trade, to hold and to invest across the corridors that connect Europe with the Middle East, India and Africa." | "AUREX is built as an international group rather than a single-market business: a structure designed to trade, to hold and to invest across the corridors that connect Europe with the Middle East, India and Africa." | §3 no origin narrative; §6 capability claim |
| R23 | `about.story.paragraphs[1]` (385) | "Its outlook is European, in how it governs itself, documents its decisions and treats its partners. Its horizon is global, and its measure of success is long-term value rather than short-term volume." | "Its outlook is European: in how it is built to govern itself, document its decisions and treat its partners. Its horizon is global, and its measure of success is long-term value rather than short-term volume." | §6 present practice; §5 partners |
| R24 | `about.principles.items[3].text` (400) | "Value is compounded across cycles and across borders." | "The aim: to compound value across cycles and across borders." | §6 passive as fact; §19 |
| R25 | `about.governance.intro` (415) | "The principles that govern how AUREX commits capital, conducts trade and works with partners." | "The principles AUREX is built on for committing capital, conducting trade and working with partners." | §6 |
| R26 | `about.cta.title` (428) | "Explore how the group creates value." | "Explore how the group is built to create value." | §6 |
| R27 | `businesses.core.title` (445) | "How AUREX creates and moves value." | "How AUREX is built to create and move value." (`accent`: `["move"]`) | §6 |
| R28 | `businesses.verticals.note` (454) | "Sectors of strategic interest are under development and evaluation. Specific activities will be presented as they are formalised." | "Sectors of focus describe strategic orientation, not current operations." | §6 asserts development activity; §15.8 placeholder |
| R29 | `businesses.connection.steps[0].text` (461) | "Qualified producers and suppliers, assessed against European standards." | "Producers and suppliers, to be qualified against European standards before any commitment." | §6 implies an assessment process in use |
| R30 | `businesses.connection.steps[2].text` (463) | "Routes to market through established partners." | "Routes to market, designed to be built with long-term partners." | §5 "established partners" |
| R31 | `businesses.connection.steps[3].text` (464) | "Long-term ownership and capital that compound the value created." | "Long-term ownership and capital, designed to compound the value created." | §6 |
| R32 | `meta.pages.portfolio.description` (29) *(deferred page)* | "How AUREX invests: patient capital, strategic alignment and governance first, directed towards six sectors of strategic interest." | "How AUREX is built to invest: patient capital, strategic alignment and governance first, across six sectors of focus." | §6; §12 |
| R33 | `portfolio.hero.intro` (481) *(deferred page)* | "AUREX invests with patience and conviction, not on a fund clock, working alongside partners and management to build rather than merely allocate." | "AUREX is built to invest with patience and conviction, not on a fund clock, and to work alongside partners and management to build rather than merely allocate." | §6; §19 |
| R34 | `portfolio.approach.title` (485) *(deferred page)* | "How we invest." | "Our approach to investment." (`accent`: `["investment."]`) | §6 "we invest" |
| R35 | `portfolio.approach.items[2].text` (493) *(deferred page)* | "Working alongside management and co-investors, contributing structure and governance." | "Designed to work alongside management and co-investors, contributing structure and governance." | §6 participle; implies co-investors |
| R36 | `portfolio.sectors.title` (511) *(deferred page)* | "Where capital is directed." | "Where capital will be directed." | §6 passive as fact |
| R37 | `portfolio.holdings.intro` (519) *(deferred page)* | "AUREX publishes holdings once they are formalised and cleared for disclosure." | Delete with the holdings block (§12, §15.8). | Implies holdings in progress |
| R38 | `presence.corridors.title` (549) *(optional page)* | "Where value moves." | "Where value can move." (`accent`: `["move."]`) | §9 corridors are not active routes |
| R39 | `meta.pages.leadership.description` (38) *(deferred page)* | "How AUREX is led and governed: stewardship, accountability and a long-term mandate." | "The governance principles AUREX is built on: stewardship, accountability and a long-term mandate." | §11 |
| R40 | `leadership.hero.intro` (583) *(deferred page)* | "Leadership at AUREX is defined by stewardship: of capital, of partnerships and of the group's reputation in every market it engages." | "Leadership at AUREX is meant to be defined by stewardship: of capital, of partnerships and of the group's reputation in every market of focus." | §11; implies existing partnerships and engaged markets |
| R41 | `leadership.approach.items[0].text` (592) *(deferred page)* | "Leaders act as custodians of capital and reputation, not only as managers of activity." | "Leaders are expected to act as custodians of capital and reputation, not only as managers of activity." | §11 |
| R42 | `leadership.governance.intro` (608) *(deferred page)* | "The principles that govern how AUREX commits capital and conducts trade." | "The principles AUREX is built on for committing capital and conducting trade." | §6 |
| R43 | `leadership.governance.items[3].text` (616) *(deferred page)* | "Transparent, regular reporting to partners and co-investors." | "A commitment to transparent, regular reporting to partners and co-investors." | §5 partners and co-investors as existing |
| R44 | `partnerships.hero.intro` (633) *(optional page)* | "AUREX grows alongside partners whose standards and horizon match its own: producers, distributors, corporates, institutions and co-investors." | "AUREX seeks to grow alongside partners whose standards and horizon match its own: producers, distributors, corporates, institutions and co-investors." | §6 "grows alongside" |
| R45 | `partnerships.offer.items[2].text` (650) *(optional page)* | "Trade, logistics, distribution and capital within one group." | "Trade, logistics, distribution and capital, designed to work within one group." | §6 implies operating disciplines |
| R46 | `contact.hero.intro` (691) | "Select the nature of your inquiry and share your mandate. Every inquiry is reviewed and answered with an appropriate next step." | "Select the nature of your inquiry and share your mandate to start a conversation with AUREX." | §6 service commitment (X49); §15.4 |
| R47 | `home.contact.intro` (247) | "Whether you represent an institution, a corporate, a producer or an investor, share your mandate and we will respond with an appropriate next step." | "Whether you represent an institution, a corporate, a producer or an investor, share your mandate to start a conversation with AUREX." | §6 service commitment |
| R48 | `inquiry.success.title` (772) + `inquiry.success.text` (773) | "Thank you." + "Your inquiry has been received. We will respond with an appropriate next step." | "Thank you for contacting AUREX." + "We have received your inquiry and will be in touch." | §15.4 prescribed confirmation copy |

### 20.3 Other phrasing-rule breaches (must fix)

| # | Key path (line) | Current | Proposed | Rule |
|---|---|---|---|---|
| S1 | `meta.pages.businesses.title` (22) | "Our businesses" | "Business areas" | §6 labels |
| S2 | `meta.pages.businesses.description` (24) | "International trade and EXIM, logistics, distribution, and holdings, investment and capital: four disciplines designed to reinforce one another." | "How AUREX is structured: international trade, import and export, distribution and logistics, alongside holdings, investments and capital." | §5 two pillars; §15.7 |
| S3 | `nav.labels.businesses` (60); `footer.groups.businesses` (796); `businesses.hero.eyebrow` (437); `about.cta.primary` (430); `home.motion.link` (153) | "Businesses"; "Businesses"; "Our businesses"; "Our businesses"; "Explore our businesses" | "Business Areas"; "Business areas"; "Business areas"; "Business areas"; "Explore the business areas" | §6 labels |
| S4 | `nav.labels.presence` (62); `meta.pages.presence.title` (32); `presence.hero.eyebrow` (533); `home.reach.link` (162) | "Global Presence"; "Global presence"; "Global presence"; "View global presence" | "Markets of Focus"; "Markets of focus"; "Markets of focus"; "View markets of focus" | §9 banned "presence" |
| S5 | `meta.pages.presence.description` (34) | "Europe at the core, with strategic corridors to the Gulf, India and Africa. AUREX is built around corridors, not single markets." | "The markets AUREX focuses on: the European Union, including Poland, the UAE and the wider Middle East, India and Africa." | §9; §15.7 |
| S6 | `presence.map.intro` (543) | "Five markets of focus define where AUREX directs its attention, connected by strategic corridors." | "The markets of focus define where AUREX directs its attention, connected by strategic corridors." | §9 no market counts |
| S7 | `presence.offices.eyebrow` / `.title` / `.empty` (565–567) | "Offices" / "Registered office & representation." / "Registered office and representation details will be published here." | Delete the block until §13 items are confirmed. | §9 "offices"; §15.8 placeholder |
| S8 | `home.motion.title` (125) | "Moving value across sea, air and land." | "Built to move value across borders." (`accent`: `["value"]`) | §5 no sea/air/land |
| S9 | `home.motion.chapters[1].text` (138) | "Movement coordinated across sea, air and land, planned around reliability, compliance and the realities of each corridor." | "Logistics coordination, designed around reliability, compliance and the realities of each route." | §5 |
| S10 | `home.hero.modes` (98); `home.motion.chapters[*].mode` (129, 135, 141, 147) | "Sea" / "Air" / "Land" / "Connected" | Remove with C7. If a four-step device stays, use area names: "Trade" / "Logistics" / "Distribution" / "Ownership". | §5 |
| S11 | `divisions.logistics.summary` (264) | "Coordination of movement across sea, air and land, with logistics partners selected for reliability on each corridor." | "Logistics coordination in support of trade and distribution, designed around reliability on each route." | §5 sea/air/land; partners as existing |
| S12 | `divisions.logistics.scope` (265) | ["Multimodal coordination", "Corridor planning", "Customs & documentation", "Partner network management"] | ["Logistics coordination", "Route planning", "Trade documentation"] | §5 customs services; partner network |
| S13 | `businesses.connection.steps[1].text` (462) | "Logistics coordinated across sea, air and land." | "Logistics coordination, designed around reliability on each route." | §5 |
| S14 | `divisions.trade.scope[0]` (258) | "Sourcing & procurement" | "International trade" | §5 "sourcing" register |
| S15 | `divisions.distribution.scope[0]` (272) | "Distribution partnerships" | "Market access" | §5 partners as existing |
| S16 | `sectors.food.summary` (286) | "Sourcing, trade and distribution of food products between producing and consuming markets." | "Food, approached with a long-term view across the markets of focus." | §7 scope proposal; supplier register |
| S17 | `sectors.food.focus` (287) | ["Cross-border sourcing", "Import & export", "Distribution partnerships"] | ["Cross-border trade", "Import & export", "Market access"] | §5 |
| S18 | `sectors.medical.summary` (296); `sectors.medical.focus` (297) | "Medical products and equipment, where quality, compliance and traceability are non-negotiable." ; ["Medical supplies", "Equipment", "Regulatory diligence"] | "Medical: a sector where quality, compliance and traceability are non-negotiable." ; ["Quality", "Compliance", "Traceability"] | §7 unconfirmed sub-scope |
| S19 | `sectors.electronics.focus` (302) | ["Components", "Parts & equipment", "Supplier qualification"] | ["Components", "Supplier qualification", "Industrial demand"] | §7 "parts & equipment" register |
| S20 | `home.capital.note` (193) | "Holdings are presented publicly once formalised." | Delete. | §12; §15.8 |
| S21 | `portfolio.holdings.empty` (520) | "No holdings are publicly disclosed at this time. This register will be updated as investments are formalised." | Delete the holdings block (C9). | §12; §15.8 |
| S22 | `leadership.profiles.title` / `.empty` (600, 602) | "The people behind AUREX." / "Leadership profiles will be published here." | Delete the block (C9). | §11 |
| S23 | `contact.direct.emailPending` (701) | "A direct inquiries address will be published here. In the meantime, please use the form." | Delete. Render the direct-contact block only when `NEXT_PUBLIC_CONTACT_EMAIL` is set. | §13; §15.8 |
| S24 | `common.comingSoon` (81) | "To be published" | Delete the key and its three usages (C9). | §15.8 |
| S25 | `home.leadership.eyebrow` (229); `home.leadership.link` (240) | "Leadership & governance"; "Leadership & governance" (→ `/leadership`) | "Governance"; "Our governance approach" (→ About) | §11 deferred page; §15.3.1 |
| S26 | `portfolio.criteria.items[0–4]` (502–506); `partnerships.seek.items[0–4]` (659–663) | Criteria lists under "What we look for" / "Investment criteria." | Keep only with AUREX approval (§18). Otherwise omit the block. | §7.2; §18 criteria not supplied |
| S27 | `inquiry.types.general` (754); `meta.pages.contact.description` (47) | "General" / "Any other inquiry"; "Partnership, investment, corporate and general inquiries to AUREX." | Remove `general` (C8) and relabel `inquiry.types.corporate.label` "Corporate & general". Description: "Partnership, investment and corporate inquiries to AUREX." | §15.4 |
| S28 | `about.structure.title` (405); `businesses.hero.title` (438) | "One group, four disciplines."; "Four disciplines. One platform." | "One group. Two pillars." (`accent`: `["Two"]`); "Two pillars. One group." (`accent`: `["group."]`) | §5 two pillars, seven areas |
| S29 | `about.statement` (378) | "The name AUREX draws on aurum, gold, the oldest measure of value, and on exchange: the movement of that value across markets and borders." | "The name AUREX evokes aurum, the Latin word for gold, a lasting measure of value, and exchange: the movement of that value across markets and borders." | §3 "evokes"; unsupported superlative |
| S30 | `home.reach.title` (157) | "Europe at the core. Corridors to the Gulf, India and Africa." | "Europe at the core. A focus on the Middle East, India and Africa." (`accent`: `["core."]`) | §9 market naming; corridors not active routes |
| S31 | `home.sectors.link` (171) | "Our approach to investment" (→ `/portfolio`) | "Explore the sectors" (→ `/sectors`) | §15.3.1 no links to deferred pages |
| S32 | `home.partnerships.cta` (226) | "Explore partnerships" (→ `/partnerships`) | "Propose a partnership" (→ `/contact?type=partnership#inquiry`), or keep it if the optional page stays | §15.3.1 |
| S33 | `meta.tagline` (6); `meta.signature` (7); `home.hero.title` (90) | "Value in motion"; "European standards. Global reach."; "Value in motion." | "Value in Motion"; "European Standards. Global Reach."; "Value in Motion." (`accent`: `["Motion."]`) | §4, §19.0 casing |

### 20.4 Borderline (recommended)

| # | Key path (line) | Current | Proposed | Note |
|---|---|---|---|---|
| T1 | `common.status.core` (79); `businesses.core.eyebrow` (444) | "Core business area"; "Core business areas" | "Business area"; "Business areas" | "Core" can read as an operating core |
| T2 | `home.who.pillars[0].text` (110) | "Cross-border trade and import and export, structured with the discipline of European standards." | "Cross-border trade and import and export, designed around the discipline of European standards." | Participle can read as practice |
| T3 | `home.hero.panelIntro` (97) | "Every conversation with AUREX starts with a clear mandate. Choose the route that fits yours." | "Start with a clear mandate. Choose the route that fits yours." | Implies conversations in progress |
| T4 | `home.reach.legend.corridor` (163) | "Strategic corridor" | "Illustrative corridor" | §9 corridors are illustrative |
| T5 | `divisions.holdings.scope[2]` (279); `sectors.property.focus[1]` (292) | "Co-investment" | "Open to co-investment" | §5 |
| T6 | `sectors.larp.focus[1]` (314) | "Props & accessories" | "Props" | The client scope names costumes, armour, props and historical reproductions |
| T7 | `businesses.connection.title` (458); `businesses.connection.steps[0].title` (461) | "From sourcing to stewardship."; "Source" | "From trade to stewardship." (`accent`: `["stewardship."]`); "Select" | §5 "sourcing" register |
| T8 | `portfolio.approach.items[0].text` (488) *(deferred page)* | "Long-term by default. An investment is held for as long as it creates value." | "Long-term by default: an investment is meant to be held for as long as it creates value." | Present passive |
| T9 | `partnerships.offer.eyebrow` (641) | "What AUREX brings" | "What AUREX is built to offer" | Capability claim |
| T10 | "Gulf" in `presence.corridors.items[0].title`, `[0].text`, `[3].title`, `[3].text` (553–561) and `partnerships.offer.items[1].text` (648) | "Europe — Gulf", "…the Gulf's role…", "Gulf — India & Africa", "Routes through the Gulf…", "…Europe, the Gulf, India and Africa." | Use "Middle East" where the word names the market (for example "Europe — Middle East") | §9 market naming |
| T11 | `leadership.governance.items[0].text` (610) *(deferred page)* | "Defined approval thresholds and decision rights for commitments of capital and trade." | Omit unless AUREX confirms such a framework. | Asserts an internal governance framework |
| T12 | `home.capital.title` (175) | "Patient capital, held with purpose." | "Patient capital, with purpose." (`accent`: `["purpose."]`) | "Held" can read as capital already held |
| T13 | `markets.in.detail` (337) | "A large and fast-evolving economy, and a strategic corridor for sourcing and trade." | "A large and fast-evolving economy, and a strategic corridor for trade." | §5 "sourcing" |
| T14 | `meta.pages.about.description` (19) | "A European-rooted group with a global horizon: international trading, holdings and investment under one long-term philosophy." | "A European-rooted group with a global horizon: international trading, holding and investment under one long-term philosophy." | "Holdings" as a noun implies holdings exist |
| T15 | `about.principles.items[1].text` (397) | "Every commitment carries the group's name. Counterparts and commitments are chosen accordingly." | "Every commitment carries the group's name, and counterparts and commitments are to be chosen accordingly." | Present passive as practice |
| T16 | `businesses.verticals.intro` (453) | "These sectors define where AUREX intends to apply its trading, logistics and capital capabilities." | "These sectors define where AUREX intends to apply its trading, logistics and capital model." | "Capabilities" implies existing capacity |
| T17 | `leadership.hero.title` (580); `leadership.approach.title` (587) *(deferred page)* | "Led with a long-term mandate."; "How AUREX is led." | "Built to be led with a long-term mandate."; "How AUREX is built to be led." | §11 |
| T18 | `home.partnerships.eyebrow` (221); `home.partnerships.title` (222) | "Strategic partnerships"; "Growth, built through partnership." | "Partnership"; "Growth through partnership." (`accent`: `["partnership."]`) | Can read as existing partnerships and achieved growth |

Acceptable as written (checked): the hero eyebrow; `home.sectors.*` (six sectors); `home.why.title`, `intro` and `pillars[3]`; `about.hero.intro`; `about.structure.intro`; the `markets.*` descriptions other than T13; the `partnerModels.*` summaries (they describe the audience, not AUREX); `partnerships.process.steps` (a described process, pending AUREX approval of the partnerships page); the LARP sector summary (client-defined scope); `notFound.*`; and the privacy sections other than the data controller (C10).
