"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type FeatureItem = { label: string; imageUrl: string };

export function FeaturesGrid({ features }: { features: FeatureItem[] }) {
  const [hovered, setHovered]   = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch">
      {/* Left: feature list */}
      <div className="flex-1 flex flex-col border border-primary">
        {features.map((f, i) => (
          <div key={f.label}>
            <button
              className={cn(
                "flex items-center gap-4 p-6 border-b border-primary w-full text-left transition-colors duration-200 md:h-[8.125rem] cursor-pointer",
                hovered === i ? "bg-dark" : "bg-transparent"
              )}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setExpanded(expanded === i ? null : i)}
              aria-expanded={expanded === i}
            >
              <span className={cn(
                "flex-1 font-display font-normal leading-[0.9] tracking-[-0.165rem]",
                "text-[4rem] leading-[1.2] tracking-[-0.12rem]",
                "md:text-[5.5rem] md:leading-[0.9] md:tracking-[-0.165rem]",
                hovered === i ? "text-off-white" : "text-primary"
              )}>
                {f.label}
              </span>
              <svg
                className={cn("md:hidden text-primary shrink-0 transition-transform duration-200", expanded === i && "rotate-180")}
                width="27" height="19" viewBox="0 0 27 19" fill="none" aria-hidden
              >
                <path d="M1 1L13.5 17L26 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={cn(
              "md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-b border-primary",
              expanded === i ? "max-h-[31.25rem]" : "max-h-0 border-b-0"
            )}>
              <div className="relative w-full" style={{ aspectRatio: "450 / 400" }}>
                <Image src={f.imageUrl} alt={f.label} fill unoptimized sizes="100vw" className="object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: image panel — desktop only */}
      <div className="hidden md:block flex-1 relative h-[48.75rem] border border-primary border-l-0 overflow-hidden">
        {features.map((f, i) => (
          <div key={f.label} className={cn("absolute inset-0 transition-opacity duration-300", hovered === i ? "opacity-100" : "opacity-0")}>
            <Image src={f.imageUrl} alt={f.label} fill unoptimized sizes="50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
