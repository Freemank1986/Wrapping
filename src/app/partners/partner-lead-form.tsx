"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { submitPartnerLead } from "@/app/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PartnerLeadForm() {
  const [state, action, pending] = useActionState(submitPartnerLead, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
  }, [state]);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-8 text-center">
        <p className="font-serif text-lg font-semibold">You&apos;re on our list</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="businessName">Business name</Label>
          <Input id="businessName" name="businessName" required />
          {state?.errors?.businessName && (
            <p className="text-sm text-destructive">{state.errors.businessName[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactName">Contact name</Label>
          <Input id="contactName" name="contactName" required />
          {state?.errors?.contactName && (
            <p className="text-sm text-destructive">{state.errors.contactName[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {state?.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="businessType">Type of business</Label>
        <Input id="businessType" name="businessType" placeholder="e.g. Boutique, florist, gift shop" required />
        {state?.errors?.businessType && (
          <p className="text-sm text-destructive">{state.errors.businessType[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">What are you hoping to set up? (optional)</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      {state?.message && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Start the conversation"}
      </Button>
    </form>
  );
}
