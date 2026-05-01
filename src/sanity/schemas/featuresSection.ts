import { defineField, defineType } from "sanity";

export const featuresSectionSchema = defineType({
  name: "featuresSection",
  title: "Features Section",
  type: "document",
  fields: [
    defineField({ name: "sectionTitle", title: "Section Title", type: "string" }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "label", media: "image" } },
      }],
    }),
  ],
});
