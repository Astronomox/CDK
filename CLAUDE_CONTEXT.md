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
- **Name:** site name is now **Cheer d’Kids** (`SITE.name`, typographic apostrophe; `SITE.plainName` has a straight apostrophe). All copy updated. The logo is shown alone (no text beside it) so the wordmark is never recreated in another font.
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
