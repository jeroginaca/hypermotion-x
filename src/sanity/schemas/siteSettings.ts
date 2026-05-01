import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "primaryCta", title: "Primary CTA", type: "string" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "string" }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string", title: "Label" }),
          defineField({ name: "href", type: "string", title: "Href" }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }],
    }),
  ],
});
