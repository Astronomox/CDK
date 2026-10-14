# Cheer the Kids website

Source of truth: docs/PRD.md (brand guideline + requirements). Read it fully before building.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS. Sanity for CMS. Supabase for form submissions (volunteer, school outreach, partner, item donation enquiry). Resend for email. Paystack for card donations. Deploy target: Vercel.

## Brand
- Logo: public/brand/logo.png (temporary). Final SVG will be supplied later. Always load the logo through one component (components/Logo.tsx) so swapping to SVG is a one-file change.
- Logo wordmark reads "CHEER d'KIDS". Site name is "Cheer The Kids", the official name confirmed by the client. Keep it in one constant (lib/site.ts).
- Colours: Purple #7146D3, Gold #FED072, Blue #2672AE, Black #000, White #FFF. Blue and white are the base, purple and gold are accents. Never use gold as text on white.
- Fonts: Poppins (headings, buttons) and Nunito Sans (body) via next/font.
- Style: rounded shapes, circles, generous white space, photo-led, warm. No pity imagery.

## Rules
- Mobile first. Fast on Nigerian mobile networks: static generation, next/image, lazy video, no heavy libraries.
- WCAG AA contrast and alt text everywhere.
- Child safeguarding: no identifiable child content without a consent flag in the CMS. Gallery and testimonial items must have an approved boolean that defaults to false.
- Collect only the form fields listed in the PRD. Restrict access to submissions.
- Unknown values (RC number, phone, payment details, partners, domain) live in lib/site.ts as clearly marked TODO placeholders. Never invent them.
- No em dashes or en dashes in site copy. Plain, human wording.
- Do not use placeholder lorem ipsum in shipped sections. Use short real copy from the PRD.

## Session end
Update CLAUDE_CONTEXT.md with what was built, decisions made, and what is next.
