# AUREX — Source of Truth

Compiled 2026-09-27 for the AUREX website build. It covers all copy, content, data and design decisions on the site.

**Rule of use.** A statement may appear on the site as fact only if it is listed in [§16 Confirmed facts](#16-confirmed-facts). Anything in [§17](#17-draft-claims-found-in-drive-that-must-not-be-published-as-fact) must never be published. Anything in [§18](#18-unknown--to-be-supplied-by-aurex) stays empty in the CMS and code (`null` or an empty list) until AUREX supplies it. Placeholder or demo values must not be used to fill those gaps.

---

## 1. Sources reviewed

| # | Source | Label used below | Files reviewed | Last modified (UTC) | Status |
|---|---|---|---|---|---|
| 0 | **Current client brief** | `brief` | Brief text supplied for this build | Sept 2026 | **Highest authority.** Overrides every Drive file. |
| 1 | Static site v1 "Aurex Global", black/gold. Drive folder `Aurex/` (`1vHOX_WHutttcCwb8UNI25xGNvtQuht5W`) | `gold` | `index.html`, `about.html`, `sectors.html`, `leadership.html`, `portfolio.html`, `contact.html`, `script.js` (i18n EN/PL/DE), `styles.css`. All 8 read in full. | 2026-06-21 10:57–10:58 | AI-assisted draft. It is the draft closest to the brief (identical palette, two of the brief's taglines, institutional tone). None of its facts are verified. |
| 2 | Static site v2 "Aurex-Teal" (Teal Edition). Drive folder `Aurex-Teal/` (`1ArQBkXHh-d3XUHSTyaAp2kbTwiFdOmr2`) | `teal` | `index.html`, `about.html`, `trade.html`, `services.html`, `sustainability.html`, `contact.html`, `script.js` (i18n EN/PL/DE), `styles.css`, `pages.css`. All 9 read in full. | 2026-06-21 15:27–15:29 | Draft. It contradicts the brief on positioning, palette, contact details, WhatsApp, languages and the missing inquiry form. It appears to be adapted from a third-party company site. **Superseded.** |
| 3 | Payload CMS 3 + Next.js 15 code. Drive folder `blue-harbor-cms/` (`1AZdMasbE_J_Ijtky4o2apANDWRF9pI_r`) | `cms` | `README.md`, `package.json`, `payload.config.ts`, `Settings.ts`, `Sectors.ts`, `seo.ts`, `Header.tsx`, `Footer.tsx`, `page.tsx`, `globals.css`, `api/inquiries/route.ts`, `.env.example` (variable names only), `docker-compose.yml`, `Dockerfile`, `custom.scss` | 2026-06-17 → 2026-06-20 | Technical scaffold built on a "Blue Harbor Group" maritime template. **Architecture is reusable. Theme and template leftovers are superseded.** |
| 4 | CMS seed script | `seed` | `src/seed/run.ts`, `src/payload-types.ts` | `run.ts` 2026-06-20 09:28 | Demo content generator. Nearly all of its factual content is invented. |
| 5 | CMS database and remaining CMS source | `db` / `discovery` | `blue-harbor.db` (content tables only), about 35 `src/` files (collections, globals, blocks, views, lib, layout, 404), 3 media samples, 1 video | `blue-harbor.db` 2026-06-21 05:36 | Seeded demo content that mirrors `seed`. The media files are procedural placeholder art. `Animated_Tech_Logo_Reveal.mp4` is another client's logo (Mobi Hub). |
| 6 | Other Drive content | — | OWNIT project folders, Mobi Hub outreach, "New folder (2)" images, personal documents | — | Unrelated to AUREX. Checked and ruled out. |

All Drive files were uploaded on 2026-06-23. "Last modified" is the local edit time that Drive preserved.

**Not found anywhere in the Drive:** a brand guidelines document, an AUREX logo file (SVG/PNG/JPG), company-owned photography, and any document written by AUREX itself (Docs, Slides or PDF). A full-text search for "Aurex" matches only the three draft builds above.

### Authority order

1. **Current brief (Sept 2026).**
2. **Neutral structural decisions** that appear consistently across the drafts and are not contradicted by the brief (for example the page set, locale set and inquiry types).
3. **Newest drafts** (2026-06-21): `teal`, `gold`, `db`.
4. **Older drafts** (2026-06-17 → 06-20): `cms` code, `seed`.

How the order was applied:
- A draft can never establish a fact. Numbers, offices, HQs, people, partners, portfolio items, emails, phone numbers and certifications found in drafts are unconfirmed unless they only restate the brief.
- Recency between drafts only settles structural or stylistic questions that the brief leaves open. `teal` is the newest file set by about 4.5 hours, but it loses on every point where it conflicts with the brief. In practice `gold` is the reference draft for design and tone, and `cms`/`db` are the reference for architecture.
- The brief's palette is to be used "unless newer Aurex material specifies otherwise". No AUREX material newer than the Sept 2026 brief exists. Every Drive draft predates it, so the teal palette does not qualify.

---

## 2. Company positioning

AUREX is a premium international trading, holding and investment group with a European-rooted, institutional and long-term outlook. The group is built to move value across borders in two ways. Through international trade, import and export, distribution and logistics, it moves goods between markets. Through holdings, investments and capital, it holds value for the long term. Its sectors of focus are food, property and real estate, medical, electronic components and sustainability. Its markets of focus are the European Union (including Poland), the UAE and the wider Middle East, India and Africa. The site should read as an institution: measured, discreet and built for decades. It must never read as a startup, a dropshipping or generic import-export business, a small trading agency, a sales company, a commodity marketplace, a cheap logistics provider or a generic corporate template.

*Every element of this paragraph comes from the brief. It is a positioning statement, not a claim of current operations. See §6.*

---

## 3. Brand story

> **AUREX brings two ideas together.**
> **AUR** comes from *aurum*, the Latin word for gold. Gold's chemical symbol is Au. It stands for value: quality, trust and what endures.
> **EX** stands for exchange: the movement of goods, capital and opportunity across borders, and the expansion that follows.
> Together they describe what the group is built to do: move value between markets, to European standards, with a long-term view.
> **Value in Motion.**

Usage notes:
- Present "EX = exchange" as the brand's reading, not as etymology. The `gold` draft's gloss "Ex — Latin for 'beyond'" must not be reused. Latin *ex* means "out of / from", and the brief's concept is **exchange**.
- The story contains no founding date, founder, origin narrative or history. The `teal` claim of a "merger of two longstanding companies" is excluded (§17).
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
1. **"Value in Motion."** carries both halves of the name: *Aur* (value) and *ex* (exchange/movement). It covers both engines of the group, since goods move through trade and capital moves through investment. It does not narrow AUREX to trade the way "Trade Beyond Borders" does. It is short, it is not transactional, and it is the line the brief-aligned `gold` draft already uses as its primary signature. A Polish version already exists in `gold` ("Wartość w ruchu.").
2. **"European Standards. Global Reach."** carries the brief's two positioning anchors: a European-rooted outlook and international scope. It adds what the master line lacks, namely where the group comes from and how it behaves. It is used as the supporting line in `gold`.
3. Both lines are among the taglines the brief says were explored, and neither contains a factual claim. "Global reach" describes scope and ambition. It must not be illustrated with office pins or market counts (§9).

Language handling. Keep the master line in English in the wordmark lockup and footer signature in every locale, because it acts as the brand signature. Use the translations below only where the line sits inside running copy.

| Locale | Master line | Supporting line | Status |
|---|---|---|---|
| EN | Value in Motion. | European Standards. Global Reach. | Final |
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
| Expand Your Horizons / Sustainable Solutions for Global Growth | `teal` hero | Rejected | Generic, with a consumer or travel register and no link to the name. |
| Global solutions for import and export needs. | `teal` footer | Rejected | This is the generic import-export tone the brief excludes. |
| Building enduring value across Europe, the Gulf and India. | `seed` / `db` home hero | Rejected | It implies an established footprint and omits Africa and Poland. |
| Built to be the most trusted. / Not the loudest. The most trusted. | `gold` | Rejected as a tagline; allowed as a section heading | As a signature it reads as a superlative claim. Use it only inside the "built to be" framing (§19). |
| Five divisions. One disciplined group. | `gold` | Rejected | It implies divisions or subsidiaries that are not confirmed. |

---

## 5. Business model & architecture

**Status:** the seven strategic areas are defined by the brief. None is confirmed as an operating business (§6). Describe them as the group's model and capabilities, never with volumes, counts, named entities or claims of operated assets.

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
      Sectors of focus:  Food · Property / Real Estate · Medical · Electronic Components · Sustainability
      Markets of focus:  European Union (incl. Poland) · UAE / Middle East · India · Africa
```

| Area | Role in the model | Describe as | Never say |
|---|---|---|---|
| International Trade | The core commercial activity: sourcing and cross-border trade between markets of focus | "international trade", "cross-border trade", "sourcing" | Product counts ("100+ products traded"), catalogues, "we go beyond our catalogue" |
| Import & Export (EXIM) | The cross-border mechanism of trade. Part of Trade, not a separate business | "import and export between Europe, the Middle East, India and Africa" | "import-export solutions provider", "customs clearance services" (implies licensing) |
| Distribution | Market access and channel development in destination markets | "market access", "distribution partnerships" | "our distribution network across N countries" |
| Logistics | Coordinating the movement of goods in support of trade and distribution | "logistics coordination", "working with logistics partners" | "Aurex Freight", "we operate freight forwarding / warehousing", "air, sea, land" service lists, cheap-freight imagery |
| Holdings | Long-term ownership of stakes in businesses and assets | "long-term holdings", "ownership with a long horizon" | Named holdings, "portfolio companies", any count |
| Investments | Deploying capital into the sectors of focus, alone or alongside partners | "investment", "co-investment", "patient capital" | Amounts, returns, "capital deployed", ticket sizes |
| Capital | The financial base that funds trade and investment, and the basis for working with capital partners | "capital", "capital partners" | AUM, fund language, "investor relations", "fund" |

How the areas relate:
1. **Trade** (international trade and import & export) creates relationships, market knowledge and flows of goods between the markets of focus.
2. **Distribution and logistics** turn those flows into lasting market access.
3. **Holdings and investments** turn that access and knowledge into long-term ownership in the same sectors.
4. **Capital** funds both sides and is the basis for co-investment with partners.
5. The result is the brand idea: value that moves (trade) and value that is held (ownership). *Value in Motion.*

Presentation on the site: use two pillars, **Trade & Distribution** (International Trade, Import & Export, Distribution, Logistics) and **Holdings & Investments** (Holdings, Investments, Capital). The five sectors run across both pillars.

- In public copy, call these "business areas" or "how the group works". Do not call them "divisions", which implies legal entities. `src/content/facts.ts` uses `divisions` as an internal identifier only.
- Do not use sub-brand names: *Aurex Trading, Aurex Distribution, Aurex Beverages, Aurex Brands, Aurex Ventures* (`gold`) and *Aurex Freight* (`teal`) are all unconfirmed.

---

## 6. Current divisions

**No division, business area or vertical is established as active.**

- The brief lists the strategic areas and verticals as "discussed". It does not say any of them are currently operating.
- The drafts describe all five verticals in the present tense ("Aurex sources and trades…", "Five verticals where we invest, operate and trade."), but the drafts are not evidence.
- The `gold` portfolio page shows only "Project in preparation" placeholders. This suggests there were no projects that could be shown as of June 2026.
- The only thing established at group level is the **positioning** (§2), which comes from the brief.

How the site must phrase areas and sectors until AUREX confirms activity in writing:

| Context | Use | Avoid |
|---|---|---|
| Section label | "Sectors of focus", "Business areas", "How the group works" | "Our divisions", "Our businesses", "Current operations" |
| Sector sentence | "Food is one of AUREX's sectors of focus." / "AUREX looks for trade and investment opportunities in food and agri-food." | "Aurex sources and trades premium food…", "Aurex invests in and operates…" |
| Area sentence | "AUREX is structured around trade and long-term ownership." / "The group is built to…" | "Aurex operates…", "Aurex Freight delivers…" |
| Activity evidence | Nothing. Leave it out. | "Current projects", "Portfolio companies", stats, case studies, "coming soon" cards |
| Verbs | *focuses on, looks for, is built to, seeks, works with partners on* (as an invitation) | *operates, trades, supplies, manages, delivers, invests in* (as completed or ongoing fact) |

CMS rule: each sector and business area has a `status` field.
- `focus` is the default. The public label is "Sector of focus", or no label.
- `active` may be set only after AUREX confirms in writing. The confirming statement and its date must be added to §16 at the same time.
- `status` must never default to `active`. The drafts' `featured: true` and "Current projects" defaults are not status evidence.

---

## 7. Future / strategic divisions (verticals)

| Vertical (public name) | Brief name | Names used in drafts | Status label | Safe public scope line |
|---|---|---|---|---|
| Food & Agri-Food | Food | Food & Agriculture (`gold`), Food Products (`teal`), Food Industry (`seed`) | **Strategic focus. Activity not confirmed.** | "Food and agri-food supply between producing and consuming markets." |
| Property & Real Estate | Property / Real Estate | Property & Real Estate (`gold`), Real Estate (`seed`) | **Strategic focus. Activity not confirmed.** | "Real estate as a long-term asset class." |
| Medical & Healthcare | Medical / LARP | Medical & Healthcare (`gold`), Medical Sector (LARP) (`seed`) | **Strategic focus. Activity not confirmed. Scope unclear (LARP).** | "Medical and healthcare supply and technology." |
| Electronic Components | Electronic Components | Electronics & Components (`gold`), Electronic Components & Parts Trading (`seed`) | **Strategic focus. Activity not confirmed.** | "Electronic components for industry." |
| Sustainability | Green Revolution / Sustainability | Sustainability & Green Revolution (`gold`), Sustainability page (`teal`), Green Revolution / Sustainability (`seed`) | **Strategic focus. Activity not confirmed.** | "The energy transition and resource efficiency." |

Notes:
- **"Green Revolution"** is the established name for the mid-20th-century transformation of agricultural yields, so as a public sector name it can be misread. Use "Sustainability" publicly and "green transition" in copy. Keep "Green Revolution" as the brief or internal label unless AUREX asks for it publicly.
- The drafts attach **sub-areas** to each vertical. None of them may be published: food production facilities, cold chain, Baltics; build-to-rent, Grade-A offices, DIFC; MedTech, diagnostics, clinical supply; *used / refurbished* equipment and spare parts; utility-scale solar, recycling.
- **Electronic components** copy must avoid "new & used", "refurbished", "remarketing" and "24h quote time". These read as a small trading agency, which the brief excludes.

### What "Medical / LARP" might mean

The sources give three incompatible readings, and none of them comes from AUREX:

| Reading | Source (date) | What it says | Assessment |
|---|---|---|---|
| **Live-action role-play** (costumes, armour, props) | `teal` (2026-06-21 15:27) | "LARP & Costuming … serving live-action role-play communities, theatrical productions, and cosplay markets worldwide". A separate trade line with no medical link. | This is the only source that spells the acronym out, but it does not fit "Medical". The same Drive also holds an unrelated OWNIT medieval-shop project (gold Corinthian helmet product images), so cross-project contamination is possible. |
| **A named healthcare platform** | `seed` (06-20), `db` (06-21 05:36) | "Investments in medical technology, diagnostics and the LARP healthcare platform", plus a portfolio item "LARP MedTech Platform" | Demo content. It treats LARP as a proper name with no definition. It is invented. |
| **Unspecified "LARP solutions"** inside medical | `gold` (06-21 10:57) | "Aurex connects medical supplies, healthcare products, and LARP solutions…" | Never expanded. |

**Conclusion: unclear.** It is also unclear whether the brief's slash means one vertical (LARP as something inside medical) or two separate items discussed together. Until AUREX defines it:
- publish the vertical as **"Medical & Healthcare"** only;
- keep "LARP" out of all public copy, navigation, forms and SEO;
- record the definition in §16 once supplied.

### Verticals in drafts that are out of scope (not in the brief)

Beverages and Brands (`gold`). Paper Products, LARP & Costuming as a trade line, and General Supplies, including office supplies, hotel supplies, printers, commercial appliances and advertising supplies (`teal`). Consulting and technology services: Global Trade Advisory, Market Analysis & Mapping, International Business Consulting, Technology Services (`teal`). These are excluded unless AUREX reinstates them.

---

## 8. Industries

These are the industries the site may name. They are sector vocabulary for navigation, the inquiry form's "area of interest" field and SEO. They are **not** claims of activity.

| Industry | Linked vertical / area |
|---|---|
| Food and agri-food | Food |
| Real estate / property | Property & Real Estate |
| Healthcare and medical supply / medical technology | Medical & Healthcare |
| Electronic components / industrial electronics | Electronic Components |
| Renewable energy, energy transition, resource efficiency | Sustainability |
| International trade, import & export, distribution, logistics | Trade & Distribution pillar (cross-sector) |
| Holdings and investment | Holdings & Investments pillar (cross-sector) |

Industries named in drafts that are excluded: beverages; paper and packaging; costuming, theatre and cosplay; office, hotel and hospitality supplies; advertising and promotional products; trade consulting; technology services; freight forwarding and customs brokerage offered as operated services.

---

## 9. Markets

Classification key:
- **Market of focus**: named in the brief. May be presented as a market the group focuses on.
- **Presence claim, unconfirmed**: a draft asserts offices, an HQ, operations or projects. Excluded.
- **Language only**: appears as a site language, not as a market.
- **Out of scope**: not in the brief.

| Market | In brief | Draft mentions | Classification | Site treatment |
|---|---|---|---|---|
| European Union | Yes | "European Union (HQ)" (`gold`); "Headquarters and core operations across the Netherlands, Poland and France", "3 EU hubs" (`seed`/`db`) | **Market of focus.** The draft HQ and operations claims are unconfirmed presence claims. | "European Union". The site may say "European-rooted" (brief) but must not name an HQ country or city. |
| Poland | Yes (named) | "Riverside Residences, Warsaw" (`seed`/`db`) | **Market of focus.** The Warsaw project is excluded. | Name it within the EU focus ("European Union, including Poland"). |
| UAE / Middle East | Yes | "United Arab Emirates" listed under "Headquarters" (`gold`); "Dubai regional HQ", "DIFC corridor", "Gulf Electronics Trading Hub" (`seed`/`db`) | **Market of focus.** All presence claims are excluded. | "The UAE and the wider Middle East". |
| India | Yes | "India" listed under "Headquarters" (`gold`); "5+ active projects", "SolarBridge India" (`seed`/`db`) | **Market of focus.** Presence and project claims are excluded. | "India". |
| Africa | Yes | Absent from every draft except a form country dropdown | **Market of focus.** | "Africa" at continent level. Name no countries until AUREX specifies them. |
| Netherlands | No (Dutch is a language) | "Zuidas Business District, Amsterdam" HQ, "Rotterdam Cold Chain" (`seed`/`db`) | **Language only.** The presence claims are unconfirmed and excluded. | Not presented as a market. |
| France | No (French is a language) | "core operations" (`seed`/`db`) | **Language only.** Presence claim excluded. | Not presented as a market. |
| Egypt (Cairo) | No (Africa only at continent level) | "Offices in Cairo", a Cairo street address, +20 and (02) phone numbers (`teal`) | **Presence claim, unconfirmed.** Possibly a third party's details. Excluded. | Not presented. |
| Baltics | No | "Baltic Food Distribution … 6 countries" (`seed`/`db`) | **Presence claim, unconfirmed.** Excluded. | Not presented. |
| Germany / DACH | No | Only implied by the German translation (`gold`, `teal`) | **Out of scope.** | Not presented. German is dropped. |
| "Asia", "3 continents", "15+ markets", "worldwide" | No | `gold`, `teal` | **Excluded as counts or claims.** "Asia" is broader than the brief's India. | Not presented. |

Rules:
- Use the label "**Markets of focus**" and never "presence", "offices", "hubs", "headquarters", "regional HQ", "footprint" or "where we operate".
- On a globe or map, highlight regions only. Do not use pins labelled as offices or cities. Any trade corridors shown are illustrative and must not be labelled as active routes or volumes.
- Do not use market counts or continent counts.

---

## 10. Audience

The three inquiry types come from the brief. The audience categories come from drafts (`gold`: "investor, manufacturer, distributor, or institution"; `seed`: "investor, founder or strategic partner"). They are used here as target audiences, not as claims that such relationships exist.

| Audience | What they need from the site | Inquiry type |
|---|---|---|
| Producers, manufacturers and suppliers in the sectors of focus | Proof that AUREX is a serious, long-term counterparty. A clear route to discuss supply and trade. | Partnership |
| Distributors and importers in the markets of focus | An understanding of the group model. A route to discuss market access and distribution. | Partnership |
| Investors and co-investors (family offices, institutions, private investors) | Positioning, principles and sectors. A discreet route to an investment conversation. | Investment |
| Businesses and founders looking for a long-term partner or capital | What AUREX looks for, and how to start a conversation | Investment or Partnership |
| Corporate counterparties (financial institutions, advisers, service providers, media) | Who AUREX is, and a general contact route | Corporate |

Notes:
- Careers is excluded by the brief, so candidates are not a target audience.
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
- Do not use placeholder role cards or "coming soon" states. They imply a structure that is not confirmed and make the site look unfinished.

---

## 12. Portfolio information

**Known:** nothing. No holding, investment, joint venture, project, partner company or metric is confirmed.

Excluded draft material:
- `seed`/`db`: eight demo items with metrics. These are Baltic Food Distribution, Riverside Residences Warsaw, LARP MedTech Platform, Gulf Electronics Trading Hub, SolarBridge India, Rotterdam Cold Chain, Dubai Prime Offices and GreenLoop Recycling. The metrics include €48M revenue, 240 units, 80 MW and 94% occupancy.
- `gold`: six "Project in preparation" cards, and the intro "A curated view of Aurex investments and holdings…".

Site treatment:
- **Do not publish a Portfolio page at launch.** Keep the CMS collection (types `investment | holding | partnership | project`, statuses `active | in-development | exited`, sector relation) unpublished, with `holdings: []` in `facts.ts`.
- On the site, "how we invest" is expressed through principles (§19) and sectors (§7), not through listed items.
- Publish an item only once AUREX confirms it, approves disclosure and supplies any figures shown.

---

## 13. Contact information

**Known:** nothing. No email, domain, phone, address, legal entity or social account is confirmed.

| Item in drafts | Value | Source | Status | Action |
|---|---|---|---|---|
| Email | `info@aurex.com` | `gold` | Unconfirmed. Ownership of the domain is unknown. | Do not publish |
| Email | `info@aurex-trading.com` | `teal` | Unconfirmed. A "-trading" domain also conflicts with the holding/investment positioning. | Do not publish |
| Email | `invest@aurex.example`, `admin@aurex.example`, `ir@aurex.example`, `noreply@aurex.example` | `seed`, `db`, `cms` `.env.example` | **Placeholder.** `.example` is a reserved domain (RFC 2606) and can never receive mail. | Never publish |
| Email | `*@blueharbor.example` | `cms` | **Template leftover** | Remove |
| Phone | `+31 20 000 0000` | `seed`/`db` | **Placeholder** (zero-filled Amsterdam number) | Never publish |
| Phone | `+20 150 106 5557`, `+20 150 106 5556`, `(02) 2180 4158` | `teal` | Egyptian numbers. Possibly a third party's. | Never publish |
| Address | "Zuidas Business District, Amsterdam, Netherlands" + Google Maps embed | `seed`/`db` | Unconfirmed office | Never publish |
| Address | "14 Mahmoud Ahmed El-Meligy, Al Matar, El Nozha, Cairo Governorate" + Maps embed | `teal` | Unconfirmed. Possibly a third party's. | Never publish |
| WhatsApp | `wa.me/201501065557` floating button | `teal` | Excluded by the brief | Remove |
| Social | LinkedIn, X, Facebook, Instagram → `#` or `https://linkedin.com` | `gold`, `teal`, `seed` | **Placeholder** | Show no social icons until real URLs exist |
| Response time | "we'll respond within one business day" | `seed`/`db` | Unconfirmed service commitment | Do not publish |

Site treatment:
- The **inquiry form** is the primary contact route.
- Display an email address only after AUREX confirms the domain and mailbox. The build reads it from `NEXT_PUBLIC_CONTACT_EMAIL`; if that is unset, no email is displayed.
- Show no phone number, address, map or "our offices" block until these are confirmed.
- Form notifications need a confirmed recipient mailbox (§18).

---

## 14. Visual identity

### 14.1 Core palette (brief)

The hex values below are specified by the brief. `gold/styles.css` uses the same values exactly.

| Token | Name | Hex | Usage | Key contrast (WCAG 2.x) |
|---|---|---|---|---|
| `ink` | Matte Black | `#111111` | Primary background (dark-first layout), text on ivory, text on gold buttons | Ivory on black **17.47:1** |
| `gold` | Rich Gold | `#C8A24A` | Primary accent on dark: hairlines, rules, eyebrows, icons, primary button fill (with black text), focus rings on dark | On black **7.84:1**. On ivory 2.23:1 (**fails**) |
| `gold-bright` | Champagne Gold | `#D4AF37` | Highlight and hover state of gold elements on dark | On black **8.98:1**. On ivory 1.95:1 (**fails**) |
| `ivory` | Ivory | `#F8F6F0` | Text on black, light contrast sections, CTA bands | Black on ivory **17.47:1** |

Supporting dark neutrals from `gold` (these are design tokens, not facts, and may be reused): `#0B0B0B` (footer, deepest band), `#141414` (alternate section, inputs, cards), `#1A1A1A` / `#232323` (gradients). Hairlines: `rgba(200,162,74,.30)` (gold) and `rgba(248,246,240,.10)` (ivory).

### 14.2 Accessible text variants on ivory

Rich Gold and Champagne Gold fail as text on ivory, even for large text and UI components. Derived variants (same hue, darker):

| Token | Hex | On ivory `#F8F6F0` | On white | Allowed use on light backgrounds |
|---|---|---|---|---|
| `gold-ink` | `#7D5F1A` | **5.51:1** (AA) | 5.9:1 | Body-size gold text, links, eyebrows, small labels. Already defined in `src/app/globals.css`. |
| `gold-ink-deep` | `#624D1D` | **7.48:1** (AAA) | 8.08:1 | Small caps, fine print, long gold text |
| `gold-large` | `#A07E30` | **3.52:1** | 3.8:1 | **Only** large text (≥ 24 px regular or ≥ 18.66 px bold) and non-text UI (icons, input borders, focus rings) |
| `gold` | `#C8A24A` | 2.23:1 | 2.41:1 | Decorative only: hairlines and ornaments with no information |
| `gold-bright` | `#D4AF37` | 1.95:1 | 2.1:1 | Decorative only |

Other contrast rules:
- Buttons: use **black text on gold** (7.84:1). Ivory or white text on gold (2.23:1) fails and must not be used.
- Muted text on black: ivory at 66% opacity (≈ `#A9A8A4`) gives 7.93:1 and is fine for body text. Ivory at 40% (≈ `#6D6D6A`) gives 3.64:1 and is for large or decorative text only.
- Muted text on ivory: black at 66% (≈ `#605F5D`) gives 5.9:1 and is fine. Black at 40% gives 2.6:1 and fails.
- The ratios were computed with the WCAG 2.x relative-luminance formula. Every new token must be re-checked before use.

### 14.3 Typography used before

| Source | Display | Body | Notes |
|---|---|---|---|
| `gold` | Fraunces (serif, 400–700) | Manrope (300–800) | Eyebrows in Manrope 700, 12.5 px, tracking 3.5 px, uppercase. Italic serif gold accents in headings. |
| `cms` / `discovery` layout | Fraunces | Inter | latin + latin-ext subsets |
| `teal` | Poppins (300–900) | Poppins | Superseded along with the teal identity |
| Current build (`src/app/fonts.ts`) | Instrument Serif (400, with italic) | Inter Tight (300–600), plus IBM Plex Mono | This is the current choice. The brief does not specify typography. |

The prior drafts point to one direction: a **high-contrast serif for display** with a **neutral grotesk for body**, and italic serif used for gold accents. That direction is what matters, not the specific typefaces. Hard requirement: fonts must load the **latin-ext** subset so Polish (ą ć ę ł ń ó ś ź ż) and French diacritics render.

### 14.4 Motifs

Reuse (from `gold`, consistent with the brief):
- A dark-first layout, with matte black sections alternating with `#141414` bands and ivory contrast sections.
- A gold hairline system: a gold line before each eyebrow, a short 64 × 2 px rule, and an animated hero rule.
- Framed imagery: a 1 px gold-tint border plus an offset solid gold shadow.
- Cards with a hairline border and a gold top line that grows on hover.
- A subtle film-grain overlay and a restrained radial gold glow in the hero and CTA band.
- Italic serif gold words inside display headings.
- Motion built from rise/fade entrances and scroll reveals, with `prefers-reduced-motion` respected.

Reuse as a concept only: the `teal` logo's **two opposing arrows** (import ↔ export) express the brief's "exchange" idea. They may be re-drawn in gold if AUREX wants a mark, but the teal and lime versions must not be used.

Reject: the teal/lime palette, the green sustainability sub-palette, and WhatsApp green (`teal`). The navy/sea/port-teal theme, anchor, ship and wave icons, wave dividers and the "back to port" 404 copy (`cms`/`db`, Blue Harbor template). Stats bands and animated counters. Dashed "scaffold" placeholder cards.

### 14.5 Imagery

- No AUREX-owned photography exists. `gold` and `teal` hotlinked Unsplash stock. `cms`/`db` used procedurally generated abstract placeholder art (`seed/imageArt.ts`).
- Imagery must not imply owned assets, offices, fleets, warehouses or specific projects. Use no identifiable buildings presented as "ours" and no vessels or trucks carrying branding.
- Show logistics subjects (ports, containers, ships) sparingly and in an abstract, premium treatment (monochrome, grain, low opacity, gold-tinted grading), to avoid a cheap-logistics feel.
- Self-host all images; do not hotlink them.

### 14.6 Logo status

- **No AUREX logo exists** in any source. There is no SVG, PNG or JPG, and none was uploaded to the CMS Settings.
- The drafts show three things: a `gold` typographic wordmark ("AUREX" in Fraunces 600 plus "GLOBAL" in gold Manrope); a `teal` wordmark ("Aurex / Global Trading" with gold and lime arrows); and the `cms` fallback (an anchor icon plus "Aurex"), which is a template leftover.
- `media/Animated_Tech_Logo_Reveal.mp4` in the CMS media library is the **Mobi Hub** logo, another client, with a Veo watermark. **Never use it; delete it from any AUREX library.** `media/Video Project 7.mp4` (40 MB, the CMS home hero video) was not inspected and must not be used until someone confirms what it shows.
- **Interim decision:** use a typographic wordmark "AUREX" with no descriptor. Drop "GLOBAL" and "Global Trading", since both name variants are unconfirmed. Replace it when AUREX supplies a logo.
- Accessibility: write the name as "Aurex" in the markup and apply `text-transform: uppercase` where the design needs capitals, or give the wordmark an `aria-label="AUREX"`. This stops screen readers from spelling out the letters.

### 14.7 Teal variant vs black/gold

**Black/gold wins.**
1. The brief specifies Matte Black, Rich Gold, Champagne Gold and Ivory with exact hex values.
2. The teal build (2026-06-21 15:27) is newer than the gold build (10:57 the same day), but it predates the Sept 2026 brief. It is therefore not the "newer Aurex material" the brief's palette clause refers to.
3. The teal build contradicts the brief on positioning (a "data-driven global trading enterprise"), contact details (Egyptian), WhatsApp, languages (DE) and the missing inquiry form. Its structure, copy and contact details point to a third-party site that was adapted.
4. The `cms` navy `#0C2340`, sea `#1F6F8B` and accent `#0C8A7B` values are Blue Harbor template defaults and are superseded for the same reason. If the Payload Settings theme fields are reused, set them to the brief palette or remove them.

---

## 15. Website requirements

### 15.1 Pages

| Page | Status | Content | Basis |
|---|---|---|---|
| Home | **Required** | See §15.2 | All drafts; brief |
| About (the group) | **Required** | Positioning, brand story, how the group works, principles and governance approach (no names) | `gold`, `seed`/`db` |
| Business areas ("What we do") | **Recommended** | Trade & Distribution pillar (International Trade, Import & Export, Distribution, Logistics). Holdings & Investments pillar (Holdings, Investments, Capital). How the pillars relate. | Brief strategic areas. No draft had a dedicated page, so this is a proposal. |
| Sectors: index plus 5 detail pages | **Required** | Per sector: overview, why the sector matters (general, no statistics), what AUREX looks for in partners and opportunities, and a CTA "Discuss this sector" that pre-selects the sector in the form | `gold`, `cms` `Sectors.ts`, `seed`/`db`; brief verticals |
| Contact / Inquiries | **Required** | Inquiry form (§15.4). Email only once confirmed. | Brief |
| Privacy notice | **Required** | GDPR notice for form data: controller identity, purpose, retention, rights | The form collects personal data in the EU. Content depends on the legal entity (§18). |
| Legal notice / imprint | **Required** | Legal name, registered office, registration numbers | Same dependency |
| 404 | **Required** | On-brand copy. Replace the nautical "back to port" copy. | `discovery` |
| Leadership | **Deferred** | Template built but unpublished and out of navigation until names are supplied | §11 |
| Portfolio | **Deferred** | Template built but unpublished until items are confirmed | §12 |

Navigation: About · Business Areas · Sectors · Contact, plus a CTA "Start a conversation". Do not use "Investor enquiry" as the primary CTA (the `seed` choice), because it skews the site toward a fund feel.

### 15.2 Homepage story

1. **Hero**: the AUREX wordmark, "Value in Motion.", the eyebrow "European-rooted international group", a one-sentence positioning line (trading, holding and investment group), and CTAs "Explore the group" and "Start a conversation".
2. **The name**: Aur + Ex, meaning value and exchange (§3).
3. **Who we are**: the positioning paragraph (§2), with no numbers.
4. **How the group works**: the two pillars and how value moves between them (§5).
5. **Sectors of focus**: the five verticals with safe scope lines (§7) and no status badges claiming activity.
6. **Markets of focus**: the EU (including Poland), UAE / Middle East, India and Africa as highlighted regions, with no office pins and no counts (§9).
7. **Principles / Why AUREX**: long-term, disciplined, built to be trusted (§19), stated as commitments. No certifications.
8. **Partnership invitation**: who AUREX wants to hear from (§10) and the three inquiry types.
9. **Contact**: the form, or a CTA to it. Closing line: "European Standards. Global Reach."

Not on the homepage: a stats band, partner logo strip, portfolio grid, leadership grid, news, social feed or WhatsApp.

### 15.3 Functionality

| Requirement | Specification | Basis |
|---|---|---|
| Contact / inquiry form | Server-side submission, validation, notification email to a confirmed mailbox, confirmation email to the sender | Brief. The `gold` form was demo-only; `cms` `route.ts` is the reference. |
| Inquiry types | Partnership · Investment · Corporate (general) | Brief; `seed` forms; `gold` types |
| Spam protection | Honeypot field, time-trap, per-IP rate limit, optional Cloudflare Turnstile | `cms` `route.ts` |
| CMS-ready content | All copy and collections editable without a redeploy (§15.6) | Brief |
| Responsive | From 320 px up. No horizontal scroll. Touch-friendly navigation. | Brief |
| SEO | §15.7 | Brief |
| Multilingual | §15.5 | Brief |
| Accessibility | WCAG 2.2 AA: contrast (§14.2), keyboard access, visible focus, labelled fields, skip link, reduced motion | Standard, and present in `cms` |
| Analytics | Not requested. Optional (the CMS has GA4 and Plausible fields). If added, it needs a consent approach under GDPR. | AUREX to decide (§18) |

### 15.4 Inquiry form specification

- Fields: Full name\*, Email\*, Company / organisation, Country, Inquiry type\* (Partnership / Investment / Corporate), Sector of interest (Food · Property & Real Estate · Medical & Healthcare · Electronic Components · Sustainability · Multiple · Not sure), Message\*, and a privacy consent checkbox\* linking to the privacy notice.
- **Excluded:** "Indicative ticket size" (`seed`). It solicits investment amounts, which carries regulatory implications and a fund feel. Also excluded: file upload at launch, and the "Custom sourcing request" page (`cms`), which has an agency or sales feel.
- Confirmation copy must not name teams or service levels. Remove "Our investor relations team…", "Our corporate development team…" and "within one business day". Use: *"Thank you for contacting AUREX. We have received your inquiry and will be in touch."*
- Submission status names in the admin: use `new → in-review → responded → closed` instead of the `seed` sales pipeline `quoted / won / lost`.

### 15.5 Languages

| Locale | Role | Status |
|---|---|---|
| `en` | Primary and default | Confirmed (brief) |
| `pl` | Secondary | Confirmed (brief). Partial draft translations exist in `gold` and `db`. |
| `nl` | Secondary | Confirmed (brief). Only partial `db` translations exist (home hero, sector names). |
| `fr` | Secondary | Confirmed (brief). Only partial `db` translations exist. |
| `de` | — | **Dropped.** It appears only in `gold` and `teal` and is not in the brief. |
| `ar` (RTL) | — | **Dropped.** It is a Blue Harbor template leftover in the `cms` README and the `route.ts` types. |

Requirements:
- Crawlable per-locale URLs (`/en`, `/pl`, `/nl`, `/fr`).
- `hreflang` alternates plus `x-default` → `en`.
- Localised `<title>` and meta description. The static drafts did not translate these.
- Professional translation of all copy. Machine or draft translations must be reviewed by a native speaker.
- Whether all four locales go live at launch is a question for AUREX (§18).

The current build's `src/i18n/config.ts` already defines `en, pl, nl, fr`, which is consistent with this section.

### 15.6 CMS model worth reusing (from `cms` / `seed` / `discovery`)

| Keep | Change | Drop |
|---|---|---|
| **Settings global**: brandName, tagline, logo, logoDark, favicon, contact fields (left empty), SEO defaults (defaultTitle, titleSuffix " — AUREX", defaultDescription, defaultOgImage) | Theme fields: set to the brief palette or remove. Social enum: remove `whatsapp`. | Default brandName variants "Aurex Global" and "Global Trading" |
| **Navigation global**: items, cta, footerColumns, footerNote | Footer note: "© {year} AUREX" plus the legal name once supplied | `autoPillarMenu` mega-menu (legacy) |
| **Pages** built from blocks, with drafts, versions and live preview | — | — |
| Blocks: Hero, AboutSplit, SectorsGrid, FeatureCards, RichText, CTABanner, ContactForms (tabs), FAQ, Spacer | GlobalPresence → rebuild as "Markets of focus" with no stat fields and no "HQ" labels | Stats (counters), LogoStrip, SubsidiaryBand, PortfolioGrid and LeadershipGrid (until content exists), PillarsGrid, CategoryGrid, ServicesGrid, SpecsTable, Gallery |
| **Sectors** collection: name, slug, icon, tagline, summary, heroImage, overview, marketOpportunity, futureGrowth, seo, order | **Add `status` (`focus` default, `active`)**. Hide `currentProjects` and `stats` until real content exists. | Default `featured: true` treated as evidence of activity |
| — | Repurpose **Pillars** as **Business Areas** (the 7 areas grouped into 2 pillars) | Categories, Services, Subsidiaries (legacy trading/catalogue model) |
| **Markets** (new, small collection): name, region, `status` (`focus` or `presence`), description | `presence` only when AUREX confirms it | — |
| **Leadership**, **Portfolio** collections (schemas) | Keep unpublished | Seeded demo records |
| **Forms + Submissions** (form-builder, auto-tagging, internal notes, CSV export) | Rename statuses (§15.4). Rename role `sales` → `inquiries`. | Ticket-size field, file upload at launch |
| Roles: admin, editor, inquiries | — | — |
| Media: webp conversion, focal point, sizes up to OG 1200 × 630 | — | Procedural placeholder art, the Mobi Hub video, the uninspected hero video |

Remove all Blue Harbor leftovers: package and DB names, `blueharbor.example` emails, the anchor fallback logo, the nautical 404, and Arabic locale types.

### 15.7 SEO

- Per-page title and meta description in every locale, falling back to Settings defaults. Title pattern: `{Page} — AUREX`. Home: `AUREX — Value in Motion`.
- Canonical URLs, `hreflang` alternates, `x-default`, `sitemap.xml` covering all locales, and `robots.txt` (disallow `/admin`, `/api`).
- Open Graph and Twitter `summary_large_image` with a black/gold 1200 × 630 default image.
- JSON-LD `Organization` using **confirmed fields only**: `name` ("AUREX"), `url`, and `logo` once supplied. Omit `address`, `telephone`, `foundingDate`, `founder`, `numberOfEmployees` and `sameAs` until they are supplied.
- The default meta description must use the positioning wording (§2) and the descriptor "connecting value across borders". It must not contain counts or presence claims.
- Keyword themes: international trading, holding and investment group; European-rooted; the sector names; the markets of focus. Keep "import export" as a secondary term only, to avoid the generic import-export register.
- Deferred and unpublished pages (Leadership, Portfolio) stay `noindex` and out of the sitemap.

### 15.8 Explicit exclusions

From the brief: blog, newsroom, IR portal, careers, WhatsApp, social feeds, live stock data.

Also excluded by this document:
- Statistics and counters of any kind.
- Partner or client logo strips.
- Office, HQ or presence maps.
- "Coming soon" or placeholder cards and sections.
- Social icons until real URLs exist.
- An investor ticket-size field.
- A custom sourcing request page, product catalogues and supply pages.
- German and Arabic locales.
- Named sub-brands or divisions.
- Any use of seeded demo content.

---

## 16. Confirmed facts

Only these statements may appear on the site as fact. Items marked *structural* are neutral decisions, consistent across sources and not contradicted by the brief. They are not claims about the business.

| # | Fact | Source |
|---|---|---|
| F1 | The brand name is **AUREX**. | brief |
| F2 | AUREX is positioned as a premium international trading, holding and investment group with a European-rooted, institutional, long-term outlook. | brief |
| F3 | AUREX must not feel like a startup, dropshipping, generic import-export, a small trading agency, a sales company, a commodity marketplace, cheap logistics, or a generic corporate template. | brief |
| F4 | Brand concept: Aurex = value / gold + exchange, expansion, movement across borders. | brief |
| F5 | Taglines explored: "Value in Motion", "European Standards. Global Reach.", "Trade Beyond Borders", "Global Trade. Real Value.", "Connecting Value Across Borders." The master and supporting choice in §4 is this document's recommendation and awaits AUREX approval. | brief |
| F6 | Palette: Matte Black `#111111`, Rich Gold `#C8A24A`, Champagne Gold `#D4AF37`, Ivory `#F8F6F0`. | brief (identical values in `gold/styles.css`) |
| F7 | Strategic areas discussed: International Trade, EXIM / Import & Export, Distribution, Logistics, Holdings, Investments, Capital. Operating status is not established. | brief |
| F8 | Verticals discussed: Food, Property / Real Estate, Medical / LARP, Electronic Components, Green Revolution / Sustainability. **None is established as active.** | brief |
| F9 | Markets discussed: European Union, Poland, UAE / Middle East, India, Africa. **No office, subsidiary or operation is confirmed in any of them.** | brief |
| F10 | Languages: English primary; Polish, Dutch, French. | brief; *structural*, matching `cms` `payload.config.ts` locales `en, pl, nl, fr` |
| F11 | Required functionality: contact form; partnership, investment and corporate inquiry; CMS-ready content; responsive; SEO; multilingual. | brief |
| F12 | Excluded: blog, newsroom, IR portal, careers, WhatsApp, social feeds, live stock data. | brief |
| F13 | *Structural:* the inquiry types are Partnership, Investment and Corporate. | brief; `seed` forms; `gold` inquiry types |
| F14 | *Structural:* the five verticals form the sector taxonomy. | brief; `gold` nav and sectors; `cms` `Sectors.ts` |
| F15 | *Structural:* the core page set is Home, About, Sectors, Contact. | `gold`, `seed`/`db`, `cms` README (consistent) |
| F16 | *Source fact:* no AUREX logo file, brand guidelines document or company-owned photography exists in the Drive. | `discovery` inventory |
| F17 | *Source fact:* no draft contains confirmed contact details, people, portfolio items, partners, figures, certifications or licences. | All reader groups |
| F18 | *Source fact:* the Drive drafts date from 2026-06-17 to 2026-06-21, before the Sept 2026 brief. | Drive metadata |

---

## 17. Draft claims found in Drive that MUST NOT be published as fact

| # | Claim | Verbatim | File | Why excluded |
|---|---|---|---|---|
| **Identity** | | | | |
| X1 | Brand name "Aurex Global" | `AUREX <span class="gold">GLOBAL</span>` / "Aurex Global © 2025" | `gold/index.html`, `gold/script.js` | The brief uses AUREX. This variant is unconfirmed. |
| X2 | Descriptor "Global Trading" | `<span class="logo-sub">Global Trading</span>` | `teal/script.js` | Unconfirmed, with a trading-agency feel |
| X3 | Merger origin | "Established as a merger of two longstanding companies" | `teal/about.html`, `teal/script.js` | Unsourced corporate history, likely from a template |
| X4 | Ownership | "A privately held investment and trading group." | `seed/run.ts`, `db` | Not stated in the brief |
| X5 | Name etymology | "Ex — Latin for “beyond”" | `gold/index.html`, `gold/script.js` | Contradicts the brief's "exchange", and the Latin is inaccurate |
| X6 | Named divisions / sub-brands | "Five divisions. One disciplined group." (Aurex Trading, Distribution, Beverages, Brands, Ventures) | `gold/index.html` | Subsidiaries not confirmed. Beverages and Brands are not in the brief. |
| X7 | Freight subsidiary | "Aurex operates Aurex Freight, our specialized logistics and freight service." | `teal/index.html`, `teal/about.html` | Subsidiary claim; implies operated freight |
| **Activity** | | | | |
| X8 | Verticals active | "Aurex sources and trades premium food and agricultural products…" | `gold/sectors.html` | Activity not established |
| X9 | Verticals active | "Five verticals where we invest, operate and trade." / "Business verticals Aurex invests in and operates." | `seed/run.ts`, `db`; `cms/Sectors.ts` | Activity not established |
| X10 | Existing green investments | "Aurex invests in green-revolution initiatives and sustainable ventures…" | `gold/sectors.html` | Implies existing investments |
| X11 | Joint ventures and holdings exist | "Investments, holdings, joint ventures, and strategic projects." / "A curated view of Aurex investments and holdings…" | `gold/portfolio.html` | No holdings or JVs confirmed |
| X12 | Paper trade line | "Aurex supplies premium paper and packaging products…" | `teal/script.js` | Not a brief vertical |
| X13 | LARP costuming trade | "Aurex sources and supplies high-quality LARP and costuming products…" | `teal/script.js` | Not established. LARP scope unclear (§7). |
| X14 | Supply and consulting services | "General Supplies Service", "Global Trade Advisory", "Technology Services" | `teal/services.html` | Not in the brief; agency or supply-shop feel |
| X15 | Operated freight and customs | "Freight Forwarding (Air, Sea, Land)", "Customs & Compliance Services" | `teal/script.js` | Implies operations and licensing |
| X16 | Owned production | "Owned and partnered food production facilities." | `seed/run.ts` | Invented |
| X17 | Manufacturing | "embedding environmental responsibility across manufacturing, supply chains, and innovation" | `teal/script.js` | AUREX is not established as a manufacturer |
| X18 | Owned businesses and decarbonisation | "We modernise and decarbonise the businesses we own." | `seed/run.ts` | Implies owned companies; greenwashing risk |
| X19 | Acquisition strategy | "Our roadmap focuses on selective acquisitions, geographic expansion…" | `seed/run.ts` | Invented strategy claim |
| X20 | Existing partnerships | "We cultivate enduring partnerships with premium manufacturers, distributors, and institutions across Europe, the Middle East, and Asia" | `gold/script.js` | Partnerships not confirmed; "Asia" not in the brief |
| X21 | Existing partners | "We partner with founders, families and institutions to grow businesses…" | `seed/run.ts` | Counterparties not confirmed. Rephrase as an invitation. |
| **Markets and presence** | | | | |
| X22 | HQ and presence | "European Union (HQ) · United Arab Emirates · India" + "Regional Presence" pills | `gold/contact.html` | Office claims not confirmed |
| X23 | EU HQ and operations | "Headquarters and core operations across the Netherlands, Poland and France." / "3 EU hubs" | `seed/run.ts`, `db` | Office claims not confirmed |
| X24 | Dubai HQ | "Our trading and investment gateway, based in Dubai." / "1 Regional HQ" | `seed/run.ts`, `db` | Office claim not confirmed |
| X25 | Amsterdam address | "Zuidas Business District\nAmsterdam, Netherlands" | `seed/run.ts`, `db` | Office claim not confirmed |
| X26 | Cairo office | "Offices in Cairo, serving clients worldwide." + "14 Mahmoud Ahmed El-Meligy, Al Matar, El Nozha, Cairo Governorate" | `teal/contact.html`, `teal/script.js` | Office claim not confirmed; possibly a third party's details |
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
| **Portfolio and partners** | | | | |
| X38 | Portfolio items | Baltic Food Distribution, Riverside Residences Warsaw, LARP MedTech Platform, Gulf Electronics Trading Hub, SolarBridge India, Rotterdam Cold Chain, Dubai Prime Offices, GreenLoop Recycling | `seed/run.ts`, `db` | Demo content |
| X39 | Client segments | "serving live-action role-play communities, theatrical productions, and cosplay markets worldwide" / "supports printing, packaging, and hospitality industries at scale" | `teal/script.js` | Clients not confirmed |
| X40 | Demo inquiries | "Meridian Capital", "Greenfield Energy … solar JV in India" | `seed/run.ts` | Demo data |
| **Compliance and quality** | | | | |
| X41 | Certification | "International quality certification" | `teal/script.js` | Invented; the brief forbids it |
| X42 | Certified resale | "Certified resale of industrial electronic equipment." | `seed/run.ts` | Invented certification |
| X43 | Sustainability claims | "Sustainably sourced fibre" / "Transparent, ethical, and low-carbon logistics that move goods responsibly worldwide." | `teal/script.js` | Not evidenced; greenwashing risk |
| X44 | QA and traceability systems | "Excellence at origin, verified and maintained across every supply chain." / "Clear, traceable global movement across supply chains." | `gold/about.html` | Implies verification systems |
| X45 | Compliance management | "We manage cold-chain handling, certification, and compliance" | `teal/script.js` | Implies operations and certification |
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
- [ ] Registration and tax numbers for the legal notice (e.g. KRS/NIP, KvK, trade licence, VAT)
- [ ] Ownership statement, if any should be made public
- [ ] Founding year, if it should be stated
- [ ] Trademark clearance for "AUREX" and "Value in Motion" in the EU, UAE and India (check before registering or printing)

**Brand**
- [ ] Logo files (SVG: primary, mono, for dark and light backgrounds) and favicon, or approval of the interim typographic wordmark
- [ ] Approval of the master and supporting lines (§4) and of the name story (§3)
- [ ] Native review of the PL, NL and FR taglines and copy
- [ ] Photography: owned or licensed imagery, and any image restrictions

**Business**
- [ ] Which strategic areas (International Trade, EXIM, Distribution, Logistics, Holdings, Investments, Capital) are active today, with a written statement for each
- [ ] Which verticals are active, planned or exploratory
- [ ] What "LARP" means in "Medical / LARP", and whether it is part of medical or a separate item
- [ ] Confirmation that Beverages, Brands, Paper, LARP costuming and General Supplies are out of scope
- [ ] Whether any subsidiaries, sub-brands or joint ventures exist, with names and approval to publish
- [ ] Logistics: coordinated with partners, or operated. Any licences held (customs, trade, financial)
- [ ] Any certifications or licences, with documents

**Markets**
- [ ] HQ or registered office country and city
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
- [ ] LinkedIn or other official profile URLs, if any exist
- [ ] Any response-time commitment

**Legal and compliance**
- [ ] Privacy notice content (data controller details, retention period)
- [ ] Legal review of the investment inquiry wording (financial-promotion rules in the EU, UAE and India)
- [ ] Analytics: yes or no, and which tool (determines cookie consent)

**Website operations**
- [ ] Launch locales: all four at launch, or EN first
- [ ] Translation provider or reviewer per locale
- [ ] Hosting and domain access
- [ ] Confirmation of the CMS (Payload) and who will edit content
- [ ] Confirmation of the content of `Video Project 7.mp4` (40 MB) before any use, and deletion of the Mobi Hub video from the media library

---

## 19. Reusable copy

These lines come from prior drafts and contain no factual claims. They may be used as written.

| Line | Source | Suggested use |
|---|---|---|
| "Value in Motion." | `gold` | Master line |
| "European Standards. Global Reach." | `gold` | Supporting line |
| "European-Rooted International Group" | `gold` (hero eyebrow) | Hero eyebrow |
| "Together, a singular idea — Aurex: Value in Motion." | `gold` | Payoff of the name section |
| "A name that reflects the disciplined creation, movement, and stewardship of value across international markets." | `gold` | Lead of the name section |
| "Value, excellence, trust, and enduring quality." | `gold` (Aurum description) | Name section, AUR |
| "Expansion, movement, and connection across borders." | `gold` (Ex description) | Name section, EX |
| "Built for decades, not transactions." | `gold` | Section heading (principles or partnerships) |
| "Aurex is not built to be the loudest company in the room. It is built to be the most trusted. Our approach prioritizes resilience over speed, reputation over volume, and long-term value over short-term gain." | `gold` | Why AUREX body. Pair the heading "Not the loudest. The most trusted." only with this body, so the superlative stays inside the "built to be" framing. |
| "Create sustainable value today while preserving trust for tomorrow." | `gold` | Principle quote |
| "Global trade, built on trust and structure." | `gold` | About heading |
| "A different standard of international commerce." | `gold` | Principles heading |
| "Begin a conversation with Aurex." | `gold` | Contact heading |
| "Five sectors. One disciplined approach." | `seed` / `db` | Sectors page heading |
| "Enduring value, responsibly created" | `seed` / `db` | About sub-heading |
| "We invest with patience and conviction, not on a fund clock." | `seed` / `db` | Holdings & Investments pillar only |
| "Whether you are an investor, founder or strategic partner, we would like to hear from you." | `seed` / `db` | Closing CTA text |
| "…lasting value with a lighter footprint." | `teal` | Sustainability sector line (fragment) |
| "Start a conversation" | `discovery` (`SectorView.tsx`) | CTA label |

### Usable with the edit shown

| Draft line | Source | Use instead | Why |
|---|---|---|---|
| "By combining European standards, disciplined execution, and global market expertise, Aurex creates enduring value that moves confidently across borders, industries, and generations." | `gold` | "Combining European standards with disciplined execution, AUREX is built to create enduring value that moves confidently across borders, industries and generations." | Removes the claimed "global market expertise" and the present-tense result |
| "Every relationship, every product, and every market we enter is evaluated through a single principle." | `gold` | "Every relationship and every opportunity is measured against a single principle." | Removes "every product / market we enter", which implies activity |
| "We work alongside management to build, not just to allocate." | `seed` | "We aim to build, not just to allocate." | Removes the implied portfolio companies |
| "We strengthen governance, support management and compound value across cycles and across borders." | `seed` | "Our aim: to strengthen governance and compound value across cycles and across borders." | Removes the implied existing holdings |
| "A disciplined investment group with an operator’s mindset" | `seed` / `db` | "A disciplined group with an operator’s mindset" | Restores the trading/holding balance |
| "We build data-driven processes that turn complexity into clarity across every trade lane." | `teal` | "Turning complexity into clarity across borders." | Removes the claimed processes and trade lanes |
| Values: "Gold-Standard Quality · Transparent Movement · Regulatory Excellence · Strategic Partnerships · Measured Growth" | `gold` | Titles: "Gold-Standard Quality · Transparent Movement · Regulatory Discipline · Long-Term Partnership · Measured Growth". Descriptions written as commitments ("We hold ourselves to…"). | The original descriptions imply verification and compliance status (X44) |
| Philosophy titles: "Long-term capital · Operator partnership · Disciplined governance · Sustainable growth" | `seed` / `db` | Usable as titles. Rewrite the descriptions as intentions. | The original descriptions reference owned businesses (X18) |
