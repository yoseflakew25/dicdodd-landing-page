"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS } from "@/lib/faq-data";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  panelId,
  buttonId,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  buttonId: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border/60 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-300 dark:bg-white/[0.04]",
        isOpen
          ? "border-primary/30 shadow-md"
          : "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
      )}
    >
      <button
        onClick={onToggle}
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
      >
        <HelpCircle
          className={cn(
            "h-4 w-4 shrink-0 transition-colors duration-300",
            isOpen ? "text-primary" : "text-muted-foreground group-hover:text-primary"
          )}
        />
        <span
          className={cn(
            "flex-1 text-sm font-medium transition-colors duration-300",
            isOpen
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            isOpen
              ? "bg-primary/10 text-primary"
              : "bg-muted/50 text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
          )}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-5 py-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative overflow-hidden border-b border-border/50 py-20 scroll-mt-16">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
              FAQ
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Everything you need to know about DICDO and our work. Can&apos;t find
              what you&apos;re looking for? Feel free to reach out to us directly.
            </p>
          </div>
        </FadeIn>

        {/* Accordion */}
        <FadeIn direction="up" delay={0.15}>
          <div className="mx-auto max-w-3xl space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                panelId={`faq-panel-${index}`}
                buttonId={`faq-button-${index}`}
              />
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-10 text-center">
            <Button size="lg" asChild className="mb-4">
              <Link href="/faq">
                View all FAQs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Still have questions?{" "}
              <a
                href="mailto:dicdodd@gmail.com"
                className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
              >
                Contact our team
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
