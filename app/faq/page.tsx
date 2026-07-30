import type { Metadata } from "next";
import { FAQ } from "@/components/landing/faq";

export const metadata: Metadata = {
  title: "FAQ – DICDO | Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about DICDO, our programs, how to donate, volunteer, and partner with us.",
  openGraph: {
    title: "FAQ – DICDO | Frequently Asked Questions",
    description:
      "Find answers to frequently asked questions about DICDO programs.",
  },
};

export default function FAQPage() {
  return (
    <main className="flex-1">
      <FAQ />
    </main>
  );
}
