"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    // Add a temporary class so CSS transitions smoothly crossfade colors.
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
