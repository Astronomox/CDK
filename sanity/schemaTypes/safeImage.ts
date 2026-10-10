import { defineField, defineType } from "sanity";

/**
 * Image with alt text and safeguarding flags. Any image marked as showing
 * identifiable children is hidden on the website unless consent is confirmed.
 */
export const safeImage = defineType({
  name: "safeImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe what is happening for people using screen readers. Do not include children's names.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "showsIdentifiableChildren",
      title: "Shows identifiable children",
      type: "boolean",
      initialValue: false,
      description: "Tick if any child's face or identity can be recognised in this image.",
    }),
    defineField({
      name: "consentConfirmed",
      title: "Media consent confirmed",
      type: "boolean",
      initialValue: false,
      description: "Parent or guardian media consent is on file for every identifiable child in this image.",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { showsIdentifiableChildren?: boolean } | undefined;
          if (parent?.showsIdentifiableChildren && value !== true) {
            return "This image shows identifiable children. Confirm consent or it will not appear on the website.";
          }
          return true;
        }),
    }),
  ],
});
