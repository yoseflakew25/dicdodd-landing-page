import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCtaButtons() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Button size="lg" asChild>
        <Link href="#programs">
          Explore Our Programs <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
        asChild
      >
        <Link href="#impact">Watch Our Impact</Link>
      </Button>
      <Button
        size="lg"
        className="bg-accent text-accent-foreground hover:bg-accent/90"
        asChild
      >
        <Link href="/contact">
          <Heart className="mr-1.5 h-4 w-4" />
          Support Our Mission
        </Link>
      </Button>
    </div>
  );
}
