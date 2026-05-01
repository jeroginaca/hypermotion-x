"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Button } from "@/components/Button";

gsap.registerPlugin(useGSAP);

type Props = {
  title: string;
  desktopUrl: string;
  mobileUrl: string;
  primaryCta?: string;
  secondaryCta?: string;
};

/*
  Animation sequence:
  1. Three colour blocks (red → white → dark) wipe off the image right→left,
     0.3s stagger between each. Uses matchMedia so only the visible image
     (mobile or desktop) drives the timing.
  2. Title words clip up from below, staggered per word.
  3. CTA buttons fade + slide up.

  Overlay stacking (bottom → top in DOM = bottom → top visually):
    dark (#2f2f2f) — last to sweep
    white (#fbfbfb) — sweeps second
    red  (#ea4062) — sweeps first (on top)
*/
function WordSplit({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden leading-[0.95]">
            <span className="hero-word inline-block">{word}</span>
          </span>
          {/* Space lives outside overflow-hidden so it's never clipped */}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

function Overlays({ prefix }: { prefix: "mobile" | "desktop" }) {
  const style = { transformOrigin: "right center", borderRadius: "16px" };
  return (
    <>
      {/* DOM order: dark first (bottom), then white, then red (top) */}
      <div className={`hero-overlay-${prefix} absolute inset-0 bg-dark      pointer-events-none`} style={style} />
      <div className={`hero-overlay-${prefix} absolute inset-0 bg-off-white  pointer-events-none`} style={style} />
      <div className={`hero-overlay-${prefix} absolute inset-0 bg-primary    pointer-events-none`} style={style} />
    </>
  );
}

export function HeroClient({ title, desktopUrl, mobileUrl, primaryCta, secondaryCta }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Hide words immediately — GSAP owns the transform, no CSS conflict
    gsap.set(".hero-word", { yPercent: 115, opacity: 0 });

    const mm = gsap.matchMedia();

    const overlayConfig = {
      scaleX: 0,
      duration: 0.9,
      ease: "power3.inOut",
      // "end" = last DOM element (red) animates first → middle → first (dark)
      stagger: { each: 0.3, from: "end" as const },
    };

    // Mobile: animate only the mobile overlays
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-overlay-mobile", overlayConfig);
      tl.to(".hero-word", { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0);
      tl.fromTo(".hero-cta", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, "-=0.5");
    });

    // Desktop: animate only the desktop overlays
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-overlay-desktop", overlayConfig);
      tl.to(".hero-word", { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0);
      tl.fromTo(".hero-cta", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, "-=0.5");
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="bg-off-white flex flex-col items-center overflow-hidden isolate w-full">

      {/* Title */}
      <h1
        className="font-display text-dark uppercase w-full pt-6 relative z-[2] leading-[0.9] tracking-[-0.01em]
                   text-left font-medium md:text-center md:font-bold"
        style={{ fontSize: "var(--hero-title-size)" }}
      >
        <WordSplit text={title} />
      </h1>

      <div className="flex flex-col items-center w-full relative z-[1] gap-6">

        {/* Mobile image */}
        <div className="relative w-full overflow-hidden rounded-2xl md:hidden" style={{ aspectRatio: "450 / 680" }}>
          <Image src={mobileUrl} alt={title} fill unoptimized priority sizes="100vw" className="object-cover" />
          <Overlays prefix="mobile" />
        </div>

        {/* Desktop image */}
        <div className="relative w-full hidden md:block" style={{ aspectRatio: "1728 / 680" }}>
          <Image src={desktopUrl} alt={title} fill unoptimized priority sizes="100vw" className="object-cover" />
          <Overlays prefix="desktop" />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-2 items-start w-full">
          <div className="hero-cta flex-[1_0_0] min-w-[25rem]">
            <Button variant="ghost" className="w-full">{secondaryCta ?? "Explore Hyperion X"}</Button>
          </div>
          <div className="hero-cta flex-[1_0_0] min-w-[25rem]">
            <Button variant="solid" className="w-full">{primaryCta ?? "Book Your Test Drive"}</Button>
          </div>
        </div>

      </div>
    </section>
  );
}
