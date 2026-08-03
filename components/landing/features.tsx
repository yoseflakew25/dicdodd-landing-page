import {
  Handshake,
  BookOpen,
  Users,
  Heart,
  Droplets,
  TreePine,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const PROGRAMS = [
  {
    icon: Handshake,
    title: "Peacebuilding & Conflict Resolution",
    description:
      "Community reconciliation & mediation workshops, civic engagement & election observation, peace values training with elders, youth, and women.",
    activities: [
      "Community dialogue facilitation",
      "Conflict mediation training",
      "Peace education programs",
      "Election observation services",
    ],
  },
  {
    icon: BookOpen,
    title: "Education & Literacy",
    description:
      "Access to basic education for vulnerable children and adult literacy classes to empower communities.",
    activities: [
      "Primary education support",
      "Adult literacy programs",
      "Educational material distribution",
      "Teacher training initiatives",
    ],
  },
  {
    icon: Users,
    title: "Women's & Youth Empowerment",
    description:
      "Vocational training, entrepreneurship, leadership development, addressing gender-based violence and promoting equality.",
    activities: [
      "Vocational skills training",
      "Microfinance programs",
      "Leadership development",
      "Gender equality advocacy",
    ],
  },
  {
    icon: Heart,
    title: "Health & Nutrition",
    description:
      "Mobile health services, maternal/child care, food security programs and nutrition education.",
    activities: [
      "Mobile health clinics",
      "Maternal health services",
      "Nutrition education",
      "Food security programs",
    ],
  },
  {
    icon: Droplets,
    title: "WASH (Water, Sanitation & Hygiene)",
    description:
      "Construction of wells, hygiene kits distribution, and awareness campaigns for better health.",
    activities: [
      "Water well construction",
      "Sanitation facility building",
      "Hygiene education",
      "Clean water access",
    ],
  },
  {
    icon: TreePine,
    title: "Environmental Protection",
    description:
      "Tree planting initiatives, waste management programs, and climate change education.",
    activities: [
      "Reforestation projects",
      "Waste management systems",
      "Climate education",
      "Sustainable agriculture",
    ],
  },
];

export function Features() {
  return (
    <section id="programs" className="relative overflow-hidden border-b border-border/50 bg-background py-20 scroll-mt-16">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-12 max-w-3xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-secondary/30 bg-secondary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary">
              Our Programs
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Programs &amp; Services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              DICDO delivers holistic, community-centered development services across key areas that
              create lasting impact in Ethiopian communities.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-primary">5,000+</span>
                <span className="text-muted-foreground">Lives Directly Impacted</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-accent">50+</span>
                <span className="text-muted-foreground">Communities Served</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-primary">100+</span>
                <span className="text-muted-foreground">Women Empowered</span>
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Program cards */}
        <StaggerContainer>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map(({ icon: Icon, title, description, activities }) => (
              <StaggerItem key={title}>
                <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:bg-white/[0.04]">
                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/5 transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/10">
                    <Icon className="h-5 w-5 text-secondary" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>

                  {/* Activities list */}
                  <div className="mt-4 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Key Activities:
                    </p>
                    <ul className="mt-2 space-y-2">
                      {activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-10 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Ready to make a difference? Join us in building peaceful and empowered communities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Involved <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary/20"
                asChild
              >
                <Link href="/#about">Learn More</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
