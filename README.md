# Cheer d’Kids website

The official website for Cheer d’Kids, an NGO giving children in Southwest Nigeria hope, joy and self-belief.

- Requirements and brand guideline: [docs/PRD.md](docs/PRD.md)
- Working notes and decisions: [CLAUDE_CONTEXT.md](CLAUDE_CONTEXT.md)

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, Sanity (content), Supabase (form submissions), Resend (email), Paystack (card donations), Vercel (hosting).

---

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
```

The site runs with **no environment variables at all**. Without them:

- Content comes from the seed file `lib/content/seed.ts` (copy from the PRD, labelled placeholder images).
- Forms validate and show a success message, but submissions are only logged to the terminal (development only). In production, forms show an error until Supabase is configured, so nothing is silently lost.
- The Paystack button shows "coming soon" and the bank block asks donors to email.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Lint, typecheck and build in one go |

---

## Environment variables

Set these in `.env.local` for development and in Vercel (Project Settings > Environment Variables) for production. See `.env.example`.

| Variable | Where it is used | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OpenGraph | e.g. `https://your-domain.org` once the domain exists |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS | Usually `production` |
| `SANITY_API_READ_TOKEN` | CMS | Only if the dataset is private |
| `SANITY_REVALIDATE_SECRET` | `/api/revalidate` | Any long random string; also used in the Sanity webhook |
| `SUPABASE_URL` | Form storage | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Form storage | **Server only. Never prefix with NEXT_PUBLIC.** |
| `RESEND_API_KEY` | Email notifications | |
| `RESEND_FROM` | Email notifications | Sender on a domain verified in Resend, e.g. `Cheer d’Kids <forms@yourdomain.org>` |
| `FORM_NOTIFY_TO` | Email notifications | Optional. Defaults to the official email in `lib/site.ts` |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Donate button | `pk_live_...` (or `pk_test_...` while testing) |
| `PAYSTACK_SECRET_KEY` | `/api/paystack/verify` | **Server only.** Confirms payments |
| `NEXT_PUBLIC_GA_ID` | Analytics | GA4 measurement ID. Leave empty to disable |

---

## Organisation details and placeholders

All organisation details live in **`lib/site.ts`**: name, mission, contacts, socials, donation address, bank and payment details.

Unknown values are set to `TODO`. The site never shows `TODO` to visitors: each one has a friendly fallback (for example "Our bank details are being finalised. Email us..."). To fill one in, replace `TODO` with the real value and redeploy.

Still to be confirmed (from PRD section 35):

- RC number (`registration.rcNumber`)
- Official phone (`contact.phone`)
- Office / correspondence address (`contact.officeAddress`)
- Bank account (`payments.bank`) and Cleva details (`payments.cleva`)
- Paystack keys (environment variables)
- Domain (`NEXT_PUBLIC_SITE_URL`)
- Sponsors and partners (add in the CMS)

The site name is also in `lib/site.ts` (`SITE.name`) because the official name is still being confirmed.

### Logo

The logo is loaded only through `components/Logo.tsx`. The supplied PNG (`public/brand/logo.png`) has a solid black background, so a transparent copy (`public/brand/logo-transparent.png`) is used on light backgrounds and the original on the black footer. When the final SVG arrives, add it to `public/brand/` and change `SOURCES` in `components/Logo.tsx`. Also regenerate `app/icon.png` and `app/apple-icon.png`.

---

## Setting up the services

### 1. Supabase (form submissions)

1. Create a project at supabase.com (choose a region close to Nigeria, e.g. EU West).
2. Open SQL Editor and run `supabase/migrations/0001_form_submissions.sql`.
3. Copy the Project URL and the `service_role` key into `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

The tables have Row Level Security on with no public policies, so the public API key cannot read or write them. Only the website server (with the service role key) can insert, and only people you invite to the Supabase project can read submissions. Invite as few people as possible. Each table has a `status` column the team can update while working through applications.

Tables: `volunteer_applications`, `school_outreach_enquiries`, `partner_enquiries`, `item_donation_enquiries`.

### 2. Resend (email notifications)

1. Create an account at resend.com and verify the organisation's domain (once acquired).
2. Create an API key and set `RESEND_API_KEY` and `RESEND_FROM`.

Every submission emails the team. Volunteer applicants also get an acknowledgement explaining the next steps (review, screening test by email, training).

### 3. Sanity (content)

1. Create a project at sanity.io/manage (free plan is fine). Note the project ID.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. In the Sanity project, under API > CORS origins, add `http://localhost:3000` and the live domain (allow credentials).
4. Open `/studio` on the site and sign in.
5. Optional: under API > Webhooks, add a webhook to `https://<domain>/api/revalidate` (POST, with header `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`) so pages update straight after publishing. Without it, pages refresh within 10 minutes.

