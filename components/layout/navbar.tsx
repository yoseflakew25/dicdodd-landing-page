"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BLUR_PLACEHOLDER } from "@/lib/placeholders";
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

/* Sections on the homepage to spy on for active link highlighting.
   The id must match the section's DOM id AND the hash in NAV_LINKS. */
const SCROLL_SPY_IDS = ["about", "impact"] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(!isHome);
  const [hash, setHash] = React.useState("");
  const [activeSection, setActiveSection] = React.useState("");
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  // Track URL hash so we can highlight the correct nav link
  // for both in-page hash links (/#about, /#impact) and full pages.
  React.useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

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

  // ── Scroll-spy: highlight hash-linked nav items based on scroll position ──
  // Only active on the homepage. Uses IntersectionObserver to detect which
  // section is most visible in the viewport and updates activeSection.
  // This works alongside the hash state — hash wins when the user clicks a
  // link, scroll spy fills in when the user scrolls naturally.
  React.useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
        const best = entries.reduce<IntersectionObserverEntry | null>(
          (acc, entry) =>
            entry.isIntersecting && (!acc || entry.intersectionRatio > acc.intersectionRatio)
              ? entry
              : acc,
          null
        );

        if (best) {
          setActiveSection(best.target.id);
        } else if (window.scrollY < 80) {
          // Near the top of the page → no section active
          setActiveSection("");
        }
        // Otherwise keep the last active section (between sections)
      },
      {
        // Account for sticky navbar (≈64px) + some breathing room
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0, 0.5, 1],
      }
    );

    const elements = SCROLL_SPY_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // After each page navigation, check if we need to smooth-scroll
  // to a hash that was stored by the click handler (cross-page hash links).
  React.useEffect(() => {
    const scrollToId = sessionStorage.getItem("dicdo_scroll_to");
    if (scrollToId) {
      sessionStorage.removeItem("dicdo_scroll_to");
      const timer = setTimeout(() => {
        document.getElementById(scrollToId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Smooth-scroll handler for hash links.
  // Same-page: scrolls immediately and updates the URL hash.
  // Cross-page: stores the target in sessionStorage, navigates to the base
  // page, then the effect above picks it up and scrolls after render.
  const handleSmoothScroll = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return; // regular link, let Next.js handle it

      const targetId = href.slice(hashIndex + 1);
      if (!targetId) return;

      const basePath = href.slice(0, hashIndex) || "/";
      e.preventDefault();

      if (pathname === basePath) {
        // ── Same page: smooth scroll directly ──
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", href);
        }
      } else {
        // ── Cross-page: navigate, then the effect above scrolls ──
        sessionStorage.setItem("dicdo_scroll_to", targetId);
        router.push(basePath);
      }
    },
    [pathname, router]
  );

  // Attach smooth-scroll to any hash link
  const smoothClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) =>
    handleSmoothScroll(e, href);

  const isActive = React.useCallback(
    (href: string) => {
      const hashIndex = href.indexOf("#");

      // ── Home: only active on root with NO hash/scroll-spy section ──
      if (href === "/") {
        return pathname === "/" && !hash && !activeSection;
      }

      if (hashIndex !== -1) {
        // ── Hash link like "/#about" ──
        const basePath = href.slice(0, hashIndex) || "/";
        const targetHash = href.slice(hashIndex);        // "#about"
        const targetId = targetHash.replace("#", "");   // "about"

        if (pathname === basePath) {
          // Active when hash matches (user clicked link) OR scroll spy sees this section
          return hash === targetHash || activeSection === targetId;
        }

        // Also active when on a dedicated page that corresponds
        // (e.g. "/about" page matches navbar "About" link href="/#about")
        const pagePath = targetId;
        return pathname === `/${pagePath}` || pathname === pagePath;
      }

      // ── Regular page link (no hash) ──
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname, hash, activeSection]
  );

  const navLinkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
      scrolled
        ? "text-muted-foreground hover:bg-primary/10 hover:text-primary"
        : "text-foreground/70 hover:bg-primary/10 hover:text-primary",
      isActive(href) && "bg-primary/15 text-primary"
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
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className={navLinkClass(l.href)} onClick={smoothClick(l.href)}>
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
              onClick={smoothClick("/#support")}
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
                    onClick={(e) => {
                      // Close mobile menu
                      setOpen(false);
                      // Smooth scroll for hash links
                      smoothClick(l.href)(e);
                    }}
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
                onClick={(e) => {
                  setOpen(false);
                  smoothClick("/#support")(e);
                }}
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
