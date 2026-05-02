import { client } from "@/sanity/lib/client";
import { technologiesSectionQuery } from "@/sanity/lib/queries";
import { TechnologiesClient } from "@/components/TechnologiesClient";

const FALLBACK_ROWS = [
  ["Next-gen battery", "Predictive AI driving system"],
  ["Adaptive lighting system", "Smart home and app connectivity"],
];

export async function Technologies() {
  let data: any = null;
  try { data = await client.fetch(technologiesSectionQuery); } catch {}

  const cards: string[] = data?.cards?.map((c: any) => c.label) ?? FALLBACK_ROWS.flat();
  const rows = [cards.slice(0, 2), cards.slice(2, 4)];

  return <TechnologiesClient rows={rows} />;
}
