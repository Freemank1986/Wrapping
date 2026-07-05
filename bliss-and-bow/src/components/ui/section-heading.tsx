import { Ribbon } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Ribbon className="h-5 w-5 text-gold" strokeWidth={1.5} />
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.2em] text-burgundy">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
        {title}
      </h2>
      <div className="divider-gold w-24" />
    </div>
  );
}
