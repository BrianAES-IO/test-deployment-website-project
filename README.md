# aesurus.io

Marketing site for AESURUS Limited — a Jamaican data-protection, security, and cloud advisory
firm. Primary job: convert a visitor concerned about the Data Protection Act into a booked
15-minute exposure check. Secondary job: `/services` presents the full managed-services practice
(compliance, DPO-as-a-service, managed security, cloud, security assessments) credibly to
partners and larger prospects evaluating AESURUS as an MSP.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion (loaded via
`LazyMotion`/`domAnimation` to keep bundle size down). Fully statically generated except the
`/api/register` stub used by the Directors' Briefing form.

## Site structure

- `/` — home, compliance-first funnel
- `/services` — catalog overview of all five service lines
- `/services/dpa-compliance` (COMPLY), `/services/data-protection-officer` (GUARD),
  `/services/managed-security` (SHIELD MSP), `/services/cloud-services` (Cloud Enclave),
  `/services/security-assessments` — the five service pages
- `/insights`, `/insights/[slug]` — MDX articles
- `/briefing` — Directors' Liability Briefing event page + registration
- `/about`, `/book`, `/privacy`, `/terms`

The header's Services nav item lists all five service pages (with one-line descriptors) in a
dropdown on desktop and inline in the full-screen sheet on mobile — both driven by
`serviceNavItems` in `config/site.ts`, itself derived from `config/offers.ts`.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values before launch:

| Variable | Purpose | Fallback if unset |
| --- | --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | Cal.com or Calendly embed URL for `/book` | Renders a mailto + phone + WhatsApp fallback instead of an embed |
| `NEXT_PUBLIC_CONTACT_PHONE` | Displayed phone number | Placeholder number (replace before launch) |
| `NEXT_PUBLIC_CONTACT_WHATSAPP` | WhatsApp number, digits only with country code | Placeholder number (replace before launch) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Displayed contact email | Placeholder address (replace before launch) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used in metadata/sitemap/JSON-LD | `https://aesurus.io` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible Analytics if set | Analytics disabled |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Set to `true` to enable Vercel Analytics | Analytics disabled |

None of these are required to run the site locally — every one has a safe fallback.

## Adding an Insights article

Articles live in `content/insights/` as `.mdx` files with frontmatter:

```mdx
---
title: "Your article title"
description: "One sentence for the index page and SEO description."
date: "2026-06-01"
---

Article body in Markdown/MDX goes here.
```

The filename (minus `.mdx`) becomes the URL slug — e.g. `content/insights/my-article.mdx`
becomes `/insights/my-article`. No other registration is needed: the index page and
`generateStaticParams` both read the directory automatically. Article schema (JSON-LD) and the
byline/date/disclaimer block are generated automatically from the frontmatter.

## Changing prices

**Every price on the site is read from one file: `config/offers.ts`.** Never hardcode a price
directly in a page or component — change it once there and it updates on the home page offer
ladder, the home page's full-practice list, `/services`, every individual service page, the
header's Services dropdown/sheet, and `/terms`.

The `services` array holds all five service lines (three of which — COMPLY, GUARD, SHIELD MSP —
also appear in the home page's 3-card ladder via the `inLadder` flag). `complyOffer`, `guardOffer`,
`shieldOffer`, `cloudOffer`, and `assessmentOffer` hold the fuller pricing/terms detail each
service page renders.

## Motion

`lib/motion.ts` defines the one easing curve (`EASE`) used everywhere. `components/motion/`
holds the three primitives: `MotionProvider` (wraps the app in `LazyMotion`), `Reveal` (scroll-
triggered fade + rise, used per-section with an optional `index` for stagger), and
`HeroReveal`/`HeroItem` (the one-time staggered hero entrance on the home page). All three respect
`prefers-reduced-motion` via Framer Motion's `useReducedMotion`. Hover micro-interactions (link
underlines, arrow shifts, button color transitions) are plain CSS using the shared `ease-brand`
Tailwind timing function and the `.link-underline` utility class in `app/globals.css` — no JS
needed for those.

