# Release 1.0 — Vayon Communication Hub

## Architecture

Vayon Communication Hub defines the provider-neutral architecture for Vayon's future business messaging workspace. Release 1.0 adds this architecture beneath the existing `/vayon/communications` CRM experience, preserving its current tenant-scoped snapshot, metrics, conversation list, timeline, and assistant placeholders.

```text
Existing CRM communication dashboard (unchanged)
                         │
                         ▼
Provider-neutral Communication Hub presentation
                         │
       ┌─────────────────┼─────────────────┐
 Unified Inbox       Timeline         Composer
 Channel registry   Meetings/Calls   Templates
                         │
                         ▼
             Intelligence placeholders
```

The new package lives in `features/vayon/communication-hub` and separates domain, contracts, services, storage, components, types, and view models. It imports no CRM repositories, Supabase client, external integration, provider SDK, Brain, Cognitive Engine, Workforce, or AI Runtime.

## Unified Inbox

The future channel registry covers Gmail, Outlook, WhatsApp Business, SMS, Facebook Messenger, Instagram DM, Telegram, Signal, LinkedIn Messages, Web Chat, and Internal Notes. Every descriptor is disconnected and has `integrationAvailable: false`.

Threads support multiple channels, participants, labels, priority, status, workspace ownership, owner, assignments, unread counts, last activity, and versioning. The in-memory inbox supports workspace, channel, label, priority, status, assignment, unread, and text filters with newest-activity ordering. It contains no production records by default.

## Timeline

The canonical conversation timeline supports messages, calls, meetings, documents, tasks, activities, notes, emails, attachments, and system events. Items contain thread identity, occurrence time, direction, actor, title, body, attachment references, and metadata. The timeline service orders explicit records chronologically and does not query existing CRM tables.

## Conversation model and composer

Drafts support rich text, templates, attachments, scheduled timestamps, mentions, internal comments, and future AI suggestion status. Draft creation forces suggestions to unavailable and sending to false. Validation checks content and channel requirements. Calling `send` throws a deliberate unavailable error; no transport exists.

## Meeting Center

Meeting contracts prepare for Google Meet, Zoom, and Microsoft Teams. Records support participants, dates, lifecycle status, and placeholders for summaries, action items, and transcripts. Provider availability is false and no meeting can be created externally.

## Call Center

Call contracts support inbound, outbound, missed, and voicemail records with optional duration. Recording, transcript, and sentiment remain placeholders, and provider availability is false. There is no dialing or voice provider boundary in this release.

## Communication intelligence

Intelligence contracts support summaries, priority, urgency, response recommendations, risks, follow-up reminders, sentiment, confidence, citations, and status. The placeholder service returns empty advisory arrays, zero confidence, no citations, and placeholder sentiment. It performs no AI call and fabricates no assessment.

## Templates

Templates cover email, WhatsApp, SMS, and internal content with versions, localization, variables, activation, and approval status. The local registry resolves explicit locale and version constraints and prefers the newest matching version. It does not submit templates to providers.

## Future integrations

Each future channel requires an official adapter behind a separately reviewed boundary. Activation must include encrypted credential storage, least-privilege scopes, tenant isolation, webhook verification, idempotency, consent and opt-out enforcement, retention, provider terms, delivery receipts, rate limits, retry and dead-letter handling, audit trails, regional requirements, and kill switches.

Sending must remain separate from composition. A production command layer requires permission checks, approval where applicable, validated recipients and content, dry-run previews, deduplication, audit, status reconciliation, and customer-visible history. Future intelligence must call Vayon AI Runtime rather than a provider directly.

