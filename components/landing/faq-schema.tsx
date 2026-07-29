import { FAQ_ITEMS } from "@/lib/faq-data";

/**
 * Server-rendered FAQPage JSON-LD structured data for Google Search rich results.
 * This must be server-rendered (not a "use client" component) so the structured
 * data is present in the initial HTML for search engine crawlers.
 */
export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
