import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GovernmentCatalogue } from "@/components/landing/government-catalogue";

export const metadata: Metadata = {
  title: "Programs – DICDO | Community Development Services",
  description:
    "Explore DICDO's community development programs including peacebuilding, education, women's empowerment, health, WASH, environmental protection, and human rights advocacy.",
  openGraph: {
    title: "Programs – DICDO | Community Development Services",
    description:
      "Explore DICDO's community development programs across Ethiopia.",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <GovernmentCatalogue />
      </main>
      <Footer />
    </div>
  );
}
