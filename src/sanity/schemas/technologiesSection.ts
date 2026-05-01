import { defineField, defineType } from "sanity";

export const technologiesSectionSchema = defineType({
  name: "technologiesSection",
  title: "Technologies Section",
  type: "document",
  fields: [
    defineField({
      name: "cards",
      title: "Technology Cards",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "label" } },
      }],
    }),
  ],
});
