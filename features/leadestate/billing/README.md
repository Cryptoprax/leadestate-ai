# Billing & Subscription Platform

Sprint 16 provides organization/workspace subscriptions, plan entitlements, usage, limits, billing contacts, and invoice ledger presentation. A provider-neutral interface is present, but its only implementation is inactive.

Plan selection updates the internal entitlement ledger for launch testing; it does not charge a customer. Draft invoice generation creates a clearly marked placeholder with payment collection disabled. Stripe checkout, webhooks, payment methods, tax calculation, finalized invoices, and downloads require a future provider milestone.
