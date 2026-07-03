import { BowPaths } from "@/components/brand/bow";

export function GiftUnwrapOverlay() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{ animation: "bb-box-fade 0.9s ease-in forwards" }}
      aria-hidden
    >
      <div className="relative h-36 w-36">
        {/* box body */}
        <div className="absolute inset-x-0 bottom-0 h-24 rounded-lg border-2 border-accent bg-secondary shadow-xl" />
        {/* vertical ribbon on body */}
        <div className="absolute bottom-0 left-1/2 h-24 w-3 -translate-x-1/2 bg-accent" />

        {/* lid, flies off */}
        <div
          className="absolute inset-x-0 top-6 h-9 rounded-lg border-2 border-accent bg-secondary shadow-xl"
          style={{ animation: "bb-lid-off 0.6s ease-in 0.2s forwards" }}
        >
          <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-accent" />
          {/* bow on lid */}
          <svg
            viewBox="0 0 64 64"
            className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2"
          >
            <BowPaths id="transition-bow" />
          </svg>
        </div>
      </div>
    </div>
  );
}
