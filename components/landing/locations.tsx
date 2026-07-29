"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Navigation, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";

/* ------------------------------------------------------------------ */
/*  Office Data                                                         */
/* ------------------------------------------------------------------ */
const OFFICES = [
  {
    city: "Addis Ababa",
    label: "HQ",
    address: "Yeka Sub City, Woreda 05",
    region: "Addis Ababa, Ethiopia",
    phone: "+251 915005166",
    email: "dicdodd@gmail.com",
    cx: 40,
    cy: 50,
  },
  {
    city: "Dire Dawa",
    label: "Branch",
    address: "Kebele 03 Area",
    region: "Dire Dawa, Ethiopia",
    phone: "+251 915005166",
    email: "dicdodd@gmail.com",
    cx: 60,
    cy: 45,
  },
];

/* ------------------------------------------------------------------ */
/*  Ethiopia shape — precise outline from official GeoJSON data       */
/* ------------------------------------------------------------------ */
const ETHIOPIA_POLYGON: [number, number][] = [
  [34.9, 0.3],
  [38.8, 4.1],
  [42.6, 2.2],
  [44.1, 3.8],
  [48.6, 4.0],
  [54.2, 7.3],
  [55.8, 10.2],
  [58.7, 12.9],
  [61.4, 17.8],
  [63.6, 20.5],
  [61.3, 24.2],
  [59.1, 28.1],
  [59.6, 30.4],
  [59.7, 32.9],
  [63.3, 33.0],
  [64.9, 32.5],
  [66.3, 33.9],
  [64.9, 36.9],
  [67.3, 41.5],
  [69.7, 45.5],
  [72.1, 48.5],
  [93.2, 58.4],
  [98.7, 58.3],
  [80.4, 83.3],
  [72.0, 83.7],
  [66.3, 89.6],
  [62.1, 89.7],
  [60.4, 92.3],
  [55.9, 92.3],
  [53.3, 89.5],
  [47.5, 93.0],
  [45.5, 96.5],
  [41.2, 95.8],
  [39.8, 94.9],
  [38.3, 95.1],
  [36.3, 95.0],
  [28.1, 87.9],
  [23.6, 87.9],
  [21.4, 85.2],
  [21.4, 80.5],
  [18.1, 79.1],
  [14.2, 70.0],
  [11.3, 68.1],
  [10.2, 64.8],
  [6.9, 60.7],
  [2.9, 60.1],
  [5.1, 55.4],
  [8.6, 55.2],
  [9.5, 52.6],
  [9.4, 45.1],
  [11.3, 36.4],
  [14.4, 34.1],
  [15.0, 30.7],
  [17.8, 24.3],
  [21.7, 20.2],
  [24.3, 12.0],
  [25.4, 4.8],
  [32.9, 6.6],
];

