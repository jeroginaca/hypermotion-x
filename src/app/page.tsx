import { Container } from "@/components/Container";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { Technologies } from "@/components/Technologies";
import { Testimonials } from "@/components/Testimonials";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  let settings: any = null;
  try { settings = await client.fetch(siteSettingsQuery); } catch {}

  return (
    <Container>
      <Hero primaryCta={settings?.primaryCta} secondaryCta={settings?.secondaryCta} />
      <FeaturesSection />
      <Partners />
      <Banner />
      <Testimonials />
      <Technologies />
      <Gallery />
      <Footer />
    </Container>
  );
}
