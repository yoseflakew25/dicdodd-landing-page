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
        className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary/20"
        asChild
      >
        <Link href="#impact">Watch Our Impact</Link>
      </Button>
      <Button
        size="lg"
        className="bg-secondary text-white hover:bg-secondary/90"
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
