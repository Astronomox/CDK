import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Sponsor or partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Sponsor", value: "sponsor" },
          { title: "Partner", value: "partner" },
        ],
        layout: "radio",
      },
      initialValue: "partner",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "About the partnership", type: "text", rows: 3 }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "logo", type: "safeImage" }),
    defineField({
      name: "confirmed",
      title: "Partnership confirmed",
      type: "boolean",
      initialValue: false,
      description: "Only confirmed partners appear on the website.",
    }),
    defineField({
      name: "logoDisplayPermission",
      title: "Logo display permission received",
      type: "boolean",
      initialValue: false,
      description: "The logo is shown only when written permission to display it is on file. Otherwise only the name appears.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "kind", media: "logo" } },
});
