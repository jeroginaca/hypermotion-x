import { defineField, defineType } from "sanity";

export const gallerySectionSchema = defineType({
  name: "gallerySection",
  title: "Gallery Section",
  type: "document",
  fields: [
    defineField({ name: "row1Quote", title: "Row 1 — Quote", type: "text" }),
    defineField({ name: "row1Logo", title: "Row 1 — Press Logo", type: "image" }),
    defineField({ name: "row1Image", title: "Row 1 — Car Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "row2Quote", title: "Row 2 — Quote", type: "text" }),
    defineField({ name: "row2Logo", title: "Row 2 — Press Logo", type: "image" }),
    defineField({ name: "row2Image", title: "Row 2 — Car Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "fullWidthImage", title: "Full-Width Image (Desktop)", type: "image", options: { hotspot: true } }),
    defineField({ name: "fullWidthMobileImage", title: "Full-Width Image (Mobile)", type: "image", options: { hotspot: true } }),
  ],
});
