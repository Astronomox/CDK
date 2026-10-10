import { defineField, defineType } from "sanity";
import { approvedRequiresConsent, consentField } from "./fields";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (rule) => rule.required().max(600) }),
    defineField({
      name: "role",
      type: "string",
      options: {
        list: [
          { title: "Child", value: "child" },
          { title: "Parent or guardian", value: "parent" },
          { title: "Teacher", value: "teacher" },
          { title: "School administrator", value: "school-admin" },
          { title: "Volunteer", value: "volunteer" },
          { title: "Sponsor", value: "sponsor" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "attribution",
      type: "string",
      description:
        "How the person is credited, e.g. \"Teacher, Lagos\" or \"Pupil, age 11\". Never use a child's full name.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({ name: "project", type: "reference", to: [{ type: "project" }] }),
    consentField,
    approvedRequiresConsent,
  ],
  preview: {
    select: { title: "attribution", subtitle: "quote", approved: "approved" },
    prepare: ({ title, subtitle, approved }) => ({ title: `${approved ? "" : "[Not approved] "}${title}`, subtitle }),
  },
});
