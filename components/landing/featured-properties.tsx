"use client";

import Link from "next/link";
import { ArrowRight, Building2, MapPin, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const ORGANIZATIONS = [
  {
    id: "org-1",
    name: "Immigration & Citizenship Service",
    type: "Federal Agency",
    location: "All MESOB Centers",
    services: ["Passport Processing", "Citizenship Applications", "Travel Documents"],
    status: "Available",
    serviceCount: 12,
  },
  {
    id: "org-2",
    name: "Trade License & Business Registration",
    type: "Municipal Service",
    location: "All MESOB Centers",
    services: ["New License", "Renewal", "Business Registration"],
    status: "Available",
    serviceCount: 8,
  },
  {
    id: "org-3",
    name: "Civil Registration & Vital Events",
    type: "Federal Agency",
    location: "All MESOB Centers",
    services: ["Birth Certificate", "Marriage Certificate", "Death Certificate"],
    status: "Available",
    serviceCount: 10,
  },
  {
    id: "org-4",
    name: "Tax & Revenue Authority",
    type: "Federal Agency",
    location: "All MESOB Centers",
    services: ["Tax Registration", "Returns Filing", "Clearance Certificates"],
    status: "Available",
    serviceCount: 9,
  },
  {
    id: "org-5",
    name: "Land & Housing Authority",
    type: "Municipal Service",
    location: "All MESOB Centers",
    services: ["Title Deeds", "Property Transfer", "Lease Agreements"],
    status: "Available",
    serviceCount: 7,
  },
  {
    id: "org-6",
    name: "Social Security Agency",
    type: "Federal Agency",
    location: "All MESOB Centers",
    services: ["Pension Claims", "Benefits Registration", "ID Cards"],
    status: "Available",
    serviceCount: 6,
  },
];

export function FeaturedProperties() {
  return (
    <section id="featured-properties" className="border-b border-border/50 bg-muted/20 py-20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="mb-4 inline-flex w-fit rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                Available Organizations
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-primary">
                Government Services at MESOB Center
              </h2>
            </div>
            <Button variant="ghost" size="sm" className="hidden gap-1.5 text-xs sm:flex" asChild>
              <Link href="#featured-properties">
                View all organizations <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ORGANIZATIONS.map((org) => (
              <StaggerItem key={org.id}>
                <div className="group overflow-hidden rounded-xl border border-border/80 bg-background transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover active:translate-y-0">
                  {/* Header */}
                  <div className="relative bg-primary/5 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <Badge variant="outline" className="text-[10px]">
                          {org.type}
                        </Badge>
                      </div>
                      <span className="text-[10px] font-medium text-primary">{org.serviceCount} Services</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">{org.name}</h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {org.location}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                      {org.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        >
                          <FileText className="h-2.5 w-2.5" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Mobile CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link href="#featured-properties">
                View all organizations <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
