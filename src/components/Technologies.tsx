import { CardOnlyText } from "@/components/CardOnlyText";

/*
  2×2 grid of CardOnlyText cards.
  Mobile  (< md): all 4 cards stack in a single column
  Tablet+ (md+):  2 cards per row side by side
*/

const rows = [
  ["Next-gen battery", "Predictive AI driving system"],
  ["Adaptive lighting system", "Smart home and app connectivity"],
];

export function Technologies() {
  return (
    <div className="flex flex-col items-start w-full">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex flex-col md:flex-row items-start w-full"
        >
          {row.map((label) => (
            <CardOnlyText
              key={label}
              label={label}
              className="md:flex-1 md:min-w-0"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
