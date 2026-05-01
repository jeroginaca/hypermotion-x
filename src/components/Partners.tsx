import Image from "next/image";

/*
  Mobile  (< md): flex-col — heading full-width, logos in a horizontal row below
  Tablet+ (≥ md): flex-row — heading on the left (flex-1),
                             logos stacked vertically in a right column (12.5rem = 200px),
                             spread top-to-bottom with justify-between across the heading height
*/

const logos = [
  {
    name: "Bosch",
    src: "https://www.figma.com/api/mcp/asset/747808f2-f41e-4a16-868c-f69ae8b0938e",
    height: 45.161,
  },
  {
    name: "Nvidia",
    src: "https://www.figma.com/api/mcp/asset/a62ee9ba-0187-4cc0-b33c-39035c28e7ef",
    height: 38,
  },
  {
    name: "Brembo",
    src: "https://www.figma.com/api/mcp/asset/43109884-7a10-4f16-b5d0-c8e920ed1223",
    height: 46.302,
  },
  {
    name: "Pirelli",
    src: "https://www.figma.com/api/mcp/asset/0a9aa02d-fb15-41ac-ba4d-632933a379b5",
    height: 42.52,
  },
];

export function Partners() {
  return (
    <div className="flex flex-col md:flex-row md:items-end w-full overflow-hidden">

      {/* Heading — same responsive size token as section titles */}
      <p
        className="flex-1 min-w-0 font-display font-bold text-dark uppercase leading-[0.9] tracking-[-0.01em]"
        style={{ fontSize: "var(--section-title-size)" }}
      >
        Created in partnership with industry leaders
      </p>

      {/*
        Logos
        Mobile:  flex-row wrap, gap 66px (4.125rem)
        Tablet+: flex-col, 12.5rem (200px) wide column, justify-between to span
                 the full height of the heading block
      */}
      <div className="
        flex flex-row flex-wrap items-center gap-[4.125rem] mt-8
        md:flex-col md:flex-nowrap md:justify-between md:items-start
        md:self-stretch md:w-[12.5rem] md:shrink-0 md:gap-0 md:mt-0 md:pb-8
      ">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="relative shrink-0 w-[12.5rem]"
            style={{ height: `${(logo.height / 16).toFixed(3)}rem` }}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              unoptimized
              sizes="200px"
              className="object-contain object-center md:object-left"
            />
          </div>
        ))}
      </div>

    </div>
  );
}
