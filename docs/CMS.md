# Moving content to a headless CMS

Content currently ships as typed TypeScript modules. That keeps every locale complete, because a missing translation is a type error, and it is enough for launch. When AUREX needs editors to change copy or publish confirmed facts without a deploy, move the content to a headless CMS. This document describes the seam, a recommended Payload CMS 3 mapping, and how to keep the **confirmed facts only** rule enforceable once non-developers can edit.

## 1. The seam: `ContentSource`

All copy reaches components through one function:

```ts
// src/content/repository.ts
export interface ContentSource {
  getSiteContent(locale: Locale): Promise<SiteContent>;
}

const source: ContentSource = localSource; // ← swap for a CMS adapter

export function getContent(locale: Locale) {
  return source.getSiteContent(locale);
}
```

- `SiteContent` (`src/content/types.ts`) is the contract. Its top-level keys already follow CMS lines: `meta`, `nav`, `common` and `footer` are settings; `home`, `about`, `businesses` and the other page keys are page globals; `divisions`, `sectors`, `markets` and `partnerModels` are collections keyed by id.
- Pages call `loadPage(params)` (`src/lib/page.ts`) → `getContent(locale)`. No component imports a locale module directly.
- **Facts are the second seam.** `src/content/facts.ts` holds the locale-independent structure: ids and order of divisions, sectors, markets and partner models; globe coordinates; corridors; `company`; `leaders`; `holdings`; `offices`. These files import it directly today:
  `app/[locale]/{about,businesses,contact}/page.tsx`, `components/home/{global-reach,home-contact,partnerships,sectors}.tsx`, `components/sections/businesses/sector-grid.tsx`, `components/sections/leadership/leader-profiles.tsx`, `components/sections/partnerships/model-cards.tsx`, `components/sections/portfolio/{holdings-register,sector-columns}.tsx`, `components/sections/presence/office-register.tsx`, `components/seo/json-ld.tsx`.
  When facts move to the CMS, add `getFacts(): Promise<Facts>` to `ContentSource` (with `Facts` typed from the current exports), load it in `loadPage`, and pass it down in place of the direct imports.

## 2. Recommended target: Payload CMS 3

The client has already prototyped Payload 3 with Next.js and localization for `en`/`pl`/`nl`/`fr` (see `docs/SOURCE_OF_TRUTH.md` §15.6). Payload fits this build:

- It is TypeScript-first and generates types, so the adapter can be checked against `SiteContent`.
- It can run inside this Next.js app (`/admin`, Local API, no network hop) or as a separate service (REST/GraphQL).
- It has field-level localization, drafts and versions, live preview, access control per field and per operation, and hooks for validation and cache revalidation.

> Before installing, check which Next.js majors the current Payload release supports. If it does not yet support Next 16, run Payload as its own app and have the adapter call its REST API. The mapping below stays the same.

### Localization

```ts
localization: {
  locales: ["en", "pl", "nl", "fr"],
  defaultLocale: "en",
  fallback: false, // a missing translation must fail validation, not silently show English
},
```

Mark every copy field `localized: true`. Ids, slugs, coordinates, ordering, status and URLs stay non-localized. Because fallback is off, the adapter validates each locale (see §4) so a gap blocks publishing instead of rendering `undefined`.

### Globals

| Global | Holds (`SiteContent` path) | Notes |
| --- | --- | --- |
| **Settings** | `meta` (siteName, tagline, signature, description, per-route `pages` SEO), `nav`, `common`, `footer`, `notFound`, `inquiry` (form copy and validation messages) | Organise in tabs: *Brand & SEO*, *Navigation*, *Interface*, *Inquiry form*. Add a *Company* tab for the confirmed company facts (`legalName`, `registeredOffice`, `registration`, `publicEmail`), each wrapped in the `confirmation` group from §3. Keep the prototype's SEO defaults, including `titleSuffix` " — AUREX". |
| **Home** | `home` (hero, who, motion chapters, reach, sectors, capital, why, partnerships, leadership, contact) | Groups mirror the section keys. `accent` arrays become localized `text` fields with `hasMany: true`. `motion.chapters[].division` is a relationship to **Divisions**. |
| **About**, **Businesses**, **Portfolio**, **Presence**, **Leadership**, **Partnerships**, **Contact**, **Privacy** | One global per inner page, same shape as `SiteContent[page]` | Page globals keep the 1:1 mapping trivial. If AUREX later wants free-form pages, move these to a block-based `Pages` collection. |

