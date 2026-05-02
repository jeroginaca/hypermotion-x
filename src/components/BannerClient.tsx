"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DoubleCta } from "@/components/DoubleCta";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = { imageUrl: string };

export function BannerClient({ imageUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Three-block colour wipe — triggers once on scroll into view
    gsap.to(".banner-overlay", {
      scaleX: 0,
      duration: 0.9,
      ease: "power3.inOut",
      stagger: { each: 0.3, from: "end" },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
        once: true,
      },
    });

    // Parallax zoom — scrubbed while the banner scrolls through the viewport
    gsap.to(".banner-img-zoom", {
      scale: 1.25,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-col gap-6 items-start w-full overflow-hidden">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1728 / 680", borderRadius: "16px" }}>
        <Image src={imageUrl} alt="Hypermotion X" fill unoptimized sizes="100vw" className="object-cover banner-img-zoom" />

        {/* Three colour overlays — same order as hero (dark bottom, white middle, red top) */}
        <div className="banner-overlay absolute inset-0 bg-dark     pointer-events-none" style={{ transformOrigin: "right center", borderRadius: "16px" }} />
        <div className="banner-overlay absolute inset-0 bg-off-white pointer-events-none" style={{ transformOrigin: "right center", borderRadius: "16px" }} />
        <div className="banner-overlay absolute inset-0 bg-primary   pointer-events-none" style={{ transformOrigin: "right center", borderRadius: "16px" }} />
      </div>

      <DoubleCta />
    </div>
  );
}
