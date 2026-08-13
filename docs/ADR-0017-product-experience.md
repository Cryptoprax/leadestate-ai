# ADR-0017: Product Experience and Application Shell

## Status

Accepted for Release 1.7.5.

## Context

Vayon OS exposed technical and business destinations at the same navigation level. As the platform expanded, implementation architecture became more prominent than the customer’s daily work and the header-only wrapper could not provide stable product orientation across desktop and mobile.

## Decision

Vayon adopts a permanent authenticated application shell with a fixed header, collapsible business sidebar, breadcrumb context, scrollable content region, and extension boundary for a future utility rail.

Business navigation replaces technical navigation at the primary level because customers organize work around CRM, operations, growth, communications, AI assistance, and administration. Architecture pages move into a collapsed Developer Mode. They remain directly routable and available to the Universal Bar, but they no longer dominate customer navigation.

The shell owns product framing only. It does not own page data, domain mutations, authorization, billing, onboarding, or AI execution.

## Consequences

- Customers receive stable, predictable navigation and reach active product surfaces within two interactions.
- Developer surfaces remain accessible without creating architecture-first product language.
- Sidebar state is local and requires no schema or backend changes.
- Future permission filtering, workspace switching, notifications, and a right utility rail can extend typed shell boundaries.
- All shell visuals depend exclusively on semantic VDS tokens.
