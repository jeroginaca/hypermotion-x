"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  title: string;
  desktopUrl: string;
  mobileUrl: string;
  primaryCta?: string;
  secondaryCta?: string;
};

/*
  Load animation:
    1. Colour sweep (red → white → dark wipe)
    2. Title words clip up (yPercent + opacity)
    3. CTAs rise in

  Scroll animation (desktop only):
    - First word  → slides LEFT  (hero-scroll-left  on outer overflow-hidden span)
    - Other words → slide RIGHT  (hero-scroll-right on outer overflow-hidden span)
    - Image       → subtle zoom  (hero-img-zoom on the img element)

  Key detail: scroll classes are on the OUTER overflow-hidden spans so words
  move freely without being clipped. The load animation targets the INNER
  hero-word spans for the vertical clip reveal.
*/
function WordSplit({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className={[
            "inline-block overflow-hidden leading-[0.95] align-top",
            i === 0 ? "hero-scroll-left" : "hero-scroll-right",
            i < words.length - 1 ? "mr-[0.2em]" : "",
          ].join(" ")}
        >
          <span className="hero-word inline-block">{word}</span>
        </span>
      ))}
    </>
  );
}

function Overlays({ prefix }: { prefix: "mobile" | "desktop" }) {
  const style = { transformOrigin: "right center", borderRadius: "16px" };
  return (
    <>
      <div className={`hero-overlay-${prefix} absolute inset-0 bg-dark     pointer-events-none`} style={style} />
      <div className={`hero-overlay-${prefix} absolute inset-0 bg-off-white pointer-events-none`} style={style} />
      <div className={`hero-overlay-${prefix} absolute inset-0 bg-primary   pointer-events-none`} style={style} />
    </>
  );
}

export function HeroClient({ title, desktopUrl, mobileUrl, primaryCta, secondaryCta }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".hero-word", { yPercent: 115, opacity: 0 });

    const mm = gsap.matchMedia();

    const overlayConfig = {
      scaleX: 0,
      duration: 0.9,
      ease: "power3.inOut",
      stagger: { each: 0.3, from: "end" as const },
    };

    // ── Mobile load animation ──────────────────────────────────────────────
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-overlay-mobile", overlayConfig);
      tl.to(".hero-word",  { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0);
      tl.fromTo(".hero-cta", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, "-=0.5");
    });

    // ── Desktop load + scroll animations ─────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      // Load
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-overlay-desktop", overlayConfig);
      tl.to(".hero-word",  { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0);
      tl.fromTo(".hero-cta", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, "-=0.5");

      // Scroll — words split left/right, image zooms in
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      scrollTl
        .to(".hero-scroll-left",  { x: "-35vw", opacity: 0, ease: "none" }, 0)
        .to(".hero-scroll-right", { x:  "35vw", opacity: 0, ease: "none" }, 0)
        .to(".hero-img-zoom",     { scale: 1.25, ease: "none" }, 0);
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="bg-off-white flex flex-col items-center overflow-hidden isolate w-full">

      {/* Title */}
      <h1
        className="font-display text-dark uppercase w-full pt-6 relative z-[2] leading-[0.9] tracking-[-0.01em]
                   text-left font-medium md:text-center md:font-bold md:whitespace-nowrap"
        style={{ fontSize: "var(--hero-title-size)" }}
      >
        <WordSplit text={title} />
      </h1>

      <div className="flex flex-col items-center w-full relative z-[1] gap-6">

        {/* Mobile image */}
        <div className="relative w-full overflow-hidden rounded-2xl md:hidden" style={{ aspectRatio: "450 / 680" }}>
          <Image src={mobileUrl} alt={title} fill unoptimized priority sizes="100vw" className="object-cover hero-img-zoom" />
          <Overlays prefix="mobile" />
        </div>

        {/* Desktop image — overflow-hidden needed for the zoom parallax */}
        <div className="relative w-full hidden md:block overflow-hidden" style={{ aspectRatio: "1728 / 680", borderRadius: "16px" }}>
          <Image src={desktopUrl} alt={title} fill unoptimized priority sizes="100vw" className="object-cover hero-img-zoom" />
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
