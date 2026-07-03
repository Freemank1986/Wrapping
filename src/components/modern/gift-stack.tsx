import { BowPaths } from "@/components/brand/bow";

function Bow({ className, id }: { className?: string; id: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <BowPaths id={id} />
    </svg>
  );
}

export function GiftStack() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
      {/* glass platform, gives the boxes something to sit on and blur against */}
      <div className="bb-glass absolute inset-6 rounded-[3rem] border shadow-xl sm:inset-10" />

      {/* back box, frosted blush */}
      <div className="bb-glass absolute right-4 top-10 h-44 w-44 rotate-6 rounded-[2rem] border shadow-lg sm:h-52 sm:w-52" />

      {/* main box, black, floats */}
      <div className="animate-bb-float absolute left-4 top-24 h-48 w-48 -rotate-3 rounded-[2rem] bg-primary shadow-2xl sm:h-60 sm:w-60">
        <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 bg-accent" />
        <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-accent" />
        <Bow
          id="gift-stack-bow"
          className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* small accent box, gold, floats delayed */}
      <div
        className="absolute bottom-6 right-8 h-24 w-24 rotate-12 rounded-2xl bg-accent shadow-xl"
        style={{ animation: "bb-float 5s ease-in-out infinite 1.2s" }}
      >
        <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 bg-primary/80" />
        <div className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-primary/80" />
      </div>

      {/* dot texture */}
      <div className="absolute -left-2 bottom-2 h-16 w-16 rounded-full border-4 border-dashed border-accent/30" />
    </div>
  );
}
