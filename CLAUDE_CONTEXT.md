# CLAUDE_CONTEXT

Working notes for whoever picks this project up next (human or Claude). Read CLAUDE.md and docs/PRD.md first.

## Session 1 (2026-10-10): Phase 1 build

### What was built

- **Scaffold:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4 (tokens in `app/globals.css`, default palette removed so only brand colours exist), ESLint 9 flat config. Fonts: Poppins (headings, buttons) and Nunito Sans (body) via `next/font`.
- **Files moved into place:** `PRD.md` to `docs/PRD.md`, `logo.png` to `public/brand/logo.png` (CLAUDE.md expected these paths).
- **Single sources of truth:** `lib/site.ts` (name, mission, contacts, socials, donation address, bank/payment placeholders with `TODO` marker and `isTodo()`), `lib/nav.ts` (7-item primary nav), `components/Logo.tsx`.
- **Layout:** sticky header with desktop dropdowns and mobile menu, black footer with the original logo, skip link, Organization (NGO) JSON-LD on every page, GA4 loader.
- **Pages (all Phase 1 sitemap):** Home (PRD section order 1 to 11), About (story, mission and vision, values, where we work, impact, team, registration), Programmes overview plus `/programmes/[slug]` (School Outreaches with embedded school form, Volunteer Training with journey, Skill Acquisition with CMS-driven skills list), Our Impact overview, Projects list and detail, Gallery (category filter), Videos (lazy facade), Testimonials, Get Involved, Volunteer (form), Donate (Paystack + bank + item donation info), Donate Items (form), Partner With Us (form), Sponsors and Partners, Stories list and detail, Contact (email, socials, addresses, school outreach form), Privacy, Safeguarding, 404.
- **Forms:** zod validation in server actions (`app/actions/forms.ts`), Supabase insert (`lib/forms/store.ts`), Resend notifications plus a volunteer acknowledgement email with next steps (`lib/forms/notify.ts`). Honeypot field plus a minimum fill time. Errors returned per field; values preserved. SQL in `supabase/migrations/0001_form_submissions.sql` (RLS on, no public policies, grants revoked).
- **Donations:** `components/donate/PaystackDonate.tsx` (script loaded on click, amount chips, receipt email) and `BankTransfer.tsx`, both reading `lib/site.ts`. `/api/paystack/verify` verifies with the secret key server-side.
- **CMS:** Sanity schemas in `sanity/schemaTypes` (project, galleryItem, video, testimonial, story, programme, partner, plus reusable `safeImage`). Studio embedded at `/studio` with an "Awaiting approval" list. `/api/revalidate` webhook.
- **Content layer:** `lib/content/index.ts` reads Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, else `lib/content/seed.ts`. Both paths filter on `approved`.
- **SEO:** per-page metadata via `lib/seo.ts`, canonical URLs, `sitemap.ts`, `robots.ts` (blocks /studio and /api), generated `opengraph-image.tsx`, Article JSON-LD on stories, favicon and Apple icon cropped from the logo symbol.
- **Analytics events:** see README table. Wrapper in `lib/analytics.ts`.

### Decisions

