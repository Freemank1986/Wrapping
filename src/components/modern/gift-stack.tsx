import { BowPaths } from "@/components/brand/bow";

function Bow({ className, color = "#c9a227" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <BowPaths color={color} />
    </svg>
  );
}

export function GiftStack() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
      {/* back box, blush */}
      <div className="absolute right-2 top-8 h-48 w-48 rotate-6 rounded-[2rem] bg-secondary shadow-lg sm:h-56 sm:w-56" />

      {/* main box, black, floats */}
      <div className="animate-bb-float absolute left-2 top-20 h-52 w-52 -rotate-3 rounded-[2rem] bg-primary shadow-2xl sm:h-64 sm:w-64">
        <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 bg-accent" />
        <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-accent" />
        <Bow
          className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
          color="#c9a227"
        />
      </div>

      {/* small accent box, gold, floats delayed */}
      <div
        className="absolute bottom-4 right-6 h-24 w-24 rotate-12 rounded-2xl bg-accent shadow-xl"
        style={{ animation: "bb-float 5s ease-in-out infinite 1.2s" }}
      >
        <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 bg-primary/80" />
        <div className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-primary/80" />
      </div>

      {/* dot texture */}
      <div className="absolute -left-4 bottom-0 h-16 w-16 rounded-full border-4 border-dashed border-accent/30" />
    </div>
  );
}
