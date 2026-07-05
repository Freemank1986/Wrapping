import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session id." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const response = NextResponse.json({
      mode: session.mode,
      customerEmail: session.customer_details?.email ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
    });

    // Remember which Stripe customer this browser belongs to, so the
    // "Manage membership" link can open their billing portal later
    // without needing a full account/auth system.
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;
    if (customerId) {
      response.cookies.set("stripe_customer_id", customerId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("[api/checkout/session] Stripe error:", err);
    return NextResponse.json({ error: "Couldn't look up that session." }, { status: 502 });
  }
}
