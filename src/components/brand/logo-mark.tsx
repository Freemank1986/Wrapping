import { cn } from "@/lib/utils";
import { BowPaths } from "./bow";

/**
 * Hand-built brand mark: a bold "B" monogram with a bow ribbon tied across
 * the top, standing in for the sourced logo file (only a preview screenshot
 * was available, not production assets).
 */
export function LogoMark({
  className,
  bowColor = "#c9a227",
  letterColor = "currentColor",
}: {
  className?: string;
  bowColor?: string;
  letterColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-label="Bliss & Bow logo"
    >
      <text
        x="32"
        y="57"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontWeight="700"
        fontSize="46"
        fill={letterColor}
      >
        B
      </text>

      <BowPaths color={bowColor} />
      <circle cx="32" cy="22.5" r="1.6" fill="var(--background, #fff)" opacity="0.55" />
    </svg>
  );
}
