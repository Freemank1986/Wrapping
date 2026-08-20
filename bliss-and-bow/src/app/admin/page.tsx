import type { Metadata } from "next";
import Stripe from "stripe";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LogoutButton } from "@/components/admin/logout-button";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { formatCents } from "@/lib/order-pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Bliss & Bow admin dashboard.",
  path: "/admin",
  noIndex: true,
});

// Always fetch fresh from Stripe — this page has no cache of its own.
export const dynamic = "force-dynamic";

function dashboardUrl(livemode: boolean, path: string) {
  return `https://dashboard.stripe.com/${livemode ? "" : "test/"}${path}`;
}

function formatDate(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const tableClass = "w-full border-collapse text-left text-sm";
const thClass = "border-b border-gold/30 px-3 py-2 font-medium text-charcoal/70";
const tdClass = "border-b border-gold/10 px-3 py-2 text-charcoal";

export default async function AdminPage() {
  if (!isStripeConfigured()) {
    return (
      <main className="py-24">
        <Container>
          <SectionHeading eyebrow="Admin" title="Dashboard" />
          <p className="mx-auto mt-8 max-w-lg text-center text-charcoal/70">
            Stripe isn&rsquo;t configured (missing STRIPE_SECRET_KEY), so there&rsquo;s no order
            data to show yet.
          </p>
        </Container>
      </main>
    );
  }

  const stripe = getStripe()!;

  let sessions: Stripe.Checkout.Session[] = [];
  let subscriptions: Stripe.Subscription[] = [];
  let fetchError: string | null = null;

  try {
    const [sessionsResult, subscriptionsResult] = await Promise.all([
      stripe.checkout.sessions.list({ limit: 25, expand: ["data.line_items"] }),
      stripe.subscriptions.list({ limit: 25, status: "all", expand: ["data.customer"] }),
    ]);
    sessions = sessionsResult.data;
    subscriptions = subscriptionsResult.data;
  } catch (err) {
    fetchError =
      err instanceof Error
        ? err.message
        : "Couldn't reach Stripe. Check STRIPE_SECRET_KEY and network access.";
  }

  const paidSessions = sessions.filter(
    (s) => s.status === "complete" && s.mode === "payment",
  );
  const giftWrapOrders = paidSessions.filter((s) => s.metadata?.orderType === "gift-wrap");
  const shopOrders = paidSessions.filter((s) => s.metadata?.orderType === "shop");

  return (
    <main className="py-24">
      <Container>
        <div className="flex items-center justify-between">
          <SectionHeading eyebrow="Admin" title="Dashboard" />
          <LogoutButton />
        </div>

        {fetchError && (
          <p role="alert" className="mx-auto mt-8 max-w-lg text-center text-sm text-burgundy">
            Couldn&rsquo;t load Stripe data: {fetchError}
            {" "}(this sandbox blocks outbound requests to api.stripe.com — this will work once
            deployed.)
          </p>
        )}

        <section className="mt-16">
          <h2 className="font-serif text-2xl text-charcoal">
            Gift-Wrap Orders ({giftWrapOrders.length})
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Customer</th>
                  <th className={thClass}>Tier</th>
                  <th className={thClass}>Qty</th>
                  <th className={thClass}>Occasion</th>
                  <th className={thClass}>Due</th>
                  <th className={thClass}>Total</th>
                  <th className={thClass}>Stripe</th>
                </tr>
              </thead>
              <tbody>
                {giftWrapOrders.length === 0 && (
                  <tr>
                    <td className={tdClass} colSpan={8}>
                      No gift-wrap orders yet.
                    </td>
                  </tr>
                )}
                {giftWrapOrders.map((s) => (
                  <tr key={s.id}>
                    <td className={tdClass}>{formatDate(s.created)}</td>
                    <td className={tdClass}>{s.metadata?.name ?? s.customer_details?.email}</td>
                    <td className={tdClass}>{s.metadata?.tier}</td>
                    <td className={tdClass}>{s.metadata?.quantity}</td>
                    <td className={tdClass}>{s.metadata?.occasion}</td>
                    <td className={tdClass}>{s.metadata?.completionDate}</td>
                    <td className={tdClass}>{formatCents(s.amount_total ?? 0)}</td>
                    <td className={tdClass}>
                      <a
                        href={dashboardUrl(s.livemode, `payments/${s.payment_intent}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-burgundy underline underline-offset-2"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl text-charcoal">Shop Orders ({shopOrders.length})</h2>
          <div className="mt-4 overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Customer</th>
                  <th className={thClass}>Items</th>
                  <th className={thClass}>Fulfillment</th>
                  <th className={thClass}>Total</th>
                  <th className={thClass}>Stripe</th>
                </tr>
              </thead>
              <tbody>
                {shopOrders.length === 0 && (
                  <tr>
                    <td className={tdClass} colSpan={6}>
                      No shop orders yet.
                    </td>
                  </tr>
                )}
                {shopOrders.map((s) => (
                  <tr key={s.id}>
                    <td className={tdClass}>{formatDate(s.created)}</td>
                    <td className={tdClass}>{s.metadata?.name ?? s.customer_details?.email}</td>
                    <td className={tdClass}>{s.metadata?.items}</td>
                    <td className={tdClass}>{s.metadata?.fulfillment}</td>
                    <td className={tdClass}>{formatCents(s.amount_total ?? 0)}</td>
                    <td className={tdClass}>
                      <a
                        href={dashboardUrl(s.livemode, `payments/${s.payment_intent}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-burgundy underline underline-offset-2"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl text-charcoal">
            Memberships ({subscriptions.length})
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>Customer</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Started</th>
                  <th className={thClass}>Stripe</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length === 0 && (
                  <tr>
                    <td className={tdClass} colSpan={4}>
                      No memberships yet.
                    </td>
                  </tr>
                )}
                {subscriptions.map((sub) => {
                  const customer = sub.customer as Stripe.Customer | Stripe.DeletedCustomer;
                  const email = !("deleted" in customer && customer.deleted) ? customer.email : null;
                  const customerId = typeof sub.customer === "string" ? sub.customer : customer.id;
                  return (
                    <tr key={sub.id}>
                      <td className={tdClass}>{email ?? customerId}</td>
                      <td className={tdClass}>{sub.status}</td>
                      <td className={tdClass}>{formatDate(sub.created)}</td>
                      <td className={tdClass}>
                        <a
                          href={dashboardUrl(sub.livemode, `subscriptions/${sub.id}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-burgundy underline underline-offset-2"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </main>
  );
}
