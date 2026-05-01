import { defineType, defineField } from "sanity";

export const partnerSchema = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logoHeight",
      title: "Logo Height (px)",
      type: "number",
      description: "Used to maintain correct aspect ratio",
      initialValue: 45,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
