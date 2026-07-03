import { PartyPopper, Building2, Sparkle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkshopLeadForm } from "./workshop-lead-form";

export const metadata = { title: "Gift Wrapping Workshops — Wrapt" };

const formats = [
  {
    icon: PartyPopper,
    title: "Private parties",
    body: "Book us for a birthday, bridal shower, or holiday get-together. We bring the supplies and teach a small group techniques they'll actually use again.",
  },
  {
    icon: Building2,
    title: "Corporate & team events",
    body: "A hands-on team event before the holidays — we run a workshop on-site or at our space, sized for your group.",
  },
  {
    icon: Sparkle,
    title: "Seasonal pop-ups",
    body: "Drop-in sessions around the holidays for anyone who wants to get better at this instead of paying someone else to do it every time.",
  },
];

export default function WorkshopsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="accent" className="mb-4">
          Learn the craft
        </Badge>
        <h1 className="font-serif text-4xl font-semibold">Gift wrapping workshops</h1>
        <p className="mt-4 text-muted-foreground">
          For the people who want to get good at this themselves — or just want a fun,
          hands-on session with friends, family, or a team. We&apos;ll teach folding, ribbon
          work, and finishing touches that actually hold up.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {formats.map((format) => (
          <Card key={format.title}>
            <CardContent className="pt-6">
              <format.icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 font-serif text-lg font-semibold">{format.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{format.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-10 rounded-2xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Get on the schedule</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tell us the occasion, roughly how many people, and when you&apos;re thinking. We&apos;ll
            follow up with available dates and pricing for your group size.
          </p>
        </div>
        <WorkshopLeadForm />
      </div>
    </div>
  );
}