### Collections

Every collection has `order` (number, used for sorting), and every fact-bearing collection has the `confirmation` group (§3).

| Collection | Fields | Maps to |
| --- | --- | --- |
| **Divisions** | `key` (select: trade, logistics, distribution, holdings; unique), `mode` (select: sea, air, land, connected), `image` (upload), `name`, `short`, `summary`, `scope[]` (localized) | `facts.divisions` + `content.divisions` |
| **Sectors** | `key` (select: food, property, medical, electronics, sustainability, larp), `status` (select: `strategic` default, `active`), `name`, `summary`, `focus[]` (localized), `image` (optional upload) | `facts.sectors` + `content.sectors` |
| **Markets** | `key` (select: eu, pl, ae, in, af), `status` (select: `focus` default, `presence`), `lat`, `lng`, `name`, `role`, `detail` (localized), `corridors` (relationship → Markets, hasMany) | `facts.markets`, `facts.corridors`, `content.markets` |
| **PartnerModels** | `key` (select: suppliers, distributors, corporate, capital), `name`, `summary`, `examples[]` (localized) | `facts.partnerModels` + `content.partnerModels` |
| **Leaders** | `name`, `role` (localized), `bio` (localized), `portrait` (upload with required `alt`), `consentOnFile` (checkbox) | `facts.leaders` |
| **Holdings** | `name`, `sector` (relationship → Sectors), `summary` (localized), `since` (text, optional), `url` (optional) | `facts.holdings` |
| **Offices** | `label` (localized), `city`, `country`, `address` (optional) | `facts.offices` |
| **Inquiries** | `type`, `name`, `organisation`, `role`, `email`, `country`, `message`, `locale`, `consent`, `receivedAt`, `status` (new / in review / answered / archived), `internalNotes`, `assignee` | Written by `/api/inquiry` |

Notes:

- **Keys, not free ids.** Select-typed `key` fields keep the CMS in step with the `DivisionId`, `SectorId`, `MarketId` and `PartnerModelId` unions. Adding a sector remains a code change (a type, an icon, a layout slot), which is intended.
- **Inquiries** are write-only from the site. `create` is allowed only through the Local API from the server (or a server token), and `read` is limited to the `admin` and `inquiries` roles. Add a third adapter in `src/lib/inquiry/deliver.ts` that creates the document, next to the email and webhook adapters, so a CMS outage never loses an inquiry that email or the webhook delivered.
- **Roles:** `admin` (can confirm facts, manage users), `editor` (copy and drafts), `inquiries` (reads and triages inquiries). These match the prototype.
- **Media:** WebP conversion, a focal point and an OG size (1200×630) on upload. `alt` is required and localized. Video and frame sequences stay in `public/media` (built by `scripts/process-media.sh`).
- **Leave out:** the prototype's Blue Harbor template leftovers, stats and counter blocks, logo strips, and any seed data. Collections start empty (see §3).

## 3. Keeping "confirmed facts only" enforceable

In code the rule is structural: `facts.ts` is reviewed in pull requests, and empty lists render empty-state copy. In a CMS it has to be enforced by the schema.

1. **A `confirmation` group on every fact-bearing document.** This covers Divisions, Sectors, Markets, Leaders, Holdings, Offices and the Company tab of Settings.

   ```ts
   {
     name: "confirmation",
     type: "group",
     access: { update: ({ req }) => req.user?.role === "admin" },
     fields: [
       { name: "published", type: "checkbox", defaultValue: false },
       { name: "source", type: "textarea", admin: { description: "Who confirmed this, when, and the reference (email, document, meeting note)." } },
       { name: "confirmedBy", type: "relationship", relationTo: "users" },
       { name: "confirmedAt", type: "date" },
     ],
   }
   ```

