import { defineField, defineType } from "sanity";
import { approvedField } from "./fields";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery photo",
  type: "document",
  fields: [
    defineField({ name: "image", type: "safeImage", validation: (rule) => rule.required() }),
    defineField({ name: "caption", type: "string", validation: (rule) => rule.max(140) }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "School outreaches", value: "school-outreaches" },
          { title: "Games", value: "games" },
          { title: "Creative activities", value: "creative-activities" },
          { title: "Donations", value: "donations" },
          { title: "Volunteers", value: "volunteers" },
          { title: "Events", value: "events" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "project", type: "reference", to: [{ type: "project" }] }),
    approvedField,
  ],
  preview: {
    select: { title: "caption", category: "category", approved: "approved", media: "image" },
    prepare: ({ title, category, approved, media }) => ({
      title: `${approved ? "" : "[Not approved] "}${title || "Untitled photo"}`,
      subtitle: category,
      media,
    }),
  },
});
