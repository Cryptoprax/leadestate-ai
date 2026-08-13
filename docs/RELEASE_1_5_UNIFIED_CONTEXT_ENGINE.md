# Release 1.5 — Unified Context Engine

## Overview

The Unified Context Engine assembles a read-only, source-aware business context for supported objects without querying CRM tables, invoking AI, executing actions, or writing data. It consumes existing Universal Object and Business Timeline contracts directly and accepts other authorized context through provider-neutral references.

The customer-facing architecture workspace is available at `/vayon/context`. It starts with no selected business object and displays explicit awaiting-data states. It contains no example records, generated summaries, inferred recommendations, scores, or fabricated business data.

```text
Authorized context snapshot
   ├── UniversalObject / UniversalRelationship
   ├── CanonicalBusinessEvent[]
   └── Provider-neutral context references
                    │
                    ▼
          UnifiedContextAssembler
                    │
                    ▼
          UnifiedBusinessContext
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
       Embedded   Side panel  Slide-over
```

## Package architecture

`features/platform/context-engine` separates:

- `domain`: supported identities, sources, slices, snapshots, and assembled context;
- `contracts`: assembly and read-only source ports;
- `services`: the context-engine orchestration boundary;
- `assemblers`: Universal Object, Timeline, and unified composition;
- `view-models`: tabs and presentation-safe context models;
- `storage`: immutable constructor-supplied snapshot reader with no mutation API;
- `components`: reusable panel, section, side-panel, and slide-over surfaces;
- `dashboard`: customer-facing architecture workspace;
- `types`: public type exports.

Dependencies point inward toward domain contracts. The engine never imports repositories, actions, database clients, AI providers, or business services.

## Supported objects

Context identities support Contact, Company, Lead, Deal, Property, Campaign, Task, Document, Meeting, Communication, Calendar Event, and a generic Universal Object. An identity can carry existing `UniversalObjectRef` and `TimelineObjectRef` values where applicable without copying underlying object payloads.

## Context assembly

`ContextAssemblySnapshot` is the authorized input boundary. It can contain an existing Universal Object, canonical Business Timeline events, Universal Relationships, and source-tagged references supplied by future Documents, Communications, Growth, Executive Home, Workforce, and Intelligence readers.

The assembler produces thirteen slices:

- Summary
- Timeline
- Relationships
- Documents
- Communications
- Tasks
- Meetings
- Campaigns
- Attachments
- Related Objects
- Workforce
- Recommendations
- Business Health

Timeline events are chronologically ordered from their canonical occurrence time and sequence. Universal Object summaries expose only the existing display identity. Relationship projections use existing Universal Relationship targets. Missing arrays produce an empty `awaiting-data` slice with “Awaiting connected business data.”

The engine does not infer relationships, generate summaries, evaluate health, or manufacture recommendations.

## Context panel and tabs

`UnifiedContextPanel` is a reusable interactive client boundary that receives a serializable view model. It supports Overview, Timeline, Relationships, Documents, Communications, Activities, Attachments, and Insights tabs.

Overview includes summary and operational context. Insights contains Workforce, recommendation placeholder, and Business Health placeholder surfaces. Tabs only filter already-authorized data and never initiate reads.

## Navigation variants

- The embedded panel fits full-page and workspace layouts.
- `ContextSidePanel` supports persistent desktop context alongside an object workspace.
- `ContextSlideOver` provides a modal mobile and desktop navigation layer with backdrop and close controls.

These components are not attached to existing CRM routes in Release 1.5. Future integration can render them from object workspaces without modifying the engine.

## Storage boundary

`InMemoryContextSnapshotReader` accepts an immutable snapshot map in its constructor and exposes only `read`. It has no append, update, delete, set, save, or synchronization method. It is a test and architecture boundary, not persistence.

## Security and unavailable data

- The organization, workspace, and target are mandatory assembly inputs.
- The engine assumes snapshots were already authorized; it never expands access.
- Source state is tracked independently so partial contexts remain honest.
- No data source is silently represented as zero, healthy, empty business activity, or a recommendation.
- Future loaders must enforce tenant, visibility, classification, retention, and field-redaction policies before assembly.

## Future readiness

Future releases can implement authorized source readers, freshness and provenance metadata, server-side parallel assembly, partial streaming, cache policy, object-workspace integration, and governed insight providers. Those capabilities can implement existing ports and snapshot contracts without redesigning panels or the assembled context model.
