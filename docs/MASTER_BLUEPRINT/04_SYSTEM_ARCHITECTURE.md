# System Architecture

## Runtime topology

AtlasOS begins as a modular application with strong logical boundaries and may
extract independently deployed services only when scale, security, ownership,
or reliability justifies the operational cost. Module boundaries must remain
valid regardless of deployment topology.

## Request lifecycle

1. Accept a request through a trusted edge.
2. Establish correlation and trace context.
3. Authenticate the identity where required.
4. Resolve active product, organization, and membership.
5. Calculate effective permissions and entitlements.
6. Validate input at the trusted boundary.
7. Execute a tenant-scoped feature service.
8. Commit business data and durable events consistently.
9. Emit audit and operational telemetry.
10. Return a stable, privacy-safe response.

## Execution modes

- **Synchronous requests:** Short user-initiated reads and commands.
- **Background jobs:** Scheduled, high-latency, retryable, or fan-out work.
- **Event consumers:** Cross-module reactions to versioned domain events.
- **Workflows:** Governed multi-step automation with state and recovery.
- **AI tasks:** Metered, evaluated operations with policy and tool boundaries.

Each mode carries identity or system actor, tenant, permission context,
correlation ID, idempotency information, and observability metadata.

## Data consistency

Transactions protect invariants within a module. Cross-module coordination uses
durable events and explicit process state rather than distributed transactions.
Consumers are idempotent, ordering assumptions are documented, and failed work
enters observable retry or dead-letter handling.

## Caching and search

Cache keys include product, tenant, principal scope when relevant, resource, and
version. Authorization occurs before returning cached or indexed data. Search
indexes are treated as tenant-scoped projections, not alternate security
boundaries.

## Files and media

Files use tenant-scoped ownership, private defaults, validated content types,
malware scanning, controlled access URLs, retention policy, and auditable
sharing. Public marketing assets are explicitly classified.

## Environments

Development, test, staging, and production are isolated. Production data is not
copied into lower environments without approved anonymization. Configuration
and schema promotion are automated, reviewed, and reversible.

## Observability

Logs, metrics, traces, audit events, product analytics, job health, and AI
telemetry use common correlation identifiers. Sensitive content is minimized or
redacted. Alerts map to owned runbooks and measurable service objectives.
