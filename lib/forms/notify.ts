import "server-only";
import { Resend } from "resend";
import { SITE } from "@/lib/site";
import { FIELD_LABELS, type FormKind } from "./schemas";

const SUBJECTS: Record<FormKind, (d: Record<string, unknown>) => string> = {
  volunteer: (d) => `New volunteer application: ${d.fullName}`,
  schoolOutreach: (d) => `New school outreach enquiry: ${d.schoolName}`,
  partner: (d) => `New partnership enquiry: ${d.organisation}`,
  itemDonation: (d) => `New item donation enquiry: ${d.fullName}`,
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function display(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return "Not provided";
  return String(value);
}

function renderTable(data: Record<string, unknown>) {
  const rows = Object.entries(data).map(([key, value]) => [FIELD_LABELS[key] ?? key, display(value)] as const);
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #eee;color:#475467">${escapeHtml(label)}</th><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  return { html, text };
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return null;
  return { resend: new Resend(key), from };
}

/** Sends the team a notification. Never throws: a failed email must not lose a stored submission. */
export async function notifyTeam(kind: FormKind, data: Record<string, unknown>): Promise<void> {
  const mail = getResend();
  if (!mail) {
    if (process.env.NODE_ENV !== "production") console.info(`[forms] Resend not configured. Skipped ${kind} notification.`);
    return;
  }
  const { html, text } = renderTable(data);
  const replyTo = typeof data.email === "string" ? data.email : undefined;
  try {
    const { error } = await mail.resend.emails.send({
      from: mail.from,
      to: process.env.FORM_NOTIFY_TO || SITE.contact.email,
      replyTo,
      subject: SUBJECTS[kind](data),
      html: `<p>A new submission came in through the ${escapeHtml(SITE.name)} website.</p>${html}<p style="color:#475467;font-size:12px">This contains personal information. Please handle it in line with our privacy notice.</p>`,
      text,
    });
    if (error) console.error(`[forms] Resend error for ${kind}`, error.message);
  } catch (error) {
    console.error(`[forms] Failed to send ${kind} notification`, error);
  }
}

/** Confirms receipt to a volunteer applicant and explains the next steps from the PRD journey. */
export async function acknowledgeVolunteer(to: string, fullName: string): Promise<void> {
  const mail = getResend();
  if (!mail) return;
  const firstName = escapeHtml(fullName.split(" ")[0] || fullName);
  try {
    await mail.resend.emails.send({
      from: mail.from,
      to,
      replyTo: SITE.contact.email,
      subject: `Thanks for applying to volunteer with ${SITE.name}`,
      html: `<p>Hi ${firstName},</p>
<p>Thank you for applying to volunteer with ${escapeHtml(SITE.name)}. We have received your application.</p>
<p><strong>What happens next</strong></p>
<ol><li>We review your application.</li><li>If it is a good fit, we email you a short screening test.</li><li>You join our volunteer training.</li><li>We confirm your role and get you ready for deployment.</li></ol>
<p>If you have any questions, reply to this email.</p>
<p>With joy,<br>The ${escapeHtml(SITE.name)} team</p>`,
      text: `Hi ${fullName.split(" ")[0]},\n\nThank you for applying to volunteer with ${SITE.name}. We have received your application.\n\nWhat happens next:\n1. We review your application.\n2. If it is a good fit, we email you a short screening test.\n3. You join our volunteer training.\n4. We confirm your role and get you ready for deployment.\n\nIf you have any questions, reply to this email.\n\nThe ${SITE.name} team`,
    });
  } catch (error) {
    console.error("[forms] Failed to send volunteer acknowledgement", error);
  }
}
