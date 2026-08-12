# Module System

## Definition

A module is a versioned, installable unit of AtlasOS capability. Modules may
provide domain entities, services, interfaces, permissions, events, workflows,
reports, navigation, configuration, and integrations through declared
contracts.

## Initial module catalog

- CRM
- Properties
- HR
- Inventory
- Finance
- Support
- Calendar
- Documents
- Automation

Products select approved modules; organizations install only modules available
to their product, plan, region, and compliance profile.

## Manifest

Every module declares:

- identity, publisher, semantic version, and compatibility
- purpose, ownership, support, and lifecycle status
- permissions and requested platform capabilities
- configuration schema and defaults
- dependencies and conflicts
- entities, events, APIs, navigation, and UI contributions
- data classification, residency, retention, and export behavior
- install, upgrade, rollback, disable, and uninstall procedures
- metering and commercial entitlements

## Installation lifecycle

Installation performs compatibility and entitlement checks, reviews required
permissions, validates configuration, applies idempotent setup, and records an
audited installation. Activation may be staged. Failure returns the tenant to a
known state.

## Upgrades

Upgrades include release notes, schema and data migrations, compatibility
checks, preview, maintenance impact, rollback policy, and health verification.
Breaking changes require a supported migration path and deprecation window.

## Disable and uninstall

Disabling stops user access and new work without immediately deleting data.
Uninstall evaluates dependencies, exports, retention, legal holds, workflow
references, and cleanup. Destructive deletion requires explicit confirmation
and policy-compliant delay.

## Isolation and security

Modules run with declared capabilities and cannot access another module's
internal data. Interactions use approved APIs or events. Third-party modules
receive additional sandboxing, review, monitoring, and revocation controls.