2. **A validation hook.** `beforeValidate` rejects `published: true` without a non-empty `source`, and stamps `confirmedBy` and `confirmedAt`.
3. **The public read path filters.** Public `read` access, and every query in the adapter, requires `confirmation.published = true` and the document's `_status = "published"` (Payload drafts). An unconfirmed leader or office is therefore not merely hidden; the site never receives it.
4. **Status fields only upgrade with evidence.** `Sectors.status = active` and `Markets.status = presence` can only be set by `admin` and require `source`. The UI already renders `strategic` and `focus` as areas of focus, not operations.
5. **Only admins publish facts.** Editors can draft copy and fact candidates; only `admin` can set `published`.
6. **No placeholders.** No seed script creates people, offices, holdings, figures or contact details. An empty collection is the correct state, and the locale's empty-state copy (`portfolio.holdings.empty`, `presence.offices.empty`, `leadership.profiles.empty`) renders.
7. **An audit trail.** Enable versions on these collections, so every change to a fact is attributable.

## 4. Adapter sketch

```ts
// src/content/payload-source.ts
import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import type { ContentSource } from "./repository";
import { toSiteContent } from "./payload-map"; // maps CMS documents → SiteContent

const confirmed = { "confirmation.published": { equals: true } } as const;

export const payloadSource: ContentSource = {
  async getSiteContent(locale) {
    const payload = await getPayload({ config });
    const global = (slug: string) => payload.findGlobal({ slug, locale, depth: 1, draft: false });
    const list = (collection: string) =>
      payload.find({ collection, locale, where: confirmed, sort: "order", limit: 100, depth: 1, draft: false });

    const [settings, home, about, businesses, portfolio, presence, leadership, partnerships, contact, privacy, divisions, sectors, markets, partnerModels] =
      await Promise.all([
        global("settings"), global("home"), global("about"), global("businesses"), global("portfolio"),
        global("presence"), global("leadership"), global("partnerships"), global("contact"), global("privacy"),
        list("divisions"), list("sectors"), list("markets"), list("partner-models"),
      ]);

    // toSiteContent must throw on any missing field, so an incomplete locale fails the build
    // (or the revalidation) instead of rendering undefined.
    return toSiteContent({ settings, home, about, businesses, portfolio, presence, leadership, partnerships, contact, privacy, divisions, sectors, markets, partnerModels });
  },
};
```

Then in `src/content/repository.ts`:

```ts
const source: ContentSource = process.env.CONTENT_SOURCE === "payload" ? payloadSource : localSource;
```

Keeping the local modules as a fallback lets the migration ship behind a flag. It also lets tests and previews run without a database.

## 5. Publishing and cache revalidation

Every locale × page is pre-rendered at build time (`generateStaticParams` in `app/[locale]/layout.tsx`). After a CMS change, invalidate the rendered pages:

- **Payload in the same app:** an `afterChange` hook on each global and collection calls `revalidatePath("/[locale]", "layout")`. That re-renders every page of every locale on its next request, which is cheap at this site's size.
- **Payload as a separate service:** its hook POSTs to a small route handler in this app (for example `POST /api/revalidate`), authenticated with a shared secret, which calls the same `revalidatePath`.

Changes to `Inquiries` do not trigger revalidation.

## 6. Migration checklist

1. Add Payload with a Postgres adapter (the prototype's SQLite file is not suitable for serverless hosting), plus the collections and globals above.
2. Write an import script that reads `src/content/locales/*.ts` and `src/content/facts.ts` and writes through the Local API: English first, then each locale with `locale: "pl" | "nl" | "fr"`. Facts already in `facts.ts` are confirmed by definition. Import them with `published: true` and `source: "Imported from facts.ts at <commit>"`.
3. Implement `toSiteContent` and `payloadSource`; compare their output with `localSource` for every locale (a deep-equal test).
4. Add `getFacts()` and replace the direct `facts.ts` imports listed in §1.
5. Add the Inquiries adapter and the revalidation hooks.
6. Switch `CONTENT_SOURCE=payload` in a preview deployment, have AUREX review it, then switch production.
