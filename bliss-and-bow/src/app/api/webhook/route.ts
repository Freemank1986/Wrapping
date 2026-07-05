import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured." }, { status: 501 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[stripe webhook] checkout.session.completed", {
        sessionId: session.id,
        mode: session.mode,
        customer: session.customer,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
        // Populated for /book orders (name, tier, quantity, rush, delivery,
        // deliveryAddress, occasion, completionDate, styleNotes, giftMessage,
        // specialInstructions, totalCents) — this metadata is the order
        // record until a database and Resend are wired up.
        orderDetails: session.metadata,
      });
      // TODO: send confirmation email once email sending is wired up.
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.log("[stripe webhook] customer.subscription.deleted", {
        subscriptionId: subscription.id,
        customer: subscription.customer,
      });
      // TODO: send cancellation email once email sending is wired up.
      break;
    }
    default:
      console.log(`[stripe webhook] unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