## Changing contact details / booking link

Edit `config/site.ts`, or better, set the corresponding environment variables listed above —
`config/site.ts` reads from `process.env` with placeholder fallbacks.

## Phase B: assessments + admin portal

The two free tools (`/assessment/dpa`, a 12-question DPA Exposure Score, and `/assessment/security`,
a 10-question Cyber Readiness Check) and the `/admin` portal are gated by `siteConfig.assessmentsLive`
(`config/site.ts`), which is simply `Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)`. With no
Firebase env vars set, both assessment routes render a graceful "launching this month" fallback and
`/admin` isn't reachable; the rest of the site is entirely unaffected. This is intentional: the site
must build and deploy on its own, per the original build order, and does.

**Setup, once you have a Firebase project:**

1. Firebase console → Authentication → enable the Email/Password sign-in method.
2. Firebase console → Firestore Database → create a database (any mode; rules lock it down
   regardless, see below).
3. Paste the contents of `firestore.rules` (repo root) into the console's Rules tab, or deploy it
   with the Firebase CLI. It denies all client reads/writes: every request goes through this app's
   own API routes and server components using the Admin SDK, never directly from the browser.
4. Project Settings → General → your web app: copy the config into the 4 `NEXT_PUBLIC_FIREBASE_*`
   vars in `.env.local`.
5. Project Settings → Service Accounts → Generate new private key: map its 3 fields into the 3
   `FIREBASE_ADMIN_*` vars in `.env.local` (and later into your Vercel project's env vars).
6. Create the one admin login: `node scripts/create-admin-user.mjs you@aesurus.io <password>`.
   There's no public sign-up page by design; this script (or re-running it with a new password) is
   the only way to provision or reset that account.

**How it fits together:** `config/assessments.ts` is the single source of truth for both question
sets, their point values, and the score bands, mirroring how `config/offers.ts` centralizes pricing.
`app/api/assessment/submit/route.ts` recomputes the score from the raw answers server-side (a
tampered client can't submit a fake result) and writes one document per submission to the
`assessmentSubmissions` Firestore collection. `/admin` is entirely server-rendered against the Admin
SDK, session-gated by an HttpOnly cookie (`app/admin/(protected)/layout.tsx`,
`lib/admin-session.ts`), and supports viewing, filtering, marking as contacted, adding notes,
CSV export, and deleting a submission.

## Known TODOs before launch

- `config/site.ts` — replace placeholder phone, WhatsApp number, and email.
- `NEXT_PUBLIC_BOOKING_URL` — connect a real Cal.com/Calendly link.
- `app/api/register/route.ts` — currently only logs briefing registrations server-side. Wire it
  to a real email (Resend/SendGrid) or CRM destination before relying on it.
- `app/api/assessment/submit/route.ts` — currently only stores the submission in Firestore and logs
  it server-side. Before launch, also email the visitor their result directly; follow-up is manual
  via `/admin` until then.
- `app/briefing/page.tsx` — replace the `[TODO: law-firm partner name]` placeholder.
- `app/about/page.tsx` — replace the founder bio placeholder with Brian's real background.
- Once real client engagements exist, uncomment and fill in the commented-out testimonials
  section in `app/about/page.tsx` — do not fabricate testimonials before then.

## Deploying

The project is a standard Next.js app and deploys to Vercel with zero configuration:

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repository in Vercel.
3. Set the environment variables from the table above in the Vercel project settings. Add the 7
   Firebase variables too (see "Phase B" above) once you're ready for the assessments/admin portal
   to go live; leave them unset otherwise.
4. Deploy. Static pages are generated at build time; `/api/register`, `/api/assessment/submit`, and
   everything under `/api/admin/*` run as serverless functions. `/admin` itself renders dynamically
   per-request (it needs a live session check), never as a static page.

No database beyond Firestore (only needed for Phase B), no external build step, and no additional
infrastructure required.
