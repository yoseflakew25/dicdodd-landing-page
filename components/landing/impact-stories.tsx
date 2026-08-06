"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/* ─── Story Data ─────────────────────────────────────────────── */
const IMPACT_STORIES = [
  {
    id: "diredawa",
    location: "Dire Dawa, Ethiopia",
    year: "2026",
    tag: "Election Observation",
    title: "Observing the 7th General Election",
    headline: "Accredited by NEBE to Observe the Election",
    description:
      "DICDO was formally accredited by the National Election Board of Ethiopia (NEBE) to observe the 7th General Election. As an accredited observer, DICDO monitored the electoral process at polling stations across the region—witnessing the conduct of the vote, the counting process, and the transparency of the election—helping ensure a credible and peaceful electoral process.",
    stats: [
      { label: "Accredited By", value: "NEBE" },
      { label: "Observer Status", value: "Accredited" },
    ],
    images: [
      "/images/impact/diredawa/photo_2026-04-05_14-01-29.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-31.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-32.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-34.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-35.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-38.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-41.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-42.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-01-49.jpg",
      "/images/impact/diredawa/photo_2026-04-05_14-02-10.jpg",
      "/images/impact/diredawa/photo_2026-06-21_18-14-53.jpg",
      "/images/impact/diredawa/photo_2026-06-21_18-14-55.jpg",
      "/images/impact/diredawa/photo_2026-06-22_02-48-07.jpg",
      "/images/impact/diredawa/photo_2026-06-22_02-58-22.jpg",
      "/images/impact/diredawa/photo_2026-06-22_02-59-30.jpg",
      "/images/impact/diredawa/photo_2026-06-22_02-59-32 (2).jpg",
      "/images/impact/diredawa/photo_2026-06-22_02-59-32.jpg",
    ],
  },
  {
    id: "harar",
    location: "Harar, Ethiopia",
    year: "2026",
    tag: "Voter Education",
    title: "Voter Education for Every Community",
    headline: "Workshops on the Provision of Voter Education",
    description:
      "Alongside observation, DICDO mobilised and launched a series of workshops on the provision of voter education, reaching many underserved urban and rural communities. Through these workshops, citizens learned how to register, how to cast their vote, and why their participation matters—empowering first-time and marginalised voters to take part in the 7th General Election with confidence.",
    stats: [
      { label: "Workshop Focus", value: "Voter Education" },
      { label: "Communities Reached", value: "Urban & Rural" },
    ],
    images: [
      "/images/impact/harar/_DSC9154.JPG",
      "/images/impact/harar/_DSC9163.JPG",
      "/images/impact/harar/_DSC9178.JPG",
      "/images/impact/harar/_DSC9319.JPG",
      "/images/impact/harar/_DSC9347.JPG",
      "/images/impact/harar/_DSC9356.JPG",
      "/images/impact/harar/_DSC9365.JPG",
      "/images/impact/harar/_DSC9374.JPG",
      "/images/impact/harar/_DSC9380.JPG",
      "/images/impact/harar/photo_2026-05-22_14-01-17.jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-19.jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-20.jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-21 (2).jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-21.jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-22.jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-23.jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-24.jpg",
      "/images/impact/harar/photo_2026-05-22_14-01-25.jpg",
      "/images/impact/harar/photo_2026-08-05_16-40-10.jpg",
    ],
  },
] as const;