- **Logo background:** the supplied PNG has a solid black background (not transparent). Generated `public/brand/logo-transparent.png` by keying out black against the three palette colours. Light backgrounds use that; the black footer uses the original. Swap both in `components/Logo.tsx` when the SVG arrives.
- **Safeguarding is enforced in code:** `approved` defaults to false on project, galleryItem, video, testimonial, story; GROQ queries filter `approved == true`. Testimonials and videos cannot be approved without `consentConfirmed` (Sanity validation). Every image has `showsIdentifiableChildren` and `consentConfirmed`; `safeImg()` drops non-consented images in both the GROQ path and story body. Partners render only when `confirmed`, logos only with `logoDisplayPermission`.
- **No invented content:** no testimonials, videos or partners are seeded (real ones exist but need consent). Seed projects ("Outreaches in Lagos", "Outreaches in Kwara") use only PRD facts and show a "details being compiled" note. Homepage testimonial slot falls back to the vision statement when no approved testimonial exists. Placeholder images are SVGs that say "Placeholder image" on them.
- **Unknown values never render as TODO:** each has a fallback message (bank details, phone, RC number, office address, Cleva, Paystack key).
- **Partner and item donation form fields:** PRD marks these "to be confirmed", so they collect the minimum. Partner: full name, organisation, email, optional phone, partnership type, message. Item donation: full name, email, phone, items (checkboxes from PRD list), item details, optional preferred delivery date. Confirm with the organisation.
- **General enquiry:** handled by email link (no general contact form) because the PRD does not list fields for one.
- **Volunteer form choices:** age ranges, academic levels and areas are option lists in `lib/forms/options.ts` (areas from PRD section 22). "Under 18" is included as an age option; review whether under-18 applicants should be accepted.
- **Client bundle:** option lists live in `lib/forms/options.ts` (no zod) so zod stays server-side.
- **ISR:** content pages revalidate every 10 minutes, or immediately via the Sanity webhook.
- **Contrast:** gold is only used as a fill or as text on black/navy. Stat tiles use deep blue (#1D5C8E) behind white text.

### Open items / next steps

1. Fill `TODO` values in `lib/site.ts` as they are confirmed (RC number, phone, office address, bank, Cleva) and set Paystack keys and `NEXT_PUBLIC_SITE_URL`.
2. Create Sanity, Supabase and Resend projects and set env vars (README has steps). Add the Sanity CORS origin.
3. Upload real, consented photos, videos and testimonials; compile the 7 outreach project stories (dates, schools, children reached per outreach).
4. Confirm partner and item donation enquiry fields with the organisation; confirm partners and logo permissions.
5. Leadership/team content for About (PRD section 18).
6. Legal review of the privacy notice and safeguarding page; publish the full safeguarding policy (PRD section 27).
7. Replace the logo with the final SVG and regenerate `app/icon.png` / `app/apple-icon.png`.
8. Consider moving bank and contact details into a Sanity "site settings" singleton so staff can edit them (PRD section 28).
9. Phase 2 (PRD section 31): newsletter, recurring donations, volunteer dashboard, etc.

## Session 2 (2026-10-12): UI rebuild on shadcn/ui

### What changed
- **Name:** site name is now **Cheer The Kids** (`SITE.name`, typographic apostrophe; `SITE.plainName` has a straight apostrophe). All copy updated. The logo is shown alone (no text beside it) so the wordmark is never recreated in another font.
- **shadcn/ui:** `components.json`, `lib/utils.ts` (`cn`), and new-york style components in `components/ui/` (button, badge, card, separator, input, textarea, label, sheet, dialog, accordion, tabs, navigation-menu) on `radix-ui`, `lucide-react`, `tw-animate-css`. Brand colours are mapped to shadcn tokens in `app/globals.css` (`primary` = purple, `ring` = purple, `muted-foreground` = #475467). `text-muted` was replaced by `text-muted-foreground` everywhere.
- **Design (inspired by UK charities: Save the Children UK, Demelza, YoungMinds):** navy utility bar; sticky header with mega menus (feature panel per section) and Donate/Volunteer buttons; Sheet + accordion mobile menu; large display type; blob-framed image collage hero; values marquee; colour tiles for the four communication frames; navy stats band; bento "get involved" grid with a Demelza-style quick-donate module (`components/donate/QuickDonate.tsx`, passes `?amount=` to the donate page); Instagram/LinkedIn panels; black footer with school-invite card.
- **Gallery:** masonry grid + full-screen lightbox (`components/GalleryGrid.tsx`): quality 90 at full viewport width (`images.qualities: [75, 90]` in `next.config.ts`), arrow keys, swipe, counter, captions.
- **Placeholders:** illustrated scenes in the logo's figure style (`public/placeholders/*.svg`, 1600x1200) with a centred "Photo coming soon" label. Replace with real photos in the CMS.
- **Verified:** typecheck, lint and production build pass (35 pages). Homepage checked at 1440px and 390px (no horizontal scroll), gallery lightbox, donate page, volunteer form and mobile menu checked visually.

### Next
- Paste the organisation's replies (RC number, phone, bank details, outreaches, partners) and fill `lib/site.ts` + CMS.
- Upload original-resolution, consented photos (Google Drive, not WhatsApp) so the gallery shows real moments.

## Session 3 (2026-10-12): approved "editorial warmth" design ported to the site

- Design process: research agent (screenshots of One Drop, High Mountain Creative, Malala Fund, Save the Children UK, Barnardo's, Demelza, Farm Africa, charity: water) -> brief -> mockup at `mockups/homepage/index.html` -> independent review (round 1 NEEDS REVISION, round 2 PASS) -> ported.
- Homepage (`app/(site)/page.tsx`) uses the mockup markup with styles in `app/home.css` (scoped under `.home`; container class is `.wrap`, label class is `.eyebrow` because Tailwind has an `overline` utility). Client bits: `components/home/RevealObserver.tsx`, `components/home/HomeDonate.tsx`. A tiny inline script in `app/layout.tsx` adds `js` to `<html>` for entrance animations.
- Shared components restyled to the same system so every inner page matches: warm `PageHeader`, uppercase purple eyebrow labels, Poppins 600 headings, one card style (white, warm 1px border, 20px radius), deep blue `StatsBand` with gold rules, calm warm `CtaBand`, outline-blue secondary buttons, no decorative circles. Tokens in `app/globals.css`: `canvas-warm #FBF8F3`, `canvas-tint #F3F7FB`, `blue-ink #1D4F7A`, `ink #16212E`, border `#E8E2D8`.
- Header: no utility bar; logo only; simple dropdowns; Donate button. Footer: black with original logo.
- **Sample photos:** `public/samples/*.jpg` are AI generated (made with the owner's Figma AI credits by the build agent, without prior approval; flagged to the owner). `MediaImage` shows a visible "Sample photo" label on any image with `placeholder: true`. They must all be replaced by real, consented photos (via the CMS) before launch.
- Verified: typecheck, lint, production build (35 pages); homepage, About, Donate, School Outreaches and Gallery checked visually at 1440px.
- Not yet re-checked at 390px after the port (the mockup itself passed at 390px).

## Session 4 (2026-10-14): client details and real photos

- Client confirmed: official name **Cheer The Kids** (stored as `SITE.legalName`, shown with the RC number in the footer, About and JSON-LD; display name stays "Cheer The Kids" pending the owner's decision), RC **9565791**, phone **0810 590 0625** (`phoneIntl` +2348105900625), email and socials unchanged. Outreach details (item 3) and sponsors (item 4) still pending.
- Photos: client Google Drive (2024, 2025, 2026 outreach folders, about 150 photos). 35 chosen and saved at 1600px in `public/photos/outreach-<year>-<n>.jpg`. `lib/content/seed.ts` now uses `PHOTOS` (role photos) and `G` (gallery set); projects are one per year ("Our 2026 outreaches" etc., location "Southwest Nigeria", `detailsPending`). AI sample photos removed (`public/samples` deleted).
- Consent: the client shared these photos for the site but has not yet written to confirm parent/guardian consent. Get that confirmation before launch.
- Next: outreach details per year (schools, dates, numbers), sponsors and logo permissions, bank details, domain.
- Update (later on 2026-10-14): parent/guardian consent for the Drive photos confirmed by the client ("use the pictures as you wish"). Site name switched to the official **Cheer The Kids** everywhere (`SITE.name`); the logo artwork still reads "CHEER d'KIDS".
- Photo-led homepage pass: three-photo hero collage, edge-to-edge photo ribbon after the hero, impact numbers over a full-bleed photo (`StatsBand image`), "Three years of outreaches" year cards with large year numerals, and a moments mosaic (`mosaic()` puts portrait photos in tall slots). Homepage avoids repeating any photo. All 12 inner pages now pass a real photo to `PageHeader`.
- Only the CDK dev server should be running (port 3005); other dev servers were stopped at the owner's request. PostgreSQL (5432) was left running.

## Session 5 (2026-10-14): mobile redesign

- New `app/home-mobile.css` (only below 768px, imported after `app/home.css`): full-screen photo hero with headline and buttons over a dark gradient; swipe rows (scroll-snap, next card peeking) for programmes, the three year cards, mission and vision, and the get-involved cards; compact two-column impact numbers (in `StatsBand` Tailwind classes); the promise quote set on its photo; tighter sections, partners and contact. Mobile homepage went from ~13,760px to ~9,400px tall with no sideways scroll (sr-only labels inside cards needed `position:relative` on `.card`).
- `components/PhotoPeek.tsx` (mounted in `app/(site)/layout.tsx`): press and hold any photo in `<main>` on a touch screen to preview it full screen; it shows the loaded copy instantly, then swaps to a sharper next/image rendition sized to the screen (max 1920px, q90). Taps and swipes behave normally; the native image menu is suppressed on touch (`globals.css`).
- Inner pages now show their `PageHeader` photo on phones too (16:10 banner). Footer tightened on phones.
- Use `npm run dev` (port 3000) or the running server on 3005. Do not use pnpm (`packageManager` is npm).
- Follow-up: swipe hint text removed. Ribbon on phones and tablets loops endlessly left to right (items rendered twice, copy is aria-hidden, pauses on touch, off for reduced motion). Scroll reveal is now pure CSS (animation-timeline: view(), with no fallback hiding), replacing the JS RevealObserver that could leave sections invisible after re-renders.
- Later: impact numbers count up from zero when scrolled into view (`components/CountUp.tsx`). The private drop-off address was removed from the site and docs (`SITE.donationDropOff` keeps only the area and a note that the address is shared by email). It is still in old git history; the owner chose not to rewrite history.

## Session 6 (2026-10-20): client content batch

- Team: 7 directors from the client's Drive folder, saved in `public/team/`, listed in `lib/team.ts` (name, role, photo, `focus` crop, optional `zoom` for full-length photos). Shown in a new "Our team" section on About (`#team`). `MediaImage` now accepts `style`.
- Projects: the per-year placeholder projects were replaced by the 4 documented outreaches (Educational Outreach and Mentorship 2026, HerCare Project Nov 2025, Children's Day 2025, Children's Day 2024). `Project` gained `dateLabel` and `reachedLabel` for approximate dates and counts like "500+ students". HerCare has no photos yet, so it uses `public/photos/hercare-cover.svg` (text-free brand artwork so it works under card titles).
- Testimonials: the client's 7 testimonials are in seed. Children are credited by role only ("Student"). Homepage voices section: featured quote on a photo plus a swipe row of 3 and a link to all testimonials.
- Client decisions: no office address is published (`officeAddress` is empty; Contact says email and phone). Item drop-off address is shared by email. Privacy and safeguarding pages approved. Domain: no custom domain needed for now (owner: "no stress about domain"). `SITE.url` falls back to the Vercel production URL (`VERCEL_PROJECT_PRODUCTION_URL`), which fixes canonical and og:url pointing at localhost:3000 on the live site.
- Outreach copy checked line by line against the client summary; outcome lines reworded to stick to what the client wrote. Locations use "Ikorodu, Lagos State" without the Igbolomu community name (owner lives there); add it back only if the owner agrees.
- Fixes: About "Get in touch" email now wraps on phones (it caused sideways scroll) and is a mailto/tel link.
- Still pending from the client: who will update the site (item 11), the client's "observations", partners and logo permission, bank details, Paystack keys, videos, HerCare photos. Note: headline children figure later corrected by the client to 1,300+ (Session 7).

## Session 6b (2026-10-20): "too much space, site feels dead"

- Motion system, no library: `components/Motion.tsx` (mounted in the site layout) reveals blocks inside every `main section` (direct children of `.container-page` or `.wrap`, grid items staggered 80ms) with one IntersectionObserver. It only hides blocks that start below the screen, uses a `data-rv` attribute it owns, skips sideways scrollers, sr-only labels and `[data-no-reveal]`, and removes the attribute when done, so nothing can stay hidden. Also sets `html[data-scrolled]` for the compact, frosted header. Styles in `app/motion.css` (selectors start with `:root` so card transitions cannot override the reveal).
- The old CSS-only reveal (`animation-timeline: view()`) is gone: it never ran in Safari or Firefox.
- CSS motion: homepage hero text staggers in, the gold swash draws, photos settle and the main photo slowly zooms, the hero card bobs, soft brand glows drift; inner `PageHeader`s get the same entrance (`ph-crumbs`, `ph-copy`, `ph-media`); `app/(site)/template.tsx` fades each page in on navigation; scroll progress bar (Chromium only, hidden elsewhere); `.lift` hover on cards; buttons press to 96%. The photo ribbon now loops on desktop too (90s), paused on hover. All off under prefers-reduced-motion.
- Spacing: `Section` is `py-11 sm:py-14 lg:py-[72px]` (was 64/96), PageHeader tighter with a 3:2 photo on desktop, homepage `--section-y` 52/76 (phones 44), 88px grid gaps now 64px, CTA band and stats band tighter.
- Layout compaction on phones: About values in a 2-column grid with a photo in the 8th slot; mission, vision and where we work in one band; contact and registration in one card. Impact shortcuts 2x2; recent projects and related stories use `.swipe-row` (globals.css, phones only). `Steps` is a compact timeline on phones. Volunteer "who" cards and "ways to help" (2 columns) compacted; Contact cards put icons inline.
- Result (page height): About -17% desktop / -15% phone, Impact -9% / -31%, Volunteer -6% / -20%, others -5 to -9% desktop.
- Testing note: the site uses `scroll-behavior: smooth`, so scripted scroll tests must use `behavior: 'instant'`, or rapid scrollTo calls cancel each other and look like stuck reveals.

## Session 6c (2026-10-20): no sideways scroll, voices, heart line, sharper photos

- Rule from the owner: no sideways scrolling anywhere. All swipe rows removed (homepage cards, mission and vision, Impact, stories, gallery filters now wrap). The photo ribbon still glides on its own.
- `components/VoiceRotator.tsx`: one testimonial at a time, smoke-style fade, about 4.7s each, pause button, still under reduced motion (read via `useSyncExternalStore`). `components/HeartLine.tsx`: a line that draws itself into a heart, replacing the slash before testimonial names. `components/PathTabs.tsx`: on phones the get-involved cards are one panel with Volunteer | Donate | Give items tabs.
- Photos: MediaImage defaults to quality 90, `sizes` values corrected, and the 35 outreach photos and 7 team photos got a gentle sharpening pass (metadata including GPS stripped). The sources are only 1600px (Drive previews, some originals only 1280px), so getting sharper than this needs the original files.
- Verified: tsc, lint and build pass; every page is 375px wide on phones with no inner sideways scrollers; homepage phone screenshot checked.
- To check next: the "Our impact so far" heading on the blue stats band looked dark in the phone screenshot (possibly caught mid-reveal; confirm the contrast). Not committed or pushed yet.
- Share image: `app/opengraph-image.jpg` (and an identical `app/twitter-image.jpg`), 1200x630, made from photo 2024-23 with the logo on a white badge bottom-right; replaces the generated `opengraph-image.tsx`. Bug fixed: pages using `pageMetadata` set their own `openGraph`, which dropped the root file-based image, so most pages had no og:image. `lib/seo.ts` now passes the share image by default (pages with their own `image`, like stories, keep theirs). To remake it, rerun the PIL composite (crop photo to 1200x630, logo-transparent.png 150px tall on a white rounded badge).

## Session 7 (2026-10-21): client observations

- Sponsors: 7 logos sent by the client for display (Bukola Jaiyeola Initiative, Aquacy, Giwa Autos, Skyhour Resources, Emmy Visuals, Vard Label, Pelumi Bintu-Edun). Square 600px tiles in `public/partners/` (each keeps its own background), listed in `seedPartners`. Shown on /partners (`PartnerTile`: logo tile + name) and as an auto-gliding carousel on the homepage under "Made possible together" (`.sponsor-marquee`: 4 copies, first set exposed to assistive tech, pauses on hover/touch/focus, still grid under reduced motion). `SITE.partnersConfirmed` is true.
- Mentorship: "Need someone to talk to?" (moral, career, education, development) as a purple panel after Programmes on the homepage (`#mentorship`) and a card on Contact. Email (subject "Mentorship: I would like to talk") and phone only, no new form. Under-18s are asked to reach out with a parent, guardian or teacher.
- Numbers: children reached is now 1,300+ (`SITE.impact.childrenReached`, Impact page, story renamed to `children-reached-and-outreaches-so-far`). Outreaches still 7.
- Copy from the client: About "Where we work" and the homepage "On an outreach day" paragraph use their wording.
- Homepage "why we exist" frame: the two arms now rise up the sides and meet over the arched top of the photo (client felt it was upside down).
- Deputy director: new photo (809x1080), zoom 1.35.
- Registered name is "Cheer The Kids Initiative" (`SITE.legalName`), shown on the About registration card, in the footer copyright and JSON-LD. Display name stays "Cheer The Kids".
- Locations (owner's call, 2026-10-21): "Igbolomu, Ikorodu, Lagos State" on the Children's Day 2025 and Educational Outreach 2026 projects only; HerCare uses the client's full wording (Landmark Bus Stop, Asolo Road, and Ayo Bus Stop, Asolo, Ikorodu, Lagos State).
- `SITE.whereWeWork` holds the client's long "where we work" sentence, used on About, under the homepage hero and on Contact. The homepage About headline keeps its short form.
- About values grid: the 8th-slot photo crops to the face (`object-[50%_14%]`).
