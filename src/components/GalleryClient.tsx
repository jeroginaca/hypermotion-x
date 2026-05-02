"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const overlayStyle = { transformOrigin: "right center", borderRadius: "8px" };

type Props = {
  row1Quote: string; row1LogoUrl: string; row1ImageUrl: string;
  row2Quote: string; row2LogoUrl: string; row2ImageUrl: string;
  fullWidthUrl: string; fullWidthMobileUrl: string;
};

export function GalleryClient({
  row1Quote, row1LogoUrl, row1ImageUrl,
  row2Quote, row2LogoUrl, row2ImageUrl,
  fullWidthUrl, fullWidthMobileUrl,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Row 1 image — slides in from LEFT + opacity 0→1 ──────────────
    gsap.fromTo(".g-img-row1",
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".g-row1", start: "top 80%", once: true } }
    );

    // ── Row 2 image — slides in from RIGHT + opacity 0→1 ─────────────
    gsap.fromTo(".g-img-row2",
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".g-row2", start: "top 80%", once: true } }
    );

    // ── Quotes + logos fade + rise (both rows) ────────────────────────
    [".g-row1", ".g-row2"].forEach((sel) => {
      const row = ref.current?.querySelector(sel);
      if (!row) return;
      gsap.set(row.querySelectorAll(".g-quote, .g-logo"), { y: 30, opacity: 0 });
      gsap.to(row.querySelectorAll(".g-quote"), {
        y: 0, opacity: 1, duration: 0.8, ease: "power4.out",
        scrollTrigger: { trigger: row as Element, start: "top 80%", once: true },
        delay: 0.3,
      });
      gsap.to(row.querySelectorAll(".g-logo"), {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: row as Element, start: "top 80%", once: true },
        delay: 0.55,
      });
    });

    // ── Full-width image — subtle rise from bottom + parallax zoom ────
    gsap.fromTo(".g-full-img",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".g-full-row", start: "top 85%", once: true } }
    );

    gsap.to(".g-full-zoom", {
      scale: 1.2, ease: "none",
      scrollTrigger: { trigger: ".g-full-row", start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="flex flex-col w-full gap-[5rem] md:gap-[7.5rem]">

      {/* ── Row 1 — image left, quote right ───────────────────────────── */}
      <div className="g-row1 flex flex-col md:flex-row md:items-center gap-[3rem] w-full">
        {/* Mobile quote */}
        <div className="flex flex-col gap-6 w-full md:hidden">
          <p className="g-quote font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem]">"{row1Quote}"</p>
          <div className="g-logo relative w-[16.0625rem] h-[3.5625rem] shrink-0">
            <Image src={row1LogoUrl} alt="Press logo" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>

        {/* Image — slides from left */}
        <div className="g-img-row1 relative overflow-hidden w-full md:w-[59%] shrink-0" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={row1ImageUrl} alt="Hyperion X" fill unoptimized priority sizes="(max-width:768px) 100vw, 59vw" className="object-cover" />
        </div>

        {/* Desktop quote */}
        <div className="hidden md:flex flex-col flex-1 gap-6 justify-center self-stretch">
          <p className="g-quote font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem]">"{row1Quote}"</p>
          <div className="g-logo relative w-[16.0625rem] h-[3.5625rem] shrink-0">
            <Image src={row1LogoUrl} alt="Press logo" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>
      </div>

      {/* ── Row 2 — quote left, image right ───────────────────────────── */}
      <div className="g-row2 flex flex-col md:flex-row md:items-center gap-[3rem] w-full">
        <div className="flex flex-col gap-6 w-full items-end md:flex-1 md:self-stretch md:justify-center">
          <p className="g-quote font-display font-normal text-dark leading-[0.9] tracking-[-0.165rem] text-[5.5rem] text-right">"{row2Quote}"</p>
          <div className="g-logo relative w-[16.0625rem] h-[2.5rem] shrink-0">
            <Image src={row2LogoUrl} alt="Press logo" fill unoptimized sizes="257px" className="object-contain object-left" />
          </div>
        </div>

        {/* Image — slides from right */}
        <div className="g-img-row2 relative overflow-hidden w-full md:w-[59%] shrink-0" style={{ aspectRatio: "1024 / 680" }}>
          <Image src={row2ImageUrl} alt="Hyperion X" fill unoptimized sizes="(max-width:768px) 100vw, 59vw" className="object-cover" />
        </div>
      </div>

      {/* ── Row 3 — full-width + CTA ───────────────────────────────────── */}
      <div className="g-full-row flex flex-col gap-6 w-full">
        <div className="g-full-img relative w-full hidden md:block overflow-hidden" style={{ aspectRatio: "1728 / 680", borderRadius: "16px" }}>
          <Image src={fullWidthUrl} alt="Hypermotion X" fill unoptimized sizes="100vw" className="object-cover g-full-zoom" />
        </div>
        <div className="g-full-img relative w-full md:hidden overflow-hidden" style={{ aspectRatio: "1024 / 680", borderRadius: "16px" }}>
          <Image src={fullWidthMobileUrl} alt="Hypermotion X" fill unoptimized sizes="100vw" className="object-cover g-full-zoom" />
        </div>
        <Button variant="solid" className="w-full">Book Your Test Drive</Button>
      </div>

    </div>
  );
}
