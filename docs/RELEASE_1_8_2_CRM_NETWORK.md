# Release 1.8.2 — Aurora CRM Network

## Executive summary

Aurora Realty Group now has a deterministic, read-only CRM reference network containing 36 fictional companies and 144 fictional contacts. The network exists as a local product asset: it performs no database writes, emits no timeline events, calls no external service, and creates no leads, opportunities, properties, tasks, communications, or financial activity.

## Architecture

The module is isolated under `features/vayon/demo-workspace/crm-network`:

- `contracts.ts` defines immutable company, contact, relationship, filter, identity, and Executive Home projection contracts.
- `companies.ts` holds explicit fictional company definitions across developers, builders, investors, banks, law firms, designers, architects, construction firms, corporate clients, channel partners, and property management.
- `contacts.ts` creates four deterministic external contacts per company. Contact identities, roles, names, addresses, and placeholder phone numbers are fictional.
- `network.service.ts` validates uniqueness, company/contact integrity, primary contacts, relationships, filters, and conservative home projections.
- `search.provider.ts` provides local company/contact discovery through the provider-neutral Universal Bar contract.
- `components.tsx` exposes reusable company, contact, profile, and relationship components.
- `CrmNetworkPanel.tsx` provides Aurora-only Executive Home context.

## Relationship model

Every contact belongs to exactly one company. Every company points to a valid primary contact. Contacts carry one of the supported relationship roles: decision maker, influencer, legal contact, finance contact, or technical contact. Business-unit assignments use the existing Aurora organization identifiers and do not alter the Organization & People model.

## Filters and discovery

Company and contact filtering supports industry, city, relationship status, business unit, company type, contact role, and tags. Contact company-level filtering is resolved through the immutable company relationship. Universal Bar discovery is enabled only when the shell explicitly identifies the Aurora demo workspace; real organizations retain the existing provider set.

## Executive Home

The Aurora Executive Home displays a CRM Network panel. Strategic partners are a count of explicitly classified relationships, not a performance metric. Top Companies and Newest Contacts remain unavailable because activity and creation-date data were not fabricated.

## Identity and future timeline readiness

Companies and contacts use stable `aurora-company-*` and `aurora-contact-*` identifiers within the `aurora-demo-crm` namespace. Identity envelopes declare timeline eligibility while containing immutable empty event collections. This release does not create, emit, ingest, or persist Business Timeline events.

## Constraints and future persistence

The source is local and read-only. A future persistence release may map the same contracts to tenant-scoped repositories after schema, RLS, authorization, migration, retention, and reconciliation designs are approved. A future timeline integration may reference stable object identities through existing canonical contracts, but must not mutate this reference asset or infer historical events.

