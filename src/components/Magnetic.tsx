"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0–1, how far the element follows the cursor
};

/*
  Wraps any element with a magnetic hover effect.
  The outer div is the detection zone; the inner div is what moves.
  Mouse inside zone  → element drifts toward cursor (GSAP power2.out)
  Mouse leaves zone  → element springs back (GSAP elastic.out)
*/
export function Magnetic({ children, className, strength = 0.45 }: MagneticProps) {
  const zoneRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone  = zoneRef.current;
    const inner = innerRef.current;
    if (!zone || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      gsap.to(inner, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.35)" });
    };

    zone.addEventListener("mousemove", onMove);
    zone.addEventListener("mouseleave", onLeave);
    return () => {
      zone.removeEventListener("mousemove", onMove);
      zone.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={zoneRef} className={className}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
