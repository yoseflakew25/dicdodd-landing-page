import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { Features } from "@/components/landing/features";
import { ImpactStories } from "@/components/landing/impact-stories";
import { GovernmentCatalogue } from "@/components/landing/government-catalogue";
import { Gallery } from "@/components/landing/gallery";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FAQ } from "@/components/landing/faq";
import { FAQSchema } from "@/components/landing/faq-schema";
import { Locations } from "@/components/landing/locations";
import { ContactForm } from "@/components/landing/contact-form";
import { About } from "@/components/landing/about";
import { ScrollToTop } from "@/components/landing/scroll-to-top";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
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
        <Locations />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
