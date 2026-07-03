"use client";

import { useTransition } from "react";
import { Sparkles, Clock } from "lucide-react";
import { setTheme } from "@/app/actions/theme";
import { cn } from "@/lib/utils";
import type { SiteTheme } from "@/lib/theme";

export function ThemeToggle({ current }: { current: SiteTheme }) {
  const [pending, startTransition] = useTransition();

  function switchTo(theme: SiteTheme) {
    if (theme === current) return;
    startTransition(() => {
      setTheme(theme);
    });
  }

  return (
    <div
      role="group"
      aria-label="Site design"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-secondary/60 p-0.5 text-xs font-medium",
        pending && "opacity-60",
      )}
    >
      <button
        type="button"
        aria-pressed={current === "modern"}
        onClick={() => switchTo("modern")}
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors cursor-pointer",
          current === "modern"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Sparkles className="h-3 w-3" /> Modern
      </button>
      <button
        type="button"
        aria-pressed={current === "classic"}
        onClick={() => switchTo("classic")}
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors cursor-pointer",
          current === "classic"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Clock className="h-3 w-3" /> Classic
      </button>
    </div>
  );
}
