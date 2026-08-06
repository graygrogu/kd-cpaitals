import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyNotBanks } from "@/components/sections/why-not-banks";
import { WhyUs } from "@/components/sections/why-us";
import { CaseStudies } from "@/components/sections/case-studies";
import { Testimonials } from "@/components/sections/testimonials";
import { Lenders } from "@/components/sections/lenders";
import { EmiCalculator } from "@/components/sections/emi-calculator";
import { Social } from "@/components/sections/social";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { MobileCta } from "@/components/sections/mobile-cta";
import { PageTransition } from "@/components/motion/page-transition";
import { LanguageProvider } from "@/i18n";

export default function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <PageTransition>
        <main>
          <Hero />
          <Services />
          <WhyNotBanks />
          <WhyUs />
          <CaseStudies />
          <Testimonials />
          <Lenders />
          <EmiCalculator />
          <Social />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
      <MobileCta />
    </LanguageProvider>
  );
}
