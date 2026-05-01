"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/*
  Desktop (Variant2–7):
    - Two columns: left = list of 6 rows (each h-[8.125rem] = 130px),
      right = image panel (h-[48.75rem] = 780px = 6 × 130px)
    - Hover row → row bg-dark + text-off-white, right panel cross-fades to its image
    - No hover → all text-primary, right panel empty

  Mobile (Variant9 accordion + Mobile 1–6 expanded):
    - Single column accordion list
    - 64px font, chevron arrow per row
    - Click row → expands to reveal feature image (aspect 450:400)
    - Click again → collapses
*/

const features = [
  {
    label: "Speed & Performance",
    image: "https://www.figma.com/api/mcp/asset/d4a4304b-c64f-4341-8a2b-53440b44ae5e",
  },
  {
    label: "Advanced Electric Motor",
    image: "https://www.figma.com/api/mcp/asset/aa834d37-acc6-4dc3-8aea-431d368fd65a",
  },
  {
    label: "Range & Charging",
    image: "https://www.figma.com/api/mcp/asset/d11c2af4-cf7c-48a9-a2cc-7d587cc51ab0",
  },
  {
    label: "Futuristic Design",
    image: "https://www.figma.com/api/mcp/asset/53660613-b5a4-4d13-8b64-edb1302b3334",
  },
  {
    label: "Interior Technology",
    image: "https://www.figma.com/api/mcp/asset/7edcb730-9d15-4123-b0c9-8a2fb2e3b8c1",
  },
  {
    label: "Sustainability",
    image: "https://www.figma.com/api/mcp/asset/54fd1901-06b6-4f56-8e2e-6f02a82bc74f",
  },
];

export function Features() {
  const [hovered, setHovered] = useState<number | null>(null);   // desktop hover
  const [expanded, setExpanded] = useState<number | null>(null); // mobile accordion

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch">

      {/* ── Left: feature list ── */}
      <div className="flex-1 flex flex-col border border-primary">
        {features.map((feature, i) => (
          <div key={feature.label}>

            {/* Row — desktop hover + mobile accordion trigger */}
            <button
              className={cn(
                "flex items-center gap-4 p-6 border-b border-primary w-full text-left",
                "transition-colors duration-200 cursor-pointer",
                "md:h-[8.125rem]",
                hovered === i ? "bg-dark" : "bg-transparent"
              )}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setExpanded(expanded === i ? null : i)}
              aria-expanded={expanded === i}
            >
              <span
                className={cn(
                  "flex-1 font-display font-normal transition-colors duration-200",
                  // Mobile: 64px, leading 1.2, tracking -1.92px → -0.12rem
                  "text-[4rem] leading-[1.2] tracking-[-0.12rem]",
                  // Desktop: 88px, leading 0.9, tracking -2.64px → -0.165rem
                  "md:text-[5.5rem] md:leading-[0.9] md:tracking-[-0.165rem]",
                  hovered === i ? "text-off-white" : "text-primary"
                )}
              >
                {feature.label}
              </span>

              {/* Chevron — mobile only */}
              <svg
                className={cn(
                  "md:hidden shrink-0 text-primary transition-transform duration-300",
                  expanded === i ? "rotate-180" : "rotate-0"
                )}
                width="27"
                height="19"
                viewBox="0 0 27 19"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 1L13.5 17L26 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Accordion image — mobile only, aspect 450:400 */}
            <div
              className={cn(
                "md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-b border-primary",
                expanded === i ? "max-h-[31.25rem]" : "max-h-0 border-b-0"
              )}
            >
              <div className="relative w-full" style={{ aspectRatio: "450 / 400" }}>
                <Image
                  src={feature.image}
                  alt={feature.label}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ── Right: image panel — desktop only ── */}
      {/*
        Same height as the 6 rows: 6 × 130px = 780px = 48.75rem
        All images stacked, only the hovered one is opacity-100
      */}
      <div className="hidden md:block relative flex-1 h-[48.75rem] border border-primary border-l-0 overflow-hidden">
        {features.map((feature, i) => (
          <div
            key={feature.label}
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              hovered === i ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={feature.image}
              alt={feature.label}
              fill
              unoptimized
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

    </div>
  );
}
