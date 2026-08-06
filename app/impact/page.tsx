import type { Metadata } from "next";
import { ImpactStories } from "@/components/landing/impact-stories";

export const metadata: Metadata = {
  title: "Our Impact – DICDO | The 7th General Election & Beyond",
  description:
    "See DICDO's impact during Ethiopia's 7th General Election — accredited by NEBE to observe the vote, and mobilising voter education workshops for underserved urban and rural communities.",
  openGraph: {
    title: "Our Impact – DICDO | The 7th General Election & Beyond",
    description:
      "DICDO's impact during Ethiopia's 7th General Election — NEBE-accredited election observation and voter education across urban and rural communities.",
  },
};

export default function ImpactPage() {
  return (
    <main className="flex-1">
      <ImpactStories />
    </main>
  );
}
