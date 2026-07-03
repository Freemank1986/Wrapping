import { Store, Handshake, Gift, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PartnerLeadForm } from "./partner-lead-form";

export const metadata = { title: "Boutique & Retail Partners — Wrapt" };

const models = [
  {
    icon: Store,
    title: "In-store wrap station",
    body: "We staff a wrapping station in your shop during your busiest seasons, so your customers get a premium finishing touch without your staff learning to wrap or losing floor time.",
  },
  {
    icon: Handshake,
    title: "Referral partnership",
    body: "Send customers our way — for gifts bought in your store or elsewhere — and earn a commission on every order. No inventory, no staffing, just a warm handoff.",
  },
  {
    icon: Gift,
    title: "Wrapped-and-ready dropship",
    body: "Ship or drop off product to us, we wrap to your brand's aesthetic, and return it ready for pickup or delivery to your customer. Useful for online orders and local delivery boutiques.",
  },
  {
    icon: Users,
    title: "Corporate & bulk gifting",
    body: "Client gifts, employee gifts, event favors — volume pricing for businesses that need a stack of gifts wrapped consistently and on a deadline.",
  },
];

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="accent" className="mb-4">
          For businesses
        </Badge>
        <h1 className="font-serif text-4xl font-semibold">
          Partner with us, and give your customers the finish they remember
        </h1>
        <p className="mt-4 text-muted-foreground">
          Boutiques, gift shops, florists, and local retailers work with us to offer
          gift wrapping without adding it to their own operations. Your customers get a
          better unboxing; you get one less thing to manage.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {models.map((model) => (
          <Card key={model.title}>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <model.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">{model.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{model.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-10 rounded-2xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Tell us about your business</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every partnership is scoped to what you actually need — a few hours a week
            during the holidays, an ongoing referral arrangement, or a standing wholesale
            rate. Share a few details and we&apos;ll follow up to talk specifics.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>• No setup fees to start a conversation</li>
            <li>• Volume-based pricing, separate from retail rates</li>
            <li>• Flexible scheduling around your peak seasons</li>
          </ul>
        </div>
        <PartnerLeadForm />
      </div>
    </div>
  );
}
