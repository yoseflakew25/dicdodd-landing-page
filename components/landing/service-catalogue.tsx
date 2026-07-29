"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Building2,
  FileText,
  ChevronDown,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const AGENCIES = [
  {
    id: "immigration",
    name: "Immigration & Citizenship Service",
    type: "Federal Agency",
    icon: FileText,
    serviceCount: 12,
    services: [
      "Passport Application (New)",
      "Passport Renewal",
      "Passport Replacement",
      "Citizenship Application",
      "Citizenship Certificate",
      "Travel Document Issuance",
      "Visa Processing",
      "Residence Permit",
      "Exit Permit",
      "Identity Verification",
      "Nationality Confirmation",
      "Immigration Clearance",
    ],
  },
  {
    id: "trade",
    name: "Trade License & Business Registration",
    type: "Municipal Service",
    icon: Building2,
    serviceCount: 8,
    services: [
      "New Business License",
      "License Renewal",
      "Business Registration",
      "Trade Name Registration",
      "Commercial Registration Certificate",
      "Business Permit Modification",
      "Business Closure Processing",
      "Investment License",
    ],
  },
  {
    id: "civil",
    name: "Civil Registration & Vital Events",
    type: "Federal Agency",
    icon: FileText,
    serviceCount: 10,
    services: [
      "Birth Certificate Issuance",
      "Birth Registration (Late)",
      "Marriage Certificate",
      "Marriage Registration",
      "Death Certificate",
      "Death Registration",
      "Divorce Certificate",
      "Adoption Registration",
      "Certificate Correction",
      "Civil Status Verification",
    ],
  },
  {
    id: "tax",
    name: "Tax & Revenue Authority",
    type: "Federal Agency",
    icon: FileText,
    serviceCount: 9,
    services: [
      "Taxpayer Registration",
      "Tax Returns Filing",
      "Tax Clearance Certificate",
      "VAT Registration",
      "Withholding Tax Processing",
      "Business Profit Tax",
      "Customs Duty Processing",
      "Tax Exemption Application",
      "Tax Payment & Receipt",
    ],
  },
  {
    id: "land",
    name: "Land & Housing Authority",
    type: "Municipal Service",
    icon: Building2,
    serviceCount: 7,
    services: [
      "Title Deed Issuance",
      "Property Transfer Registration",
      "Lease Agreement Registration",
      "Land Use Permit",
      "Building Permit",
      "Property Valuation",
      "Land Dispute Resolution",
    ],
  },
  {
    id: "social",
    name: "Social Security Agency",
    type: "Federal Agency",
    icon: Building2,
    serviceCount: 6,
    services: [
      "Pension Application",
      "Pension Claims Processing",
      "Social Security Registration",
      "Benefits Enrollment",
      "Social Security ID Card",
      "Contribution Verification",
    ],
  },
  {
    id: "education",
    name: "Education & Accreditation",
    type: "Federal Agency",
    icon: FileText,
    serviceCount: 5,
    services: [
      "Degree Verification",
      "Transcript Request",
      "Accreditation Certificate",
      "Equivalency Assessment",
      "Student Record Verification",
    ],
  },
  {
    id: "health",
    name: "Health & Medical Services",
    type: "Federal Agency",
    icon: FileText,
    serviceCount: 5,
    services: [
      "Health Insurance Registration",
      "Medical Certificate Issuance",
      "Health Facility Licensing",
      "Pharmaceutical Permit",
      "Health Record Request",
    ],
  },
  {
    id: "judicial",
    name: "Judicial & Legal Services",
    type: "Federal Agency",
    icon: Building2,
    serviceCount: 5,
    services: [
      "Court Document Filing",
      "Notary Services",
      "Legal Document Attestation",
      "Power of Attorney Registration",
      "Court Record Request",
    ],
  },
  {
    id: "transport",
    name: "Transport & Driving License",
    type: "Municipal Service",
    icon: Building2,
    serviceCount: 5,
    services: [
      "Driving License Application",
      "Driving License Renewal",
      "Vehicle Registration",
      "Vehicle Transfer of Ownership",
      "Transport Permit",
    ],
  },
];

const TOTAL_SERVICES = AGENCIES.reduce((sum, a) => sum + a.serviceCount, 0);

function ServiceCard({
  agency,
  searchQuery,
  forceExpanded,
}: {
  agency: (typeof AGENCIES)[number];
  searchQuery: string;
  forceExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isExpanded = forceExpanded || expanded;
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return agency.services;
    const q = searchQuery.toLowerCase();
    return agency.services.filter((s) => s.toLowerCase().includes(q));
  }, [agency.services, searchQuery]);

  const hasMatch = filteredServices.length > 0;

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border transition-all duration-300",
        !hasMatch && searchQuery.trim()
          ? "border-destructive/20 opacity-40"
          : "border-border/80 bg-background hover:border-primary/30 hover:shadow-card-hover"
      )}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
            <agency.icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-600">
                {agency.name}
              </h3>
              <Badge variant="outline" className="text-[9px]">
                {agency.type}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {agency.serviceCount} services
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Services list */}
      {isExpanded && (
        <div className="border-t border-border/50 px-4 pb-4 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {filteredServices.map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/30 px-2 py-1 text-[11px] text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <FileText className="h-2.5 w-2.5 shrink-0" />
                {service}
              </span>
            ))}
          </div>
          {!hasMatch && searchQuery.trim() && (
            <p className="mt-2 text-xs text-muted-foreground">
              No matching services in this agency.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function ServiceCatalogue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const filteredAgencies = useMemo(() => {
    if (!normalizedQuery) return AGENCIES;
    return AGENCIES.filter(
      (a) =>
        a.name.toLowerCase().includes(normalizedQuery) ||
        a.services.some((s) => s.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  return (
    <section id="services" className="border-b border-border/50 bg-background py-20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-10 max-w-2xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
              Service Catalogue
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-primary">
              Explore all {TOTAL_SERVICES}+ services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Browse services offered by all government agencies operating at
              MESOB Center. Use the search bar to find specific services quickly.
            </p>
          </div>
        </FadeIn>

        {/* Search + controls */}
        <FadeIn direction="up" delay={0.1}>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search services or agencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/70 bg-background pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {searchQuery && (
                <p className="text-xs text-muted-foreground">
                  {filteredAgencies.length} agency
                  {filteredAgencies.length !== 1 ? "ies" : ""} match
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => setExpandedAll((o) => !o)}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {expandedAll ? "Collapse All" : "Expand All"}
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Agency cards */}
        <StaggerContainer>
          <div className="space-y-3">
            {filteredAgencies.map((agency) => (
              <StaggerItem key={agency.id}>
                <ServiceCard agency={agency} searchQuery={searchQuery} forceExpanded={expandedAll} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Empty state */}
        {filteredAgencies.length === 0 && normalizedQuery && (
          <FadeIn direction="up">
            <div className="mt-10 rounded-xl border border-dashed border-border/70 py-12 text-center">
              <p className="text-sm font-medium text-foreground">
                No services found for &quot;{searchQuery}&quot;
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different search term or browse by agency.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            </div>
          </FadeIn>
        )}

        {/* Bottom summary */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-8 rounded-xl border border-dashed border-primary/20 bg-primary/[0.02] px-6 py-4 text-center">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-primary">{TOTAL_SERVICES}+ services</span> across{" "}
              {AGENCIES.length} government agencies &middot;{" "}
              New services added regularly
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
