"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updatePricing } from "@/app/actions/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Initial = {
  simplePrice: number;
  standardPrice: number;
  elaboratePrice: number;
  deliveryFee: number;
  rushFee: number;
  minimumOrder: number;
  holidayBundlePrice: number;
  holidayBundleNote: string;
};

function MoneyField({
  name,
  label,
  defaultValue,
  error,
  hint,
}: {
  name: string;
  label: string;
  defaultValue: number;
  error?: string[];
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          $
        </span>
        <Input
          id={name}
          name={name}
          type="number"
          min={0}
          step="0.01"
          defaultValue={defaultValue}
          className="pl-6"
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-sm text-destructive">{error[0]}</p>}
    </div>
  );
}

export function PricingForm({ initial }: { initial: Initial }) {
  const [state, action, pending] = useActionState(updatePricing, undefined);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
  }, [state]);

  return (
    <form action={action} className="space-y-8">
      <div>
        <h3 className="mb-3 font-serif text-lg font-semibold">Per-item tiers</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <MoneyField
            name="simplePrice"
            label="Simple"
            defaultValue={initial.simplePrice}
            error={state?.errors?.simplePrice}
          />
          <MoneyField
            name="standardPrice"
            label="Standard"
            defaultValue={initial.standardPrice}
            error={state?.errors?.standardPrice}
          />
          <MoneyField
            name="elaboratePrice"
            label="Elaborate"
            defaultValue={initial.elaboratePrice}
            error={state?.errors?.elaboratePrice}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-lg font-semibold">Fees &amp; minimum</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <MoneyField
            name="deliveryFee"
            label="Pickup & delivery fee"
            defaultValue={initial.deliveryFee}
            error={state?.errors?.deliveryFee}
          />
          <MoneyField
            name="rushFee"
            label="Rush fee"
            defaultValue={initial.rushFee}
            error={state?.errors?.rushFee}
          />
          <MoneyField
            name="minimumOrder"
            label="Minimum order"
            defaultValue={initial.minimumOrder}
            error={state?.errors?.minimumOrder}
            hint="Applied to the wrapping subtotal before fees."
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-lg font-semibold">Holiday Bundle</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <MoneyField
            name="holidayBundlePrice"
            label="Flat price"
            defaultValue={initial.holidayBundlePrice}
            error={state?.errors?.holidayBundlePrice}
          />
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="holidayBundleNote">Description</Label>
            <Textarea
              id="holidayBundleNote"
              name="holidayBundleNote"
              rows={2}
              defaultValue={initial.holidayBundleNote}
            />
            {state?.errors?.holidayBundleNote && (
              <p className="text-sm text-destructive">{state.errors.holidayBundleNote[0]}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save pricing"}
      </Button>
    </form>
  );
}