Once Sanity is connected, the site reads from Sanity instead of the seed file. Programmes fall back to the seed copy until you add them in the CMS.

### 4. Paystack (donations)

1. Create a Paystack business account and complete verification.
2. Set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` (start with test keys).

The Paystack script loads only when a donor presses the donate button, to keep the page light.

### 5. Google Analytics

Set `NEXT_PUBLIC_GA_ID`. Events tracked:

| Event | When |
| --- | --- |
| `volunteer_application_submitted` | Volunteer form sent |
| `school_enquiry_submitted` | School outreach form sent |
| `partner_enquiry_submitted` | Partner form sent |
| `item_donation_enquiry_submitted` | Item donation form sent |
| `donate_start` / `donate_complete` | Paystack opened / payment succeeded |
| `bank_details_copied` | Account number copied |
| `cta_click` | Key buttons (label in the `label` parameter) |
| `social_click` | Instagram or LinkedIn link |

### 6. Deploy to Vercel

Import the repository in Vercel, add the environment variables, and deploy. No other configuration is needed.

---

## Adding content (for the website administrator)

Go to `/studio` and sign in.

| To add... | Use | Shows on |
| --- | --- | --- |
| An outreach story | **Projects** | /impact/projects |
| Photos | **Gallery** | /impact/gallery |
| A video | **Videos** (YouTube link preferred) | /impact/videos and the project page |
| A quote | **Testimonials** | /impact/testimonials and the homepage |
| News or an announcement | **Stories and news** | /stories |
| A new programme or skill | **Programmes** (add skills under Skill Acquisition) | /programmes |
| A sponsor or partner | **Sponsors and partners** | /partners and the homepage |

### Safeguarding rules built into the CMS

These are enforced in code, not just policy:

- **Projects, gallery photos, videos, testimonials and stories** have an **Approved for publication** box. It is **off by default**. Nothing appears on the website until it is ticked, even if the document is published in Sanity.
- **Testimonials and videos** also have **Consent confirmed**. You cannot approve them until consent is confirmed.
- **Every image** has **Shows identifiable children** and **Media consent confirmed**. An image showing identifiable children is hidden on the website unless consent is confirmed.
- **Partners** appear only when **Partnership confirmed** is ticked, and their logo only when **Logo display permission received** is ticked. Otherwise only the name is shown.
- The Studio sidebar has an **Awaiting approval** list so nothing gets forgotten.

Writing tips: use plain, warm, hopeful language. Never use a child's full name, and never pair a child's name with their school. Write alt text that describes what is happening.

---

## Project structure

```
app/
  (site)/            All public pages (shared header and footer)
  actions/forms.ts   Server actions: validate, store, notify
  api/               Paystack verify, Sanity revalidate webhook
  studio/            Embedded Sanity Studio at /studio
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.png
components/
  Logo.tsx           The only place the logo is loaded
  layout/            Header, navigation, footer, social links
  sections/          Cards, stats band, CTA band, steps
  forms/             Form fields, form shell (honeypot, analytics), the four forms
  donate/            Bank transfer block, Paystack button
  ui/                Buttons, images, primitives
lib/
  site.ts            Organisation details and TODO placeholders
  nav.ts             Navigation
  content/           Content types, seed content, Sanity-or-seed getters
  forms/             Zod schemas, Supabase storage, Resend emails
  analytics.ts, seo.ts
sanity/              Sanity client, GROQ queries, schema types
supabase/migrations/ Database tables and access rules
public/brand/        Logo files
public/placeholders/ Labelled placeholder images
```
