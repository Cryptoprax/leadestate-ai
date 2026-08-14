# Vayon Enterprise Deal Room

## Architecture

The Deal Room is an additive, read-only transaction layer following `Repository → Service → Domain Models → View Models → Reusable Components → Pages`. Existing deal inventory, profile, edit/create flows, CRM, Property Platform, Calendar Platform, Communications Hub, Workflow Engine, AI Workforce, Timeline, authentication, and database behavior remain unchanged. Production reads are organization/workspace scoped. Aurora reuses its existing 120 connected deals.

## Deal model

The canonical deal includes identity, reference, customer, lead, property, human and AI assignment, value, currency, probability, eleven-stage lifecycle, expected close date, source, priority, workflow, approvals, Timeline, and timestamps. The pipeline supports New, Qualified, Property Matched, Site Visit Completed, Negotiation, Offer Submitted, Documentation, Approval, Ready to Close, Closed Won, and Closed Lost. It is a read-only drag preview: no stage mutation occurs.

The existing Universal Workspace remains the canonical deal profile for overview, timeline, property, customer, communications, meetings, workflow, approvals, documents, tasks, AI guidance, and analytics.

## Offer model

Offers include number, amount, currency, date, status, approval, revision history, and `readOnly: true`. Production reads the existing tenant-scoped `deal_offers` table. No offer mutation is introduced.

## Contract model

Contracts support reservation, sale agreement, purchase agreement, commission agreement, and supporting documents with approval status, version, and immutable read-only presentation. Production remains empty until an authoritative contract source exists.

## Checklist model

Checklists cover KYC, Documents, Approvals, Site Visit, Finance, Legal, and Compliance with evidence-based completion percentage. Aurora derives deterministic checklist states; production shows an explicit unavailable state.

## Workflow and integrations

Relationship contracts cover CRM customer/lead/activity, property availability and activity, communications/campaigns/notifications, calendar meetings/visits/tasks/reminders, and workflow approvals/timeline/execution requests. References are display-only. No execution request is created, dispatched, or approved by this module.

## Analytics

The Deal Room derives pipeline value, win rate, loss rate, stage distribution, probability-weighted forecast, and average offer value from the shared snapshot. Average cycle remains unavailable until authoritative Timeline data exists. No business metric is fabricated.

## AI guidance

Deterministic rules provide summary, negotiation context, risk, missing-document state, next action, and probability explanation. Guidance includes rationale and always sets `executionAllowed: false`. No provider or ML call occurs.

## Future e-signature strategy

Future signature providers must register through the Integration Platform. A signature package must originate as an approved workflow execution request with immutable document version, signer intent, idempotency, audit, expiry, revocation, and Timeline proposal. Providers may never change deal stage directly.

## Future payment integration strategy

Future payments must remain behind billing/payment adapters and approval policy. The Deal Room may reference authorized payment state but must never hold credentials, execute charges, infer settlement, or mark a transaction complete without authoritative provider confirmation.

## Performance

Server Components load one shared snapshot per route. Independent repository collections load concurrently. Pipeline columns are horizontally windowed by the viewport, and reusable views prevent duplicated fetching and UI.

## Technical debt and Sprint 33 recommendation

Production contract/checklist projections, relationship projections, revision history, approval history, cycle-time projections, saved views, and persisted pipeline filters require future existing-contract extensions. Sprint 33 should establish a read-only transaction projection and approved e-signature package proposal before any legal or payment provider is enabled.
