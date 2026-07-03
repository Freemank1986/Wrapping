import Link from "next/link";
import {
  Clock,
  Sparkles,
  Heart,
  Package,
  Truck,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TIERS } from "@/lib/pricing";

const painPoints = [
  {
    icon: Clock,
    title: "You don't have the evening",
    body: "Between work, the holidays, and everything else, wrapping a stack of gifts is the last thing on your list — and the first thing you'll put off until midnight.",
  },
  {
    icon: Heart,
    title: "You genuinely hate it",
    body: "Crooked corners, tape everywhere, ribbon that won't cooperate. Some people find wrapping relaxing. If that's not you, it doesn't have to be.",
  },
  {
    icon: Sparkles,
    title: "You want it to look like it wasn't you",
    body: "There's a difference between 'wrapped' and 'wrapped well.' When the gift needs to make an impression, presentation is part of the gift.",
  },
];

const steps = [
  {
    icon: CalendarCheck,
    title: "Pick a tier and a date",
    body: "Tell us how many gifts, how you want them wrapped, and when you need them back. Takes about two minutes.",
  },
  {
    icon: Package,
    title: "Drop off, or we come to you",
    body: "Bring your gifts to us, or add pickup-and-delivery and we'll swing by — no trip required.",
  },
  {
    icon: Truck,
    title: "Get them back, done right",
    body: "Every gift wrapped to the tier you chose, on the timeline you asked for. Ready to give, not to finish.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <Badge variant="accent" className="mb-5">
              Serving the local area
            </Badge>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Give the gift. Skip the wrapping paper war.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              We wrap your gifts beautifully and hand them back ready to give —
              on your schedule, at your door if you want. You get the evening back
              and a presentation that looks like you hired someone. Because you did.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/book">Book your wrap</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Simple, Standard, and Elaborate tiers — plus a flat-rate Holiday Bundle
              for wrapping your whole pile at once.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <p className="font-serif text-lg font-semibold">What you&apos;re actually buying</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  An evening you don&apos;t spend on the floor with scissors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  Presentation that reads as intentional, not rushed
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  One less thing standing between you and being done
                </li>
              </ul>
              <div className="mt-6 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                Yes, you could wrap it yourself for free. Most people can also cut their
                own hair. We&apos;re not competing on price — we&apos;re competing on
                getting it off your plate, done well.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold">Sound familiar?</h2>
          <p className="mt-3 text-muted-foreground">
            You don&apos;t need a reason to hand this off. Any one of these is enough.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {painPoints.map((point) => (
            <Card key={point.title}>
              <CardContent className="pt-6">
                <point.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-serif text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{point.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold">How it works</h2>
            <p className="mt-3 text-muted-foreground">Three steps, most of the wait is ours.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-serif text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold">Choose your level of done-for-you</h2>
          <p className="mt-3 text-muted-foreground">
            Priced per item, with a flat-rate option when you have a whole pile.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <Card key={tier.value} className={tier.value === "HOLIDAY_BUNDLE" ? "border-accent" : ""}>
              <CardContent className="pt-6">
                {tier.value === "HOLIDAY_BUNDLE" && (
                  <Badge variant="accent" className="mb-3">
                    Best value
                  </Badge>
                )}
                <h3 className="font-serif text-lg font-semibold">{tier.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" asChild>
            <Link href="/pricing">See full pricing</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">Ready to hand it off?</h2>
          <p className="max-w-xl text-primary-foreground/80">
            Tell us what you need wrapped and by when. We&apos;ll confirm the details —
            especially for rush orders — before anything is charged.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="accent" asChild>
              <Link href="/book">Book your wrap</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/workshops">Or book a workshop</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
