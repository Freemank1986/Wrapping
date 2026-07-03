import { cn } from "@/lib/utils";

const ROSE = "#d98a72";
const GOLD = "#c9a227";

/**
 * The circular "Wrapped in Bliss" tagline mark. Sparse use only — a footer
 * accent or hero flourish, not primary navigation branding.
 */
export function WrappedInBlissBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-square flex-col items-center justify-center rounded-full border-2 px-8 text-center",
        className,
      )}
      style={{ borderColor: GOLD }}
    >
      <svg viewBox="0 0 80 40" className="h-10 w-20" aria-hidden>
        <g fill="none" stroke={ROSE} strokeWidth="1.4" strokeLinecap="round">
          <path d="M6 30 L18 22" />
          <path d="M18 22 C10 12 2 12 4 20 C6 27 14 25 18 22 C22 19 25 16 27 12" />
          <path d="M18 22 C26 15 24 10 28 12" />
          <path d="M18 22 L38 22" />
          <path d="M38 22 C46 12 54 12 52 20 C50 27 42 25 38 22 C34 19 31 16 29 12" />
          <path d="M38 22 C30 15 32 10 28 12" />
          <path d="M17 21 C17 18 20 18 20 21 C20 24 18 25.5 17.5 26 C17 25.5 15 24 15 21.5 C15 19 17 19 17 21 Z" />
        </g>
      </svg>

      <p className="mt-2 font-serif text-sm font-semibold uppercase tracking-[0.3em]">
        Wrapped
      </p>
      <p className="-mt-1 font-script text-4xl" style={{ color: ROSE }}>
        in Bliss
      </p>

      <svg viewBox="0 0 24 24" className="mt-2 h-4 w-4" aria-hidden>
        <path
          d="M12 20 C6 15 2 11 2 7.2 C2 4.3 4.3 2 7.2 2 C9 2 10.6 2.9 12 4.5 C13.4 2.9 15 2 16.8 2 C19.7 2 22 4.3 22 7.2 C22 11 18 15 12 20 Z"
          fill="none"
          stroke={ROSE}
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}
