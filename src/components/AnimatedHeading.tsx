"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

/*
  Reusable word-split heading — same clip-up + opacity reveal as the hero,
  but triggered by ScrollTrigger instead of page load.
  Each word is wrapped in an overflow-hidden mask; the inner span animates
  yPercent 115 → 0 with a stagger when the heading enters the viewport.
*/
export function AnimatedHeading({ text, className, style }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useGSAP(() => {
    const spans = ref.current?.querySelectorAll<HTMLElement>(".ah-word");
    if (!spans?.length) return;

    gsap.set(spans, { yPercent: 115, opacity: 0 });

    gsap.to(spans, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
    });
  }, { scope: ref });

  return (
    <h2 ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden leading-[0.95] align-top${i < words.length - 1 ? " mr-[0.2em]" : ""}`}
        >
          <span className="ah-word inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}
