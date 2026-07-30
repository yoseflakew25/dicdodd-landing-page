"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/ui/motion";
import { BLUR_PLACEHOLDER } from "@/lib/placeholders";

import { organizations, type Organization } from "@/data/organizations";

/* ------------------------------------------------------------------ */
/*  Partner Logo Card                                                  */
/* ------------------------------------------------------------------ */
function PartnerCard({ org, index }: { org: Organization; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="group w-full rounded-2xl border border-border/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-primary/50 hover:ring-1 hover:ring-primary/20 dark:bg-white/[0.04]">
        {/* Logo image */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.06] to-accent/[0.04] p-2">
          <Image
            src={org.logo}
            alt={org.name}
            width={72}
            height={72}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="h-full w-full rounded-lg object-contain"
          />
        </div>

        {/* Name */}
        <h3 className="mt-4 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {org.name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
          {org.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export function GovernmentCatalogue() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden border-b border-border/50 bg-background py-20 scroll-mt-16"
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Our Partners
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Building Stronger Communities Together
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We collaborate with stakeholders who share our vision of peace and development
              across Ethiopia. Our partnerships enable us to leverage collective expertise,
              resources, and networks for greater impact.
            </p>
          </div>
        </FadeIn>

        {/* Partner Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org, index) => (
            <PartnerCard
              key={org.id}
              org={org}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
