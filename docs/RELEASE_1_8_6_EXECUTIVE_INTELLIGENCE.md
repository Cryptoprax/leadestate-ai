# Release 1.8.6 — Executive Intelligence

## Executive summary

Executive Intelligence connects existing Aurora organization, CRM, property, sales-operation, growth, communication, document, meeting, and canonical Timeline records through deterministic projections. It creates no business records, invokes no AI or external provider, performs no database writes, and calculates no revenue, profit, conversion, forecast, or other fabricated KPI.

## Executive Home

Aurora Executive Home now uses a connected `ExecutiveHomeViewModel`. Morning Brief, Priority Center, Risk Center, Opportunity Center, Timeline Highlights, Upcoming Meetings, Workforce Activity, Growth Summary, and Communication Summary select existing records through explicit predicates. Financial Snapshot remains unavailable because no financial source exists.

Workspace Overview, business units, department activity, and recent document metadata are displayed directly from existing Aurora objects. Existing pipeline and business-activity panels continue to expose connected deal, task, meeting, campaign, communication, and Timeline records.

## Business health

Business health is a readiness model, not a commercial performance KPI. Seven equally weighted coverage signals evaluate CRM references, relationship references, canonical Timeline envelopes, meeting coverage, task-completion availability, document coverage, and communication coverage. Each signal exposes its numerator, denominator, explanation, and example source IDs. Score and confidence are reproducible from those inputs.

## Executive narrative

The existing `StructuredNarrativeEngine` composes two deterministic blocks. Sentences contain only counts derived from existing collections. Every block provides a `sourceLabel` containing the deal, meeting, task, communication, campaign, and canonical event IDs supporting the sentence. No generative model or free-form summarizer is used.

## Workforce

Executive, Sales, and Operations observations are selected by explicit rules: upcoming meeting, open negotiation, overdue open task, available property, and latest deterministic communication record. Each observation references a real subject and provides companies, employees, properties, meetings, documents, and supporting Timeline events where applicable. Observations are marked `generated: false` and `executable: false`.

The Workforce architecture is unchanged. Aurora projections render beside the existing advisory shell only when no persisted organization exists.

## Brain Gateway readiness

The Aurora adapter prepares a provider-free `Partial<BrainContext>` compatible with the existing Brain Gateway. Its source manifest explicitly covers Aurora, CRM, Timeline, communications, growth, properties, documents, and meetings. Canonical events are mapped into existing platform-event context records with canonical IDs retained in metadata. Knowledge, memory, recommendations, predictions, analytics, and plugins remain empty. The gateway and pipeline are not invoked.

## Context Engine

An existing property identity is assembled through `UnifiedContextAssembler`. Timeline, documents, communications, tasks, meetings, campaigns, property media placeholders, related developer and assigned employee, deterministic Workforce observations, and readiness explanations populate the established context slices. No Context Engine contract or implementation was changed.

## Universal Bar

Lead and deal previews now include connected contacts, properties, companies, budget/timeline context, and business-unit data. Existing company, contact, property, campaign, and Timeline previews continue to use connected Aurora records. Search remains local and Aurora-gated.

## Explainability

The projection carries explicit collections for source objects, canonical Timeline events, companies, employees, properties, meetings, and documents. Readiness signals and advisor observations expose their own evidence subsets and rule names. Confidence represents direct deterministic match certainty, not model probability.

## Future readiness

The adapter establishes a governed seam for later Brain and Cognitive execution without enabling either. Future intelligence must preserve citations, permissions, tenant isolation, provider governance, and the distinction between readiness coverage and business performance.

