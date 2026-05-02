import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { bannerQuery } from "@/sanity/lib/queries";
import { BannerClient } from "@/components/BannerClient";

const FALLBACK_URL = "https://www.figma.com/api/mcp/asset/b50bbbe9-cb72-424e-b497-3d07188e23cf";

export async function Banner() {
  let data: any = null;
  try { data = await client.fetch(bannerQuery); } catch {}

  const imageUrl = data?.image ? urlFor(data.image).width(1728).url() : FALLBACK_URL;

  return <BannerClient imageUrl={imageUrl} />;
}
