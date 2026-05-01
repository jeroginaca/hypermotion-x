import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { footerQuery } from "@/sanity/lib/queries";
import { Button } from "@/components/Button";

const FALLBACK = {
  brandName: "Hyperion X",
  newsletterSubtitle: "Be the first to know about our latest updates and limited editions.",
  newsletterCta: "Join newsletter",
  navLinks: [
    { label: "Contact",             href: "#" },
    { label: "Privacy Policy",       href: "#" },
    { label: "Terms and Conditions", href: "#" },
  ],
  copyright: "2025 – Jerónimo Ginaca",
  socialIconsUrl: "https://www.figma.com/api/mcp/asset/38ef9d4b-0c70-455e-8067-841879b7cf6a",
};

export async function Footer() {
  let d: any = null;
  try { d = await client.fetch(footerQuery); } catch {}

  const brandName         = d?.brandName         ?? FALLBACK.brandName;
  const newsletterSub     = d?.newsletterSubtitle ?? FALLBACK.newsletterSubtitle;
  const newsletterCta     = d?.newsletterCta      ?? FALLBACK.newsletterCta;
  const navLinks          = d?.navLinks           ?? FALLBACK.navLinks;
  const copyright         = d?.copyright          ?? FALLBACK.copyright;
  const socialIconsUrl    = d?.socialIcons ? urlFor(d.socialIcons).width(250).url() : FALLBACK.socialIconsUrl;

  return (
    <footer className="w-full">
      <div className="border border-primary flex flex-col justify-between p-6 w-full min-h-[100svh]">

        {/* Spacer — invisible, pushes content down */}
        <div className="flex items-center justify-between w-full opacity-0 pointer-events-none select-none" aria-hidden>
          <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase">Contact</span>
          <div className="flex items-center gap-6">
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase">Privacy policy</span>
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase">Terms and conditions</span>
          </div>
        </div>

        {/* Center — brand + newsletter */}
        <div className="flex flex-col items-center gap-[3rem] md:gap-[0.625rem] w-full">
          <p
            className="font-display font-bold text-dark uppercase leading-[0.9] tracking-[-0.01em] text-center whitespace-nowrap text-[7.5rem] font-medium md:font-bold"
            style={{ fontSize: "var(--section-title-size)" }}
          >
            {brandName}
          </p>
          <div className="flex flex-col gap-[0.625rem] items-center w-full md:max-w-[50rem]">
            <p className="font-display font-normal text-dark/50 uppercase text-center whitespace-nowrap tracking-[-0.09rem] text-[1.5rem] leading-[0.6] md:text-[3rem]">
              {newsletterSub}
            </p>
            <Button variant="ghost" className="w-full">{newsletterCta}</Button>
          </div>
          <div className="relative md:hidden shrink-0" style={{ width: "7.514rem", height: "1.533rem" }}>
            <Image src={socialIconsUrl} alt="Social media" fill unoptimized sizes="121px" className="object-contain object-left" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end md:items-center justify-between w-full">
          <div>
            <div className="relative hidden md:block shrink-0" style={{ width: "7.514rem", height: "1.533rem" }}>
              <Image src={socialIconsUrl} alt="Social media" fill unoptimized sizes="121px" className="object-contain object-left" />
            </div>
            <div className="flex flex-col gap-4 md:hidden">
              {navLinks.map((link: any) => (
                <a key={link.label} href={link.href} className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link: any) => (
              <a key={link.label} href={link.href} className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-display font-normal text-dark text-[2rem] leading-[0.8] tracking-[-0.06rem] uppercase whitespace-nowrap">{copyright}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
