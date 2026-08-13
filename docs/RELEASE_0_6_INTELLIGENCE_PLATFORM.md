# Release 0.6 — Intelligence Platform

## Architecture

Release 0.6 adds `features/platform/intelligence` as an architecture-first layer above Universal Business Objects (UBO). Intelligence consumes canonical object references and never queries CRM tables. The package separates domain models, view models, contracts, services, storage, knowledge, events, audit, recommendations, predictions, insights, notifications, analytics, memory, provider interfaces, workforce extensions, and dashboard presentation.

```text
CRM modules ──future projections──▶ Universal Business Objects
                                      │
                                      ▼
 Events ─▶ Knowledge ─▶ Recommendations / Predictions ─▶ Analytics / Dashboard
   │          │                    │                         │
 Audit     Memory contracts    Provider contracts       Workforce hooks
```

Dependency direction is inward toward typed contracts and canonical object references. Provider, queue, vector, backend, and AI implementations remain outside the core.

## Knowledge layer

`KnowledgeRecord` attaches summary, insights, recommendations, warnings, strengths, weaknesses, predictions, confidence, analysis time, version, source, and status to Contacts, Companies, Properties, Leads, Deals, Tasks, Calendar Events, Documents, and Activities. `KnowledgeService` depends on `KnowledgeStore` and `KnowledgeGenerator`. The included generator produces clearly labeled architecture previews only and never makes an AI call.

## Event bus and audit architecture

`PlatformEvent` includes type, payload, metadata, timestamp, correlation ID, source, target, priority, status, and replay provenance. `InMemoryEventBus` supports publish, subscribe, history, and replay. `EventQueueProvider` and `DistributedEventProvider` provide future Kafka/EventBridge boundaries.

Audit entries capture actor, timestamp, action, module, object, old/new values, IP/device placeholders, reason, result, and correlation ID. Audit timelines can be derived from events without coupling publishers to storage.

## Recommendation and prediction engines

Recommendation contracts cover next best action, cross-sell, upsell, follow-up, property/lead matching, risk, and productivity. Prediction contracts cover close probability, lead quality, property demand, revenue/activity forecasts, churn, marketing performance, and completion estimates. Both implementations are placeholders returning no decision-making output.

## Business and notification intelligence

Business insight types include agent performance, slow pipelines, aging, missed follow-ups, revenue and conversion trends, weekly/monthly/quarterly summaries, health, growth, leakage, productivity, bottlenecks, property performance, marketing ROI, customer satisfaction, and executive summaries. Notification models include priority, severity, category, required actions, resolutions, suggestions, reminder/escalation/snooze/dismiss state, explanation placeholder, history, grouping, and delivery-channel placeholders.

## Analytics engine

Analytics contracts separate metrics, dimensions, aggregations, filters, segments, ranges, comparisons, growth, trend, forecast state, widgets, and export. `AnalyticsService` consumes an `AnalyticsProvider`; the default provider returns empty placeholder results and fabricates no metrics.

## Memory architecture

Memory supports conversation, user, company, property, lead, deal, task, knowledge, and session scopes; short/long-term duration; expiration; metadata; versioning; and semantic-index status. `MemoryStore`, `MemoryRetriever`, and `VectorStore` are separate ports. The in-memory store supports deterministic recall and expiration filtering without database changes.

## AI provider contracts

The provider interface supports OpenAI, Anthropic, Google Gemini, Azure OpenAI, Ollama, and local LLM identifiers without SDK integration or provider-specific logic. Capabilities cover chat, structured output, embeddings, vision, speech-to-text, text-to-speech, OCR, tool calling, streaming, batch jobs, moderation, retries, rate limits, timeouts, and cancellation.

## Dashboard intelligence

Reusable cards cover executive insights, recommendations, predictions, business health, risk, forecasts, AI summaries, pipeline health, productivity, and growth. Activity heatmap and sales forecast remain explicit placeholders. Widgets accept view models rather than CRM records and remain responsive, accessible, and dark-theme compatible.

## Future AI Workforce

`WorkforceExtension` defines context preparation for AI CEO, Sales Director, Sales Executive, Receptionist, Marketing Manager, Customer Success, Operations Manager, Legal Assistant, Finance Assistant, Reporting Assistant, Property Advisor, and Recruiter. Execution is intentionally unavailable. Future workers consume governed knowledge, memory, recommendations, and predictions instead of querying CRM tables directly.

## Extension strategy

Add adapters at contract boundaries: tenant-scoped knowledge persistence, durable event outbox/queue, immutable audits, model-serving prediction providers, analytics warehouses, vector stores, provider registries, and governed workforce runtimes. Every implementation must retain correlation, provenance, authorization, confidence, versioning, observability, rate limits, and human review.
