"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Real gallery images — d1.jpg through d35.jpg                      */
/* ------------------------------------------------------------------ */
const GALLERY_IMAGES = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/d${i + 1}.jpg`,
  alt: `DICDO Gallery Image ${i + 1}`,
}));

/* ------------------------------------------------------------------ */
/*  Safe image with fallback (uses next/image for optimization)       */
/* ------------------------------------------------------------------ */
function GalleryImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5", className)}>
        <div className="text-center text-muted-foreground">
          <Camera className="mx-auto h-10 w-10" />
          <p className="mt-1 text-xs">{alt.replace("DICDO Gallery Image ", "Image ")}</p>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof GALLERY_IMAGES;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Image */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative mx-16 flex max-h-[85vh] max-w-5xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <GalleryImg
            src={current.src}
            alt={current.alt}
            className="h-auto max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Image Card                                                 */
/* ------------------------------------------------------------------ */
function GalleryCard({
  image,
  onClick,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  onClick: () => void;
}) {
  return (
    <motion.button
      layoutId={`gallery-${image.id}`}
      onClick={onClick}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <GalleryImg
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
      />

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
        <div className="scale-0 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-300 group-hover:scale-100">
          <Camera className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Image number badge */}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
        {String(image.id).padStart(2, "0")}
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                      */
/* ------------------------------------------------------------------ */
export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation via global listener
  useEffect(function () {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext]);

  return (
    <>
      <main className="flex-1">
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />

          <div className="container relative mx-auto px-6 lg:px-8">
            {/* Gallery grid */}
            <FadeIn direction="up">
              <StaggerContainer>
                <div className="pt-20 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {GALLERY_IMAGES.map((image, index) => (
                    <StaggerItem key={image.id}>
                      <GalleryCard
                        image={image}
                        onClick={() => openLightbox(index)}
                      />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </FadeIn>

            {/* Back to home */}
            <FadeIn direction="up" delay={0.4}>
              <div className="mt-14 pb-20 text-center">
                <Button size="lg" asChild>
                  <Link href="/">
                    Back to home <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={GALLERY_IMAGES}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
