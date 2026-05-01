import { client } from "@/sanity/lib/client";
import { technologiesSectionQuery } from "@/sanity/lib/queries";
import { CardOnlyText } from "@/components/CardOnlyText";

const FALLBACK_ROWS = [
  ["Next-gen battery", "Predictive AI driving system"],
  ["Adaptive lighting system", "Smart home and app connectivity"],
];

export async function Technologies() {
  let data: any = null;
  try { data = await client.fetch(technologiesSectionQuery); } catch {}

  const cards: string[] = data?.cards?.map((c: any) => c.label) ?? FALLBACK_ROWS.flat();
  const rows = [cards.slice(0, 2), cards.slice(2, 4)];

  return (
    <div className="flex flex-col items-start w-full">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col md:flex-row items-start w-full">
          {row.map((label) => (
            <CardOnlyText key={label} label={label} className="md:flex-1 md:min-w-0" />
          ))}
        </div>
      ))}
    </div>
  );
}
