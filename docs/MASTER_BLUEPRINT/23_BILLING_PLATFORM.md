# Billing Platform

## Purpose

The Billing Platform manages AtlasOS commercial configuration and customer
financial lifecycle without becoming the source of product authorization.
Billing produces entitlements; trusted platform policy evaluates them alongside
permissions and security controls.

## Catalog

The catalog models products, plans, prices, currencies, billing intervals,
add-ons, modules, included allowances, meters, overage rules, taxes, discounts,
and effective dates. Published catalog versions are immutable.

## Subscriptions

Subscriptions track organization, product, plan, items, quantity, lifecycle,
trial, renewal, billing anchor, payment status, entitlements, and change
schedule. Upgrades, downgrades, pauses, cancellations, and reactivation have
previewable proration and effective-date policy.

## Metering

Meters define event source, aggregation, unit, dimensions, deduplication,
correction window, reporting delay, and pricing relationship. Examples include
AI consumption, messages, storage, active users, and automation executions.
Usage pipelines are reconcilable and auditable.

## Invoicing and payments

The platform manages invoice lifecycle, line items, taxes, credits, payment
attempts, failures, refunds, write-offs, and external provider references.
Sensitive payment credentials remain with compliant providers.

## Entitlements

Entitlements are versioned grants derived from active commercial agreements,
approved exceptions, and product policy. They can enable modules, limits, or
capacity but never bypass tenant isolation or user permissions.

## Finance operations

Mission Control supports catalog publication, subscription exceptions, credits,
dunning, reconciliation, revenue and usage review, margin analysis, and
financial exports. High-impact adjustments require reason, authorization, and
potential approval.

## Reliability and audit

Provider webhooks are signed, replay-protected, ordered by durable state, and
idempotent. Financial events retain source payload references, decisions,
adjustments, actor, and correlation. Reconciliation identifies divergence
between providers, invoices, usage, and entitlements.
