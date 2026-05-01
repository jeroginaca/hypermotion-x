"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/*
  Two testimonials in a horizontal carousel clipped by overflow-hidden.
  → arrow advances the slide; clicking anywhere on the card also advances.

  Desktop (md+):
    Each card is a side-by-side row: portrait photo (≈38% width) + quote text.
    Alternating: card 1 = photo left, card 2 = photo right.
    Quote:  200px Bold uppercase, leading 0.9
    Credit: 80px Regular muted, leading 0.8

  Mobile (< md):
    Each card stacks vertically: small portrait (228×304) above quote text.
    Quote:  80px Bold uppercase, leading 0.8
    Credit: 32px Regular muted, leading 0.8
*/

const testimonials = [
  {
    quote: "A driving experience that redefines the impossible.",
    author: "Luca Ferrari, Professional Driver",
    image: "https://www.figma.com/api/mcp/asset/485cb531-7f6e-439d-a117-3dc525a329ec",
    imageLeft: true,
  },
  {
    quote: "The future of luxury mobility, today.",
    author: "Sofia Marconi, CEO Hyperion Motors.",
    image: "https://www.figma.com/api/mcp/asset/e3d2c861-6ba8-4285-86b5-6de2c45a0131",
    imageLeft: false,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);

  return (
    <div className="w-full overflow-hidden">
      {/* Track — slides horizontally */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.author}
            className={cn(
              "w-full shrink-0 flex gap-6",
              // Mobile: stack, photo on top
              "flex-col",
              // Desktop: side by side, alternate photo side
              t.imageLeft ? "md:flex-row" : "md:flex-row-reverse"
            )}
          >
            {/* Portrait photo */}
            <div
              className={cn(
                "relative overflow-hidden shrink-0",
                // Mobile: 228×304px
                "w-[14.25rem] h-[19rem]",
                // Desktop: 639×852px ≈ 3:4, takes ~38% of row
                "md:w-[38%] md:h-auto md:aspect-[639/852]"
              )}
            >
              <Image
                src={t.image}
                alt={t.author}
                fill
                unoptimized
                sizes="(max-width: 768px) 228px, 40vw"
                className="object-cover object-top"
              />
            </div>

            {/* Quote block */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
              {/* Quote text */}
              <p
                className={cn(
                  "font-display font-bold text-dark uppercase tracking-[-0.01em] w-full",
                  // Mobile: 80px leading 0.8
                  "text-[5rem] leading-[0.8]",
                  // Desktop: 200px leading 0.9
                  "md:text-[12.5rem] md:leading-[0.9]"
                )}
              >
                <span className="text-primary">"</span>
                {t.quote}
                <span className="text-primary">"</span>
              </p>

              {/* Attribution + arrow */}
              <div className="flex items-end justify-between w-full mt-6 md:mt-0">
                <p
                  className={cn(
                    "font-display font-normal text-dark/50 uppercase tracking-[-0.01em] leading-[0.8] flex-1 min-w-0",
                    // Mobile: 32px
                    "text-[2rem]",
                    // Desktop: 80px
                    "md:text-[5rem]"
                  )}
                >
                  {t.author}
                </p>

                {/* Arrow — advances carousel */}
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className={cn(
                    "font-display font-bold text-dark shrink-0 cursor-pointer leading-[0.8]",
                    "text-[2rem] ml-4",
                    "md:text-[5rem]"
                  )}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn(
              "h-[0.25rem] transition-all duration-300 cursor-pointer",
              i === active
                ? "w-8 bg-primary"
                : "w-4 bg-dark/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}
