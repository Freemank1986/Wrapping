import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  const customerId = request.cookies.get("stripe_customer_id")?.value;
  if (!customerId) {
    return NextResponse.json(
      { error: "No membership found on this device. Check out first to manage billing." },
      { status: 404 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  const origin = request.nextUrl.origin;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("[api/portal] Stripe error:", err);
    return NextResponse.json(
      { error: "Couldn't open your billing portal. Please try again in a moment." },
      { status: 502 },
    );
  }
}
