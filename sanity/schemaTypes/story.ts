import { defineArrayMember, defineField, defineType } from "sanity";
import { approvedField, slugField } from "./fields";

export const story = defineType({
  name: "story",
  title: "Story or news",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Project story", value: "project-story" },
          { title: "Outreach update", value: "outreach-update" },
          { title: "Volunteer story", value: "volunteer-story" },
          { title: "Programme announcement", value: "programme-announcement" },
          { title: "Impact story", value: "impact-story" },
          { title: "Partner story", value: "partner-story" },
          { title: "Upcoming activity", value: "upcoming-activity" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "publishedAt", title: "Publish date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", type: "text", rows: 2, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "coverImage", type: "safeImage" }),
    defineField({
      name: "body",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "safeImage" })],
    }),
    approvedField,
  ],
  orderings: [{ title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "publishedAt", approved: "approved", media: "coverImage" },
    prepare: ({ title, date, approved, media }) => ({
      title: `${approved ? "" : "[Not approved] "}${title}`,
      subtitle: date,
      media,
    }),
  },
});
