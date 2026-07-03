"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { approveOrder, declineOrder, markOrderCompleted } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { OrderStatus } from "@/generated/prisma/enums";

export function OrderActions({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const [pending, startTransition] = useTransition();
  const [declineOpen, setDeclineOpen] = useState(false);
  const [reason, setReason] = useState("");

  function handleApprove() {
    startTransition(async () => {
      await approveOrder(orderId);
      toast.success("Order approved. The customer can now pay.");
    });
  }

  function handleDecline() {
    startTransition(async () => {
      await declineOrder(orderId, reason);
      setDeclineOpen(false);
      setReason("");
      toast.success("Order declined.");
    });
  }

  function handleComplete() {
    startTransition(async () => {
      await markOrderCompleted(orderId);
      toast.success("Marked completed.");
    });
  }

  if (status === "PENDING_REVIEW") {
    return (
      <div className="flex gap-2">
        <Button size="sm" onClick={handleApprove} disabled={pending}>
          Approve
        </Button>
        <Dialog open={declineOpen} onOpenChange={setDeclineOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" disabled={pending}>
              Decline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Decline this order?</DialogTitle>
            </DialogHeader>
            <div className="space-y-1.5">
              <Label htmlFor="decline-reason">Reason (shown to the customer)</Label>
              <Textarea
                id="decline-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="e.g. Can't make this turnaround date"
              />
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={handleDecline} disabled={pending}>
                Decline order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (status === "PAID") {
    return (
      <Button size="sm" variant="outline" onClick={handleComplete} disabled={pending}>
        Mark completed
      </Button>
    );
  }

  return null;
}
