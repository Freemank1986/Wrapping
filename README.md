# Wrapt

A local gift-wrapping service's booking site: marketing pages, tiered per-item
pricing with a flat-rate Holiday Bundle, a boutique/retail partner page, a
workshop signup page, customer accounts, an admin-reviewed order flow, and
Stripe checkout.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript + Tailwind CSS v4
- Hand-rolled shadcn/ui-style components (Radix primitives + `cva`) — the
  `shadcn` CLI's registry host isn't reachable from this environment, so the
  components under `src/components/ui/` are written directly instead of
  fetched
- **Prisma 7** + PostgreSQL (via `@prisma/adapter-pg`)
- Session auth via signed JWT cookies (`jose`) + `bcryptjs`, following the
  pattern in Next's own [authentication guide](https://nextjs.org/docs/app/guides/authentication) —
  no third-party auth library
- **Stripe** Checkout for payment, with graceful degradation when keys aren't set

## Getting started

You need a Postgres database — a local install, `docker run -p 5432:5432 postgres`,
or a free hosted instance (Neon, Supabase, Vercel Postgres all work).

```bash
npm install
cp .env.example .env
# set DATABASE_URL to your Postgres connection string, and generate SESSION_SECRET:
openssl rand -base64 32

npx prisma migrate deploy   # applies prisma/migrations/ to your database
npx prisma db seed          # seeds default pricing + an admin account

npm run dev
```

Open http://localhost:3000.

**Seeded admin login:** `admin@wrapt.local` / `AdminWrap123!` (override via
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` before seeding). Customer accounts
are created through the normal `/signup` flow.

## Deploying (Vercel)

1. Import this repo at [vercel.com/new](https://vercel.com/new) — this also
   wires up auto-deploy on push and PR preview URLs.
2. Provision a Postgres database (Vercel Postgres, Neon, or Supabase all have
   free tiers) and copy its connection string.
3. In the Vercel project's environment variables, set:
   - `DATABASE_URL` — the Postgres connection string from step 2
   - `SESSION_SECRET` — output of `openssl rand -base64 32`
   - `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` — optional, only needed
     for payments to work (see [Payments](#payments) below)
4. Deploy. `npm run build` runs `prisma migrate deploy` automatically before
   `next build`, so the schema is applied on every deploy — no manual
   migration step.
5. Run `npx prisma db seed` once, pointed at the production `DATABASE_URL`
   (from your machine, with `DATABASE_URL` set to the production value), to
   create the default pricing config and admin account.

## How pricing works

`src/lib/pricing.ts` is a pure, framework-free pricing function used by the
booking form's live quote, the public `/pricing` page, and the order-creation
server action — so the price a customer sees is always computed the same way
it's charged. Rates live in the `PricingConfig` table (one row) and are
editable at `/dashboard/admin/pricing` — changes apply immediately, no
redeploy needed.

Pricing is per item by tier (Simple / Standard / Elaborate), not by
materials — the idea is you're pricing what the presentation is worth to
someone who won't do it themselves, not cost-plus. On top of the per-item
subtotal:

- A **minimum order** applies to the wrapping subtotal, so a single cheap
  item is still worth doing.
- A **pickup & delivery fee** applies only when the customer wants gifts
  collected and dropped back off — self drop-off/pickup is free.
- A **rush fee** applies for expedited turnaround.
- The **Holiday Bundle** is a flat rate for "wrap my whole pile," independent
  of item count — this is the highest-margin option and is surfaced
  everywhere as the best value for larger orders.

## Order flow

Booking (`/book`, requires login) is a five-step wizard — tier & item count,
pickup/delivery (+ address), rush/standard & needed-by date, contact info,
then a **review & confirm step** — that mirrors the pricing variables
exactly. Submitting creates an order in `PENDING_REVIEW`, *not* an immediate
charge: an admin reviews and approves (or declines with a reason) at
`/dashboard/admin/orders`, which is what stands between a customer and a rush
promise the shop can't actually keep. Only after approval does the customer
see a "Pay now" button, which creates a Stripe Checkout session.

## Payments

Checkout works out of the box in a "not configured" state — the Pay button
shows a clear message instead of erroring — until you set:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Point a Stripe CLI listener (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`)
at the webhook route in dev to have `checkout.session.completed` mark orders
`PAID` automatically.

## Project layout

```
prisma/schema.prisma        Data model (User, PricingConfig, Order, leads)
prisma/seed.ts               Default pricing + admin user
src/lib/pricing.ts           Pure pricing engine (client + server)
src/lib/session.ts, dal.ts   Auth session + data access layer
src/app/actions/             Server actions (auth, orders, pricing, leads)
src/app/book/                Multi-step booking wizard
src/app/dashboard/           Customer order history + admin console
src/app/api/checkout/        Stripe Checkout session creation
src/app/api/webhooks/stripe/ Stripe webhook handler
src/components/ui/           Hand-written shadcn-style primitives
```
