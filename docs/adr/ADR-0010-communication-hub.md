# ADR-0010: Vayon Communication Hub

## Status

Accepted for Release 1.0 as an architecture-only communication platform.

## Context

Vayon already has CRM communication workflows and provider-specific integration foundations. Future channels need a unified customer workspace without forcing conversation, timeline, composer, meeting, call, template, and intelligence models to depend on Gmail, Outlook, WhatsApp, SMS, or voice vendors.

## Decision

Add a provider-neutral Communication Hub alongside and beneath the existing CRM communication UI. Preserve existing behavior and repositories. Define stable domain contracts and local architecture services for channel descriptors, inbox search, chronological timelines, drafts, meetings, calls, intelligence placeholders, and templates. Keep integrations and sending unavailable.

## Alternatives considered

- Replace the existing communication module. Rejected because it would risk CRM regressions.
- Extend existing provider-specific records for every channel. Rejected because vendor concerns would leak into the conversation model.
- Integrate providers during the architecture release. Rejected because schema, security, consent, credentials, and operational behavior require separate review.

## Trade-offs

- The architecture temporarily coexists with existing communication types.
- Customers see future capabilities as explicit disconnected placeholders.
- A unified model must retain channel-specific metadata without reducing every provider to the lowest common denominator.

## Consequences

Existing communication behavior remains active and unchanged. Future adapters target provider-neutral ports. No authentication, billing, onboarding, schema, RLS, AI Runtime, Brain, Cognitive Engine, Workforce, or CRM business behavior changes. No external messaging or AI call is possible in Release 1.0.

