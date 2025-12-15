import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { PlacesSection } from "@/components/sections/places-section";
import { BerkovitsaSection } from "@/components/sections/berkovitsa-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FundingSection } from "@/components/sections/funding-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <PlacesSection />
      <FeaturesSection />
      <BerkovitsaSection />
      <GallerySection />
      <TestimonialsSection />
      <FundingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
