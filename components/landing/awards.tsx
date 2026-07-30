"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { BLUR_PLACEHOLDER } from "@/lib/placeholders";

/* ------------------------------------------------------------------ */
/*  19 award images from /images/awards/                               */
/* ------------------------------------------------------------------ */
const AWARD_IMAGES = Array.from({ length: 19 }, (_, i) => ({
  id: i + 1,
  src: `/images/awards/c${i + 1}.jpg`,
  alt: `DICDO award certificate ${i + 1}`,
}));

/* ------------------------------------------------------------------ */
/*  Awards Carousel                                                     */
/* ------------------------------------------------------------------ */
export function Awards() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = AWARD_IMAGES.length;

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setActive(next);
  }, []);

  const prev = useCallback(() => {
    if (active > 0) {
      setDirection(-1);
      setActive((p) => p - 1);
    }
  }, [active]);

  const next = useCallback(() => {
    if (active < total - 1) {
      setDirection(1);
      setActive((p) => p + 1);
    }
  }, [active, total]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev >= total - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section
      id="awards"
      className="primary-band relative overflow-hidden border-b border-primary-foreground/20 py-20 scroll-mt-16"
    >
      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn direction="up">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
                Recognition
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                Awards &amp; Recognition
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                Our work has been recognized by national and international bodies for impact
                in peacebuilding, education, and community development.
              </p>
            </div>

            {/* Desktop nav buttons */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={prev}
                disabled={active === 0}
                aria-label="Previous award"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                disabled={active >= total - 1}
                aria-label="Next award"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </FadeIn>

        {/* ── Desktop: 3-up carousel ── */}
        <div className="hidden lg:block">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                className="grid grid-cols-3 gap-5"
                initial={{ x: direction > 0 ? "8%" : "-8%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: direction > 0 ? "-8%" : "8%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Show current + next 2 images */}
                {[0, 1, 2].map((offset) => {
                  const idx = (active + offset) % total;
                  const img = AWARD_IMAGES[idx];
                  return (
                    <div
                      key={img.id}
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />

                      {/* Gradient overlay at bottom for depth */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Subtle corner accents on hover */}
                      <div className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-white/0 transition-all duration-300 group-hover:border-white/60" />
                      <div className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-white/0 transition-all duration-300 group-hover:border-white/60" />
                      <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-white/0 transition-all duration-300 group-hover:border-white/60" />
                      <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/0 transition-all duration-300 group-hover:border-white/60" />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: 1-up carousel ── */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ x: direction > 0 ? "20%" : "-20%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: direction > 0 ? "-20%" : "20%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg">
                <Image
                  src={AWARD_IMAGES[active].src}
                  alt={AWARD_IMAGES[active].alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile nav */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous award"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              disabled={active >= total - 1}
              aria-label="Next award"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              aria-label={`Go to award ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
