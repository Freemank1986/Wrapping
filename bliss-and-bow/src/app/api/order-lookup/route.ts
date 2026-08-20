import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Order lookup isn't configured yet." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email;
  const sessionId = body?.sessionId;

  if (typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Please enter your email." }, { status: 400 });
  }
  if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
    return NextResponse.json(
      { error: "Please enter the order link/ID from your confirmation email." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Order lookup isn't configured yet." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // The Stripe session ID is unguessable, but we still confirm the email
    // matches so knowing someone else's confirmation link isn't enough.
    const sessionEmail = session.customer_details?.email?.toLowerCase();
    if (!sessionEmail || sessionEmail !== email.trim().toLowerCase()) {
      return NextResponse.json({ error: "No matching order found." }, { status: 404 });
    }

    const meta = session.metadata ?? {};

    return NextResponse.json({
      orderType: meta.orderType ?? (session.mode === "subscription" ? "membership" : "unknown"),
      mode: session.mode,
      status: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      created: session.created,
      metadata: meta,
    });
  } catch (err) {
    console.error("[api/order-lookup] Stripe error:", err);
    return NextResponse.json({ error: "No matching order found." }, { status: 404 });
  }
}
