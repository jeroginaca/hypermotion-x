import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { heroQuery } from "@/sanity/lib/queries";
import { HeroClient } from "@/components/HeroClient";

const FALLBACK = {
  title: "Electrifying the Future",
  desktopUrl: "https://www.figma.com/api/mcp/asset/4b848ddf-2b7d-40a3-8581-4e22e5c6b53b",
  mobileUrl:  "https://www.figma.com/api/mcp/asset/d380ed90-7752-48c2-8d80-ddb6b55027cf",
};

export async function Hero({ primaryCta, secondaryCta }: { primaryCta?: string; secondaryCta?: string }) {
  let data: any = null;
  try { data = await client.fetch(heroQuery); } catch {}

  return (
    <HeroClient
      title={data?.title ?? FALLBACK.title}
      desktopUrl={data?.desktopImage ? urlFor(data.desktopImage).width(1728).url() : FALLBACK.desktopUrl}
      mobileUrl={data?.mobileImage  ? urlFor(data.mobileImage).width(900).url()  : FALLBACK.mobileUrl}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    />
  );
}
