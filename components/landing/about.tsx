"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Eye, HandHeart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { BLUR_PLACEHOLDER } from "@/lib/placeholders";

const VALUES = [
  { icon: HandHeart, title: "Respect & Dignity", description: "For every individual we serve" },
  { icon: Target, title: "Commitment", description: "To lasting change in communities" },
  { icon: Users, title: "Inclusiveness", description: "Social justice for all" },
  { icon: Eye, title: "Transparency", description: "Accountability in all actions" },
];

const ACHIEVEMENTS = [
  {
    title: "Election Observer Recognition",
    description: "Officially recognized by the National Election Board of Ethiopia (NEBE) as an accredited election observer organization",
    stat: "5,274",
    statLabel: "Observers Deployed",
  },
  {
    title: "International Partnerships",
    description: "Collaborating with Life & Peace Institute and other international organizations for greater impact",
    stat: "6+",
    statLabel: "International Partners",
  },
  {
    title: "Community Training Programs",
    description: "Comprehensive training programs for community leaders, youth, women, and elders on peacebuilding",
    stat: "30+",
    statLabel: "Leaders Trained in 2024",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b border-border/50 py-20 scroll-mt-16">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left — Text content */}
          <FadeIn direction="left">
            <div>
              <Badge
                variant="outline"
                className="mb-4 w-fit border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary"
              >
                About DICDO
              </Badge>

              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Who We Are
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Founded in 2015, DICDO is a registered indigenous, non-governmental, and non-political
                development organization operating in Ethiopia.
              </p>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We are driven by the belief that empowered communities can solve their own problems,
                build peace, and create lasting change. Our work focuses on providing comprehensive
                support to communities across Ethiopia.
              </p>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Since our founding, we have been committed to working alongside communities to
                identify their needs, develop sustainable solutions, and build capacity for long-term
                success. Our approach is holistic, addressing not just immediate needs but also
                building the foundation for sustainable development and peaceful coexistence.
              </p>

              {/* Vision & Mission */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                  <Eye className="h-6 w-6 text-accent" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">Our Vision</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    To see peaceful and self-sufficient communities across Ethiopia.
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <Target className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">Our Mission</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    To empower local communities—especially women, youth, and vulnerable groups—by
                    providing tools, knowledge, and resources to build a sustainable and resilient future.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link href="#programs">
                    Our Programs <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                  asChild
                >
                  <Link href="/#about">Learn More</Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Right — Values & Achievements */}
          <FadeIn direction="right">
            {/* Core Values */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our Core Values
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {VALUES.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="group rounded-xl border border-border/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md dark:bg-white/[0.04]"
                  >
                    <Icon className="h-5 w-5 text-primary transition-colors duration-300" />
                    <h4 className="mt-2 text-sm font-semibold text-foreground">{title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
              Our Achievements
            </h3>
            <div className="mt-4 space-y-3">
              {ACHIEVEMENTS.map(({ title, description, stat, statLabel }) => (
                <div
                  key={title}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg dark:bg-white/[0.04]"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-accent">{stat}</p>
                    <p className="text-[10px] text-muted-foreground">{statLabel}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Leadership Contact */}
            <div className="mt-6 rounded-2xl border border-dashed border-accent/20 bg-accent/[0.02] p-5">
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-accent/30 bg-accent/10 shadow-sm">
                  <Image
                    src="/images/director/demisse.png"
                    alt="Mr. Demissie Afework — Executive Director"
                    fill
                    sizes="56px"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Mr. Demissie Afework</p>
                  <p className="text-xs text-muted-foreground">Executive Director & General Manager</p>
                  <div className="mt-2 flex flex-col gap-0.5">
                    <a href="mailto:demessafworke12@gmail.com" className="text-xs text-accent underline-offset-2 hover:underline">
                      demessafworke12@gmail.com
                    </a>
                    <a href="mailto:dicdodd@gmail.com" className="text-xs text-accent underline-offset-2 hover:underline">
                      dicdodd@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
