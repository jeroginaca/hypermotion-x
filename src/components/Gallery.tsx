import Image from "next/image";
import { Button } from "@/components/Button";

/*
  Three sections:

  Section 1 — Image LEFT (desktop) / Quote above image (mobile)
    Quote: "Hyperion X has been hailed…" + TopGear logo

  Section 2 — Image RIGHT, quote right-aligned (desktop) / Quote above image (mobile)
    Quote: "A groundbreaking fusion…" + CarAndDriver logo

  Section 3 — Full-width image + solid CTA button below

  Desktop gap between sections: 7.5rem (120px)
  Mobile gap:                   5rem  (80px)

  Image split desktop: ~59% image / ~41% text (mirrors Figma's 1024px / 656px)
*/

const topGearLogo =
  "https://www.figma.com/api/mcp/asset/363cfb74-95fa-47d0-a72c-9cd8d265f451";
const carDriverLogo =
  "https://www.figma.com/api/mcp/asset/fc33ceeb-ae38-4042-af4d-6c21ca28bd7a";

const img1 = "https://www.figma.com/api/mcp/asset/210b51a4-403e-47a8-a7e1-3442547505f9"; // side profile
const img2 = "https://www.figma.com/api/mcp/asset/ae2f6e4c-0c8a-4e40-935a-f29fe309208c"; // rear detail
const imgFullDesktop = "https://www.figma.com/api/mcp/asset/6fa6f8db-d25c-4484-8ee2-cbdc14a24bf8"; // full-width desktop
const imgFullMobile  = "https://www.figma.com/api/mcp/asset/74dd47ad-6cc7-4fc7-bd2e-afcbf831c3cc"; // full-width mobile/tablet

export function Gallery() {
  return (
    <div className="flex flex-col w-full gap-[5rem] md:gap-[7.5rem]">

      {/* ── Section 1 ──────────────────────────────────────────────────── */}
      {/* Desktop: [Image 59%] [Quote 41%]  |  Mobile: Quote → Image       */}
      <div className="flex flex-col md:flex-row md:items-center gap-[3rem] w-full">

        {/* Quote — shown above image on mobile, hidden on desktop */}
        <div className="flex flex-col gap-6 w-full md:hidden">
          <p className="font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem]">
            "Hyperion X has been hailed as the most thrilling electric supercar of the year."
          </p>
          <div className="relative w-[16.0625rem] h-[3.5625rem] shrink-0">
            <Image src={topGearLogo} alt="Top Gear" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full md:w-[59%] shrink-0 overflow-hidden" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={img1} alt="Hyperion X side profile" fill unoptimized priority sizes="(max-width: 768px) 100vw, 59vw" className="object-cover" />
        </div>

        {/* Quote — desktop only (right column) */}
        <div className="hidden md:flex flex-col flex-1 gap-6 justify-center self-stretch">
          <p className="font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem]">
            "Hyperion X has been hailed as the most thrilling electric supercar of the year."
          </p>
          <div className="relative w-[16.0625rem] h-[3.5625rem] shrink-0">
            <Image src={topGearLogo} alt="Top Gear" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>

      </div>

      {/* ── Section 2 ──────────────────────────────────────────────────── */}
      {/* Desktop: [Quote 41%] [Image 59%]  |  Mobile: Quote → Image       */}
      <div className="flex flex-col md:flex-row md:items-center gap-[3rem] w-full">

        {/* Quote — mobile + desktop left column (right-aligned text) */}
        <div className="flex flex-col gap-6 w-full items-end md:flex-1 md:self-stretch md:justify-center">
          <p className="font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem] text-right">
            "A groundbreaking fusion of speed, luxury, and electric innovation."
          </p>
          <div className="relative w-[16.0625rem] h-[2.5rem] shrink-0">
            <Image src={carDriverLogo} alt="Car and Driver" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full md:w-[59%] shrink-0 overflow-hidden" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={img2} alt="Hyperion X rear detail" fill unoptimized sizes="(max-width: 768px) 100vw, 59vw" className="object-cover" />
        </div>

      </div>

      {/* ── Section 3 ──────────────────────────────────────────────────── */}
      {/* Full-width image + solid CTA                                      */}
      <div className="flex flex-col gap-6 w-full">

        {/* Desktop image */}
        <div className="relative w-full hidden md:block" style={{ aspectRatio: "1728 / 680" }}>
          <Image src={imgFullDesktop} alt="Hyperion X" fill unoptimized sizes="100vw" className="object-cover" />
        </div>

        {/* Mobile / tablet image */}
        <div className="relative w-full md:hidden" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={imgFullMobile} alt="Hyperion X" fill unoptimized sizes="100vw" className="object-cover" />
        </div>

        <Button variant="solid" className="w-full">Book Your Test Drive</Button>

      </div>

    </div>
  );
}
