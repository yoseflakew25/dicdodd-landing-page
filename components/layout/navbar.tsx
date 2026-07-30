"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/services", label: "Programs" },
  { href: "/#impact", label: "Impact" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(!isHome);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Track scroll position for glass effect using IntersectionObserver
  React.useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) {
      // Fallback scroll listener in case sentinel is not available
      const onScroll = () => {
        const isScrolled = window.scrollY > 20;
        setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = React.useCallback(
    (href: string) => {
      if (href === "/") return pathname === href;
      if (href.startsWith("#")) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  const navLinkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
      scrolled
        ? "text-muted-foreground hover:bg-primary/10 hover:text-primary"
        : "text-foreground/70 hover:bg-primary/10 hover:text-primary",
      isActive(href) && (scrolled ? "bg-primary/15 text-primary" : "bg-primary/15 text-primary")
    );

  return (
    <>
      {/* Invisible sentinel element at the absolute top to detect scroll position without scroll events */}
      <div ref={sentinelRef} className="absolute top-0 left-0 right-0 h-5 pointer-events-none" />
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          scrolled ? "py-3 px-4 md:px-8 lg:px-12" : "py-0 px-0"
        )}
      >
        <div
          className={cn(
            "mx-auto transition duration-200 ease-out w-full overflow-hidden",
            scrolled
              ? "max-w-7xl rounded-2xl border border-border/60 bg-white/80 shadow-md backdrop-blur-xl dark:bg-gray-900/80"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-4",
              scrolled ? "px-6 md:px-10" : "md:px-12 px-4"
            )}
          >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="DICDO home">
            <Image
              src="/images/logo.png"
              alt="DICDO Logo"
              width={256}
              height={128}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className={navLinkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle
              className={cn(
                "transition-colors duration-200",
                scrolled
                  ? "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
              )}
            />
            <Link
              href="/#support"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle
              className={cn(
                "transition-colors duration-200",
                scrolled
                  ? "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                  : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
              )}
            />
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-9 w-9 shrink-0 transition-colors duration-200",
                scrolled
                  ? "border-border/60 text-muted-foreground"
                  : "border-foreground/20 text-foreground/70"
              )}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className={cn(
              "border-t lg:hidden transition-all duration-300",
              scrolled
                ? "border-border/60 bg-transparent"
                : "border-foreground/10 bg-white/95 backdrop-blur-xl dark:bg-gray-900/95"
            )}
          >
            <div className="container space-y-4 px-6 py-4 lg:px-8">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                      isActive(l.href)
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/#support"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200"
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
}
