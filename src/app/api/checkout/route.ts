import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { formatCents, tierLabel } from "@/lib/pricing";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Payments aren't configured yet. Set STRIPE_SECRET_KEY in your environment to enable checkout.",
      },
      { status: 400 },
    );
  }

  const body = await request.json().catch(() => null);
  const orderId = body?.orderId;
  if (!orderId || typeof orderId !== "string") {
    return NextResponse.json({ error: "Missing order id." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || order.userId !== user.id) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  if (order.status !== "APPROVED") {
    return NextResponse.json(
      { error: "This order isn't ready for payment yet." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  const origin = request.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: order.contactEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: order.total,
          product_data: {
            name: `Wrapt — ${tierLabel(order.tier)}${
              order.tier === "HOLIDAY_BUNDLE" ? "" : ` (${order.itemCount} items)`
            }`,
            description: `${order.rush ? "Rush · " : ""}${
              order.deliveryType === "DELIVERY" ? "Delivery" : "Self pickup"
            } · Total ${formatCents(order.total)}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: { orderId: order.id },
    success_url: `${origin}/dashboard?paid=${order.id}`,
    cancel_url: `${origin}/dashboard`,
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
