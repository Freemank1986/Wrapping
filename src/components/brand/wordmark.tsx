import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

export function ScriptWordmark({
  className,
  showSubtitle = false,
}: {
  className?: string;
  showSubtitle?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className="font-script text-4xl sm:text-5xl">{BRAND.name}</span>
      {showSubtitle && (
        <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {BRAND.subtitle}
        </span>
      )}
    </span>
  );
}
