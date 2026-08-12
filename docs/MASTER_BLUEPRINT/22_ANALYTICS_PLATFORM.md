# Analytics Platform

## Purpose

The Analytics Platform supplies trusted operational, product, customer, AI, and
commercial intelligence across AtlasOS while enforcing tenant isolation,
privacy, metric governance, and source transparency.

## Data classes

- operational telemetry for system and workflow health
- product events for adoption and user journeys
- business events from governed feature modules
- commercial events from billing and entitlements
- AI usage, quality, cost, and outcome events
- audit data, accessed only through its stricter policy boundary

## Event standards

Events have stable names, schema versions, owner, purpose, actor type, product,
tenant where applicable, timestamp, correlation, source, consent category, and
data classification. Schema changes require compatibility review.

## Semantic layer

Measures and dimensions have authoritative definitions, owners, calculation,
grain, source, freshness, allowed filters, privacy level, and deprecation
policy. Dashboards consume governed metrics instead of recreating formulas.

## Tenant analytics

Organizations access only their data and approved benchmarks. Small cohort
suppression, aggregation, and anonymization prevent inference about other
tenants. Exports require permission and produce audited, expiring artifacts.

## Platform analytics

Mission Control analyzes adoption, retention, revenue, reliability, support,
module health, AI outcomes, and unit economics. Access to customer content is
not implied by access to aggregate performance.

## Report Builder

Authorized users select approved datasets, measures, dimensions, filters,
visualizations, schedules, recipients, and formats. The builder enforces row,
column, tenant, permission, and export policy.

## Quality and operations

Pipelines publish freshness, completeness, lineage, validation, and incidents.
Late or corrected data is identifiable. Dashboards communicate time range,
timezone, last refresh, filters, and metric definitions.

## Privacy

Collection follows purpose limitation and consent. Sensitive fields are
minimized, pseudonymized where possible, retention-controlled, and excluded from
general-purpose exploration.
