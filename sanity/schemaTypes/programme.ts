import { defineArrayMember, defineField, defineType } from "sanity";
import { slugField } from "./fields";

export const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
      description: "One sentence shown on cards.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "highlights", title: "What it involves", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "audience", title: "Who it is for", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "In development", value: "in-development" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "image", type: "safeImage" }),
    defineField({
      name: "skills",
      title: "Skills offered",
      type: "array",
      description: "For Skill Acquisition. Add new skills here as the programme grows.",
      of: [
        defineArrayMember({
          type: "object",
          name: "skill",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
            defineField({
              name: "status",
              type: "string",
              options: {
                list: [
                  { title: "Planned", value: "planned" },
                  { title: "Open for applications", value: "open" },
                  { title: "Running", value: "running" },
                ],
              },
              initialValue: "planned",
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "status", media: "image" } },
});
