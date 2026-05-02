"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/Magnetic";
import { Button } from "@/components/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type NavLink = { label: string; href: string };
type Props = {
  brandName: string;
  newsletterSub: string;
  newsletterCta: string;
  navLinks: NavLink[];
  copyright: string;
  socialIconsUrl: string;
};

export function FooterClient({ brandName, newsletterSub, newsletterCta, navLinks, copyright, socialIconsUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set([".f-newsletter", ".f-social", ".f-nav-link", ".f-copyright"], { y: 24, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });

    tl
      .to(".f-newsletter", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .to(".f-social",     { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .to(".f-nav-link",   { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.3")
      .to(".f-copyright",  { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.3");
  }, { scope: ref });

  return (
    <footer className="w-full" ref={ref}>
      <div className="border border-primary flex flex-col justify-between p-6 w-full min-h-[100svh]">

        {/* Spacer */}
        <div className="flex items-center justify-between w-full opacity-0 pointer-events-none select-none" aria-hidden>
          <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase">Contact</span>
          <div className="flex items-center gap-6">
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase">Privacy policy</span>
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase">Terms and conditions</span>
          </div>
        </div>

        {/* Center — brand + newsletter */}
        <div className="flex flex-col items-center gap-[3rem] md:gap-[0.625rem] w-full">
          <Magnetic strength={0.3}>
            <p
              className="font-display font-bold text-dark uppercase leading-[0.9] tracking-[-0.01em] text-center whitespace-nowrap w-full cursor-default"
              style={{ fontSize: "var(--section-title-size)" }}
            >
              {brandName}
            </p>
          </Magnetic>
          <div className="f-newsletter flex flex-col gap-[0.625rem] items-center w-full md:max-w-[50rem]">
            <p className="font-display font-normal text-dark/50 uppercase text-center whitespace-nowrap tracking-[-0.09rem] text-[1.5rem] leading-[0.6] md:text-[3rem]">
              {newsletterSub}
            </p>
            <Button variant="ghost" className="w-full">{newsletterCta}</Button>
          </div>
          <div className="f-social relative md:hidden shrink-0" style={{ width: "7.514rem", height: "1.533rem" }}>
            <Image src={socialIconsUrl} alt="Social media" fill unoptimized sizes="121px" className="object-contain object-left" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end md:items-center justify-between w-full">
          <div>
            <div className="f-social relative hidden md:block shrink-0" style={{ width: "7.514rem", height: "1.533rem" }}>
              <Image src={socialIconsUrl} alt="Social media" fill unoptimized sizes="121px" className="object-contain object-left" />
            </div>
            <div className="flex flex-col gap-4 md:hidden">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="f-nav-link font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="f-nav-link font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <span className="f-copyright font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap">
            {copyright}
          </span>
        </div>

      </div>
    </footer>
  );
}
