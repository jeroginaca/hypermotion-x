import { defineField, defineType } from "sanity";

export const heroSchema = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "desktopImage", title: "Desktop Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "mobileImage", title: "Mobile Image", type: "image", options: { hotspot: true } }),
  ],
});
