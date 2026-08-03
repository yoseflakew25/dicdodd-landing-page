import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const TESTIMONIALS = [
  {
    quote:
      "I used to spend days visiting different government offices for my business license. MESOB Center completed everything in just two hours. This is a game changer for Ethiopian citizens.",
    name: "Abebe Kebede",
    role: "Small Business Owner",
    location: "Addis Ababa",
    initials: "AK",
  },
  {
    quote:
      "Getting my passport renewal done was incredibly fast. The staff guided me through every step, and I had my documents processed the same day. Thank you MESOB Center!",
    name: "Fatuma Ahmed",
    role: "University Student",
    location: "Harar",
    initials: "FA",
  },
  {
    quote:
      "As someone who had to travel between three different offices for property registration, MESOB Center has saved me countless hours. Everything is now in one convenient location.",
    name: "Dawit Tadesse",
    role: "Property Owner",
    location: "Dire Dawa",
    initials: "DT",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border/50 bg-muted/20 py-20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              Citizen Stories
            </p>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground">
              Trusted by citizens across Ethiopia
            </h2>
          </div>
        </FadeIn>

        {/* Cards */}
        <StaggerContainer>
          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, location, initials }) => (
              <StaggerItem key={name}>
                <div className="group relative flex flex-col gap-4 rounded-xl border border-border/80 bg-background p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover active:translate-y-0">
                  {/* Quote mark */}
                  <span className="text-5xl font-serif leading-none text-secondary select-none">
                    &ldquo;
                  </span>

                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-border/50 pt-5 transition-colors duration-300 group-hover:border-primary/20">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-secondary/20 bg-secondary/5 text-xs font-semibold text-secondary transition-all duration-300 group-hover:border-secondary/40 group-hover:bg-secondary/10">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        {role} · {location}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
