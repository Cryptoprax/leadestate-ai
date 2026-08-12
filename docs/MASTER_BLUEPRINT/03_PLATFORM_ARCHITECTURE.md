# Platform Architecture

## Architectural model

AtlasOS is a modular platform with a stable operating core and installable
domain capabilities. Products are compositions of modules, configuration,
themes, permissions, navigation, workflows, and commercial entitlements.

## Platform layers

### Experience layer

Marketing sites, product applications, Mission Control, Builder Studio, support
tools, and developer experiences. Interfaces consume feature contracts and do
not own authoritative business policy.

### Feature layer

Vertical modules such as CRM, properties, messaging, marketing, analytics,
billing, and AI. Each module owns its domain model, services, events,
permissions, UI components, configuration schema, and lifecycle.

### Operating platform

Shared identity, organizations, tenancy, authorization, auditing, feature flags,
configuration, navigation, builders, automation, notifications, monitoring, and
module management.

### Data and integration layer

Tenant-aware persistence, object storage, search, queues, caches, analytics
pipelines, external connectors, and AI providers behind governed adapters.

## Dependency rules

- Products depend on features and platform contracts.
- Features may depend on stable platform services.
- The platform cannot depend on product-specific features.
- Features communicate through public contracts and versioned events, not
  internal database tables.
- Shared utilities remain small and technical; domain concepts belong to their
  owning feature.
- Circular dependencies are prohibited.

## Product composition

A product manifest will eventually declare enabled modules, navigation,
branding, layouts, permission packs, default workflows, integrations, and
commercial packaging. Organization configuration may refine allowed options but
cannot exceed product policy or platform security constraints.

## Extensibility

Extensions use documented module and API contracts. All extensions declare
permissions, events, configuration schemas, data ownership, compatibility,
resource requirements, and uninstall behavior. Marketplace code never receives
implicit platform trust.

## Reliability

Critical services define service-level objectives, health signals, failure
modes, timeouts, retry policy, idempotency, degradation behavior, and recovery
runbooks. Asynchronous boundaries isolate expensive or unreliable work.

## Evolution

Architecture Decision Records govern major choices. Public contracts use
explicit compatibility policy. Migrations support coexistence, observability,
rollback, and tenant-by-tenant rollout where practical.
