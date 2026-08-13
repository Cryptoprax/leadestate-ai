# Release 1.4 — Executive Home

## Overview

Executive Home replaces the conventional metric-first landing page with a calm, narrative-led operating view. `/vayon/home` is the primary destination after the existing `/vayon` organization gate. The implementation does not modify authentication or onboarding actions: those flows continue to land on `/vayon`, which safely forwards authenticated, provisioned users to Executive Home.

The experience is architecture-first and contains no connected business data, AI-generated copy, calculated scores, or fabricated metrics. Every unavailable surface displays the exact state: **“Awaiting connected business data.”**

## Experience structure

Executive Home contains:

- Morning Brief
- Executive Narrative
- Business Health
- Today's Priorities
- Opportunity Center
- Risk Center
- Timeline Highlights
- Calendar Snapshot
- Workforce Activity
- Growth Snapshot
- Communication Snapshot
- Financial Snapshot

The first row establishes narrative and health context. Focus widgets organize the current day, while context widgets represent the major Vayon operating surfaces. Responsive grids collapse naturally for tablet and mobile screens.

## Narrative engine

`StructuredNarrativeEngine` transforms explicitly supplied narrative source blocks into presentation blocks. It does not summarize, infer, score, prompt, or call an AI provider. A source block is rendered only when its state is available and it contains supplied content; otherwise the engine emits the standard awaiting-data message.

Each block records `generatedBy: structured-rules`, source state, and an optional source label. Future narrative providers can implement a separate contract after governance, citations, authorization, and explainability policies are approved.

## Business Health

`BusinessHealthModel` reserves optional score and confidence fields and an explicit calculation status. Release 1.4 sets no score and no confidence. The UI displays an em dash and explains that governed source data and scoring policy are required.

A future health calculation must document source weighting, freshness, missing-data handling, confidence semantics, tenant configuration, and reproducibility before it may return a value.

## Executive components

- `ExecutiveCard` provides the reusable premium section surface.
- `ContextWidget` renders source-aware executive context.
- `AwaitingData` standardizes safe empty states.
- `NarrativePanel` displays structured narrative blocks and provenance state.
- `BusinessHealth` represents future scoring without inventing a value.
- `ExecutiveHome` composes the complete responsive experience.

Components accept typed view models and do not query CRM, Timeline, Workforce, Growth, Communication, Finance, or AI modules directly.

## Dashboard layout engine

`LocalExecutiveLayoutEngine` defines future role-based layouts for executive, sales-leader, operations-leader, and custom roles. Layout definitions contain ordered section identities and a saved-state contract.

Persistence is explicitly unavailable. Calling `save` returns a typed rejection and performs no local or remote write. Future saved layouts can implement the interface without coupling widgets to storage.

## Data flow

```text
Future authorized context providers
             │
             ▼
Typed ExecutiveHomeViewModel
     ┌───────┼────────┐
     ▼       ▼        ▼
 Narrative  Health   Context widgets
 rules only unscored awaiting data
```

Release 1.4 creates `createAwaitingExecutiveHome()`, a safe empty view model. It contains labels, descriptions, and states only—not business facts or metrics.

## Security and boundaries

- No authentication, billing, onboarding, schema, migration, or RLS changes.
- No CRM, Universal Object, Business Timeline, Brain, Cognitive Engine, AI Runtime, or Workforce changes.
- No external APIs, AI providers, persistence, or fabricated business metrics.
- The route does not access operational data.
- Future providers must authorize and redact data before constructing the view model.

## Future readiness

Future releases can add governed context-provider contracts, freshness indicators, source citations, role-aware layouts, saved layouts, user personalization, live loading states, and approved health calculations. Those capabilities can populate the existing view model without redesigning the page or reusable components.
