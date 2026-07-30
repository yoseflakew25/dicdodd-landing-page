import { Skeleton } from "@/components/ui/skeleton";

/* ------------------------------------------------------------------ */
/*  Root loading skeleton                                              */
/*  Shows during page streaming. Generic layout so it works across     */
/*  all routes — the PageTransition component handles entrance fade.   */
/* ------------------------------------------------------------------ */
export default function RootLoading() {
  return (
    <main className="flex-1" role="status" aria-label="Loading page content">
      {/* ── Hero area ── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:32px_32px]"
        />

        <div className="relative grid min-h-[50vh] lg:grid-cols-2 lg:items-center">
          {/* Text side */}
          <div className="container mx-auto flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-0">
            {/* Badge */}
            <Skeleton className="mb-4 h-7 w-40 rounded-full" />
            {/* Heading */}
            <Skeleton className="h-10 w-4/5 rounded-lg" />
            <Skeleton className="mt-3 h-10 w-3/5 rounded-lg" />
            {/* Description */}
            <Skeleton className="mt-5 h-4 w-full max-w-lg rounded-md" />
            <Skeleton className="mt-2 h-4 w-4/5 max-w-lg rounded-md" />
            <Skeleton className="mt-2 h-4 w-3/5 max-w-lg rounded-md" />
            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Skeleton className="h-11 w-36 rounded-xl" />
              <Skeleton className="h-11 w-40 rounded-xl" />
            </div>
          </div>

          {/* Image side */}
          <div className="relative h-[250px] overflow-hidden lg:h-[50vh]">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Content section ── */}
      <section className="border-b border-border/50 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Skeleton className="mx-auto mb-4 h-6 w-28 rounded-full" />
            <Skeleton className="mx-auto h-8 w-3/4 rounded-lg" />
            <Skeleton className="mx-auto mt-3 h-4 w-full rounded-md" />
            <Skeleton className="mx-auto mt-1.5 h-4 w-4/5 rounded-md" />
          </div>

          {/* Card grid */}
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 p-6"
              >
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
