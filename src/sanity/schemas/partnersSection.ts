import { defineField, defineType } from "sanity";

export const partnersSectionSchema = defineType({
  name: "partnersSection",
  title: "Partners Section",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
  ],
});
