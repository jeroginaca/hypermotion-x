"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type TestimonialItem = {
  _id: string;
  quote: string;
  author: string;
  photoUrl: string;
  imageLeft: boolean;
};

export function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const next = () => setActive((p) => (p + 1) % items.length);

  useGSAP(() => {
    // Initial states
    gsap.set(".t-photo",  { clipPath: "inset(0 0 100% 0)" });
    gsap.set(".t-quote",  { y: 40, opacity: 0 });
    gsap.set(".t-meta",   { y: 20, opacity: 0 });
    gsap.set(".t-dots",   { y: 16, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
    });

    tl
      // Photo reveals top-to-bottom (like banner wipe)
      .to(".t-photo",  { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.inOut" })
      // Quote fades + rises
      .to(".t-quote",  { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }, "-=0.4")
      // Author + arrow
      .to(".t-meta",   { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
      // Dots
      .to(".t-dots",   { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.3");
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map((t) => (
          <div
            key={t._id}
            className={cn(
              "w-full shrink-0 flex gap-6 flex-col",
              t.imageLeft ? "md:flex-row" : "md:flex-row-reverse"
            )}
          >
            {/* Portrait photo — clip reveal */}
            <div className="t-photo relative overflow-hidden shrink-0 w-[14.25rem] h-[19rem] md:w-[38%] md:h-auto md:aspect-[639/852]">
              <Image src={t.photoUrl} alt={t.author} fill unoptimized sizes="(max-width: 768px) 228px, 40vw" className="object-cover object-top" />
            </div>

            {/* Quote block */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <p className="t-quote font-display font-bold text-dark uppercase tracking-[-0.01em] w-full text-[5rem] leading-[0.8] md:text-[12.5rem] md:leading-[0.9]">
                <span className="text-primary">"</span>
                {t.quote}
                <span className="text-primary">"</span>
              </p>

              <div className="t-meta flex items-end justify-between w-full mt-6 md:mt-0">
                <p className="font-display font-normal text-dark/50 uppercase tracking-[-0.01em] leading-[0.8] flex-1 min-w-0 text-[2rem] md:text-[5rem]">
                  {t.author}
                </p>
                <button onClick={next} aria-label="Next testimonial" className="font-display font-bold text-dark shrink-0 cursor-pointer leading-[0.8] text-[2rem] ml-4 md:text-[5rem]">
                  →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="t-dots flex gap-2 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn("h-[0.25rem] transition-all duration-300 cursor-pointer", i === active ? "w-8 bg-primary" : "w-4 bg-dark/20")}
          />
        ))}
      </div>
    </div>
  );
}
