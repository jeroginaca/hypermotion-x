import { Container } from "@/components/Container";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { Technologies } from "@/components/Technologies";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <Container>
      <Hero />
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
