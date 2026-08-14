# Vayon Enterprise Analytics & Intelligence Platform

## Architecture

The platform follows `Repository → Analytics Service → Aggregation Layer → View Models → Reusable Components → Pages`. It is additive and read-only. Existing CRM, Dashboard, Workforce, Workflow, Integration, Communications, Calendar, Property, Deal Room, authentication, and persistence code remains unchanged.

The Supabase repository loads tenant-scoped module records concurrently and isolates individual repository failures. Aurora aggregates the existing deterministic leads, deals, properties, meetings, tasks, communications, workflows, and workforce records. One shared snapshot powers each Server Component route.

## Aggregation model

Every metric uses an `EvidenceMetric` envelope containing ID, label, value, availability, source, explanation, and optional measurement time. Aggregation is centralized; pages contain no metric calculations. Datasets cover executive, sales, CRM, properties, deals, communications, workforce, workflow, integrations, and observability.

## Evidence policy

Production values are reported only when an authoritative tenant-scoped repository supplies the required records. Missing tables, projections, provider telemetry, chronology, recognized revenue, market demand, and derived business events render as `Unavailable` with an explanation. Empty authoritative collections may produce evidence-backed zero counts; missing sources never do. Aurora may use deterministic projections clearly sourced as `aurora`.

## Executive dashboard

The command center covers revenue availability, pipeline, forecast, conversion, win/loss rates, meetings, site visits, open deals, workforce status, workflow queue, provider health, notifications, deterministic insights, and platform observability. Insights cite metric IDs and never call an AI provider.

Sales, CRM, property, deal, communications, and workforce pages reuse the same evidence cards and aggregator. Workflow and integration analytics feed the overview health surface, covering approvals, execution-request availability, provider health, connections, latency, capability coverage, and rate limits.

## AI Workforce integration

Deterministic insights provide business summary, top risks, priorities, growth opportunities, and operational health. Statements use only metric availability and evidence IDs, declare `providerCalled: false`, and perform no autonomous action.

## Observability

The overview reports module, route, repository, provider, workflow, and queue health. Repository errors are summarized without leaking queries, secrets, customer data, or provider credentials.

## Future BI strategy

A future BI adapter should consume versioned analytics projections rather than CRM tables. It must preserve tenant isolation, row-level authorization, metric definitions, lineage, time zones, currency semantics, retention, export approval, and audit. Warehouses and semantic layers must register through the Integration Platform and must not become alternate systems of record.

## Performance

- Module repositories load concurrently.
- Aggregation operates once per shared snapshot.
- Server Components keep raw records off the browser.
- Pages reuse one metric grid and one route boundary.
- Repository failures are isolated rather than retried recursively.
- No duplicated queries or client-side aggregation is introduced.

## Technical debt and Sprint 34 recommendation

Recognized revenue, Timeline-based cycle analytics, provider health, notification projections, campaign/template telemetry, response times, workforce recommendation telemetry, and persisted metric definitions require future authoritative projections. Sprint 34 should establish versioned metric definitions, lineage contracts, and time-windowed projection interfaces before introducing a warehouse or external BI provider.
