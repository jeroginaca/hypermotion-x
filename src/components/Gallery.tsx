import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { gallerySectionQuery } from "@/sanity/lib/queries";
import { GalleryClient } from "@/components/GalleryClient";

const F = {
  row1Quote: "Hyperion X has been hailed as the most thrilling electric supercar of the year.",
  row1Logo:   "https://www.figma.com/api/mcp/asset/363cfb74-95fa-47d0-a72c-9cd8d265f451",
  row1Image:  "https://www.figma.com/api/mcp/asset/210b51a4-403e-47a8-a7e1-3442547505f9",
  row2Quote:  "A groundbreaking fusion of speed, luxury, and electric innovation.",
  row2Logo:   "https://www.figma.com/api/mcp/asset/fc33ceeb-ae38-4042-af4d-6c21ca28bd7a",
  row2Image:  "https://www.figma.com/api/mcp/asset/ae2f6e4c-0c8a-4e40-935a-f29fe309208c",
  fullWidth:  "https://www.figma.com/api/mcp/asset/6fa6f8db-d25c-4484-8ee2-cbdc14a24bf8",
  fullMobile: "https://www.figma.com/api/mcp/asset/74dd47ad-6cc7-4fc7-bd2e-afcbf831c3cc",
};

function u(field: any, fallback: string, width = 1200) {
  return field ? urlFor(field).width(width).url() : fallback;
}

export async function Gallery() {
  let d: any = null;
  try { d = await client.fetch(gallerySectionQuery); } catch {}

  return (
    <GalleryClient
      row1Quote={d?.row1Quote ?? F.row1Quote}
      row1LogoUrl={u(d?.row1Logo,  F.row1Logo,  300)}
      row1ImageUrl={u(d?.row1Image, F.row1Image, 1100)}
      row2Quote={d?.row2Quote ?? F.row2Quote}
      row2LogoUrl={u(d?.row2Logo,  F.row2Logo,  300)}
      row2ImageUrl={u(d?.row2Image, F.row2Image, 1100)}
      fullWidthUrl={u(d?.fullWidthImage,       F.fullWidth,  1728)}
      fullWidthMobileUrl={u(d?.fullWidthMobileImage, F.fullMobile, 1024)}
    />
  );
}
