import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  {
    title: "Programs",
    links: [
      { label: "Peacebuilding", href: "/services" },
      { label: "Education & Literacy", href: "/services" },
      { label: "Women's Empowerment", href: "/services" },
      { label: "WASH Programs", href: "/services" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About DICDO", href: "/#about" },
      { label: "Impact Stories", href: "/news" },
      { label: "Our Partners", href: "/#partners" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Make a Donation", href: "/#support" },
      { label: "Volunteer", href: "/contact" },
      { label: "Partner With Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
] as const;

const CONTACT_ITEMS = [
  { icon: MapPin, text: "Dire Dawa, Kebele 03 Area, Ethiopia", href: undefined },
  { icon: Mail, text: "dicdodd@gmail.com", href: "mailto:dicdodd@gmail.com" },
  { icon: Phone, text: "+251 915005166", href: "tel:+251915005166" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      {/* CTA - matches the Stats section style */}
      <div className="primary-band relative overflow-hidden border-b border-primary-foreground/20">
        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container relative mx-auto px-6 py-16 text-center lg:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Building Peaceful &amp; Self-Sufficient Communities
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/70">
            &ldquo;Building a future where every Ethiopian community thrives in peace and prosperity.&rdquo;
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/#support">
                <Heart className="mr-1.5 h-4 w-4" />
                Support Our Mission
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/35 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/#about">About DICDO</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="DICDO home">
            <Image
              src="/images/logo.png"
              alt="DICDO Logo"
              width={256}
              height={128}
              className="object-contain h-14 w-auto"
            />
          </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Dire Integrated Community Development Organization (DICDO) is a nonprofit
              working to empower communities in Ethiopia through peacebuilding, essential
              services, and sustainable development.
            </p>
            <div className="mt-5 space-y-2.5">
              {CONTACT_ITEMS.map(({ icon: Icon, text, href }) => {
                const content = (
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span>{text}</span>
                  </div>
                );
                if (href) {
                  return (
                    <a key={text} href={href} className="block transition-colors hover:text-foreground">
                      {content}
                    </a>
                  );
                }
                return <div key={text}>{content}</div>;
              })}
            </div>
          </div>

          {/* Columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} DICDO. All rights reserved.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <Heart className="h-3 w-3 text-primary/60" />
            Building Peace &bull; Creating Hope &bull; Empowering Communities
          </span>
        </div>
      </div>
    </footer>
  );
}
