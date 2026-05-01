import { defineField, defineType } from "sanity";

export const footerSchema = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Brand Name", type: "string" }),
    defineField({ name: "newsletterSubtitle", title: "Newsletter Subtitle", type: "text" }),
    defineField({ name: "newsletterCta", title: "Newsletter CTA Label", type: "string" }),
    defineField({
      name: "navLinks",
      title: "Nav Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string", title: "Label" }),
          defineField({ name: "href", type: "string", title: "Href" }),
        ],
        preview: { select: { title: "label" } },
      }],
    }),
    defineField({ name: "copyright", title: "Copyright", type: "string" }),
    defineField({ name: "socialIcons", title: "Social Icons Image", type: "image" }),
  ],
});
