# Billing Model

Plan defines commercial packaging; Subscription binds one organization to plan/version and lifecycle; Entitlement answers permitted capacity; UsageRecord captures metered quantity; Invoice records financial obligation.

Subscription lifecycle: Trialing → Active → PastDue → Suspended → Cancelled/Expired, with upgrade/downgrade effective-time policy. Currency, tax, proration, credit, invoice numbering, and provider references are explicit. Billing provider is an adapter; provider events reconcile into domain facts.
