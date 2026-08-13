# Sprint 24 Phase 1 — Configuration Engine

## Configuration philosophy

Vayon OS configuration describes a company’s operating model without embedding it in CRM source code. Pipeline, field, form, workflow, permission-intent, and preference models are independent of Properties, Leads, Deals, Contacts, and Companies. Phase 1 is intentionally non-executing and schema-independent: it does not alter current CRM pipelines, authorization, RLS, authentication, onboarding, or billing.

## Architecture

The module lives under `features/vayon/configuration`:

- `types.ts` defines versioned UI/domain definitions without persistence assumptions.
- `config/defaults.ts` contains neutral starter definitions.
- `ConfigurationStore` is the persistence port; `LocalConfigurationStore` is the Phase 1 browser adapter.
- Utility functions handle immutable ordering, duplication, and portable JSON export.
- `ConfigurationEngine` owns draft state and composes independent builder widgets.

The route `/vayon/settings/configuration` is additive and uses the existing protected Vayon layout and navigation permission model.

## Builders

Pipeline Management supports multiple pipelines, stage drag ordering, colors, icons in the definition model, probability, default selection, archive state, duplication, and JSON import/export. Custom Fields supports text, number, currency, date, boolean, dropdown, multi-select, tags, URL, email, phone, and rich text across five CRM entity types.

The Form Builder models reorderable sections and fields, required state, placeholders, help text, defaults, conditional visibility, and preview. The Workflow Builder models Trigger, Condition, Action, Delay, Notification, and AI nodes plus directed visual connections. It does not execute workflows.

The permissions matrix captures module CRUD, export, import, approvals, AI, and reporting intent. It is not connected to production authorization in Phase 1 and therefore cannot weaken existing permissions. Company Preferences uses the global Country, Currency, Timezone, and Language controls.

## Future persistence strategy

Replace `LocalConfigurationStore` with an organization/workspace-scoped adapter after an approved schema milestone. Persist versioned immutable revisions, draft/published states, optimistic concurrency versions, author identity, timestamps, validation results, and audit events. Publication should be transactional and authorization must remain server-side with RLS and governed RPCs. Local definitions must not be migrated implicitly.

## Workflow model

A workflow is a directed graph of positioned nodes and source/target edges. Future compilation should validate trigger cardinality, cycles, unreachable nodes, connector capabilities, approval gates, retry policy, idempotency, rate limits, and human review. AI nodes must produce governed recommendations unless a separately approved execution policy exists.

## Extension points

- Persistence adapters for Supabase or an approved configuration service.
- Version comparison, draft review, publish, rollback, and audit history.
- Additional entity adapters without coupling the builders to CRM records.
- Validated pipeline templates and signed import packages.
- Workflow inspectors, edge conditions, credential references, and simulation.
- Role templates mapped to existing permission identifiers only after security review.
- Asset storage for logos after an approved storage policy is available.
