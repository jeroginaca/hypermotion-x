import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { bannerQuery } from "@/sanity/lib/queries";
import { DoubleCta } from "@/components/DoubleCta";

const FALLBACK_URL = "https://www.figma.com/api/mcp/asset/b50bbbe9-cb72-424e-b497-3d07188e23cf";

export async function Banner() {
  let data: any = null;
  try { data = await client.fetch(bannerQuery); } catch {}

  const imageUrl = data?.image ? urlFor(data.image).width(1728).url() : FALLBACK_URL;

  return (
    <div className="flex flex-col gap-6 items-start w-full overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: "1728 / 680" }}>
        <Image src={imageUrl} alt="Hypermotion X" fill unoptimized sizes="100vw" className="object-cover" />
      </div>
      <DoubleCta />
    </div>
  );
}
