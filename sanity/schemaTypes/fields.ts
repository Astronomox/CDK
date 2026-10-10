import { defineField } from "sanity";

/**
 * Publication gate for every child-related document. Defaults to false and the
 * website only renders documents where this is true.
 */
export const approvedField = defineField({
  name: "approved",
  title: "Approved for publication",
  type: "boolean",
  initialValue: false,
  description:
    "Tick only after the safeguarding review is complete. Unapproved items never appear on the website, even when published here.",
  validation: (rule) => rule.required(),
});

/** Consent gate used on testimonials and videos. Approval is blocked until consent is confirmed. */
export const consentField = defineField({
  name: "consentConfirmed",
  title: "Consent confirmed",
  type: "boolean",
  initialValue: false,
  description:
    "Written consent is on file from the person (and a parent or guardian for anyone under 18) to publish this on the website.",
  validation: (rule) => rule.required(),
});

export const approvedRequiresConsent = defineField({
  name: "approved",
  title: "Approved for publication",
  type: "boolean",
  initialValue: false,
  description:
    "Tick only after the safeguarding review is complete and consent is confirmed. Unapproved items never appear on the website.",
  validation: (rule) =>
    rule.required().custom((value, context) => {
      const doc = context.document as { consentConfirmed?: boolean } | undefined;
      if (value === true && !doc?.consentConfirmed) {
        return "Confirm consent before approving this item.";
      }
      return true;
    }),
});

export const slugField = defineField({
  name: "slug",
  title: "Web address",
  type: "slug",
  options: { source: "title", maxLength: 80 },
  description: "Generated from the title. Lower case words separated by hyphens.",
  validation: (rule) => rule.required(),
});
