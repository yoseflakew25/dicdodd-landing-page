"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Shield } from "lucide-react";

const HERO_SLIDES = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "DICDO community development and peacebuilding in Ethiopia",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "DICDO empowering local communities across Ethiopia",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "DICDO education and literacy programs for vulnerable children",
  },
  {
    src: "/images/hero/hero-4.jpg",
    alt: "DICDO women's empowerment and vocational training initiatives",
  },
];

const TRUST_ITEMS = [
  { icon: Heart, label: "Registered NGO Since 2015" },
  { icon: Users, label: "500+ Lives Impacted" },
  { icon: Shield, label: "NEBE Accredited Observer" },
] as const;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background">
      {/* Grid pattern background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* Top-left accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10 h-px w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <div className="grid min-h-[85vh] lg:grid-cols-2 lg:items-center">
        {/* Left — text content */}
        <div className="container relative z-10 mx-auto flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-0">
          <Badge
            variant="outline"
            className="mb-4 w-fit border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary"
          >
            Transforming Communities Since 2014
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Building
            <br />
            <span className="text-primary">Peaceful Communities</span>
            <br />
            Together
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            DICDO delivers holistic, community-centered development services
            that empower communities through peacebuilding, education, and
            sustainable development across Ethiopia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="#programs">
                Explore Our Programs <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
              asChild
            >
              <Link href="/contact">
                <Heart className="mr-1.5 h-4 w-4" />
                Support Our Mission
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1"
              >
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Edge-to-edge image slideshow (auto-advance only) */}
        <div className="relative h-[400px] lg:h-[85vh] overflow-hidden">
          {/* Slides */}
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="50vw"
                priority={index === 0}
                className="object-cover"
              />
              {/* Dark gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
