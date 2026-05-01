import { Features } from "@/components/Features";

/*
  Desktop: "REDEFINING SPEED" — 288px, Bold, uppercase, dark, leading 0.9, tracking -0.18rem
  Mobile:  "Redefining Speed" — 88px,  Regular, no uppercase, dark, leading 0.9, tracking -0.165rem
*/
export function FeaturesSection() {
  return (
    <section className="flex flex-col items-start w-full">
      <h2
        className="font-display text-dark leading-[0.9] w-full
                   font-normal tracking-[-0.165rem]
                   md:font-bold md:uppercase md:tracking-[-0.18rem]"
        style={{ fontSize: "var(--section-title-size)" }}
      >
        Redefining Speed
      </h2>
      <Features />
    </section>
  );
}
