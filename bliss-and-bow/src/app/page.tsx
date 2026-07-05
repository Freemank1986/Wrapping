import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Foundation check" title="Bliss & Bow" />
        <div className="mt-10 flex justify-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </Container>
    </main>
  );
}
