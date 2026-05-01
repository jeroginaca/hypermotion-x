"use client";

import { BigLink } from "@/components/BigLink";
import { DoubleCta } from "@/components/DoubleCta";
import type { NavLink } from "@/components/Navbar";

const DEFAULT_LINKS: NavLink[] = [
  { label: "Features",     href: "#features" },
  { label: "Partners",     href: "#partners" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Technologies", href: "#technologies" },
];

type MenuProps = {
  open: boolean;
  onClose: () => void;
  navLinks?: NavLink[];
  primaryCta?: string;
  secondaryCta?: string;
};

export function Menu({ open, onClose, navLinks, primaryCta, secondaryCta }: MenuProps) {
  const links = navLinks?.length ? navLinks : DEFAULT_LINKS;

  return (
    <>
      <div aria-hidden onClick={onClose} className={`fixed inset-0 z-[55] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <div
        role="dialog" aria-modal aria-label="Navigation menu"
        className={`fixed inset-0 z-[60] bg-dark flex flex-col justify-between p-6 overflow-y-auto transition-all duration-300 ease-in-out ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <div className="flex flex-col gap-6 items-end">
          {/* Close button */}
          <button onClick={onClose} aria-label="Close menu" className="relative cursor-pointer shrink-0" style={{ width: "3.184rem", height: "2.313rem" }}>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="absolute w-full bg-primary rotate-45"  style={{ height: "0.532rem" }} />
              <span className="absolute w-full bg-primary -rotate-45" style={{ height: "0.532rem" }} />
            </span>
          </button>
          <nav className="flex flex-col w-full">
            {links.map((link) => (
              <BigLink key={link.href} label={link.label} href={link.href} onClick={onClose} />
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 items-end w-full mt-6">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-primary hover:opacity-70 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" aria-label="X" className="text-primary hover:opacity-70 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="TikTok" className="text-primary hover:opacity-70 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.72a8.28 8.28 0 004.84 1.54V6.79a4.84 4.84 0 01-1.08-.1z"/></svg>
            </a>
          </div>
          <DoubleCta primaryLabel={primaryCta} secondaryLabel={secondaryCta} />
        </div>
      </div>
    </>
  );
}