// Ray-casting algorithm to verify point inside outline
function isInsideEthiopia(px: number, py: number): boolean {
  let inside = false;
  const n = ETHIOPIA_POLYGON.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = ETHIOPIA_POLYGON[i];
    const [xj, yj] = ETHIOPIA_POLYGON[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/* ------------------------------------------------------------------ */
/*  Generate dot grid in 100x100 space                                */
/* ------------------------------------------------------------------ */
interface DotData {
  x: number;
  y: number;
  id: string;
  distToAddis: number;
  distToDire: number;
}

function generateDots(spacing: number): DotData[] {
  const dots: DotData[] = [];
  for (let y = 0.5; y <= 100; y += spacing) {
    for (let x = 0.5; x <= 100; x += spacing) {
      if (isInsideEthiopia(x, y)) {
        const distToAddis = Math.hypot(x - OFFICES[0].cx, y - OFFICES[0].cy);
        const distToDire = Math.hypot(x - OFFICES[1].cx, y - OFFICES[1].cy);
        dots.push({
          x,
          y,
          id: `${x.toFixed(1)}-${y.toFixed(1)}`,
          distToAddis,
          distToDire,
        });
      }
    }
  }
  return dots;
}

/* ------------------------------------------------------------------ */
/*  Interactive Dot Map Component                                       */
/* ------------------------------------------------------------------ */
function EthiopiaDotMap({
  activeOffice,
  onOfficeSelect,
}: {
  activeOffice: string | null;
  onOfficeSelect: (city: string) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mapRef, { once: true, margin: "-80px" });
  const [animProgress, setAnimProgress] = useState(0);

  // Generate dots with a clean spacing value (1.4 units gives beautiful density)
  const dots = useMemo(() => generateDots(1.4), []);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const startTime = performance.now();
    const duration = 1500;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimProgress(progress);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 104 - 2;
      const y = ((e.clientY - rect.top) / rect.height) * 104 - 2;
      setMousePos({ x, y });
    },
    []
  );

  // Styling logic for bold, highly visible monochromatic dots
  const getDotStyle = useCallback(
    (dot: DotData) => {
      const mouseDist = Math.hypot(dot.x - mousePos.x, dot.y - mousePos.y);
      const isNearMouse = mouseDist < 10; // 10 units in 100x100 space

      // Bolder defaults
      let opacity = 0.35;
      let radius = 0.55;

      // Active state highlight area
      if (activeOffice === "Addis Ababa") {
        const addisInfluence = Math.max(0, 1 - dot.distToAddis / 35);
        opacity += addisInfluence * 0.45;
        radius += addisInfluence * 0.25;
      } else if (activeOffice === "Dire Dawa") {
        const direInfluence = Math.max(0, 1 - dot.distToDire / 35);
        opacity += direInfluence * 0.45;
        radius += direInfluence * 0.25;
      }

      // Mouse interactive highlight
      if (isNearMouse) {
        const mouseInfluence = 1 - mouseDist / 10;
        opacity = Math.min(0.95, opacity + mouseInfluence * 0.5);
        radius += mouseInfluence * 0.35;
      }

      return { opacity, radius };
    },
    [mousePos, activeOffice]
  );

  // Sorting dots for a clean directional loading sweep effect
  const sortedDots = useMemo(() => {
    return [...dots].sort((a, b) => {
      const diagA = a.x * 0.3 + a.y * 0.7;
      const diagB = b.x * 0.3 + b.y * 0.7;
      return diagA - diagB;
    });
  }, [dots]);

  return (
    <div ref={mapRef} className="relative h-full w-full">
      <svg
        ref={svgRef}
        viewBox="-2 -2 104 104"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        style={{ cursor: "crosshair" }}
      >
        {/* Dot matrix — Ethiopia shape */}
        {sortedDots.map((dot, i) => {
          const normalizedIndex = i / sortedDots.length;
          const isVisible = animProgress > normalizedIndex;
          const style = getDotStyle(dot);

          return (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={isVisible ? style.radius : 0}
              fill="white"
              opacity={isVisible ? style.opacity : 0}
              style={{
                transition: isVisible ? "r 0.2s ease, opacity 0.2s ease" : "none",
              }}
            />
          );
        })}

        {/* Connection line between offices */}
        <line
          x1={OFFICES[0].cx}
          y1={OFFICES[0].cy}
          x2={OFFICES[1].cx}
          y2={OFFICES[1].cy}
          stroke="white"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.5"
          opacity={animProgress > 0.6 ? 0.45 : 0}
          style={{ transition: "opacity 0.8s ease" }}
        />

        {/* Animated pulse along connection line */}
        {animProgress > 0.7 && (
          <circle r="0.7" fill="white" opacity="0.9">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={`M${OFFICES[0].cx},${OFFICES[0].cy} L${OFFICES[1].cx},${OFFICES[1].cy}`}
            />
          </circle>
        )}

        {/* Office markers */}
        {OFFICES.map((office, idx) => {
          const isOfficeActive = activeOffice === office.city;
          return (
            <g
              key={office.city}
              className="cursor-pointer"
              onClick={() => onOfficeSelect(office.city)}
              style={{
                opacity: animProgress > 0.5 + idx * 0.15 ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            >
              {/* Pulsing halo ring */}
              <circle
                cx={office.cx}
                cy={office.cy}
                r="4.5"
                fill="none"
                stroke="white"
                strokeWidth="0.3"
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values="3;6;3"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${idx * 0.6}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0;0.4"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${idx * 0.6}s`}
                />
              </circle>

              {/* Main marker dot */}
              <circle
                cx={office.cx}
                cy={office.cy}
                r={isOfficeActive ? 1.8 : 1.3}
                fill="white"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="0.25"
                className="transition-all duration-300"
              />

              {/* Inner core dot */}
              {isOfficeActive && (
                <circle
                  cx={office.cx}
                  cy={office.cy}
                  r="0.75"
                  fill="currentColor"
                  className="text-primary"
                />
              )}

              {/* Tooltip city name label */}
              <g style={{ transform: `translate(${office.cx}px, ${office.cy - 4.5}px)` }}>
                <rect
                  x={-8}
                  y={-2.5}
                  width={16}
                  height={4.5}
                  rx={1}
                  fill="white"
                  opacity={isOfficeActive ? 1 : 0.85}
                  className="transition-opacity duration-300"
                />
                <text
                  textAnchor="middle"
                  y={0.7}
                  fill="black"
                  fontSize="2.2"
                  fontWeight="800"
                  fontFamily="system-ui, sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {office.city.toUpperCase()}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Office Detail Card                                                  */
/* ------------------------------------------------------------------ */
function OfficeCard({
  office,
  isActive,
  onClick,
  index,
}: {
  office: (typeof OFFICES)[number];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      id={`office-${office.city.toLowerCase().replace(/\s+/g, "-")}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className={`group relative cursor-pointer scroll-mt-20 overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
        isActive
          ? "border-white/40 bg-white/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
            <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              {office.city}
            </h3>
            <span className="text-[9px] font-semibold text-white/50 tracking-wider uppercase">
              {office.label}
            </span>
          </div>
        </div>
        <ArrowRight
          className={`h-3.5 w-3.5 text-white/40 transition-all duration-300 ${
            isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
          }`}
        />
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-start gap-2.5 text-white/70">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" />
          <div>
            <p className="font-medium">{office.address}</p>
            <p className="text-[10px] opacity-60">{office.region}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-white/70">
          <Phone className="h-3.5 w-3.5 shrink-0 opacity-60" />
          <a
            href={`tel:${office.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-white transition-colors"
          >
            {office.phone}
          </a>
        </div>

        <div className="flex items-center gap-2.5 text-white/70">
          <Mail className="h-3.5 w-3.5 shrink-0 opacity-60" />
          <a
            href={`mailto:${office.email}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-white transition-colors"
          >
            {office.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Locations Component                                            */
/* ------------------------------------------------------------------ */
export function Locations() {
  const [activeOffice, setActiveOffice] = useState<string | null>(null);

  const handleOfficeSelect = useCallback((city: string) => {
    setActiveOffice((prev) => (prev === city ? null : city));
    const el = document.getElementById(`office-${city.toLowerCase().replace(/\s+/g, "-")}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section
      id="locations"
      className="primary-band relative overflow-hidden border-b border-white/10 py-20 scroll-mt-16"
    >
      {/* Background patterns: subtle and monochromatic */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="mb-14 max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Our Presence
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Visit Us in Ethiopia
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              We have offices in Addis Ababa and Dire Dawa. Select a location to see details or view it on our interactive dot map.
            </p>
          </div>
        </FadeIn>

        {/* Layout: Grid of Map + Cards */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Map (made bigger with lg:col-span-3 and full utilization of container) */}
          <FadeIn direction="left" className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 lg:p-8">
              {/* Geometric Corner Lines */}
              <div className="absolute left-2 top-2 h-4 w-4 border-l border-t border-white/20" />
              <div className="absolute right-2 top-2 h-4 w-4 border-r border-t border-white/20" />
              <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-white/20" />
              <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/20" />

              <div className="aspect-[4/3] w-full lg:aspect-[16/12]">
                <EthiopiaDotMap activeOffice={activeOffice} onOfficeSelect={handleOfficeSelect} />
              </div>
            </div>
          </FadeIn>

          {/* Cards Column */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {OFFICES.map((office, i) => (
              <OfficeCard
                key={office.city}
                office={office}
                isActive={activeOffice === office.city}
                onClick={() => handleOfficeSelect(office.city)}
                index={i}
              />
            ))}

            {/* Micro-Minimal CTA */}
            <div className="mt-2 rounded-xl border border-dashed border-white/10 bg-white/[0.01] p-5 text-xs text-white/70">
              <p className="font-bold uppercase tracking-wider text-white/80">Collaborations &amp; Inquiries</p>
              <p className="mt-1 leading-relaxed opacity-60">
                Interested in learning more or discussing partnership opportunities?
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-1 font-bold text-white hover:text-white/80 transition-colors underline underline-offset-4"
              >
                Reach out to us
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
