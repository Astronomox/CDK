/**
 * Form options and shared form types. Kept free of zod so client components
 * can import them without adding the validation library to the browser bundle.
 */

export const AGE_RANGES = ["Under 18", "18 to 24", "25 to 34", "35 to 44", "45 and above"] as const;

export const ACADEMIC_LEVELS = [
  "Currently in a tertiary institution",
  "Graduate",
  "Postgraduate",
  "Professional",
  "Other",
] as const;

/** PRD section 22: volunteer options. */
export const VOLUNTEER_AREAS = [
  "School outreaches",
  "Social media team",
  "Videography",
  "Photography",
  "Graphics design",
  "Content creation",
  "Event support",
  "Other opportunities",
] as const;

export const SCHOOL_TYPES = [
  "Public primary school",
  "Public secondary school",
  "Private primary school",
  "Private secondary school",
  "Primary and secondary school",
  "Community or faith-based school",
  "Other",
] as const;

export const PARTNERSHIP_TYPES = [
  "Sponsor an outreach",
  "Donate relief items",
  "Skills or professional support",
  "Media or publicity",
  "Other",
] as const;

/** PRD section 23.2: requested physical items. */
export const DONATION_ITEMS = ["Bags", "Shoes", "Books", "Confectioneries", "Other items"] as const;

export type FormKind = "volunteer" | "schoolOutreach" | "partner" | "itemDonation";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string | string[]>;
};

export const initialFormState: FormState = { status: "idle" };

/** Honeypot field name. Real people never see or fill it. */
export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "form_started_at";
