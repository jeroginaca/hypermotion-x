import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { footerQuery } from "@/sanity/lib/queries";
import { FooterClient } from "@/components/FooterClient";

const FALLBACK = {
  brandName:     "Hyperion X",
  newsletterSub: "Be the first to know about our latest updates and limited editions.",
  newsletterCta: "Join newsletter",
  navLinks:      [{ label: "Contact", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Terms and Conditions", href: "#" }],
  copyright:     "2025 – Jerónimo Ginaca",
  socialIconsUrl: "https://www.figma.com/api/mcp/asset/38ef9d4b-0c70-455e-8067-841879b7cf6a",
};

export async function Footer() {
  let d: any = null;
  try { d = await client.fetch(footerQuery); } catch {}

  return (
    <FooterClient
      brandName={d?.brandName ?? FALLBACK.brandName}
      newsletterSub={d?.newsletterSubtitle ?? FALLBACK.newsletterSub}
      newsletterCta={d?.newsletterCta ?? FALLBACK.newsletterCta}
      navLinks={d?.navLinks ?? FALLBACK.navLinks}
      copyright={d?.copyright ?? FALLBACK.copyright}
      socialIconsUrl={d?.socialIcons ? urlFor(d.socialIcons).width(250).url() : FALLBACK.socialIconsUrl}
    />
  );
}
