import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { featuresSectionQuery } from "@/sanity/lib/queries";
import { FeaturesGrid } from "@/components/Features";

const FALLBACK = {
  sectionTitle: "Redefining Speed",
  features: [
    { label: "Speed & Performance",     imageUrl: "https://www.figma.com/api/mcp/asset/d4a4304b-c64f-4341-8a2b-53440b44ae5e" },
    { label: "Advanced Electric Motor", imageUrl: "https://www.figma.com/api/mcp/asset/aa834d37-acc6-4dc3-8aea-431d368fd65a" },
    { label: "Range & Charging",        imageUrl: "https://www.figma.com/api/mcp/asset/d11c2af4-cf7c-48a9-a2cc-7d587cc51ab0" },
    { label: "Futuristic Design",       imageUrl: "https://www.figma.com/api/mcp/asset/53660613-b5a4-4d13-8b64-edb1302b3334" },
    { label: "Interior Technology",     imageUrl: "https://www.figma.com/api/mcp/asset/7edcb730-9d15-4123-b0c9-8a2fb2e3b8c1" },
    { label: "Sustainability",          imageUrl: "https://www.figma.com/api/mcp/asset/54fd1901-06b6-4f56-8e2e-6f02a82bc74f" },
  ],
};

export async function FeaturesSection() {
  let data: any = null;
  try { data = await client.fetch(featuresSectionQuery); } catch {}

  const sectionTitle = data?.sectionTitle ?? FALLBACK.sectionTitle;
  const features = data?.features?.length
    ? data.features.map((f: any) => ({
        label:    f.label,
        imageUrl: f.image ? urlFor(f.image).width(900).url() : "",
      }))
    : FALLBACK.features;

  return (
    <section className="flex flex-col items-start w-full">
      <h2
        className="font-display text-dark leading-[0.9] w-full font-normal tracking-[-0.165rem] md:font-bold md:uppercase md:tracking-[-0.18rem]"
        style={{ fontSize: "var(--section-title-size)" }}
      >
        {sectionTitle}
      </h2>
      <FeaturesGrid features={features} />
    </section>
  );
}
