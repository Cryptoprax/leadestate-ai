# Vayon Enterprise Property Intelligence Platform

## Architecture

The Property Platform is an additive, read-only asset intelligence layer following `Repository → Service → Domain Models → View Models → Reusable Components → Pages`. It preserves the existing property inventory, create/edit routes, Universal Workspace profile, CRM, Communications Hub, Calendar Platform, Workflow Engine, Timeline, AI Workforce, authentication, and persistence behavior.

`SupabasePropertyAssetRepository` scopes every production read by organization and workspace. `AuroraPropertyAssetRepository` maps the existing 250-property deterministic portfolio and its existing CRM, Calendar, Communications, document, and employee relationships. The service loads property, relationship, and document collections concurrently and creates one shared snapshot per route.

## Property model

`PropertyAsset` includes ID, reference code, title, type, normalized lifecycle status, price, currency, area, bedrooms, bathrooms, parking, amenities, builder, construction stage, possession date, location, optional coordinates, description, gallery, floor plans, videos, documents, Timeline reference, and created/updated timestamps.

Lifecycle states are `available`, `reserved`, `under-negotiation`, `sold`, `inactive`, and `archived`. Repository adapters normalize source-specific values without changing persisted records.

The existing Universal Workspace property detail remains the canonical profile surface for overview, gallery, documents, timeline, activities, leads, offers, marketing, analytics, and AI assistance. The new platform adds grid, map, availability, document, relationship, analytics, and deterministic assistance views without duplicating mutation UI.

## Relationship model

Relationships are reference-only and grouped by property:

- CRM: interested leads, customers, deals, and recent activity.
- Communications: conversations, templates, campaigns, and notifications.
- Calendar: meetings, site visits, tasks, and reminders.
- Workflow: approvals, workflows, pending actions, and Timeline references.

Production displays explicit awaiting-data states where authoritative relationship repositories are unavailable. Aurora relationships are derived only from the existing deterministic object graph.

## Analytics

The analytics contract displays views, interested buyers, conversion rate, average days listed, meeting count, offer count, and status changes. Counts and rates are derived from the loaded snapshot. View counts, offers, and Timeline status changes remain unavailable until authoritative sources exist; they are not fabricated.

## AI Workforce assistance

Deterministic assistance provides buyer match context, pricing context, property summary, recommended linked buyers, follow-up guidance, and demand indicators. Every result includes source-limited rationale, declares itself deterministic, and sets `executionAllowed: false`. No external AI provider, prediction model, or autonomous action is used.

## Workflow governance

The platform is read-only. Property actions, follow-ups, approvals, campaigns, messages, and provider operations remain outside this module and must pass through existing workflow and approval controls. No execution requests or Timeline events are generated here.

## Document management

Document contracts support brochures, floor plans, images, videos, contracts, approvals, and certificates. Assets are metadata references with `readOnly: true`. No upload, mutation, or external storage call is introduced.

## Future MLS integration strategy

A future MLS adapter must register through the Integration Platform and translate provider data into a versioned provider-neutral ingestion proposal. It must support incremental synchronization, source attribution, idempotency, field-level validation, licensing controls, tenant isolation, audit records, conflict resolution, and approval before any property mutation. MLS providers must never write directly to CRM or property tables.

## Performance

- Server Components keep repository access server-side.
- Shared snapshots prevent duplicate route fetching.
- Independent repository collections load concurrently.
- Local SVG placeholders use Next Image optimization.
- Large property and map lists use bounded rendering and CSS `content-visibility` where appropriate.
- All platform navigation and surfaces use VDS semantic tokens.

## Technical debt and Sprint 32 recommendation

Production relationship projections, authoritative pricing history, property coordinates, document metadata, offer aggregation, view analytics, and Timeline status-change projections require future persistence or existing contract extensions. Sprint 32 should introduce a read-only property relationship projection contract and provider-neutral MLS ingestion proposal model before any live integration is considered.
