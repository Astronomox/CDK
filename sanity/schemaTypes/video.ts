import { defineField, defineType } from "sanity";
import { approvedRequiresConsent, consentField } from "./fields";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube link",
      type: "url",
      description: "Preferred. YouTube handles streaming on slow connections. Use an unlisted video if needed.",
    }),
    defineField({
      name: "file",
      title: "Or upload a short video file",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "Keep uploads short and compressed (under 20 MB).",
    }),
    defineField({ name: "poster", title: "Cover image", type: "safeImage" }),
    defineField({ name: "project", type: "reference", to: [{ type: "project" }] }),
    consentField,
    approvedRequiresConsent,
  ],
  validation: (rule) =>
    rule.custom((doc) => (doc?.youtubeUrl || doc?.file ? true : "Add a YouTube link or upload a file.")),
  preview: {
    select: { title: "title", approved: "approved", media: "poster" },
    prepare: ({ title, approved, media }) => ({ title: `${approved ? "" : "[Not approved] "}${title}`, media }),
  },
});
