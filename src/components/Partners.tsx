import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { partnersQuery } from "@/sanity/lib/queries";

const FALLBACK = [
  { _id: "bosch",   name: "Bosch",   logoUrl: "https://www.figma.com/api/mcp/asset/747808f2-f41e-4a16-868c-f69ae8b0938e", logoHeight: 45.161 },
  { _id: "nvidia",  name: "Nvidia",  logoUrl: "https://www.figma.com/api/mcp/asset/a62ee9ba-0187-4cc0-b33c-39035c28e7ef", logoHeight: 38 },
  { _id: "brembo",  name: "Brembo",  logoUrl: "https://www.figma.com/api/mcp/asset/43109884-7a10-4f16-b5d0-c8e920ed1223", logoHeight: 46.302 },
  { _id: "pirelli", name: "Pirelli", logoUrl: "https://www.figma.com/api/mcp/asset/0a9aa02d-fb15-41ac-ba4d-632933a379b5", logoHeight: 42.52 },
];

export async function Partners() {
  let sanityItems: any[] = [];

  try {
    sanityItems = await client.fetch(partnersQuery);
  } catch {
    // Sanity not configured yet — use fallback
  }

  const logos =
    sanityItems.length > 0
      ? sanityItems.map((p: any) => ({
          _id: p._id,
          name: p.name,
          logoUrl: p.logo ? urlFor(p.logo).width(400).url() : "",
          logoHeight: p.logoHeight ?? 45,
        }))
      : FALLBACK;

  return (
    <div className="flex flex-col md:flex-row md:items-end w-full overflow-hidden">
      <p
        className="flex-1 min-w-0 font-display font-bold text-dark uppercase leading-[0.9] tracking-[-0.01em]"
        style={{ fontSize: "var(--section-title-size)" }}
      >
        Created in partnership with industry leaders
      </p>

      <div className="
        flex flex-row flex-wrap items-center gap-[4.125rem] mt-8
        md:flex-col md:flex-nowrap md:justify-between md:items-start
        md:self-stretch md:w-[12.5rem] md:shrink-0 md:gap-0 md:mt-0 md:pb-8
      ">
        {logos.map((logo) => (
          <div
            key={logo._id}
            className="relative shrink-0 w-[12.5rem]"
            style={{ height: `${(logo.logoHeight / 16).toFixed(3)}rem` }}
          >
            <Image
              src={logo.logoUrl}
              alt={logo.name}
              fill
              unoptimized
              sizes="200px"
              className="object-contain object-center md:object-left"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
