# Release 0.5 — Universal Business Objects

## Architecture

Universal Business Objects (UBO) is an additive platform layer under `features/platform/universal-objects`. It does not replace the production CRM modules and does not change authentication, onboarding, billing, routing contracts, Supabase schema, or security policies.

The package separates:

- `domain`: canonical object and relationship models.
- `view-models`: presentation projections.
- `storage`: persistence ports and a Release 0.5 local adapter.
- `services`: object operations, duplicate detection, merge utilities, activity grouping, tagging, and search.
- `api`: a deliberately unavailable future API contract.
- `ai`: a deliberately inactive future AI provider contract.
- `components`: reusable profile, graph, timeline, document, attachment, address, tag, search, header, badge, and timeline-card surfaces.

The additive `/leadestate/objects` workbench demonstrates the architecture without fabricating records. Browser storage is namespaced and never writes to the production CRM or Supabase.

## Canonical objects

`UniversalObjectBase` supplies identity, type, display name, lifecycle status, tags, metadata, timestamps, and AI extension state. Contacts own canonical personal/contact/profile fields, normalized addresses, relationship references, activity summary, and relationship count. Companies expose industry, organization type, website, tax placeholder, addresses, and references to contacts, deals, properties, and documents.

Addresses reuse the global Country, State, City, and address controls and retain latitude, longitude, validation status, normalized preview, and a Maps provider boundary. Documents, notes, attachments, activities, and tags use the same base identity and can link to any universal object.

## Object relationships and Knowledge Graph preparation

Relationships are first-class directed edges: `source → predicate → target`. Neither object needs module-specific foreign-key logic in the UI model. Predicates such as owns, linked to, handled by, and belongs to remain configuration data. The graph model is ready for a future adjacency index or knowledge graph while preserving explicit provenance and metadata on every edge.

A persistence milestone should validate relationship types, prevent invalid self-links, enforce tenant boundaries, support soft deletion/versioning, and audit edge changes. Nothing in Release 0.5 bypasses existing authorization.

## Search architecture

`SearchIndex` abstracts indexing from query orchestration. `LocalSearchIndex` provides deterministic in-browser search for locally created UBO records; `PlaceholderBackendSearchIndex` makes the future backend boundary explicit. `UniversalSearchService` accepts scoped queries across Contacts, Companies, Properties, Leads, Deals, Tasks, Calendar, Documents, Notes, Tags, and future AI Memory.

`SearchOverlay` is available throughout the protected LeadEstate shell with Ctrl/Cmd+K, recent searches, scope visibility, empty states, and keyboard dismissal. It does not pretend to index production CRM rows before an approved backend adapter exists.

## Future persistence

Replace local stores with organization/workspace-scoped repositories only after an approved database release. Recommended persistence includes versioned object envelopes, type-specific payload validation, tenant RLS, governed RPC writes, soft deletion, optimistic concurrency, audit events, relationship provenance, document storage policies, full-text indexes, and reindex jobs. Migration must link existing CRM identifiers instead of silently duplicating them.

## Future AI integration

Every object exposes summary, recommendations, confidence, insights, and inferred-relationship slots. `UniversalObjectAIProvider` defines future operations and `PlaceholderUniversalObjectAIProvider` returns no generated content. A future provider must attach model/version provenance, confidence, evidence, authorization context, human-review state, and cost telemetry. AI-inferred edges must remain suggestions until approved.

## Extension points

- Official Places and Maps adapters for address validation and coordinates.
- Storage-backed documents, previews, sharing, version history, OCR, and extraction.
- Markdown rendering, mentions, attachment linking, and note search.
- Cross-object merge policies with reversible audit history.
- CRM projection adapters that reference canonical IDs without rewriting existing modules.
- Server-side search, semantic indexing, and governed AI Memory.
