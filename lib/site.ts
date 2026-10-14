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

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const SITE = {
  /** Site name, matching the logo wordmark "CHEER d’KIDS". Uses a typographic apostrophe. */
  name: "Cheer The Kids",
  /** Short name used where space is tight (manifest, small labels). */
  shortName: "Cheer The Kids",
  /** Plain spelling used in emails, file names and anywhere a straight apostrophe is safer. */
  plainName: "Cheer The Kids",
  /** Registered (official) name, as given by the organisation. Used with the RC number. */
  legalName: "Cheer The Kids",
  tagline: "Giving Children Hope. Keeping Their Spark Alive.",
  description:
    "Cheer The Kids creates programmes and experiences that help children rediscover joy, build self-belief and believe in their dreams and aspirations.",

  /** TODO: domain not yet acquired. Set NEXT_PUBLIC_SITE_URL in the environment once it is. */
  url: siteUrl,

  mission: "To provide programs and activities that enhance happiness and instill self-belief in children.",
  vision: "To ensure that every child experiences joy and has the hope to believe in their dreams and aspirations.",
  purpose:
    "To create positive experiences, encouragement and opportunities that help children keep their spark alive and believe that their circumstances do not have to define their future.",

  region: "Southwest Nigeria",
  locations: ["Lagos", "Kwara"],

  impact: {
    childrenReached: "2,000+",
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
    /** TODO: office / correspondence address pending. */
    officeAddress: TODO as string,
  },

  /** Physical donation drop-off address (from the PRD, section 23.2). */
  donationAddress: {
    lines: ["10, Adebayo Street", "Igbolomu", "Ikorodu, Lagos"],
    country: "Nigeria",
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

  /** TODO: sponsors and partners to be confirmed. Partners are managed in the CMS. */
  partnersConfirmed: false,
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
