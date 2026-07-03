import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { requireUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { formatCents, tierLabel } from "@/lib/pricing";
import { PayNowButton } from "./pay-now-button";

export const metadata = { title: "Your orders — Bliss & Bow" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ justBooked?: string }>;
}) {
  const user = await requireUser();
  const { justBooked } = await searchParams;

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Your orders</h1>
          <p className="mt-1 text-muted-foreground">Track status and pay once an order is approved.</p>
        </div>
        <Button asChild>
          <Link href="/book">New order</Link>
        </Button>
      </div>

      {justBooked && (
        <Card className="mb-8 border-success bg-success/10">
          <CardContent className="pt-6 text-sm">
            <p className="font-medium text-success">Request submitted!</p>
            <p className="mt-1 text-muted-foreground">
              We&apos;ll review the details — especially the date, if it&apos;s a rush
              order — and confirm before anything is charged. You can check status here
              anytime.
            </p>
          </CardContent>
        </Card>
      )}

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <PackageOpen className="h-10 w-10 text-muted-foreground" />
            <p className="font-serif text-lg font-semibold">No orders yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              When you book a wrap, it&apos;ll show up here with its status and price.
            </p>
            <Button asChild className="mt-2">
              <Link href="/book">Book your first wrap</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-serif text-lg font-semibold">{tierLabel(order.tier)}</p>
                    <OrderStatusBadge status={order.status} />
                    {order.rush && (
                      <span className="rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning-foreground">
                        Rush
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.tier === "HOLIDAY_BUNDLE" ? "Whole pile" : `${order.itemCount} item(s)`} ·{" "}
                    {order.deliveryType === "DELIVERY" ? "Delivery" : "Self pickup"} · Needed by{" "}
                    {order.neededBy.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {order.status === "DECLINED" && order.declineReason && (
                    <p className="mt-1 text-sm text-destructive">Reason: {order.declineReason}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-serif text-xl font-semibold">{formatCents(order.total)}</p>
                  {order.status === "APPROVED" && <PayNowButton orderId={order.id} />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
