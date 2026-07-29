import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
