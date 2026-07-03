import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { formatCents, tierLabel } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { OrderActions } from "./order-actions";

export const metadata = { title: "Orders — Wrapt Admin" };

const STATUS_PRIORITY: Record<string, number> = {
  PENDING_REVIEW: 0,
  APPROVED: 1,
  PAID: 2,
  COMPLETED: 3,
  DECLINED: 4,
  CANCELED: 5,
};

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const sorted = [...orders].sort((a, b) => {
    const statusDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (statusDiff !== 0) return statusDiff;
    if (a.rush !== b.rush) return a.rush ? -1 : 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const pendingCount = orders.filter((o) => o.status === "PENDING_REVIEW").length;

  return (
    <div>
      {pendingCount > 0 && (
        <div className="mb-6">
          <Badge variant="warning">
            {pendingCount} order{pendingCount === 1 ? "" : "s"} awaiting review
          </Badge>
        </div>
      )}

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Logistics</TableHead>
              <TableHead>Needed by</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <p className="font-medium">{order.contactName}</p>
                  <p className="text-xs text-muted-foreground">{order.contactEmail}</p>
                </TableCell>
                <TableCell>
                  <p>{tierLabel(order.tier)}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.tier === "HOLIDAY_BUNDLE" ? "Whole pile" : `${order.itemCount} items`}
                    {order.rush && " · Rush"}
                  </p>
                </TableCell>
                <TableCell className="text-sm">
                  {order.deliveryType === "DELIVERY" ? (
                    <>
                      Delivery
                      <p className="text-xs text-muted-foreground">
                        {order.addressStreet}, {order.addressCity}, {order.addressState}{" "}
                        {order.addressZip}
                      </p>
                    </>
                  ) : (
                    "Self pickup"
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm">
                  {order.neededBy.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium">
                  {formatCents(order.total)}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-right">
                  <OrderActions orderId={order.id} status={order.status} />
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                  No orders yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
