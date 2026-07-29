import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/landing/contact-form";

export const metadata: Metadata = {
  title: "Contact DICDO – Get in Touch",
  description:
    "Have a question, want to partner with us, or interested in supporting our mission? Get in touch with DICDO and our team will get back to you.",
  openGraph: {
    title: "Contact DICDO – Get in Touch",
    description:
      "Get in touch with DICDO for questions, partnerships, or donations.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
