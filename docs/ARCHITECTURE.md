# Vayon OS Architecture

## Architectural goals

Vayon OS uses a modular, feature-first architecture. Dependencies should
flow from product features toward stable platform and shared UI contracts, never
from the platform into a specific product feature.

## Platform layer

`platform/` contains product-agnostic operating capabilities:

- configuration
- navigation
- auditing
- feature flags
- monitoring
- builders
- tenancy
- permissions

The platform layer defines cross-cutting contracts and policy boundaries. It
must not contain CRM-, property-, or other product-specific behavior.

## Feature layer

`features/` contains vertical product modules such as organizations, users, AI,
CRM, properties, messaging, and analytics. Each feature owns its UI components,
service boundaries, validation where applicable, and public contracts.

Features should avoid reaching into another feature's internal files. Shared
behavior must be exposed deliberately through a stable public interface or
promoted to the platform layer when broadly applicable.

## Shared components

`components/ui/` contains reusable, business-agnostic design primitives.
`components/layout/` contains shared composition components, while
`components/landing/` remains specific to the current marketing experience.
Shared components must be accessible, typed, responsive, and free of tenant or
feature business rules.

## Configuration

`config/` is reserved for application-level, environment-independent
configuration. `platform/configuration/` will define configuration contracts,
resolution rules, validation strategy, and tenant/product override policies.
Secrets must never be committed to configuration source files.

## Providers

`providers/` is the composition boundary for future React context providers and
platform adapters. Providers should remain narrow, be ordered explicitly, and
avoid hiding business workflows in global context.

## Application routes

App Router route groups separate marketing, authentication, and platform
surfaces without affecting public URL structure:

- `app/(marketing)/`
- `app/(auth)/`
- `app/(platform)/`

Route groups compose feature and platform modules; they do not become alternate
business-logic layers. The existing homepage remains unchanged until a separate
routing migration is planned.

## Data boundary

`database/` reserves a future persistence boundary. No database implementation
is implied by this scaffold. Future data access must enforce tenancy,
authorization, auditability, and transaction boundaries at the lowest practical
layer.

## Future modules

New modules—including automation, billing, marketplace, integrations, and
industry-specific applications—should follow the same feature-first boundaries.
A module is introduced only when its ownership, public contract, authorization
model, tenancy behavior, observability, and lifecycle are documented.
