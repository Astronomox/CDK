/**
 * Form definitions. Volunteer and school outreach fields follow the PRD exactly
 * (sections 22 and 26). The PRD leaves partner and item donation enquiry fields
 * "to be confirmed", so those collect only the minimum needed to reply.
 * Do not add fields here without updating the PRD and the Supabase migration.
 */
import { z } from "zod";
import {
  ACADEMIC_LEVELS,
  AGE_RANGES,
  DONATION_ITEMS,
  PARTNERSHIP_TYPES,
  SCHOOL_TYPES,
  VOLUNTEER_AREAS,
} from "./options";

export * from "./options";

const required = (label: string, min = 2, max = 200) =>
  z
    .string()
    .trim()
    .min(min, min <= 1 ? `${label} is required.` : `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const optional = (label: string, max = 2000) =>
  z.string().trim().max(max, `${label} must be ${max} characters or fewer.`).optional().default("");

const email = z.string().trim().toLowerCase().email("Enter a valid email address.").max(200);

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9][0-9\s()-]{6,19}$/, "Enter a valid phone number, for example 0803 123 4567 or +234 803 123 4567.");

const choice = <T extends readonly [string, ...string[]]>(options: T, label: string) =>
  z.enum(options, { error: `Choose a ${label.toLowerCase()}.` });

export const volunteerSchema = z.object({
  fullName: required("Full name"),
  email,
  phone,
  location: required("Location"),
  ageRange: choice(AGE_RANGES, "Age range"),
  academicLevel: choice(ACADEMIC_LEVELS, "Academic level"),
  motivation: required("This answer", 20, 2000),
  preferredArea: choice(VOLUNTEER_AREAS, "Volunteer area"),
  skills: optional("Skills and experience"),
});

export const schoolOutreachSchema = z.object({
  schoolName: required("School name"),
  schoolLocation: required("School location"),
  contactPerson: required("Contact person"),
  phone,
  email,
  schoolType: choice(SCHOOL_TYPES, "School type"),
  estimatedStudents: z.coerce
    .number({ error: "Enter a number." })
    .int("Enter a whole number.")
    .min(1, "Enter a number greater than zero.")
    .max(50000, "Please check this number."),
  preferredDate: required("Preferred date or period", 2, 120),
  additionalInfo: optional("Additional information"),
});

export const partnerSchema = z.object({
  fullName: required("Full name"),
  organisation: required("Organisation"),
  email,
  phone: z.union([z.literal(""), phone]).optional().default(""),
  partnershipType: choice(PARTNERSHIP_TYPES, "Type of partnership"),
  message: required("Message", 10, 2000),
});

export const itemDonationSchema = z.object({
  fullName: required("Full name"),
  email,
  phone,
  items: z.array(z.enum(DONATION_ITEMS)).min(1, "Choose at least one item."),
  itemDetails: required("Item details", 5, 1000),
  preferredDeliveryDate: optional("Preferred delivery date", 120),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type SchoolOutreachInput = z.infer<typeof schoolOutreachSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;
export type ItemDonationInput = z.infer<typeof itemDonationSchema>;

/** Human labels used in notification emails. */
export const FIELD_LABELS: Record<string, string> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  location: "Location",
  ageRange: "Age range",
  academicLevel: "Academic level",
  motivation: "Why they want to volunteer",
  preferredArea: "Preferred volunteer area",
  skills: "Relevant skills or experience",
  schoolName: "School name",
  schoolLocation: "School location",
  contactPerson: "Contact person",
  schoolType: "School type",
  estimatedStudents: "Estimated number of students",
  preferredDate: "Preferred date or period",
  additionalInfo: "Additional information",
  organisation: "Organisation",
  partnershipType: "Type of partnership",
  message: "Message",
  items: "Items",
  itemDetails: "Item details",
  preferredDeliveryDate: "Preferred delivery date",
};
