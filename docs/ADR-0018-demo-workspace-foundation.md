# ADR-0018: Demo Workspace as a First-Class Product Asset

## Status

Accepted for Release 1.8.0.

## Context

Disposable sample data tends to drift from product capabilities, mixes arbitrary records with architecture, and becomes difficult to validate or safely reset. Vayon needs a coherent fictional business that can eventually demonstrate cross-module workflows without masquerading as customer data or producing invented analytics.

## Decision

Aurora Realty Group is treated as a first-class product asset: a versioned, typed, immutable business blueprint with company identity, organizational structure, roles, offices, business units, and local visual placeholders.

The blueprint is configuration, not persistence. It contains no CRM records, people, transactions, communications, timeline events, metrics, predictions, or AI output. Navigation may consume a small read-only projection only as a fallback when no authenticated organization context exists.

## Consequences

- Demo expansion begins from one reviewed business model rather than disconnected fixtures.
- Product teams can reference stable identifiers across future demo releases.
- Customer and fictional data remain clearly separated.
- Schema, RLS, authentication, billing, onboarding, and business logic remain untouched.
- Any future record population requires a separate decision, provenance model, reset strategy, and persistence review.
