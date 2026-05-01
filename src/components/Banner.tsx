import Image from "next/image";
import { DoubleCta } from "@/components/DoubleCta";

const bannerImageUrl =
  "https://www.figma.com/api/mcp/asset/b50bbbe9-cb72-424e-b497-3d07188e23cf";

export function Banner() {
  return (
    <div className="flex flex-col gap-6 items-start w-full overflow-hidden">
      {/* Image — 1728×680 landscape ratio from Figma */}
      <div className="relative w-full" style={{ aspectRatio: "1728 / 680" }}>
        <Image
          src={bannerImageUrl}
          alt="Hypermotion X"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <DoubleCta />
    </div>
  );
}
