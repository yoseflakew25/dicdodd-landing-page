"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { featuredVideos, type FeaturedVideo } from "@/data/videos";
import { getYoutubeId, getThumbnail } from "@/utils/youtube";

/* ------------------------------------------------------------------ */
/*  Impact Story Cards                                                 */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Featured player                                                    */
/* ------------------------------------------------------------------ */
function VideoPlayer({ video }: { video: FeaturedVideo }) {
  const videoId = getYoutubeId(video.youtube);

  return (
    <motion.div
      key={video.id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="aspect-[16/9] w-full overflow-hidden rounded-t-2xl"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={video.title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Video list item                                                    */
/* ------------------------------------------------------------------ */
function VideoListItem({
  video,
  isActive,
  onClick,
}: {
  video: FeaturedVideo;
  isActive: boolean;
  onClick: () => void;
}) {
  const thumbnail = getThumbnail(video.youtube);

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive
          ? "border-primary/50 bg-primary/15"
          : "border-border/60 bg-background hover:border-primary/30 hover:bg-primary/5"
      )}
      aria-label={`Play ${video.title}`}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-muted md:w-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Play icon overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/30">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
              isActive
                ? "bg-primary/90 text-white ring-2 ring-primary/50"
                : "bg-white/30 text-white ring-2 ring-white/40 group-hover:scale-110 group-hover:bg-primary group-hover:ring-primary/50"
            )}
          >
            <Play className="ml-0.5 h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-xs font-medium leading-snug transition-colors duration-200 md:text-sm",
            isActive
              ? "text-primary"
              : "text-foreground/80 group-hover:text-foreground"
          )}
        >
          {video.title}
        </p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          Video {video.id} of {featuredVideos.length}
        </p>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function FeaturedVideos() {
  const [selectedVideo, setSelectedVideo] = useState<FeaturedVideo>(featuredVideos[0]);
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section
      id="impact"
      className="relative overflow-hidden border-b border-border/50 bg-background py-20 scroll-mt-16"
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* ---- Heading ---- */}
        <FadeIn direction="up">
          <div className="mb-12 max-w-2xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-secondary/30 bg-secondary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary">
              Impact Stories
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Real stories of transformation and hope
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Stories of transformation and hope from communities across Ethiopia.
            </p>
          </div>
        </FadeIn>

        {/* ---- Impact Stories ---- */}
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {IMPACT_STORIES.map((story, index) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(index)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300",
                activeStory === index
                  ? "border-primary/30 bg-primary/5 shadow-md"
                  : "border-border/60 bg-white/70 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:bg-white/[0.04]"
              )}
            >
              <Quote className="h-6 w-6 text-secondary" />
              <h3 className="mt-2 text-base font-semibold text-foreground">{story.title}</h3>
              <span className="mt-1 inline-flex rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 text-[10px] font-medium text-secondary">
                {story.subtitle}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{story.description}</p>
            </button>
          ))}
        </div>

        {/* ---- Videos Grid ---- */}
        <FadeIn direction="up">
          <div className="mb-6">
            <span className="inline-flex w-fit rounded-full border border-secondary/30 bg-secondary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary">
              Watch Our Impact
            </span>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Left — Featured player (3/5) */}
          <FadeIn direction="left" className="lg:col-span-3">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-white/70 shadow-sm dark:bg-white/[0.04]">
              <AnimatePresence mode="wait">
                <VideoPlayer key={selectedVideo.id} video={selectedVideo} />
              </AnimatePresence>
              <div className="flex items-center justify-between border-t border-border/50 px-5 py-3">
                <p className="truncate text-sm font-medium text-foreground">
                  Now playing:{" "}
                  <span className="text-primary">{selectedVideo.title}</span>
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {selectedVideo.id} / {featuredVideos.length}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Right — Video list (2/5) */}
          <FadeIn direction="right" className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-white/70 shadow-sm dark:bg-white/[0.04]">
              <div className="border-b border-border/50 px-5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  All videos
                </p>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-4 pt-3 max-h-[440px] [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
                {featuredVideos.map((video) => (
                  <VideoListItem
                    key={video.id}
                    video={video}
                    isActive={selectedVideo.id === video.id}
                    onClick={() => setSelectedVideo(video)}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
