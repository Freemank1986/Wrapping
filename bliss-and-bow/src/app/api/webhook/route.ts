import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendShopEmail, sendEmail } from "@/lib/email";
import { formatCents } from "@/lib/order-pricing";
import { SITE_URL } from "@/lib/site-config";

function isRealEmail(value: string): boolean {
  return value !== "unknown" && value.includes("@");
}

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
      const customerEmail = session.customer_details?.email ?? "unknown";
      const amount = formatCents(session.amount_total ?? 0);
      const meta = session.metadata ?? {};
      const orderLookupUrl = `${SITE_URL}/order-lookup?session_id=${session.id}`;

      try {
        if (session.mode === "payment" && meta.orderType === "gift-wrap") {
          // A /book order — meta carries the full order detail.
          await sendShopEmail({
            replyTo: customerEmail,
            subject: `New order — ${meta.occasion ?? ""} (${amount})`,
            text: [
              `Name: ${meta.name}`,
              `Email: ${meta.email}`,
              `Phone: ${meta.phone}`,
              `Tier: ${meta.tier}`,
              `Quantity: ${meta.quantity}`,
              `Occasion: ${meta.occasion}`,
              `Requested completion date: ${meta.completionDate}`,
              `Rush: ${meta.rush}`,
              `Delivery: ${meta.delivery}`,
              meta.delivery === "true" ? `Delivery address: ${meta.deliveryAddress}` : null,
              meta.styleNotes ? `Style notes: ${meta.styleNotes}` : null,
              meta.giftMessage ? `Gift message: ${meta.giftMessage}` : null,
              meta.specialInstructions ? `Special instructions: ${meta.specialInstructions}` : null,
              `Total: ${amount}`,
              `Stripe session: ${session.id}`,
            ]
              .filter(Boolean)
              .join("\n"),
          });

          if (isRealEmail(customerEmail)) {
            await sendEmail({
              to: customerEmail,
              subject: "Your Bliss & Bow order is confirmed",
              text: [
                `Hi ${meta.name ?? "there"},`,
                "",
                `Thanks for your order! Here's what we have on file:`,
                "",
                `Tier: ${meta.tier}`,
                `Quantity: ${meta.quantity}`,
                `Occasion: ${meta.occasion}`,
                `Requested completion date: ${meta.completionDate}`,
                meta.delivery === "true" ? `Delivery address: ${meta.deliveryAddress}` : "Pickup: in-store drop-off",
                `Total charged: ${amount}`,
                "",
                `You can look up this order any time here: ${orderLookupUrl}`,
                "",
                "Questions? Just reply to this email.",
                "— Bliss & Bow",
              ]
                .filter(Boolean)
                .join("\n"),
            });
          }
        } else if (session.mode === "payment" && meta.orderType === "shop") {
          // A /shop order — meta carries a summary of items purchased.
          await sendShopEmail({
            replyTo: customerEmail,
            subject: `New shop order — ${meta.fulfillment} (${amount})`,
            text: [
              `Name: ${meta.name}`,
              `Email: ${meta.email}`,
              `Items: ${meta.items}`,
              `Fulfillment: ${meta.fulfillment}`,
              meta.fulfillment === "shipping" ? `Shipping address: ${meta.shippingAddress}` : null,
              `Total (incl. tax): ${amount}`,
              `Stripe session: ${session.id}`,
            ]
              .filter(Boolean)
              .join("\n"),
          });

          if (isRealEmail(customerEmail)) {
            await sendEmail({
              to: customerEmail,
              subject: "Your Bliss & Bow shop order is confirmed",
              text: [
                `Hi ${meta.name ?? "there"},`,
                "",
                "Thanks for your order! Here's what we have on file:",
                "",
                `Items: ${meta.items}`,
                `Fulfillment: ${meta.fulfillment}`,
                `Total charged (incl. tax): ${amount}`,
                "",
                `You can look up this order any time here: ${orderLookupUrl}`,
                "",
                "Questions? Just reply to this email.",
                "— Bliss & Bow",
              ].join("\n"),
            });
          }
        } else if (session.mode === "subscription") {
          await sendShopEmail({
            replyTo: customerEmail,
            subject: `New membership signup — ${meta.tierName ?? "Bliss & Bow"} (${amount}/mo)`,
            text: [
              `Customer email: ${customerEmail}`,
              `Tier: ${meta.tierName ?? meta.tier ?? "unknown"}`,
              `Amount: ${amount}/month`,
              `Stripe customer: ${session.customer}`,
              `Stripe session: ${session.id}`,
            ].join("\n"),
          });

          if (isRealEmail(customerEmail)) {
            await sendEmail({
              to: customerEmail,
              subject: "Welcome to your Bliss & Bow membership",
              text: [
                "Welcome to Bliss & Bow!",
                "",
                `Your ${meta.tierName ?? "membership"} is now active at ${amount}/month.`,
                "",
                "You can manage or cancel your membership any time from the \"Manage membership\" link in the site footer.",
                "",
                "Questions? Just reply to this email.",
                "— Bliss & Bow",
              ].join("\n"),
            });
          }
        } else {
          console.log("[stripe webhook] checkout.session.completed (no matching handler)", {
            sessionId: session.id,
            mode: session.mode,
          });
        }
      } catch (err) {
        console.error("[stripe webhook] failed to send order notification email", err);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      try {
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        const customerEmail = !customer.deleted ? customer.email ?? "unknown" : "unknown";
        await sendShopEmail({
          subject: "Membership canceled",
          text: [
            `Customer email: ${customerEmail}`,
            `Stripe customer: ${subscription.customer}`,
            `Subscription: ${subscription.id}`,
          ].join("\n"),
        });

        if (isRealEmail(customerEmail)) {
          await sendEmail({
            to: customerEmail,
            subject: "Your Bliss & Bow membership has been canceled",
            text: [
              "Your membership has been canceled and will not renew.",
              "",
              "If that wasn't intentional, or you'd like to restart, just reply to this email.",
              "— Bliss & Bow",
            ].join("\n"),
          });
        }
      } catch (err) {
        console.error("[stripe webhook] failed to send cancellation notification email", err);
      }
      break;
    }
    default:
      console.log(`[stripe webhook] unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
