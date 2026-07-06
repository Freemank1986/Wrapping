import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getTierByMonthlyPriceId } from "@/lib/pricing-plans";

export async function POST(request: NextRequest) {
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
  const priceId = body?.priceId;
  const mode = body?.mode;

  if (typeof priceId !== "string" || !priceId) {
    return NextResponse.json({ error: "Missing price id." }, { status: 400 });
  }
  if (mode !== "payment" && mode !== "subscription") {
    return NextResponse.json({ error: "Invalid checkout mode." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  const origin = request.nextUrl.origin;
  const tier = getTierByMonthlyPriceId(priceId);

  try {
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: tier ? { tier: tier.id, tierName: tier.name } : undefined,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[api/checkout] Stripe error:", err);
    return NextResponse.json(
      { error: "Couldn't start checkout. Please try again in a moment." },
      { status: 502 },
    );
  }
}
