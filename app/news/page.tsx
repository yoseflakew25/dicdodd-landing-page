"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Calendar,
  Building2,
  Handshake,
  Crown,
  Award,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { NEWS_ARTICLES, type NewsArticle } from "@/data/news";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Recognition: Crown,
  Peacebuilding: Building2,
  Empowerment: Award,
  Expansion: Handshake,
  Partnership: Handshake,
};

const CATEGORY_COLORS: Record<string, string> = {
  Recognition:
    "border-accent/30 bg-accent/5 text-accent",
  Peacebuilding:
    "border-primary/30 bg-primary/5 text-primary",
  Empowerment:
    "border-emerald-500/30 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  Expansion:
    "border-violet-500/30 bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  Partnership:
    "border-blue-500/30 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
};

function formatContent(text: string): string[] {
  return text.split("\n\n").filter(Boolean);
}

function ArticleCard({
  article,
  isOpen,
  onToggle,
}: {
  article: NewsArticle;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const CategoryIcon = CATEGORY_ICONS[article.category] ?? Building2;
  const colorClasses = CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.Recognition;

  return (
    <div
      className={cn(
        "group rounded-2xl border transition-all duration-300 ease-out",
        isOpen
          ? "border-primary/30 bg-white shadow-md dark:bg-white/[0.04]"
          : "border-border/60 bg-white/70 shadow-sm backdrop-blur-xl hover:border-primary/20 hover:shadow-md dark:bg-white/[0.03] dark:hover:border-primary/30"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-6 text-left lg:gap-6 lg:p-8"
        aria-expanded={isOpen}
      >
        {/* Category icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
          <CategoryIcon className="h-5 w-5 text-primary" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                colorClasses
              )}
            >
              <CategoryIcon className="h-3 w-3" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {article.date}
            </span>
          </div>

          <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary lg:text-xl">
            {article.title}
          </h2>

          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {article.subtitle}
          </p>
        </div>

        {/* Expand indicator */}
        <div
          className={cn(
            "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen
              ? "border-primary/30 bg-primary/5"
              : "border-border/60 group-hover:border-primary/20"
          )}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-300",
              isOpen && "rotate-180 text-primary"
            )}
          />
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/40 px-6 pb-6 lg:px-8 lg:pb-8">
            <div className="space-y-4 pt-4 lg:pt-6">
              {formatContent(article.content).map((paragraph, idx) => (
                <p
                  key={idx}
                  className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleArticle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="primary-band relative overflow-hidden py-28">
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
            <FadeIn direction="up" className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                News & Updates
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
                Latest from <span className="text-accent">DICDO</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
                Stay informed with the latest updates, impact stories, and developments from
                our community development programs across Ethiopia.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* News feed */}
        <section className="relative overflow-hidden py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            <StaggerContainer>
              <div className="mx-auto max-w-4xl space-y-5">
                {NEWS_ARTICLES.map((article) => (
                  <StaggerItem key={article.id}>
                    <ArticleCard
                      article={article}
                      isOpen={openId === article.id}
                      onToggle={() => toggleArticle(article.id)}
                    />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            <FadeIn direction="up" delay={0.4}>
              <div className="mt-14 text-center">
                <Button size="lg" asChild>
                  <Link href="/">
                    Back to home <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
  );
}
