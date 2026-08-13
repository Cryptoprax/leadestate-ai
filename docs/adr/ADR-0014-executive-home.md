# ADR-0014: Executive Home

## Status

Accepted for Release 1.4.

## Context

The existing landing experience is organized as a conventional operational dashboard. Vayon OS needs an executive entry point centered on context, priorities, narrative, risks, and cross-hub awareness. Live governed business context is not yet available through one approved aggregation boundary.

## Decision

Create `/vayon/home` as the Executive Home route. Preserve the existing organization gate at `/vayon` and redirect successful entry to `/vayon/home`. Do not modify authentication or onboarding actions.

Represent the page through a typed `ExecutiveHomeViewModel`. Use a rules-only narrative transformer, an explicitly unconfigured health model, reusable executive cards and context widgets, and a non-persistent layout engine. All unavailable sections display “Awaiting connected business data.”

## Why no legacy dashboard data

Reusing existing dashboard metrics would make Executive Home dependent on CRM repositories and could display zeroes as though they were business facts. Release 1.4 instead establishes an honest data boundary. Existing dashboard services and components remain untouched.

## Narrative decision

The narrative engine only formats supplied structured blocks. It cannot infer or generate text. This separates narrative presentation from future AI or analytical providers and preserves provenance.

## Layout decision

Role-based and saved layouts are represented as contracts. Persistence returns a typed unavailable result. This prevents browser-only configuration from becoming an accidental source of truth before tenant-scoped persistence and authorization are designed.

## Consequences

- `/vayon/home` becomes the explicit executive destination.
- `/vayon` remains the stable post-login entry and organization gate.
- Users see honest awaiting-data states rather than fabricated values.
- Future data sources can populate typed models without component redesign.
- The previous dashboard implementation remains in the repository but is no longer the default landing page.

## Future decisions

Later ADRs must define executive context aggregation, authorization, source freshness, citations, health-score governance, personalization persistence, layout permissions, and real-time update behavior.
