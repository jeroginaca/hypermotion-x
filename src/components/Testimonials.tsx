import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { testimonialsQuery } from "@/sanity/lib/queries";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

// Fallback data used until Sanity content is populated
const FALLBACK = [
  {
    _id: "fallback-1",
    quote: "A driving experience that redefines the impossible.",
    author: "Luca Ferrari, Professional Driver",
    photo: null,
    photoUrl: "https://www.figma.com/api/mcp/asset/485cb531-7f6e-439d-a117-3dc525a329ec",
    imageLeft: true,
  },
  {
    _id: "fallback-2",
    quote: "The future of luxury mobility, today.",
    author: "Sofia Marconi, CEO Hyperion Motors.",
    photo: null,
    photoUrl: "https://www.figma.com/api/mcp/asset/e3d2c861-6ba8-4285-86b5-6de2c45a0131",
    imageLeft: false,
  },
];

export async function Testimonials() {
  let sanityItems: any[] = [];

  try {
    sanityItems = await client.fetch(testimonialsQuery);
  } catch {
    // Sanity not configured yet — use fallback
  }

  const items =
    sanityItems.length > 0
      ? sanityItems.map((t: any, i: number) => ({
          _id: t._id,
          quote: t.quote,
          author: t.author,
          photoUrl: t.photo ? urlFor(t.photo).width(700).url() : "",
          imageLeft: i % 2 === 0,
        }))
      : FALLBACK;

  return <TestimonialsCarousel items={items} />;
}
