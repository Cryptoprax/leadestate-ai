# Database Strategy

## Objectives

AtlasOS persistence must support configuration, metadata, installable modules,
many tenants, permission enforcement, auditing, reliable evolution, and future
regional scale. One logical database may serve many organizations while strict
tenant isolation remains mandatory.

## Data domains

### Metadata

Versioned definitions for entities, fields, forms, pages, dashboards, reports,
workflows, events, and builder artifacts. Metadata uses validated schemas and
deterministic migrations.

### Configuration

Platform, product, organization, and permitted lower-level overrides with
provenance, inheritance, effective dates, version, and audit history.

### Modules

Catalog, manifests, compatibility, dependencies, installation state, version,
configuration, migration state, and entitlements.

### Tenants

Organizations, hierarchy, memberships, products, regions, lifecycle, and
tenant-owned feature data.

### Permissions

Permission catalog, roles, grants, scopes, conditions, assignments, policy
versions, and access-review state.

### Audit

Append-only, integrity-protected security and business-significant events with
separate retention and access policy.

## Ownership

Each table or collection has one owning module. Other modules use public service
contracts or governed projections rather than direct writes. Shared reference
data has an explicit platform owner.

## Tenant keys and constraints

Tenant-owned records include immutable organization identity. Primary and
unique keys, relationships, indexes, and queries incorporate tenant scope where
appropriate. Database-level safeguards complement application authorization.

## Configurable data

Configurability does not mean an unbounded entity-attribute-value model.
Frequently queried invariants remain typed. Custom metadata and values use
validated, indexed structures with schema versions, limits, and migration
strategy.

## Transactions and events

Transactions preserve invariants inside module boundaries. Durable outbox
patterns publish committed domain events. Consumers are idempotent and maintain
their own projection state.

## Evolution and operations

Migrations are reviewed, backward-compatible where possible, observable,
restartable, and rollback-aware. Backups are encrypted, tested through restore,
and aligned with recovery objectives. Archival, retention, legal holds, tenant
export, and deletion are designed before data collection.

## Scale

Indexing, partitioning, read scaling, archival, regional placement, and eventual
tenant sharding follow measured demand. Tenant routing remains hidden behind
data-access contracts so physical topology can evolve safely.
