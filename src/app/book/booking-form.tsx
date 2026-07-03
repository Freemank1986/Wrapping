"use client";

import { useMemo, useState, useActionState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Pencil } from "lucide-react";
import { createOrder, type OrderFormState } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  TIERS,
  calculateOrderPrice,
  formatCents,
  type DeliveryType,
  type PricingConfigValues,
  type Tier,
} from "@/lib/pricing";

type BookingFormProps = {
  config: PricingConfigValues;
  user: { name: string; email: string; phone: string };
};

type FormState = {
  tier: Tier;
  itemCount: string;
  deliveryType: DeliveryType;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  rush: boolean;
  neededBy: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
};

const STEP_LABELS = ["Tier & items", "Logistics", "Timing", "Contact", "Review"];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function BookingForm({ config, user }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>({
    tier: "STANDARD",
    itemCount: "3",
    deliveryType: "PICKUP",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
    rush: false,
    neededBy: "",
    contactName: user.name,
    contactEmail: user.email,
    contactPhone: user.phone,
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const [actionState, formAction, pending] = useActionState<OrderFormState, FormData>(
    createOrder,
    undefined,
  );

  const itemCountNumber = Math.max(0, parseInt(state.itemCount || "0", 10) || 0);

  const quote = useMemo(
    () =>
      calculateOrderPrice(config, {
        tier: state.tier,
        itemCount: state.tier === "HOLIDAY_BUNDLE" ? 1 : itemCountNumber,
        deliveryType: state.deliveryType,
        rush: state.rush,
      }),
    [config, state.tier, itemCountNumber, state.deliveryType, state.rush],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function canContinue(): boolean {
    switch (step) {
      case 0:
        return state.tier === "HOLIDAY_BUNDLE" || itemCountNumber >= 1;
      case 1:
        if (state.deliveryType === "PICKUP") return true;
        return Boolean(
          state.addressStreet && state.addressCity && state.addressState && state.addressZip,
        );
      case 2:
        return Boolean(state.neededBy);
      case 3:
        return Boolean(state.contactName && state.contactEmail && state.contactPhone);
      default:
        return true;
    }
  }

  const isLastStep = step === STEP_LABELS.length - 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <ol className="mb-8 flex flex-wrap gap-2 text-xs font-medium">
          {STEP_LABELS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors",
                  i === step
                    ? "border-primary bg-primary text-primary-foreground"
                    : i < step
                      ? "border-success text-success cursor-pointer"
                      : "border-border text-muted-foreground",
                )}
              >
                {i < step && <CheckCircle2 className="h-3.5 w-3.5" />}
                {i + 1}. {label}
              </button>
            </li>
          ))}
        </ol>

        <form action={formAction}>
          {step === 0 && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h2 className="font-serif text-xl font-semibold">
                    What tier, and how many items?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pick the presentation level for your gifts.
                  </p>
                </div>
                <RadioGroup
                  value={state.tier}
                  onValueChange={(v) => update("tier", v as Tier)}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {TIERS.map((tier) => (
                    <Label
                      key={tier.value}
                      htmlFor={`tier-${tier.value}`}
                      className={cn(
                        "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                        state.tier === tier.value
                          ? "border-primary bg-secondary"
                          : "border-border hover:bg-secondary/50",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-semibold">{tier.label}</span>
                        <RadioGroupItem value={tier.value} id={`tier-${tier.value}`} />
                      </div>
                      <span className="text-sm text-muted-foreground">{tier.description}</span>
                      <span className="mt-1 text-sm font-medium text-accent">
                        {tier.value === "HOLIDAY_BUNDLE"
                          ? `${formatCents(config.holidayBundlePrice)} flat`
                          : `${formatCents(
                              tier.value === "SIMPLE"
                                ? config.simplePricePerItem
                                : tier.value === "STANDARD"
                                  ? config.standardPricePerItem
                                  : config.elaboratePricePerItem,
                            )} / item`}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>

                {state.tier === "HOLIDAY_BUNDLE" ? (
                  <div className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                    {config.holidayBundleNote}
                  </div>
                ) : (
                  <div className="max-w-xs space-y-1.5">
                    <Label htmlFor="itemCount">Number of items</Label>
                    <Input
                      id="itemCount"
                      type="number"
                      min={1}
                      max={500}
                      value={state.itemCount}
                      onChange={(e) => update("itemCount", e.target.value)}
                    />
                    {quote.minimumApplied && (
                      <p className="text-xs text-muted-foreground">
                        Below our {formatCents(config.minimumOrder)} minimum — the minimum
                        applies to this order.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 1 && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h2 className="font-serif text-xl font-semibold">Pickup or delivery?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Drop off and collect yourself for free, or let us handle the trip.
                  </p>
                </div>
                <RadioGroup
                  value={state.deliveryType}
                  onValueChange={(v) => update("deliveryType", v as DeliveryType)}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <Label
                    htmlFor="delivery-pickup"
                    className={cn(
                      "flex cursor-pointer flex-col gap-1 rounded-lg border p-4",
                      state.deliveryType === "PICKUP"
                        ? "border-primary bg-secondary"
                        : "border-border hover:bg-secondary/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-semibold">
                        I&apos;ll drop off &amp; pick up
                      </span>
                      <RadioGroupItem value="PICKUP" id="delivery-pickup" />
                    </div>
                    <span className="text-sm text-muted-foreground">No extra fee.</span>
                  </Label>
                  <Label
                    htmlFor="delivery-delivery"
                    className={cn(
                      "flex cursor-pointer flex-col gap-1 rounded-lg border p-4",
                      state.deliveryType === "DELIVERY"
                        ? "border-primary bg-secondary"
                        : "border-border hover:bg-secondary/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-semibold">
                        Pick up &amp; deliver to me
                      </span>
                      <RadioGroupItem value="DELIVERY" id="delivery-delivery" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      +{formatCents(config.deliveryFee)} round trip
                    </span>
                  </Label>
                </RadioGroup>

                {state.deliveryType === "DELIVERY" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="addressStreet">Street address</Label>
                      <Input
                        id="addressStreet"
                        value={state.addressStreet}
                        onChange={(e) => update("addressStreet", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="addressCity">City</Label>
                      <Input
                        id="addressCity"
                        value={state.addressCity}
                        onChange={(e) => update("addressCity", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="addressState">State</Label>
                      <Input
                        id="addressState"
                        value={state.addressState}
                        onChange={(e) => update("addressState", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="addressZip">ZIP code</Label>
                      <Input
                        id="addressZip"
                        value={state.addressZip}
                        onChange={(e) => update("addressZip", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h2 className="font-serif text-xl font-semibold">When do you need it by?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Standard turnaround is included. Need it sooner? Add rush.
                  </p>
                </div>

                <RadioGroup
                  value={state.rush ? "rush" : "standard"}
                  onValueChange={(v) => update("rush", v === "rush")}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <Label
                    htmlFor="turnaround-standard"
                    className={cn(
                      "flex cursor-pointer flex-col gap-1 rounded-lg border p-4",
                      !state.rush ? "border-primary bg-secondary" : "border-border hover:bg-secondary/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-semibold">Standard</span>
                      <RadioGroupItem value="standard" id="turnaround-standard" />
                    </div>
                    <span className="text-sm text-muted-foreground">No extra fee.</span>
                  </Label>
                  <Label
                    htmlFor="turnaround-rush"
                    className={cn(
                      "flex cursor-pointer flex-col gap-1 rounded-lg border p-4",
                      state.rush ? "border-primary bg-secondary" : "border-border hover:bg-secondary/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-semibold">Rush</span>
                      <RadioGroupItem value="rush" id="turnaround-rush" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      +{formatCents(config.rushFee)} — subject to confirmation
                    </span>
                  </Label>
                </RadioGroup>

                <div className="max-w-xs space-y-1.5">
                  <Label htmlFor="neededBy">Date you need it by</Label>
                  <Input
                    id="neededBy"
                    type="date"
                    min={todayISO()}
                    value={state.neededBy}
                    onChange={(e) => update("neededBy", e.target.value)}
                  />
                </div>

                {state.rush && (
                  <div className="flex items-start gap-2 rounded-lg bg-warning/20 p-4 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    <p>
                      Rush requests need a quick availability check on our end. We&apos;ll
                      confirm we can hit this date before your order is finalized — you won&apos;t
                      be charged until then.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h2 className="font-serif text-xl font-semibold">How should we reach you?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We&apos;ll use this to confirm your order and coordinate pickup/delivery.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="contactName">Name</Label>
                    <Input
                      id="contactName"
                      value={state.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={state.contactEmail}
                      onChange={(e) => update("contactEmail", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={state.contactPhone}
                      onChange={(e) => update("contactPhone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="notes">Anything else we should know? (optional)</Label>
                    <Textarea
                      id="notes"
                      rows={3}
                      value={state.notes}
                      onChange={(e) => update("notes", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h2 className="font-serif text-xl font-semibold">Review your order</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Nothing is booked yet — confirm the details below before you submit.
                  </p>
                </div>

                <dl className="divide-y divide-border text-sm">
                  <ReviewRow label="Tier" onEdit={() => setStep(0)}>
                    {TIERS.find((t) => t.value === state.tier)?.label}
                    {state.tier !== "HOLIDAY_BUNDLE" && ` — ${itemCountNumber} item(s)`}
                  </ReviewRow>
                  <ReviewRow label="Logistics" onEdit={() => setStep(1)}>
                    {state.deliveryType === "PICKUP"
                      ? "Self drop-off & pickup"
                      : `Delivery to ${state.addressStreet}, ${state.addressCity}, ${state.addressState} ${state.addressZip}`}
                  </ReviewRow>
                  <ReviewRow label="Timing" onEdit={() => setStep(2)}>
                    {state.rush ? "Rush" : "Standard"} — needed by{" "}
                    {state.neededBy || "—"}
                  </ReviewRow>
                  <ReviewRow label="Contact" onEdit={() => setStep(3)}>
                    {state.contactName} · {state.contactEmail} · {state.contactPhone}
                  </ReviewRow>
                  {state.notes && (
                    <ReviewRow label="Notes" onEdit={() => setStep(3)}>
                      {state.notes}
                    </ReviewRow>
                  )}
                </dl>

                <div className="rounded-lg border border-border p-4">
                  <PriceBreakdown quote={quote} tier={state.tier} />
                </div>

                {state.rush && (
                  <div className="flex items-start gap-2 rounded-lg bg-warning/20 p-4 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    <p>
                      This is a <strong>rush</strong>
                      {" "}
                      request. We review rush orders before confirming so we don&apos;t
                      promise a turnaround we can&apos;t hit.
                    </p>
                  </div>
                )}

                <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-secondary p-4 text-sm">
                  <Checkbox
                    checked={confirmed}
                    onCheckedChange={(v) => setConfirmed(v === true)}
                    className="mt-0.5"
                  />
                  <span>
                    I understand this is a request. Wrapt will review and confirm availability
                    (especially for rush turnaround) before the order is finalized, and I
                    won&apos;t be charged until then.
                  </span>
                </label>

                {actionState?.message && (
                  <p className="text-sm text-destructive">{actionState.message}</p>
                )}
                {actionState?.errors && (
                  <p className="text-sm text-destructive">
                    Something on the form needs a second look — please check earlier steps.
                  </p>
                )}

                {/* Hidden inputs mirror the wizard state so the single submit at
                    the end carries every field, regardless of which step is
                    currently mounted. */}
                <input type="hidden" name="tier" value={state.tier} />
                <input
                  type="hidden"
                  name="itemCount"
                  value={state.tier === "HOLIDAY_BUNDLE" ? 1 : itemCountNumber}
                />
                <input type="hidden" name="deliveryType" value={state.deliveryType} />
                <input type="hidden" name="addressStreet" value={state.addressStreet} />
                <input type="hidden" name="addressCity" value={state.addressCity} />
                <input type="hidden" name="addressState" value={state.addressState} />
                <input type="hidden" name="addressZip" value={state.addressZip} />
                <input type="hidden" name="rush" value={String(state.rush)} />
                <input type="hidden" name="neededBy" value={state.neededBy} />
                <input type="hidden" name="contactName" value={state.contactName} />
                <input type="hidden" name="contactEmail" value={state.contactEmail} />
                <input type="hidden" name="contactPhone" value={state.contactPhone} />
                <input type="hidden" name="notes" value={state.notes} />
                <input type="hidden" name="confirmed" value={String(confirmed)} />
              </CardContent>
            </Card>
          )}

          <div className="mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            {isLastStep ? (
              <Button type="submit" disabled={!confirmed || pending}>
                {pending ? "Submitting…" : "Submit request"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setStep((s) => Math.min(STEP_LABELS.length - 1, s + 1))}
                disabled={!canContinue()}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="lg:sticky lg:top-24 lg:h-fit">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-serif text-lg font-semibold">Your quote</h3>
            <div className="mt-4">
              <PriceBreakdown quote={quote} tier={state.tier} />
            </div>
            {state.tier === "HOLIDAY_BUNDLE" && (
              <Badge variant="accent" className="mt-4">
                Flat rate
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5">{children}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        <Pencil className="h-3 w-3" /> Edit
      </button>
    </div>
  );
}

function PriceBreakdown({
  quote,
  tier,
}: {
  quote: ReturnType<typeof calculateOrderPrice>;
  tier: Tier;
}) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted-foreground">
          {tier === "HOLIDAY_BUNDLE" ? "Holiday Bundle" : "Wrapping subtotal"}
        </dt>
        <dd>{formatCents(quote.subtotal)}</dd>
      </div>
      {quote.minimumApplied && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <dt>Minimum order applied</dt>
          <dd>—</dd>
        </div>
      )}
      {quote.deliveryFee > 0 && (
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Pickup &amp; delivery</dt>
          <dd>{formatCents(quote.deliveryFee)}</dd>
        </div>
      )}
      {quote.rushFee > 0 && (
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Rush</dt>
          <dd>{formatCents(quote.rushFee)}</dd>
        </div>
      )}
      <div className="mt-2 flex justify-between border-t border-border pt-2 font-serif text-base font-semibold">
        <dt>Total</dt>
        <dd>{formatCents(quote.total)}</dd>
      </div>
    </dl>
  );
}