/* ─── Lightbox ────────────────────────────────────────────────── */
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: readonly string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  // Lock page scroll while the lightbox is open so the background
  // can't shift or scroll behind it.
  React.useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

        {/* Image */}
        <motion.div
          key={index}
          className="relative z-10 max-h-[85vh] max-w-[90vw]"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[index]}
            alt={`Photo ${index + 1}`}
            width={1200}
            height={800}
            className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
          />
          {/* Counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
            {index + 1} / {images.length}
          </div>
        </motion.div>

        {/* Controls */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30"
          aria-label="Previous photo"
          disabled={index === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30"
          aria-label="Next photo"
          disabled={index === images.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}


/* ─── Thumbnail Strip ─────────────────────────────────────────── */
function ThumbnailStrip({
  images,
  active,
  onSelect,
}: {
  images: readonly string[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.children[active] as HTMLElement | undefined;
    if (!el) return;

    // Scroll ONLY the strip container — never ancestor containers — so
    // clicking a thumbnail can't shift the whole page/section horizontally.
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const target =
      container.scrollLeft +
      (elRect.left - containerRect.left) -
      (containerRect.width - elRect.width) / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: Math.min(Math.max(0, target), maxScroll),
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="flex gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none", overscrollBehaviorX: "contain" }}
    >
      {images.map((src, i) => (
        <button
          key={src}
          onClick={() => onSelect(i)}
          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus:outline-none ${i === active
              ? "scale-110 ring-2 ring-secondary shadow-lg"
              : "opacity-60 hover:opacity-90"
            }`}
          aria-label={`Go to photo ${i + 1}`}
        >
          <Image
            src={src}
            alt={`Thumbnail ${i + 1}`}
            fill
            className="object-cover"
            sizes="56px"
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Story Card ──────────────────────────────────────────────── */
function StoryCard({
  story,
  reversed,
  index,
}: {
  story: (typeof IMPACT_STORIES)[number];
  reversed: boolean;
  index: number;
}) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [featuredIndex, setFeaturedIndex] = React.useState(0);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((p) => (p !== null && p > 0 ? p - 1 : p));
  const nextPhoto = () =>
    setLightboxIndex((p) =>
      p !== null && p < story.images.length - 1 ? p + 1 : p
    );

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          images={story.images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      <FadeIn direction={reversed ? "right" : "left"} delay={index * 0.1}>
        <div
          className={`flex flex-col gap-8 lg:flex-row ${reversed ? "lg:flex-row-reverse" : ""} items-start lg:items-center`}
        >
          {/* ── Photo Column ── */}
          <div className="flex w-full flex-col gap-4 lg:w-[55%]">
            {/* Featured large image */}
            <motion.button
              onClick={() => openLightbox(featuredIndex)}
              className="group relative w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              style={{ aspectRatio: "16/10" }}
              aria-label="Open featured photo"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <Image
                    src={story.images[featuredIndex]}
                    alt={`${story.title} – featured`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Location badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-secondary" />
                {story.location}
              </div>

              {/* Zoom hint on hover */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  <ZoomIn className="h-4 w-4" />
                  <span>View full size</span>
                </div>
              </div>
            </motion.button>

            {/* Thumbnail strip */}
            <ThumbnailStrip
              images={story.images}
              active={featuredIndex}
              onSelect={setFeaturedIndex}
            />

          </div>

          {/* ── Text Column ── */}
          <div className="flex w-full flex-col justify-center lg:w-[45%]">
            <StaggerContainer>
              <StaggerItem>
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary">
                    {story.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-primary-foreground/60">
                    <Calendar className="h-3 w-3" /> {story.year}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h3 className="text-3xl font-semibold leading-tight tracking-tight text-primary-foreground sm:text-4xl">
                  {story.title}
                </h3>
              </StaggerItem>

              <StaggerItem>
                <p className="mt-2 text-lg font-semibold text-secondary">
                  {story.headline}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
                  {story.description}
                </p>
              </StaggerItem>

              {/* Stats row */}
              <StaggerItem>
                <div
                  className={cn(
                    "mt-8 grid gap-3",
                    story.stats.length >= 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-2"
                  )}
                >
                  {story.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/15 bg-white/5 p-4 text-center backdrop-blur-sm"
                    >
                      <div className="break-words text-2xl font-bold leading-tight text-secondary">{stat.value}</div>
                      <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground/60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </StaggerItem>

            </StaggerContainer>
          </div>
        </div>
      </FadeIn>
    </>
  );
}

/* ─── Main Export ─────────────────────────────────────────────── */
export function ImpactStories() {
  return (
    <section
      id="impact"
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

      {/* Coloured orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Section header */}
        <FadeIn direction="up">
          <div className="mb-12 max-w-2xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-secondary/40 bg-secondary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary">
              Impact Stories
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Real stories of{" "}
              <span className="relative inline-block">
                transformation
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full opacity-60"
                  style={{ background: "hsl(15 76% 57%)" }}
                />
              </span>{" "}
              &amp; hope
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Documented through photographs from across the region, DICDO partnered with the National
              Election Board of Ethiopia (NEBE) during the 7th General Election—observing the vote as an
              accredited body and bringing voter education to underserved urban and rural communities.
            </p>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Stories */}
        <div className="flex flex-col gap-16">
          {IMPACT_STORIES.map((story, i) => (
            <div key={story.id}>
              <StoryCard story={story} reversed={i % 2 === 1} index={i} />
              {i < IMPACT_STORIES.length - 1 && (
                <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
