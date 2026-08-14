# Stripe billing platform

The billing platform uses the existing Repository → Service → Provider → ViewModel boundary. Stripe owns payment collection, Checkout, Customer Portal, tax calculation, trials, invoices, payment methods, proration, cancellation, reactivation, and metered usage. Supabase stores tenant-scoped projections and entitlement limits; webhook event IDs and usage idempotency keys prevent replay.

Reads are available to Organization Owner, Billing Admin, Finance, and Read-only billing roles. Mutations re-authorize Organization Owner or Billing Admin inside the server action/service boundary. Missing `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, or plan price configuration fails explicitly. Secrets are never persisted in billing tables or rendered in the UI.

Stripe product prices are configured with `STRIPE_PRICE_STARTER` and `STRIPE_PRICE_PROFESSIONAL`. Enterprise uses a sales-assisted custom contract. Usage meters use `vayon_<metric>` event names and must be configured in Stripe before reporting production usage.
