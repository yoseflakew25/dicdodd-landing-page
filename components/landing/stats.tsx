"use client";

import { AnimatedCounter } from "@/components/ui/motion";

const STATS = [
  { value: 10, suffix: "+", label: "Years of Service", description: "Since 2014" },
  { value: 500, suffix: "+", label: "Lives Impacted", description: "Direct community engagement" },
  { value: 15, suffix: "", label: "Communities", description: "Across Ethiopia" },
  { value: 30, suffix: "+", label: "Leaders Trained", description: "Peacebuilding & development" },
];

export function Stats() {
  return (
    <section className="primary-band relative overflow-hidden border-b border-primary-foreground/20">
      {/* Rich background pattern: dots + diagonal crosshatch */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "20px 20px, 48px 48px, 48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.08),transparent)]" />

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/15 lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 px-6 py-8 first:pl-0 lg:last:pr-0"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <p className="text-3xl font-semibold tracking-tight text-white">
                <AnimatedCounter target={s.value} suffix={s.suffix} duration={2} />
              </p>
              <p className="text-sm font-medium text-primary-foreground">{s.label}</p>
              <p className="text-xs leading-relaxed text-primary-foreground/70">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
