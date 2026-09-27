# Deployment

The site is a standard Next.js 16 application. Every locale × page, the Open Graph images, the sitemap, robots.txt and the manifest are pre-rendered at build time. `/api/inquiry` runs as a server function.

- [Vercel (recommended)](#vercel-recommended)
- [Environment variables](#environment-variables)
- [Domain and canonical URL](#domain-and-canonical-url)
- [Inquiry delivery](#inquiry-delivery)
- [Rate limiting](#rate-limiting)
- [Media and caching](#media-and-caching)
- [Self-hosting](#self-hosting)
- [Pre-launch checklist](#pre-launch-checklist)

## Vercel (recommended)

1. **Import the repository** in Vercel (*Add New → Project*). The framework preset is detected as Next.js. Keep the defaults: install `npm install`, build `npm run build`, output managed by Next.js. Use Node.js 20.x or later.
2. **Add the environment variables** below for *Production*, and for *Preview* if previews should deliver inquiries.
3. **Deploy.** Every push to the production branch deploys to production, and every other branch or pull request gets a preview URL. Vercel serves preview deployments with `X-Robots-Tag: noindex`, and all canonical URLs point at `NEXT_PUBLIC_SITE_URL`, so previews do not compete with the live site in search.
4. **Attach the domain** (see [Domain and canonical URL](#domain-and-canonical-url)) and redeploy.

`NEXT_PUBLIC_*` values are inlined at build time. After changing one, trigger a new deployment.

## Environment variables

All variables are listed with comments in [`.env.example`](../.env.example). None is needed for a local build.

| Variable | Scope | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production (recommended in Preview too) | Canonical origin, e.g. `https://www.example.com`, with no trailing slash. Used for canonical URLs, `hreflang`, `sitemap.xml`, `robots.txt`, Open Graph URLs and JSON-LD. On Vercel, if it is unset, `VERCEL_PROJECT_PRODUCTION_URL` is used, which may be the `*.vercel.app` domain. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Production | Public inquiries mailbox. Leave it empty until AUREX confirms the address; the contact page then shows its neutral "pending" text. |
| `RESEND_API_KEY` | Production | Enables inquiry email. |
| `INQUIRY_TO_EMAIL` | Production | Recipients, comma-separated. |
| `INQUIRY_FROM_EMAIL` | Production | Sender on a Resend-verified domain, e.g. `AUREX Website <website@example.com>`. |
| `INQUIRY_WEBHOOK_URL` | Optional | CRM or automation endpoint (see [Webhook](#webhook)). |
| `INQUIRY_WEBHOOK_SECRET` | Optional | Shared secret and HMAC key for the webhook. |

Configure at least one delivery channel (email or webhook) in production. Without one, `/api/inquiry` answers `503` and the form shows its "unavailable" message, so an inquiry is never accepted and then lost.

## Domain and canonical URL

1. In *Project → Settings → Domains*, add the apex domain and `www`. Choose one as primary and let Vercel redirect the other to it (for example, `example.com` → `www.example.com`).
2. Create the DNS records Vercel shows (an `A` record for the apex and a `CNAME` for `www`, or delegate nameservers to Vercel). HTTPS certificates are issued automatically.
3. Set `NEXT_PUBLIC_SITE_URL` to the **primary** origin exactly (scheme + host, no trailing slash) and redeploy.
4. Check in production:
   - The page source of `/en` shows `<link rel="canonical" href="https://<primary>/en">` and `hreflang` alternates for `en`, `pl`, `nl`, `fr` and `x-default`.
   - `/robots.txt` ends with `Sitemap: https://<primary>/sitemap.xml`.
   - `/sitemap.xml` lists 9 routes × 4 locales with alternates.
5. Submit the sitemap in Google Search Console and Bing Webmaster Tools.

The proxy (`src/proxy.ts`) redirects `/` and any unprefixed path to the visitor's locale: the language-switcher cookie wins, then `Accept-Language`, then English.

## Inquiry delivery

`POST /api/inquiry` validates the submission and then runs every configured channel in parallel (`src/lib/inquiry/deliver.ts`). The inquiry counts as received if at least one channel succeeds; channel failures are logged without secrets or message bodies.

| Channels configured | Outcome |
| --- | --- |
| None (production) | `503`: form shows the "unavailable" message |
| None (development) | Payload printed to the server console, `200` |
| One or both, at least one succeeds | `200` |
| All fail | `502`: form shows the error message |

### Email via Resend

1. Create a Resend account and **add a sending domain**, ideally a subdomain such as `mail.example.com` so the main domain's mail reputation stays separate.
2. Add the DNS records Resend shows: SPF (`TXT`), DKIM (`TXT`/`CNAME`) and the `MX` record for the bounce subdomain. Add a DMARC record (`_dmarc`, starting with `p=none` and a reporting address) if the domain has none. Wait until Resend marks the domain **Verified**.
3. Create an API key with **Sending access** restricted to that domain, and store it as `RESEND_API_KEY`.
4. Set `INQUIRY_FROM_EMAIL` to an address on the verified domain (the display name is optional) and `INQUIRY_TO_EMAIL` to the mailbox(es) that handle inquiries.
5. Submit a test inquiry from a preview deployment and confirm it in the Resend dashboard (*Emails*) and in the inbox.

Each email carries the inquiry type in its subject, all fields, the visitor's locale and a reference id. `Reply-To` is set to the visitor's address so staff can answer directly. Staff-facing labels are in English whatever language the visitor used.

### Webhook

Setting `INQUIRY_WEBHOOK_URL` sends every inquiry as a JSON `POST` (10-second timeout; any non-2xx response counts as a failure):

```json
{
  "event": "inquiry.created",
  "id": "8f7c…",
  "receivedAt": "2026-01-01T12:00:00.000Z",
  "inquiry": { "type": "partnership", "name": "…", "organisation": "…", "role": null, "email": "…", "country": "…", "message": "…", "locale": "en", "consent": true }
}
```

Headers: `X-Inquiry-Id`. With `INQUIRY_WEBHOOK_SECRET` set, the request also carries `X-Inquiry-Secret` (for receivers that can only compare a header) and `X-Inquiry-Signature: sha256=<hex HMAC-SHA256 of the raw body>`. Verify the signature where possible:

```ts
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, header: string | null, secret: string) {
  const expected = `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  return !!header && header.length === expected.length && timingSafeEqual(Buffer.from(header), Buffer.from(expected));
}
```

Use the `id` to de-duplicate. Email sends use it as the Resend idempotency key.

## Rate limiting

`/api/inquiry` allows 6 requests per minute per IP, using a sliding window **held in memory** (`src/lib/inquiry/rate-limit.ts`). That is exact on a single long-lived server. On Vercel, requests are spread across many function instances, and each keeps its own window, so the effective limit is looser. The honeypot, timing check and validation still apply.

For a strict limit in production, pick one:

- **Upstash Redis** (available from the Vercel Marketplace) with `@upstash/ratelimit`, using `Ratelimit.slidingWindow(6, "60 s")` keyed by IP. The store is asynchronous, so `limiter.check(...)` in the route becomes `await limiter.check(...)`; keep the same return shape (`{ ok }` / `{ ok: false, retryAfter }`).
- **Vercel Firewall** rate-limit rule on `POST /api/inquiry`. This needs no code change.

`clientIp()` reads `X-Forwarded-For`. Vercel sets that header itself. Behind any other proxy, make sure the proxy overwrites rather than appends client-supplied values.

## Media and caching

| Path | Cache-Control (production) | Notes |
| --- | --- | --- |
| `/_next/static/*` | `public, max-age=31536000, immutable` | Set by Next.js; file names are content-hashed |
| `/media/*`, `/data/*` | `public, max-age=31536000, immutable` | Set in `next.config.ts` (production only) |
| `/_next/image` | Optimizer cache | AVIF/WebP, generated on first request per size |
| Pages, OG images, sitemap, robots, manifest | Pre-rendered; refreshed on every deploy | |

**Never overwrite a file in `public/media` or `public/data` in place.** Browsers and the CDN may serve the old copy for up to a year. Publish changed media under a new name and update the reference:

- Hero video and poster → `src/components/home/hero.tsx`
- Frame sequences (use a new folder, e.g. `sequence/d2/`) → `SEQUENCES` in `src/components/home/value-in-motion.tsx`
- Stills → `image` paths in `src/content/facts.ts` and the page components
- Globe data (e.g. `globe.v2.json`) → the loader in `src/components/three/globe-scene.tsx`

`scripts/process-media.sh <source.mp4> <out-dir>` rebuilds the whole media set reproducibly (ffmpeg with libx264, libvpx-vp9 and libwebp). `node scripts/build-globe-data.mjs` rebuilds the globe data. Development uses Next.js's default caching for these folders, so regenerated files appear immediately.

Current budget: about 4.5 MB of hero video (only one rendition is downloaded, chosen by viewport and codec support), 5.9 MB of desktop or 2.2 MB of mobile frames (loaded progressively when the section approaches), and about 1.2 MB of stills.

## Self-hosting

```bash
npm ci
npm run build
NODE_ENV=production PORT=3000 npm run start
```

- Run it behind a reverse proxy that terminates TLS and **overwrites** `X-Forwarded-For`.
- Set the same environment variables. `NEXT_PUBLIC_*` must be present at **build** time.
- A single instance makes the in-memory rate limit exact. With several instances, use a shared store (see above).
- For containers, add `output: "standalone"` to `next.config.ts` and copy `.next/standalone`, `.next/static` and `public/` into the image.
- Serve `public/media` from a CDN if bandwidth matters. The immutable headers above apply unchanged.

## Pre-launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the primary domain; canonical, `hreflang`, sitemap and robots verified
- [ ] At least one inquiry channel configured; a test inquiry received by email and/or webhook
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` set once AUREX confirms the mailbox (or deliberately left empty)
- [ ] Privacy notice completed with the data controller's details (see `docs/SOURCE_OF_TRUTH.md` §18)
- [ ] Social preview checked (for example LinkedIn Post Inspector) for `/en` and one other locale
- [ ] Security headers present (`curl -I https://<domain>/en`): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; no `X-Powered-By`
- [ ] `/en/does-not-exist` returns the branded 404 with status `404`
- [ ] Lighthouse and axe pass on the home page and one inner page, on mobile and desktop
- [ ] Rate-limit strategy chosen (in-memory, Upstash or Vercel Firewall)
- [ ] Search Console and Bing Webmaster Tools verified; sitemap submitted
