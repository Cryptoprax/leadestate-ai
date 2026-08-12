# Folder Structure

## Objectives

The repository structure communicates ownership and dependency direction.
Folders are architectural boundaries, not merely categories of file extension.

## Target structure

```text
app/
  (marketing)/
  (auth)/
  (platform)/

components/
  ui/
  layout/

features/
  auth/
  dashboard/
  organizations/
  users/
  permissions/
  ai/
  crm/
  properties/
  messaging/
  analytics/
  billing/
  marketing/
  automation/
  marketplace/

platform/
  configuration/
  navigation/
  auditing/
  feature-flags/
  monitoring/
  builder/
  tenancy/
  permissions/
  modules/

config/
providers/
database/
docs/
```

The target describes long-term placement; directories are introduced only when
their capability is implemented or formally scaffolded.

## Route groups

- `(marketing)` composes public portfolio and product marketing.
- `(auth)` composes future identity experiences.
- `(platform)` composes authenticated product and administration experiences.

Route groups own routing and layout composition, not domain logic.

## Feature modules

A feature may contain components, services, validation, types, events, tests,
and a documented public entry point. Internal structure should reflect actual
needs rather than create empty layers. Cross-feature imports use public
contracts.

## Platform modules

`platform/` owns product-independent policies and services. A platform module
must serve multiple features or products and cannot import product-specific
behavior.

## Shared UI

`components/ui/` contains business-agnostic primitives. Layout components
provide reusable shells. Domain compositions remain in their owning feature.

## Configuration and providers

`config/` contains validated application configuration definitions, never
secrets. `providers/` composes narrow framework adapters and contexts; it is not
a home for global business state.

## Database boundary

`database/` will contain schema, migrations, and shared persistence
infrastructure. Feature data access remains owned by feature services and tenant
policy is applied consistently.

## Dependency rules

Routes → features → platform contracts → infrastructure adapters. Shared UI may
be consumed across layers but never imports feature policy. Reverse and circular
dependencies are prohibited.
