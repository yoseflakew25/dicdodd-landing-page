import type { Metadata } from "next";
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
    <main className="flex-1">
      <GovernmentCatalogue />
    </main>
  );
}
