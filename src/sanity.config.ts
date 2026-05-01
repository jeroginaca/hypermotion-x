import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas, singletonTypes } from "@/sanity/schemas";

const S_item = (S: any, id: string, title: string, icon?: string) =>
  S.listItem()
    .id(id)
    .title(title)
    .child(S.document().schemaType(id).documentId(`singleton-${id}`));

export default defineConfig({
  name: "hypermotion-x",
  title: "Hypermotion X",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Hypermotion X")
          .items([
            S_item(S, "siteSettings", "⚙️  Site Settings"),
            S.divider(),
            S_item(S, "hero", "🚗  Hero"),
            S_item(S, "featuresSection", "⚡  Features Section"),
            S_item(S, "partnersSection", "🤝  Partners Section"),
            S_item(S, "banner", "🖼️  Banner"),
            S_item(S, "technologiesSection", "🔬  Technologies Section"),
            S_item(S, "gallerySection", "📷  Gallery Section"),
            S_item(S, "footer", "📌  Footer"),
            S.divider(),
            S.documentTypeListItem("testimonial").title("💬  Testimonials"),
            S.documentTypeListItem("partner").title("🏢  Partners"),
          ]),
    }),
  ],
  schema: {
    types: schemas,
    templates: (t) => t.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  basePath: "/studio",
});
