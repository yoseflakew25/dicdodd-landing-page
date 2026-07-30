import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "About DICDO – Our Mission, Vision & Core Values",
  description:
    "Learn about DICDO's mission to empower communities in Ethiopia through peacebuilding, education, and sustainable development.",
  openGraph: {
    title: "About DICDO – Our Mission, Vision & Core Values",
    description:
      "Learn about DICDO's mission to empower communities in Ethiopia through peacebuilding, education, and sustainable development.",
  },
};

const CORE_VALUES = [
  {
    icon: Heart,
    title: "Respect & Dignity",
    description:
      "For every individual we serve. We believe in treating all people with the respect and dignity they deserve.",
  },
  {
    icon: Target,
    title: "Commitment",
    description:
      "To lasting change in communities. We are dedicated to seeing our work through to create sustainable, long-term impact.",
  },
  {
    icon: Users,
    title: "Inclusiveness & Transparency",
    description:
      "Social justice for all, with full accountability in all our actions and decision-making processes.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
        {/* Hero + Mission & Vision */}
        <section className="primary-band relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.07),transparent)]" />

          <div className="container relative mx-auto px-6 lg:px-8">
            {/* Hero heading */}
            <div className="py-16">
              <FadeIn direction="up" className="mx-auto max-w-3xl text-center">
                <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  About Us
                </span>
                <h1 className="text-4xl font-semibold tracking-tight text-primary-foreground">
                  About <span className="text-accent">DICDO</span>
                </h1>
                <p className="mt-2 text-base leading-relaxed text-primary-foreground/80">
                  Empowering communities in Ethiopia through peacebuilding, education, and
                  sustainable development since 2015.
                </p>
              </FadeIn>
            </div>

            {/* Mission & Vision cards */}
            <div className="grid gap-8 pb-24 lg:grid-cols-2 lg:gap-12">
              <FadeIn direction="left">
                <div className="flex h-full flex-col rounded-2xl border border-white/20 p-8 transition-all duration-300 ease-in-out hover:scale-[1.02]">
                  <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                    Our Mission
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground">
                    Empowering communities to create their own solutions
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/80">
                    To empower local communities—especially women, youth, and vulnerable groups—by
                    providing tools, knowledge, and resources to build a sustainable and resilient
                    future. We work alongside communities to identify their needs, develop sustainable
                    solutions, and build capacity for long-term success.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="flex h-full flex-col rounded-2xl border border-white/20 p-8 transition-all duration-300 ease-in-out hover:scale-[1.02]">
                  <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                    Our Vision
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground">
                    Peaceful and self-sufficient communities
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/80">
                    To see peaceful and self-sufficient communities across Ethiopia where every
                    community thrives in peace and prosperity. We envision a future where empowered
                    communities can solve their own problems, build peace, and create lasting change.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative overflow-hidden py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="mb-12 max-w-2xl">
                <span className="mb-4 inline-flex w-fit rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  Our Core Values
                </span>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  The principles that guide us
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Every program we deliver is rooted in these core values, ensuring that communities
                  receive the highest standard of development support.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer>
              <div className="grid gap-6 md:grid-cols-3">
                {CORE_VALUES.map(({ icon: Icon, title, description }) => (
                  <StaggerItem key={title}>
                    <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-white/70 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-md dark:bg-white/[0.04] dark:hover:border-primary/40">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            <FadeIn direction="up" delay={0.3}>
              <div className="mt-12 text-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get in touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
  );
}
