import Image from "next/image";
import { Button } from "@/components/Button";

/*
  Footer — full border-primary, flex-col justify-between, p-6, min-h ≈ 1069px

  Three zones (justify-between):
  1. Top    — opacity-0 spacer row (Contact | Privacy · T&C) — invisible, just pushes content down
  2. Middle — "HYPERION X" + newsletter label + ghost CTA + social icons (mobile only here)
  3. Bottom — Social icons (desktop left) | Nav links (center) | Copyright (right)
*/

const socialIconsUrl =
  "https://www.figma.com/api/mcp/asset/38ef9d4b-0c70-455e-8067-841879b7cf6a";

const navLinks = [
  { label: "Contact", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms and Conditions", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full">
      <div
        className="
          border border-primary
          flex flex-col justify-between
          p-6 w-full
          min-h-[100svh]
        "
      >

        {/* ── Zone 1: Invisible spacer row ── */}
        <div className="flex items-center justify-between w-full opacity-0 pointer-events-none select-none">
          <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap">
            Contact
          </span>
          <div className="flex items-center gap-6">
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap">Privacy policy</span>
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap">Terms and conditions</span>
          </div>
        </div>

        {/* ── Zone 2: Brand + newsletter ── */}
        <div className="flex flex-col items-center gap-[3rem] md:gap-[0.625rem] w-full">

          {/* "HYPERION X" — 288px desktop / 120px mobile */}
          <p
            className="font-display font-bold text-dark uppercase leading-[0.9] tracking-[-0.01em] text-center whitespace-nowrap
                       text-[7.5rem] font-medium
                       md:font-bold"
            style={{ fontSize: "var(--section-title-size)" }}
          >
            Hyperion X
          </p>

          {/* Newsletter block */}
          <div className="flex flex-col gap-[0.625rem] items-center w-full md:max-w-[50rem]">
            {/* Subtitle label */}
            <p
              className="font-display font-normal text-dark/50 uppercase text-center whitespace-nowrap tracking-[-0.09rem]
                         text-[1.5rem] leading-[0.6]
                         md:text-[3rem]"
            >
              Be the first to know about our latest updates and limited editions.
            </p>

            {/* Ghost CTA */}
            <Button variant="ghost" className="w-full">
              Join newsletter
            </Button>
          </div>

          {/* Social icons — mobile only (desktop has them in bottom bar) */}
          <div className="relative md:hidden shrink-0" style={{ width: "7.514rem", height: "1.533rem" }}>
            <Image
              src={socialIconsUrl}
              alt="Instagram, X, TikTok"
              fill
              unoptimized
              sizes="121px"
              className="object-contain object-left"
            />
          </div>
        </div>

        {/* ── Zone 3: Bottom bar ── */}
        <div className="flex items-end md:items-center justify-between w-full">

          {/* Left — social icons (desktop) / nav links stack (mobile) */}
          <div>
            {/* Desktop: social icon image */}
            <div className="relative hidden md:block shrink-0" style={{ width: "7.514rem", height: "1.533rem" }}>
              <Image
                src={socialIconsUrl}
                alt="Instagram, X, TikTok"
                fill
                unoptimized
                sizes="121px"
                className="object-contain object-left"
              />
            </div>

            {/* Mobile: stacked nav links */}
            <div className="flex flex-col gap-4 md:hidden">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Center — nav links (desktop only) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — copyright */}
          <div className="flex items-center gap-1">
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap">
              2025 –
            </span>
            <a
              href="#"
              className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap hover:text-primary transition-colors"
            >
              Jerónimo Ginaca
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
