"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Real gallery images — d1.jpg through d6.jpg (preview)             */
/* ------------------------------------------------------------------ */
const GALLERY_PREVIEW = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/d${i + 1}.jpg`,
  alt: `DICDO gallery image ${i + 1}`,
}));

/* ------------------------------------------------------------------ */
/*  Safe image with fallback                                          */
/* ------------------------------------------------------------------ */
function GalleryImg({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5", className)}>
        <div className="text-center text-muted-foreground">
          <Camera className="mx-auto h-8 w-8" />
          <p className="mt-1 text-xs">Image</p>
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
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Section                                                     */
/* ------------------------------------------------------------------ */
export function Gallery() {
  return (
    <section
      id="gallery"
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
        className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-12 max-w-2xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Photo Gallery
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Capturing moments of transformation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Images that tell the story of our journey — from community workshops to
              peacebuilding initiatives across Ethiopia.
            </p>
          </div>
        </FadeIn>

        {/* Image grid */}
        <FadeIn direction="up" delay={0.1}>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {GALLERY_PREVIEW.map(({ id, src, alt }) => (
              <div
                key={id}
                className={cn(
                  "group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                  id === 1 && "sm:col-span-2 sm:row-span-2"
                )}
              >
                <GalleryImg
                  src={src}
                  alt={alt}
                  priority={id <= 2}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                  <div className="scale-0 rounded-full bg-white/20 p-2.5 backdrop-blur-sm transition-all duration-300 group-hover:scale-100">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/gallery">
                View Full Gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
