"use server";

import type { ZodType } from "zod";
import { SITE } from "@/lib/site";
import {
  HONEYPOT_FIELD,
  STARTED_AT_FIELD,
  itemDonationSchema,
  partnerSchema,
  schoolOutreachSchema,
  volunteerSchema,
  type FormKind,
  type FormState,
} from "@/lib/forms/schemas";
import { saveSubmission } from "@/lib/forms/store";
import { acknowledgeVolunteer, notifyTeam } from "@/lib/forms/notify";

const SUCCESS: Record<FormKind, string> = {
  volunteer:
    "Thank you for applying. We will review your application and, if it is a good fit, email you a short screening test. Keep an eye on your inbox.",
  schoolOutreach: "Thank you. We have received your invitation and will get in touch to plan a visit.",
  partner: "Thank you for reaching out. A member of our team will reply soon.",
  itemDonation:
    "Thank you for your generosity. We will contact you to confirm the items and delivery details before you drop anything off.",
};

/** Submissions faster than this are almost always bots. */
const MIN_FILL_MS = 2500;

function isSpam(formData: FormData): boolean {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) return true;
  return false;
}

function readForm(formData: FormData, arrayFields: string[]): Record<string, string | string[]> {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$") || key === HONEYPOT_FIELD || key === STARTED_AT_FIELD) continue;
    values[key] = arrayFields.includes(key)
      ? formData.getAll(key).map(String)
      : String(formData.get(key) ?? "");
  }
  for (const key of arrayFields) values[key] ??= [];
  return values;
}

async function handle(
  kind: FormKind,
  schema: ZodType<Record<string, unknown>>,
  formData: FormData,
  arrayFields: string[] = [],
): Promise<FormState> {
  const values = readForm(formData, arrayFields);

  // Quietly accept spam so bots get no signal, but store nothing.
  if (isSpam(formData)) return { status: "success", message: SUCCESS[kind] };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields and try again.", fieldErrors, values };
  }

  const saved = await saveSubmission(kind, parsed.data);
  if (!saved.ok) {
    return {
      status: "error",
      message: `Sorry, something went wrong and we could not send your form. Please try again, or email us at ${SITE.contact.email}.`,
      values,
    };
  }

  await notifyTeam(kind, parsed.data);
  if (kind === "volunteer") {
    await acknowledgeVolunteer(String(parsed.data.email), String(parsed.data.fullName));
  }

  return { status: "success", message: SUCCESS[kind] };
}

export async function submitVolunteer(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle("volunteer", volunteerSchema, formData);
}

export async function submitSchoolOutreach(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle("schoolOutreach", schoolOutreachSchema, formData);
}

export async function submitPartner(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle("partner", partnerSchema, formData);
}

export async function submitItemDonation(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle("itemDonation", itemDonationSchema, formData, ["items"]);
}
