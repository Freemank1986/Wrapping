import { cn } from "@/lib/utils";
import { BowPaths } from "./bow";

/**
 * Brand mark: a bold serif "B" monogram with a gold bow ribbon tied across
 * the top, matching the sourced logo. `id` must be unique per render site
 * (used to scope the bow's SVG gradient) since this can appear more than
 * once on a page (header + footer).
 */
export function LogoMark({
  className,
  id = "logo-bow",
  letterColor = "currentColor",
  flatBow,
}: {
  className?: string;
  id?: string;
  letterColor?: string;
  flatBow?: string;
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
        y="58"
        textAnchor="middle"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontWeight="700"
        fontSize="48"
        fill={letterColor}
      >
        B
      </text>

      <BowPaths id={id} flat={flatBow} />
    </svg>
  );
}
