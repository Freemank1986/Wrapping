import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="border-2 border-burgundy bg-burgundy/5 px-6 py-4 text-sm text-burgundy">
            <strong className="font-semibold">Placeholder legal text.</strong>{" "}
            This page has not been reviewed by an attorney and should not be
            used as-is. Replace this content with copy reviewed by qualified
            legal counsel before launch.
          </div>

          <h1 className="mt-10 font-serif text-4xl font-semibold text-charcoal md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-charcoal/70">Last updated: {updated}</p>

          <div className="prose-legal mt-10 space-y-8 text-charcoal/80">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}
