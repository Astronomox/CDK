import { defineArrayMember, defineField, defineType } from "sanity";
import { approvedField, slugField } from "./fields";

/** Follows the project story format in the PRD, section 20. */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Project title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({ name: "date", type: "date" }),
    defineField({ name: "dateLabel", title: "Date as shown", type: "string", description: "Optional, e.g. November 2025. Use when the exact day is not known." }),
    defineField({
      name: "location",
      type: "string",
      description: "e.g. Ikeja, Lagos",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "school", title: "School or community", type: "string" }),
    defineField({ name: "context", title: "Need or context", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "whatWeDid", title: "What Cheer The Kids did", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "childrenReached",
      title: "Number of children reached",
      type: "number",
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({ name: "reachedLabel", title: "Children reached as shown", type: "string", description: "Optional, e.g. 500+ students. Replaces the number on the site." }),
    defineField({ name: "outcome", title: "Outcome or impact", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "coverImage", type: "safeImage" }),
    defineField({ name: "photos", type: "array", of: [defineArrayMember({ type: "safeImage" })], options: { layout: "grid" } }),
    defineField({ name: "videos", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "video" }] })] }),
    defineField({
      name: "testimonials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
    }),
    defineField({
      name: "sponsors",
      title: "Sponsors and partners",
      type: "array",
      description: "Only confirmed partners are shown.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "partner" }] })],
    }),
    defineField({
      name: "detailsPending",
      title: "Details still being compiled",
      type: "boolean",
      initialValue: false,
      description: "Shows a short note that the full project story is on its way.",
    }),
    approvedField,
  ],
  orderings: [{ title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", location: "location", approved: "approved", media: "coverImage" },
    prepare: ({ title, location, approved, media }) => ({
      title: `${approved ? "" : "[Not approved] "}${title}`,
      subtitle: location,
      media,
    }),
  },
});
