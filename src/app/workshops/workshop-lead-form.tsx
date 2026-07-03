"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { submitWorkshopLead } from "@/app/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function WorkshopLeadForm() {
  const [state, action, pending] = useActionState(submitWorkshopLead, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
  }, [state]);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-8 text-center">
        <p className="font-serif text-lg font-semibold">Got it!</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
          {state?.errors?.name && (
            <p className="text-sm text-destructive">{state.errors.name[0]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {state?.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="groupSize">Group size (optional)</Label>
          <Input id="groupSize" name="groupSize" type="number" min={1} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="preferredDate">Preferred date (optional)</Label>
        <Input id="preferredDate" name="preferredDate" type="date" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">What&apos;s the occasion? (optional)</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      {state?.message && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Request a workshop"}
      </Button>
    </form>
  );
}
