"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "@/components/AnimatedHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Logo = { _id: string; name: string; logoUrl: string; logoHeight: number };

type Props = { heading: string; logos: Logo[] };

export function PartnersClient({ heading, logos }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".partner-logo", { opacity: 0, y: 24 });

    gsap.to(".partner-logo", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-col md:flex-row md:items-end w-full overflow-hidden">
      <AnimatedHeading
        text={heading}
        className="flex-1 min-w-0 font-display font-bold text-dark uppercase leading-[0.9] tracking-[-0.01em] md:whitespace-nowrap"
        style={{ fontSize: "var(--section-title-size)" }}
      />

      <div className="
        flex flex-row flex-wrap items-center gap-[4.125rem] mt-8
        md:flex-col md:flex-nowrap md:justify-between md:items-start
        md:self-stretch md:w-[12.5rem] md:shrink-0 md:gap-0 md:mt-0 md:pb-8
      ">
        {logos.map((logo) => (
          <div
            key={logo._id}
            className="partner-logo relative shrink-0 w-[12.5rem]"
            style={{ height: `${(logo.logoHeight / 16).toFixed(3)}rem` }}
          >
            <Image
              src={logo.logoUrl}
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
