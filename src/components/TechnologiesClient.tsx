"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardOnlyText } from "@/components/CardOnlyText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = { rows: string[][] };

export function TechnologiesClient({ rows }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".tech-card", { clipPath: "inset(0 0 100% 0)" });

    gsap.to(".tech-card", {
      clipPath: "inset(0 0 0% 0)",
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-col items-start w-full">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col md:flex-row items-start w-full">
          {row.map((label) => (
            <div key={label} className="tech-card md:flex-1 md:min-w-0 w-full">
              <CardOnlyText label={label} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
