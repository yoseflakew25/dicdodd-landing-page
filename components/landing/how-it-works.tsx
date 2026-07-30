import Link from "next/link";
import { BookOpen, Users, Heart, Droplets, Banknote, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const DONATION_TIERS = [
  {
    icon: BookOpen,
    amount: "1,000 ETB",
    description: "Provides school supplies for 5 children",
  },
  {
    icon: Users,
    amount: "5,000 ETB",
    description: "Supports one woman's vocational training",
  },
  {
    icon: Heart,
    amount: "5,500 ETB",
    description: "Funds peace mediation workshop for 20 people",
  },
  {
    icon: Droplets,
    amount: "9,000 ETB",
    description: "Provides clean water access for a family",
  },
];

const BANK_ACCOUNTS = [
  {
    bank: "Commercial Bank of Ethiopia (CBE)",
    accountName: "DICDO",
    accountNumber: "1000485854987",
  },
  {
    bank: "Bank of Abyssinia",
    accountName: "DICDO",
    accountNumber: "16430986",
  },
];

export function HowItWorks() {
  return (
    <section id="support" className="relative overflow-hidden border-b border-border/50 bg-background py-20 scroll-mt-16">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left — Heading + Info */}
          <FadeIn direction="left" className="lg:col-span-2 lg:pt-2">
            <span className="mb-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Support Our Mission
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Make a Donation
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Your generous contribution helps us continue our vital work in building peaceful,
              empowered communities across Ethiopia. Every donation makes a real difference.
            </p>

            {/* Donation tiers */}
            <StaggerContainer className="mt-6 space-y-3">
              {DONATION_TIERS.map(({ icon: Icon, amount, description }) => (
                <StaggerItem key={amount}>
                  <div className="group flex items-start gap-4 rounded-xl border border-border/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:bg-white/[0.04]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{amount}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>

          {/* Right — Bank info + Contact */}
          <FadeIn direction="right" className="lg:col-span-3">
            {/* Bank Accounts */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                Bank Account Information
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You can make your donation through any of the following Ethiopian bank accounts.
                All donations go directly to supporting our community development programs.
              </p>
            </div>

            <div className="space-y-4">
              {BANK_ACCOUNTS.map(({ bank, accountName, accountNumber }) => (
                <div
                  key={bank}
                  className="group rounded-2xl border border-border/60 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg dark:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Banknote className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{bank}</p>
                      <p className="text-xs text-muted-foreground">
                        Account Name: <span className="font-medium text-foreground">{accountName}</span>
                      </p>
                      <div className="mt-2 rounded-lg bg-muted/50 px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Account Number
                        </p>
                        <p className="font-mono text-lg font-bold text-primary">{accountNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact for donations */}
            <div className="mt-6 rounded-2xl border border-dashed border-primary/20 bg-primary/[0.02] p-5">
              <h3 className="text-sm font-semibold text-foreground">Need Help with Your Donation?</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Our team is here to assist you with any questions about making a donation.
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a href="tel:+251915005166" className="flex items-center gap-2 text-xs text-primary hover:underline">
                  <Phone className="h-3.5 w-3.5" />
                  +251 915005166
                </a>
                <a href="mailto:dicdodd@gmail.com" className="flex items-center gap-2 text-xs text-primary hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  dicdodd@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                <Link href="/contact">
                  <Heart className="h-4 w-4" />
                  Donate Now
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
