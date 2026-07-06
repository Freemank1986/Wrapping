import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getShopProduct, isValidProductId } from "@/lib/shop-products";
import { MAX_QUANTITY_PER_ITEM, SHIPPING_FEE_CENTS } from "@/lib/shop-pricing";

// Stripe's generic "Tangible Personal Property" tax code — applies standard
// sales tax rules, appropriate for physical goods like paper and ribbon.
const TANGIBLE_GOODS_TAX_CODE = "txcd_99999999";

// Stripe metadata values are capped at 500 characters each.
function truncate(value: string, max = 490): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

interface ShopItemInput {
  productId: string;
  quantity: number;
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
  const items: unknown = body?.items;
  const fulfillment = body?.fulfillment;
  const shippingAddress = body?.shippingAddress ?? {};
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
  if (fulfillment !== "pickup" && fulfillment !== "shipping") {
    return NextResponse.json({ error: "Please choose a fulfillment method." }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Please select at least one item." }, { status: 400 });
  }

  const validatedItems: { productId: string; quantity: number }[] = [];
  for (const raw of items as ShopItemInput[]) {
    if (!isValidProductId(raw?.productId)) {
      return NextResponse.json({ error: "Unknown product in cart." }, { status: 400 });
    }
    const quantity = Number(raw.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
      return NextResponse.json(
        { error: `Quantity must be between 1 and ${MAX_QUANTITY_PER_ITEM}.` },
        { status: 400 },
      );
    }
    validatedItems.push({ productId: raw.productId, quantity });
  }

  if (fulfillment === "shipping") {
    const { line1, city, state, postalCode } = shippingAddress;
    if (
      typeof line1 !== "string" || !line1.trim() ||
      typeof city !== "string" || !city.trim() ||
      typeof state !== "string" || !state.trim() ||
      typeof postalCode !== "string" || !postalCode.trim()
    ) {
      return NextResponse.json(
        { error: "Please enter a complete shipping address." },
        { status: 400 },
      );
    }
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 400 });
  }

  const origin = request.nextUrl.origin;

  const lineItems = validatedItems.map(({ productId, quantity }) => {
    const product = getShopProduct(productId)!;
    return {
      price_data: {
        currency: "usd",
        product_data: { name: product.name, tax_code: TANGIBLE_GOODS_TAX_CODE },
        unit_amount: product.priceCents,
        tax_behavior: "exclusive" as const,
      },
      quantity,
    };
  });

  const itemsSummary = validatedItems
    .map(({ productId, quantity }) => `${getShopProduct(productId)!.name} x${quantity}`)
    .join(", ");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      automatic_tax: { enabled: true },
      ...(fulfillment === "shipping"
        ? {
            shipping_address_collection: { allowed_countries: ["US"] },
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: SHIPPING_FEE_CENTS, currency: "usd" },
                  display_name: "Standard Shipping",
                },
              },
            ],
          }
        : { billing_address_collection: "required" as const }),
      metadata: {
        orderType: "shop",
        name: truncate(name),
        email: truncate(email),
        fulfillment,
        items: truncate(itemsSummary),
        shippingAddress:
          fulfillment === "shipping"
            ? truncate(
                `${shippingAddress.line1 ?? ""} ${shippingAddress.line2 ?? ""}, ${shippingAddress.city ?? ""}, ${shippingAddress.state ?? ""} ${shippingAddress.postalCode ?? ""}`,
              )
            : "",
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[api/shop/checkout] Stripe error:", err);
    return NextResponse.json(
      { error: "Couldn't start checkout. Please try again in a moment." },
      { status: 502 },
    );
  }
}
