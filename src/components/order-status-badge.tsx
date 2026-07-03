import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/generated/prisma/enums";

const STATUS_META: Record<OrderStatus, { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }> = {
  PENDING_REVIEW: { label: "Awaiting confirmation", variant: "warning" },
  APPROVED: { label: "Approved — ready to pay", variant: "accent" },
  DECLINED: { label: "Declined", variant: "destructive" },
  PAID: { label: "Paid", variant: "success" },
  COMPLETED: { label: "Completed", variant: "success" },
  CANCELED: { label: "Canceled", variant: "outline" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status];
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}
