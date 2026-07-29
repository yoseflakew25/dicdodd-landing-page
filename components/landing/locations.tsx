"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const OFFICES = [
  {
    city: "Addis Ababa",
    address: "Yeka Sub City, Woreda 05",
    region: "Addis Ababa, Ethiopia",
    phone: "+251 915005166",
    email: "dicdodd@gmail.com",
    cx: 40,
    cy: 50,
  },
  {
    city: "Dire Dawa",
    address: "Kebele 03 Area",
    region: "Dire Dawa, Ethiopia",
    phone: "+251 915005166",
    email: "dicdodd@gmail.com",
    cx: 60,
    cy: 45,
  },
];

/* ------------------------------------------------------------------ */
/*  Ethiopia SVG — precise outline from GeoJSON data                    */
/* ------------------------------------------------------------------ */
function EthiopiaMap() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Ethiopia outline — converted from official GeoJSON */}
      <path
        d="M34.9 0.3 
           L38.8 4.1 
           L42.6 2.2 
           L44.1 3.8 
           L48.6 4.0 
           L54.2 7.3 
           L55.8 10.2 
           L58.7 12.9 
           L61.4 17.8 
           L63.6 20.5 
           L61.3 24.2 
           L59.1 28.1 
           L59.6 30.4 
           L59.7 32.9 
           L63.3 33.0 
           L64.9 32.5 
           L66.3 33.9 
           L64.9 36.9 
           L67.3 41.5 
           L69.7 45.5 
           L72.1 48.5 
           L93.2 58.4 
           L98.7 58.3 
           L80.4 83.3 
           L72.0 83.7 
           L66.3 89.6 
           L62.1 89.7 
           L60.4 92.3 
           L55.9 92.3 
           L53.3 89.5 
           L47.5 93.0 
           L45.5 96.5 
           L41.2 95.8 
           L39.8 94.9 
           L38.3 95.1 
           L36.3 95.0 
           L28.1 87.9 
           L23.6 87.9 
           L21.4 85.2 
           L21.4 80.5 
           L18.1 79.1 
           L14.2 70.0 
           L11.3 68.1 
           L10.2 64.8 
           L6.9 60.7 
           L2.9 60.1 
           L5.1 55.4 
           L8.6 55.2 
           L9.5 52.6 
           L9.4 45.1 
           L11.3 36.4 
           L14.4 34.1 
           L15.0 30.7 
           L17.8 24.3 
           L21.7 20.2 
           L24.3 12.0 
           L25.4 4.8 
           L32.9 6.6 
           Z"
        className="stroke-white/40"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.04)"
      />

      {/* Pins */}
      {OFFICES.map((office, i) => (
        <g
          key={office.city}
          className="cursor-pointer"
          style={{
            transition: "transform 0.3s ease, filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const g = e.currentTarget;
            g.style.transform = `scale(1.3)`;
            g.style.filter = `brightness(1.3)`;
            g.style.transformOrigin = `${office.cx}px ${office.cy}px`;
          }}
          onMouseLeave={(e) => {
            const g = e.currentTarget;
            g.style.transform = `scale(1)`;
            g.style.filter = `brightness(1)`;
          }}
          onClick={() => {
            const el = document.getElementById(`office-${office.city.toLowerCase().replace(/\s+/g, "-")}`);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          {/* Pulse ring */}
          <circle
            cx={office.cx}
            cy={office.cy}
            r="3.5"
            className="animate-ping text-white/20"
            fill="currentColor"
            style={{ animationDelay: `${i * 1}s`, animationDuration: "2.5s" }}
          />
          {/* Outer dot */}
          <circle
            cx={office.cx}
            cy={office.cy}
            r="2.5"
            fill="white"
            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
          />
          {/* Inner dot */}
          <circle cx={office.cx} cy={office.cy} r="1.2" fill="hsl(15 76% 57%)" />

          {/* Labels */}
          <text
            x={office.cx}
            y={office.cy - 5}
            textAnchor="middle"
            className="fill-white/90 text-[3px] font-semibold"
            style={{ pointerEvents: "none" }}
          >
            {office.city}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */
export function Locations() {
  return (
    <section
      id="locations"
      className="primary-band relative overflow-hidden border-b border-primary-foreground/20 py-20 scroll-mt-16"
    >
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
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.08),transparent)]" />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-14 max-w-2xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
              Our Offices
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Visit us in person
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              We have offices in Addis Ababa and Dire Dawa. Reach out to us for inquiries, partnerships, or to learn more about our programs.
            </p>
          </div>
        </FadeIn>

        {/* Map + Offices Grid */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* SVG Map */}
          <FadeIn direction="left" className="lg:col-span-3">
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <div className="aspect-[16/9] w-full p-6 lg:aspect-[4/3]">
                <EthiopiaMap />
              </div>
              {/* Bottom bar */}
              <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                <span className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
                  <MapPin className="h-3.5 w-3.5 text-white/60" />
                  Addis Ababa &amp; Dire Dawa, Ethiopia
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Office Cards */}
          <FadeIn direction="right" className="lg:col-span-2 space-y-4">
            {OFFICES.map((office) => (                <div
                  id={`office-${office.city.toLowerCase().replace(/\s+/g, "-")}`}
                  key={office.city}
                  className="scroll-mt-20 flex flex-col rounded-2xl border border-white/20 bg-transparent p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60"
                >
                <h3 className="text-lg font-semibold text-primary-foreground">{office.city} Office</h3>

                <div className="mt-4 space-y-3">
                  <div className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/10">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <MapPin className="h-4 w-4 text-white/70" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/50">Address</p>
                      <p className="mt-0.5 text-sm font-medium text-primary-foreground/90">{office.address}</p>
                      <p className="text-xs text-primary-foreground/60">{office.region}</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/10">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <Phone className="h-4 w-4 text-white/70" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/50">Phone</p>
                      <a href={`tel:${office.phone}`} className="mt-0.5 block text-sm font-medium text-primary-foreground/90 transition-colors duration-200 hover:text-white">
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  <div className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/10">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <Mail className="h-4 w-4 text-white/70" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/50">Email</p>
                      <a href={`mailto:${office.email}`} className="mt-0.5 block text-sm font-medium text-primary-foreground/90 transition-colors duration-200 hover:text-white">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
