import Image from "next/image";
import { DoubleCta } from "@/components/DoubleCta";

// Desktop: landscape 1728×680
const desktopImageUrl =
  "https://www.figma.com/api/mcp/asset/4b848ddf-2b7d-40a3-8581-4e22e5c6b53b";

// Mobile: portrait 450×680 (different crop)
const mobileImageUrl =
  "https://www.figma.com/api/mcp/asset/d380ed90-7752-48c2-8d80-ddb6b55027cf";

export function Hero() {
  return (
    <section className="bg-off-white flex flex-col items-center overflow-hidden isolate w-full">

      {/*
        Title
        Mobile  → 120px on 450px frame = 26.7vw, left-aligned, Medium (500)
        Desktop → 288px on 1728px frame = 16.7vw (capped at 18rem), centered, Bold (700)
        Letter-spacing is -0.01em on both sizes, so a single value works.
      */}
      <h1
        className="font-display text-dark uppercase w-full pt-6 relative z-[2] leading-[0.9] tracking-[-0.01em]
                   text-left font-medium
                   md:text-center md:font-bold"
        style={{ fontSize: "var(--hero-title-size)" }}
      >
        Electrifying the Future
      </h1>

      {/* Hero container */}
      <div className="flex flex-col items-center w-full relative z-[1] gap-6">

        {/* Mobile image — portrait 450×680, rounded corners, shown below md */}
        <div
          className="relative w-full overflow-hidden rounded-2xl md:hidden"
          style={{ aspectRatio: "450 / 680" }}
        >
          <Image
            src={mobileImageUrl}
            alt="Hypermotion X electric supercar"
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Desktop image — landscape 1728×680, shown at md+ */}
        <div
          className="relative w-full hidden md:block"
          style={{ aspectRatio: "1728 / 680" }}
        >
          <Image
            src={desktopImageUrl}
            alt="Hypermotion X electric supercar"
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <DoubleCta />

      </div>
    </section>
  );
}
