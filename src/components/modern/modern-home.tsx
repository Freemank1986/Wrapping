import Link from "next/link";
import {
  Clock,
  Heart,
  Sparkles,
  CalendarCheck,
  Package,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIERS } from "@/lib/pricing";
import { BRAND } from "@/lib/brand";
import { GlassGiftHero } from "./glass-gift-hero";
import { WrappedInBlissBadge } from "@/components/brand/wrapped-in-bliss-badge";

const painPoints = [
  {
    icon: Clock,
    title: "No time to wrap",
    body: "Between work and everything else, wrapping is the first thing you'll put off until midnight. Hand it off instead.",
  },
  {
    icon: Heart,
    title: "Not your thing",
    body: "Crooked corners, tape everywhere. Some people love wrapping. If that's not you, it doesn't have to be.",
  },
  {
    icon: Sparkles,
    title: "Needs to impress",
    body: "There's 'wrapped' and there's 'wrapped well.' When presentation matters, we make it part of the gift.",
  },
];

const steps = [
  {
    icon: CalendarCheck,
    title: "Choose & schedule",
    body: "Pick a tier, tell us how many gifts, and when you need them back.",
  },
  {
    icon: Package,
    title: "Drop off or we collect",
    body: "Bring them to us, or add pickup — we'll come to you.",
  },
  {
    icon: Truck,
    title: "Unwrap-ready",
    body: "Every gift finished to spec, on time, ready to give.",
  },
];

export function ModernHome() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-rose/15 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl gap-16 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <span className="font-script text-3xl text-accent">{BRAND.tagline}</span>
            <h1 className="mt-3 font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Gift wrapping,
              <br />
              reimagined.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              We wrap your gifts beautifully and hand them back ready to give — on your
              schedule, at your door if you want. You get the evening back. The gift gets
              the finish it deserves.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button size="lg" variant="accent" asChild>
                <Link href="/book">
                  Book your wrap <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {TIERS.map((tier) => (
                <Badge key={tier.value} variant="secondary" className="font-normal">
                  {tier.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative">
            <GlassGiftHero />
            <WrappedInBlissBadge className="absolute -bottom-6 -left-6 hidden h-28 w-28 rotate-[-8deg] bg-background/90 shadow-lg sm:flex" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Sound familiar?
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Any one of these is reason enough.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bb-glass group rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <point.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold">{point.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/50 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              How it works
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. Most of the work is ours.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="bb-glass rounded-3xl border p-7 text-center md:text-left"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:mx-0">
                  <step.icon className="h-6 w-6" />
                </div>
                <p className="mt-5 font-script text-2xl text-accent">Step {i + 1}</p>
                <h3 className="mt-1 font-serif text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Pricing
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your level of done-for-you.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.value}
              className={`group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                tier.value === "HOLIDAY_BUNDLE" ? "bb-glass-dark" : "bb-glass"
              }`}
            >
              {tier.value === "HOLIDAY_BUNDLE" && (
                <Badge variant="accent" className="mb-3">
                  Best value
                </Badge>
              )}
              <h3 className="font-serif text-lg font-bold">{tier.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="accent" asChild>
            <Link href="/pricing">
              See full pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 animate-bb-float rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-rose/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
          <span className="font-script text-4xl text-accent">Ready when you are</span>
          <h2 className="max-w-2xl font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us what you need wrapped, and by when.
          </h2>
          <p className="max-w-xl text-muted-foreground">
            We&apos;ll confirm the details — especially for rush orders — before anything is
            charged.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="accent" asChild>
              <Link href="/book">Book your wrap</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/workshops">Or book a workshop</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
