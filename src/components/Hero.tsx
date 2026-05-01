import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { heroQuery } from "@/sanity/lib/queries";
import { DoubleCta } from "@/components/DoubleCta";

const FALLBACK = {
  title: "Electrifying the Future",
  desktopImage: null,
  mobileImage: null,
  desktopUrl: "https://www.figma.com/api/mcp/asset/4b848ddf-2b7d-40a3-8581-4e22e5c6b53b",
  mobileUrl: "https://www.figma.com/api/mcp/asset/d380ed90-7752-48c2-8d80-ddb6b55027cf",
};

export async function Hero() {
  let data: any = null;
  try { data = await client.fetch(heroQuery); } catch {}

  const title = data?.title ?? FALLBACK.title;
  const desktopUrl = data?.desktopImage ? urlFor(data.desktopImage).width(1728).url() : FALLBACK.desktopUrl;
  const mobileUrl  = data?.mobileImage  ? urlFor(data.mobileImage).width(900).url()  : FALLBACK.mobileUrl;

  return (
    <section className="bg-off-white flex flex-col items-center overflow-hidden isolate w-full">
      <h1
        className="font-display text-dark uppercase w-full pt-6 relative z-[2] leading-[0.9] tracking-[-0.01em]
                   text-left font-medium md:text-center md:font-bold"
        style={{ fontSize: "var(--hero-title-size)" }}
      >
        {title}
      </h1>

      <div className="flex flex-col items-center w-full relative z-[1] gap-6">
        {/* Mobile image */}
        <div className="relative w-full overflow-hidden rounded-2xl md:hidden" style={{ aspectRatio: "450 / 680" }}>
          <Image src={mobileUrl} alt={title} fill unoptimized priority sizes="100vw" className="object-cover" />
        </div>
        {/* Desktop image */}
        <div className="relative w-full hidden md:block" style={{ aspectRatio: "1728 / 680" }}>
          <Image src={desktopUrl} alt={title} fill unoptimized priority sizes="100vw" className="object-cover" />
        </div>

        <DoubleCta />
      </div>
    </section>
  );
}
