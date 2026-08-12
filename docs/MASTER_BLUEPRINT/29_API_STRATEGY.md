# API Strategy

## Principles

AtlasOS is API first. User interfaces, builders, automations, integrations, and
marketplace modules consume stable, authorized service contracts. APIs expose
capabilities rather than database structure.

## API categories

- internal feature contracts
- public organization APIs
- platform administration APIs
- builder and metadata APIs
- event and webhook contracts
- marketplace extension APIs
- AI tool contracts

Each category has an audience, authentication profile, compatibility policy,
rate limits, and documentation standard.

## Resource design

Resources use stable identifiers, predictable naming, explicit lifecycle,
standard pagination, filtering, sorting, sparse selection where justified, and
consistent timestamps. Bulk operations return per-item results and avoid hidden
partial success.

## Commands and idempotency

Business actions are modeled explicitly when plain resource updates would hide
policy. Retryable creation and financial, messaging, workflow, or integration
commands accept idempotency keys with documented scope and lifetime.

## Authentication and authorization

Every protected operation authenticates the principal, resolves product and
tenant, verifies membership and entitlement, and authorizes permission and
resource scope. API keys are not user sessions and cannot imply tenant access
without explicit grants.

## Errors

Errors use a stable envelope containing machine code, safe message, correlation
ID, field details where appropriate, and retry guidance. Internal stack traces,
secrets, tenant existence, and policy internals are not exposed.

## Versioning

Additive evolution is preferred. Breaking changes use explicit versions,
migration guides, telemetry, deprecation notices, and sunset windows. Event
schemas follow compatible evolution and consumers ignore unknown optional
fields.

## Webhooks

Webhooks are signed, timestamped, replay-protected, retryable, and observable.
Subscriptions filter approved event types and tenant scope. Payloads minimize
sensitive data and reference retrievable resources where appropriate.

## Operations

APIs publish availability, latency, error, rate-limit, and adoption metrics.
Developer Center exposes credentials, usage, logs, webhook delivery, schema
versions, status, and deprecations.
