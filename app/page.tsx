import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { Features } from "@/components/landing/features";
import { ImpactStories } from "@/components/landing/impact-stories";
import { GovernmentCatalogue } from "@/components/landing/government-catalogue";
import { Gallery } from "@/components/landing/gallery";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FAQ } from "@/components/landing/faq";
import { FAQSchema } from "@/components/landing/faq-schema";
import { Awards } from "@/components/landing/awards";
import { ContactForm } from "@/components/landing/contact-form";
import { About } from "@/components/landing/about";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <About />
      <Features />
      <ImpactStories />
      <GovernmentCatalogue />
      <Gallery />
      <HowItWorks />
      <FAQSchema />
      <FAQ />
      <Awards />
      <ContactForm />
    </main>
  );
}
