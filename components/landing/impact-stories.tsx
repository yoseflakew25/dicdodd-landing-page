import { Quote } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const IMPACT_STORIES = [
  {
    id: 1,
    title: "Empowering Refugees through Peace",
    subtitle: "50+ Women Trained",
    description:
      "In refugee camps, DICDO went beyond providing food and water. We created safe spaces for children, provided vocational training for women like Asha (a now self-sufficient tailor), and promoted peaceful dialogue and democratic involvement through free and fair elections.",
  },
  {
    id: 2,
    title: "Youth & Women Leading Peace in Dire Dawa",
    subtitle: "30+ Leaders Trained",
    description:
      "In 2024, with support from Life & Peace Institute, we trained 30+ community leaders—youth, women, elders, and religious figures—on peacebuilding and conflict prevention. The initiative led to the formation of a proposed Peace Council and was covered in multiple languages on Dire Television.",
  },
];

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

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-12 max-w-2xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-secondary/40 bg-secondary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary">
              Impact Stories
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground">
              Real stories of transformation and hope
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Stories of transformation and hope from communities across Ethiopia.
            </p>
          </div>
        </FadeIn>

        {/* Stories grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {IMPACT_STORIES.map((story) => (
            <FadeIn key={story.id} direction="up">
              <div className="group flex h-full flex-col rounded-2xl border border-white/25 bg-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60">
                <Quote className="h-8 w-8 text-secondary" />
                <h3 className="mt-3 text-lg font-semibold text-primary-foreground">
                  {story.title}
                </h3>
                <span className="mt-1.5 inline-flex w-fit rounded-full border border-secondary/40 bg-secondary/15 px-3 py-0.5 text-[11px] font-medium text-secondary">
                  {story.subtitle}
                </span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/75">
                  {story.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
