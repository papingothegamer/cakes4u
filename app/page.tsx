import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { FAQSection } from '@/components/sections/faq-section';
import { HowToSection } from '@/components/sections/how-to-section';
import { CTASection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowToSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

