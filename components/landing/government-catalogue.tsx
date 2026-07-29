"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

import { organizations, type Organization } from "@/data/organizations";

/* ------------------------------------------------------------------ */
/*  Partner Modal                                                      */
/* ------------------------------------------------------------------ */
function PartnerModal({
  org,
  onClose,
}: {
  org: Organization;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={org.name}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.4, 0, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-white shadow-2xl dark:bg-gray-900"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-muted-foreground shadow-sm transition-colors hover:bg-white hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero area with gradient */}
        <div className="relative bg-gradient-to-br from-primary/20 via-primary/5 to-accent/10 px-6 pb-6 pt-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-lg shadow-primary/10 ring-1 ring-primary/10">
            <Image
              src={org.logo}
              alt={org.name}
              width={80}
              height={80}
              className="h-full w-full rounded-xl object-contain"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">{org.name}</h3>
          <Badge variant="outline" className="mt-2 border-primary/20 bg-primary/5 text-primary">
            {org.category}
          </Badge>
        </div>

        <div className="space-y-3 px-6 py-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{org.description}</p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Category</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{org.category}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Status</p>
              <p className="mt-0.5 text-sm font-medium text-emerald-600">{org.status}</p>
            </div>
          </div>
          {org.website && (
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 p-3">
              <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-sm text-primary underline-offset-2 hover:underline"
              >
                {org.website.replace("https://", "")}
              </a>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-border/50 px-6 py-4">
          <Button variant="default" size="lg" className="flex-1" asChild>
            <a
              href={org.website || "#"}
              target={org.website ? "_blank" : undefined}
              rel={org.website ? "noopener noreferrer" : undefined}
            >
              <ExternalLink className="h-4 w-4" /> Visit Website
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Partner Logo Card                                                  */
/* ------------------------------------------------------------------ */
function PartnerCard({ org, index, onSelect }: { org: Organization; index: number; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <button
        onClick={onSelect}
        className="group w-full rounded-2xl border border-border/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-primary/50 hover:ring-1 hover:ring-primary/20 dark:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {/* Logo image */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.06] to-accent/[0.04] p-2">
          <Image
            src={org.logo}
            alt={org.name}
            width={72}
            height={72}
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
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export function GovernmentCatalogue() {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const handleSelect = (org: Organization) => {
    setSelectedOrg(org);
  };

  const handleClose = () => setSelectedOrg(null);

  return (
    <>
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
                onSelect={() => handleSelect(org)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedOrg && (
          <PartnerModal
            key={selectedOrg.id}
            org={selectedOrg}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
