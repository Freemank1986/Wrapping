import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { OCCASIONS } from "@/lib/occasions";
import {
  DELIVERY_FEE_CENTS,
  MAX_QUANTITY,
  RUSH_FEE_CENTS,
  calculateOrderTotalCents,
  getTierBaseCents,
  getTierName,
  isValidTier,
} from "@/lib/order-pricing";

// Stripe metadata values are capped at 500 characters each.
function truncate(value: string, max = 490): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

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
  const name = body?.name;
  const email = body?.email;
  const phone = body?.phone;
  const tier = body?.tier;
  const quantity = Number(body?.quantity);
  const styleNotes = body?.styleNotes ?? "";
  const giftMessage = body?.giftMessage ?? "";
  const occasion = body?.occasion;
  const completionDate = body?.completionDate;
  const rush = Boolean(body?.rush);
  const delivery = Boolean(body?.delivery);
  const deliveryAddress = body?.deliveryAddress ?? "";
  const specialInstructions = body?.specialInstructions ?? "";
  // Honeypot — real visitors never see or fill this field.
  const company = body?.company;

  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ url: "/checkout/success" });
  }

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Please enter your email." }, { status: 400 });
  }
  if (typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ error: "Please enter your phone number." }, { status: 400 });
  }
  if (!isValidTier(tier)) {
    return NextResponse.json({ error: "Please choose a wrap tier." }, { status: 400 });
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return NextResponse.json(
      { error: `Quantity must be between 1 and ${MAX_QUANTITY}.` },
      { status: 400 },
    );
  }
  if (!OCCASIONS.includes(occasion)) {
    return NextResponse.json({ error: "Please choose an occasion." }, { status: 400 });
  }
  if (typeof completionDate !== "string" || !completionDate.trim()) {
    return NextResponse.json(
      { error: "Please choose a requested completion date." },
      { status: 400 },
    );
  }
  if (delivery && (typeof deliveryAddress !== "string" || !deliveryAddress.trim())) {
    return NextResponse.json({ error: "Please enter a delivery address." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  const totalCents = calculateOrderTotalCents({ tier, quantity, rush, delivery });
  const tierName = getTierName(tier);
  const origin = request.nextUrl.origin;

  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: { name: `${tierName} Gift Wrap` },
        unit_amount: getTierBaseCents(tier),
      },
      quantity,
    },
  ];
  if (rush) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Rush Service" },
        unit_amount: RUSH_FEE_CENTS,
      },
      quantity: 1,
    });
  }
  if (delivery) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Local Delivery" },
        unit_amount: DELIVERY_FEE_CENTS,
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      metadata: {
        orderType: "gift-wrap",
        name: truncate(name),
        email: truncate(email),
        phone: truncate(phone),
        tier,
        quantity: String(quantity),
        rush: String(rush),
        delivery: String(delivery),
        deliveryAddress: truncate(deliveryAddress),
        occasion,
        completionDate,
        styleNotes: truncate(styleNotes),
        giftMessage: truncate(giftMessage),
        specialInstructions: truncate(specialInstructions),
        totalCents: String(totalCents),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[api/book/checkout] Stripe error:", err);
    return NextResponse.json(
      { error: "Couldn't start checkout. Please try again in a moment." },
      { status: 502 },
    );
  }
}
