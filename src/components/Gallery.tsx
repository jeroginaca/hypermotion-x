import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { gallerySectionQuery } from "@/sanity/lib/queries";
import { Button } from "@/components/Button";

const F = {
  row1Quote: "Hyperion X has been hailed as the most thrilling electric supercar of the year.",
  row1Logo:   "https://www.figma.com/api/mcp/asset/363cfb74-95fa-47d0-a72c-9cd8d265f451",
  row1Image:  "https://www.figma.com/api/mcp/asset/210b51a4-403e-47a8-a7e1-3442547505f9",
  row2Quote: "A groundbreaking fusion of speed, luxury, and electric innovation.",
  row2Logo:   "https://www.figma.com/api/mcp/asset/fc33ceeb-ae38-4042-af4d-6c21ca28bd7a",
  row2Image:  "https://www.figma.com/api/mcp/asset/ae2f6e4c-0c8a-4e40-935a-f29fe309208c",
  fullWidthImage:       "https://www.figma.com/api/mcp/asset/6fa6f8db-d25c-4484-8ee2-cbdc14a24bf8",
  fullWidthMobileImage: "https://www.figma.com/api/mcp/asset/74dd47ad-6cc7-4fc7-bd2e-afcbf831c3cc",
};

function u(field: any, fallback: string, width = 1200) {
  return field ? urlFor(field).width(width).url() : fallback;
}

export async function Gallery() {
  let d: any = null;
  try { d = await client.fetch(gallerySectionQuery); } catch {}

  return (
    <div className="flex flex-col w-full gap-[5rem] md:gap-[7.5rem]">

      {/* Row 1 — image left, quote right */}
      <div className="flex flex-col md:flex-row md:items-center gap-[3rem] w-full">
        <div className="flex flex-col gap-6 w-full md:hidden">
          <p className="font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem]">
            "{d?.row1Quote ?? F.row1Quote}"
          </p>
          <div className="relative w-[16.0625rem] h-[3.5625rem] shrink-0">
            <Image src={u(d?.row1Logo, F.row1Logo, 300)} alt="Press logo" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>
        <div className="relative w-full md:w-[59%] shrink-0 overflow-hidden" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={u(d?.row1Image, F.row1Image, 1100)} alt="Hyperion X" fill unoptimized priority sizes="(max-width:768px) 100vw, 59vw" className="object-cover" />
        </div>
        <div className="hidden md:flex flex-col flex-1 gap-6 justify-center self-stretch">
          <p className="font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem]">
            "{d?.row1Quote ?? F.row1Quote}"
          </p>
          <div className="relative w-[16.0625rem] h-[3.5625rem] shrink-0">
            <Image src={u(d?.row1Logo, F.row1Logo, 300)} alt="Press logo" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>
      </div>

      {/* Row 2 — quote left (right-aligned), image right */}
      <div className="flex flex-col md:flex-row md:items-center gap-[3rem] w-full">
        <div className="flex flex-col gap-6 w-full items-end md:flex-1 md:self-stretch md:justify-center">
          <p className="font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem] text-right">
            "{d?.row2Quote ?? F.row2Quote}"
          </p>
          <div className="relative w-[16.0625rem] h-[2.5rem] shrink-0">
            <Image src={u(d?.row2Logo, F.row2Logo, 300)} alt="Press logo" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>
        <div className="relative w-full md:w-[59%] shrink-0 overflow-hidden" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={u(d?.row2Image, F.row2Image, 1100)} alt="Hyperion X" fill unoptimized sizes="(max-width:768px) 100vw, 59vw" className="object-cover" />
        </div>
      </div>

      {/* Full-width image + CTA */}
      <div className="flex flex-col gap-6 w-full">
        <div className="relative w-full hidden md:block" style={{ aspectRatio: "1728 / 680" }}>
          <Image src={u(d?.fullWidthImage, F.fullWidthImage, 1728)} alt="Hypermotion X" fill unoptimized sizes="100vw" className="object-cover" />
        </div>
        <div className="relative w-full md:hidden" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={u(d?.fullWidthMobileImage, F.fullWidthMobileImage, 1024)} alt="Hypermotion X" fill unoptimized sizes="100vw" className="object-cover" />
        </div>
        <Button variant="solid" className="w-full">Book Your Test Drive</Button>
      </div>

    </div>
  );
}
