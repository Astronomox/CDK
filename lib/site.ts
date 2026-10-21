/**
 * Single source of truth for organisation details.
 *
 * Anything still unknown is set to the TODO marker below. Pages check
 * `isTodo()` and show a friendly fallback instead of the raw placeholder,
 * so nothing invented ever reaches the public site.
 *
 * Change `name` here and it updates everywhere (metadata, footer, emails,
 * structured data).
 */

export const TODO = "TODO" as const;
export type Todo = typeof TODO;

export function isTodo(value: string | undefined | null): boolean {
  return !value || value === TODO || value.startsWith("TODO");
}

/** Custom domain if set, otherwise the Vercel production URL, otherwise local dev. */
const vercelHost = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")).replace(/\/$/, "");

export const SITE = {
  /** Site name, matching the logo wordmark "CHEER d’KIDS". Uses a typographic apostrophe. */
  name: "Cheer The Kids",
  /** Short name used where space is tight (manifest, small labels). */
  shortName: "Cheer The Kids",
  /** Plain spelling used in emails, file names and anywhere a straight apostrophe is safer. */
  plainName: "Cheer The Kids",
  /** Registered (official) name, as confirmed by the organisation (2026-10-21). Used with the RC number. */
  legalName: "Cheer The Kids Initiative",
  tagline: "Giving Children Hope. Keeping Their Spark Alive.",
  description:
    "Cheer The Kids creates programmes and experiences that help children rediscover joy, build self-belief and believe in their dreams and aspirations.",

  /** Set NEXT_PUBLIC_SITE_URL if a custom domain is added later. */
  url: siteUrl,

  mission: "To provide programs and activities that enhance happiness and instill self-belief in children.",
  vision: "To ensure that every child experiences joy and has the hope to believe in their dreams and aspirations.",
  purpose:
    "To create positive experiences, encouragement and opportunities that help children keep their spark alive and believe that their circumstances do not have to define their future.",

  region: "Southwest Nigeria",
  locations: ["Lagos", "Kwara"],

  impact: {
    childrenReached: "1,300+",
    outreaches: "7",
    states: "Lagos and Kwara",
  },

  registration: {
    rcNumber: "9565791" as string,
  },

  contact: {
    email: "cheerthekidsinitiative@gmail.com",
    phone: "0810 590 0625" as string,
    /** International format for tel: links and structured data. */
    phoneIntl: "+2348105900625",
    /** Not published: the organisation prefers email and phone only. */
    officeAddress: "" as string,
  },

  /**
   * Item donations are dropped off in Lagos. The exact address is a private home
   * address, so it is never published: it is shared by email after an enquiry.
   */
  donationDropOff: {
    area: "Lagos",
    note: "We share the drop-off address privately once we have confirmed your donation.",
  },

  requestedItems: ["Bags", "Shoes", "Books", "Confectioneries"],

  socials: {
    instagram: "https://www.instagram.com/cheerdkids",
    instagramHandle: "@cheerdkids",
    linkedin: "https://www.linkedin.com/company/cheer-d-kids-initiative",
  },

  payments: {
    paystack: {
      /** Paystack public key. Set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY. Empty means the button shows as "coming soon". */
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || (TODO as string),
      currency: "NGN",
      /** Suggested amounts in naira. */
      suggestedAmounts: [5000, 10000, 25000, 50000],
      minimumAmount: 500,
    },
    bank: {
      /** TODO: final bank account details pending. */
      bankName: TODO as string,
      accountName: TODO as string,
      accountNumber: TODO as string,
    },
    /** TODO: Cleva details for international donors pending. */
    cleva: TODO as string,
  },

  /** Sponsors and their logos were sent by the organisation for display (2026-10-20). Managed in the CMS once it is set up. */
  partnersConfirmed: true,
} as const;

export function hasBankDetails(): boolean {
  const { bankName, accountName, accountNumber } = SITE.payments.bank;
  return !isTodo(bankName) && !isTodo(accountName) && !isTodo(accountNumber);
}

export function hasPaystack(): boolean {
  return !isTodo(SITE.payments.paystack.publicKey);
}

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
