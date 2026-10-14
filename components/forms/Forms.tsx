"use client";

import Link from "next/link";
import { submitItemDonation, submitPartner, submitSchoolOutreach, submitVolunteer } from "@/app/actions/forms";
import {
  ACADEMIC_LEVELS,
  AGE_RANGES,
  DONATION_ITEMS,
  PARTNERSHIP_TYPES,
  SCHOOL_TYPES,
  VOLUNTEER_AREAS,
} from "@/lib/forms/options";
import { CheckboxGroup, SelectField, TextArea, TextField } from "./fields";
import { FormShell } from "./FormShell";

const privacy = (
  <>
    We only use these details to respond to you. Read our{" "}
    <Link href="/privacy" className="font-semibold text-blue-deep underline underline-offset-2">
      privacy notice
    </Link>
    .
  </>
);

const grid = "grid gap-5 sm:grid-cols-2";

/** PRD section 22: volunteer form fields. */
export function VolunteerForm() {
  return (
    <FormShell
      action={submitVolunteer}
      event="volunteer_application_submitted"
      submitLabel="Submit application"
      successTitle="Application received"
      privacyNote={privacy}
    >
      {(state) => (
        <>
          <div className={grid}>
            <TextField name="fullName" label="Full name" autoComplete="name" required state={state} />
            <TextField name="email" label="Email" type="email" autoComplete="email" required state={state} hint="We send the screening test here." />
            <TextField name="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" required state={state} />
            <TextField name="location" label="Location" required state={state} hint="City and state, e.g. Ikeja, Lagos" />
            <SelectField name="ageRange" label="Age range" options={AGE_RANGES} required state={state} />
            <SelectField name="academicLevel" label="Academic level" options={ACADEMIC_LEVELS} required state={state} />
          </div>
          <SelectField name="preferredArea" label="Preferred volunteer area" options={VOLUNTEER_AREAS} required state={state} />
          <TextArea name="motivation" label="Why do you want to volunteer with us?" required rows={5} state={state} />
          <TextArea
            name="skills"
            label="Relevant skills or experience"
            rows={4}
            state={state}
            hint="For example: working with children, photography, design, events, social media."
          />
        </>
      )}
    </FormShell>
  );
}

/** PRD section 26: school outreach enquiry fields. */
export function SchoolOutreachForm() {
  return (
    <FormShell
      action={submitSchoolOutreach}
      event="school_enquiry_submitted"
      submitLabel="Invite Cheer The Kids"
      successTitle="Invitation received"
      privacyNote={privacy}
    >
      {(state) => (
        <>
          <div className={grid}>
            <TextField name="schoolName" label="School name" autoComplete="organization" required state={state} />
            <TextField name="schoolLocation" label="School location" required state={state} hint="Area and state, e.g. Ikeja, Lagos" />
            <TextField name="contactPerson" label="Contact person" autoComplete="name" required state={state} />
            <TextField name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" required state={state} />
            <TextField name="email" label="Email" type="email" autoComplete="email" required state={state} />
            <SelectField name="schoolType" label="School type" options={SCHOOL_TYPES} required state={state} />
            <TextField
              name="estimatedStudents"
              label="Estimated number of students"
              type="number"
              inputMode="numeric"
              min={1}
              required
              state={state}
            />
            <TextField name="preferredDate" label="Preferred date or period" required state={state} hint="e.g. Second week of November" />
          </div>
          <TextArea name="additionalInfo" label="Additional information" rows={4} state={state} />
        </>
      )}
    </FormShell>
  );
}

/** PRD section 24 leaves partner enquiry fields to be confirmed: minimal fields only. */
export function PartnerForm() {
  return (
    <FormShell
      action={submitPartner}
      event="partner_enquiry_submitted"
      submitLabel="Send enquiry"
      successTitle="Thank you for reaching out"
      privacyNote={privacy}
    >
      {(state) => (
        <>
          <div className={grid}>
            <TextField name="fullName" label="Full name" autoComplete="name" required state={state} />
            <TextField name="organisation" label="Organisation" autoComplete="organization" required state={state} />
            <TextField name="email" label="Email" type="email" autoComplete="email" required state={state} />
            <TextField name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" state={state} />
          </div>
          <SelectField name="partnershipType" label="How would you like to partner?" options={PARTNERSHIP_TYPES} required state={state} />
          <TextArea name="message" label="Tell us a little about your idea" required rows={5} state={state} />
        </>
      )}
    </FormShell>
  );
}

/** PRD section 23.2: physical donation enquiry so logistics are confirmed before delivery. */
export function ItemDonationForm() {
  return (
    <FormShell
      action={submitItemDonation}
      event="item_donation_enquiry_submitted"
      submitLabel="Send donation enquiry"
      successTitle="Thank you for giving"
      privacyNote={privacy}
    >
      {(state) => (
        <>
          <div className={grid}>
            <TextField name="fullName" label="Full name" autoComplete="name" required state={state} />
            <TextField name="email" label="Email" type="email" autoComplete="email" required state={state} />
            <TextField name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" required state={state} />
            <TextField name="preferredDeliveryDate" label="Preferred delivery date" state={state} hint="We will confirm before you travel." />
          </div>
          <CheckboxGroup name="items" label="What would you like to donate?" options={DONATION_ITEMS} required state={state} />
          <TextArea
            name="itemDetails"
            label="Item details"
            required
            rows={4}
            state={state}
            hint="Roughly how many, and their condition. Please give items in good, usable condition."
          />
        </>
      )}
    </FormShell>
  );
}
