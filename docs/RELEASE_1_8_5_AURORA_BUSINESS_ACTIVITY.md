# Release 1.8.5 — Aurora Growth, Communications & Business Timeline

## Executive summary

Aurora Realty Group now has connected fictional marketing activity, communication metadata, and its first populated canonical Business Timeline. The release adds 50 campaigns, 600 communications, and 1,719 immutable canonical events spanning February through August 2026. It uses the existing `CanonicalEventFactory`, mapping registry, canonical envelope, and `InMemoryAppendOnlyTimelineStore`; no second event model was introduced.

No database writes, schema changes, external APIs, AI providers, generated message content, or financial metrics are present.

## Campaigns

Fifty campaigns cover residential, commercial, luxury, rental, land, and investment audiences. Each references an existing business unit, marketing owner, Marketing Manager, office, related properties, related companies, and six existing leads. Together the campaign influence links cover all 300 Aurora leads exactly once. Budget bands are descriptive—focused, standard, expanded, or flagship—and contain no currency, spend, return, revenue, or ROI values.

## Communications

Six hundred metadata-only records are distributed evenly across email, phone calls, WhatsApp, internal notes, and SMS. Every record resolves to an existing contact, that contact’s company, lead, deal, and assigned employee. Previews describe logged metadata only and contain no external message content.

## Canonical timeline

The 1,719 events comprise:

- 50 `growth.campaign.saved`
- 250 `sales.property.published`
- 300 `sales.lead.created`
- 600 `communication.message.recorded`
- 180 `operations.meeting.scheduled`
- 240 `documents.document.uploaded`
- 84 `operations.task.completed`
- 15 `sales.deal.closed`

Only mappings already approved by the Business Timeline Foundation are used. Unsupported names such as lead assignment or negotiation-started were deliberately not invented.

Events are sorted by `occurredAt` before append, then assigned strictly increasing sequence numbers by the existing append-only store. Correlation IDs connect journeys to leads; causation IDs record deterministic preceding business references. Subject and related-object links connect every event to existing Aurora identities. Unique event IDs and idempotency keys are validated.

The chronology begins with campaigns and property inventory, progresses through leads, communications, meetings, documents, completed work, and won deals, and permits later follow-up communications. This creates a believable six-month history without asserting production truth.

## Product surfaces

- Growth Hub shows connected campaign cards and marketing communication activity without ROI or revenue.
- Communication Hub shows recent email, phone, WhatsApp, and internal-note metadata.
- Business Timeline renders all Aurora canonical events through the existing Timeline Experience.
- Executive Home shows connected activity, demo-day communications, campaigns, meetings, and successful timeline highlights.
- Universal Bar searches campaigns, communications, and canonical timeline events.
- A local context registry exposes campaign/communication context identities and canonical timeline references without context generation.

All Aurora surfaces are gated by the absence of a persisted organization, preserving existing customer workspace behavior.

## Future readiness

The canonical history is ready for future projections, correlation exploration, journey views, deterministic context assembly, and governed demo analytics. Durable persistence, production ingestion, external messaging, attribution, and intelligence require separately approved tenancy, RLS, provenance, consent, retention, and provider designs.

