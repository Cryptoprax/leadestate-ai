# Vayon Notification Platform

## Architecture and notification model

The Notification Platform consumes domain-event envelopes through a deterministic transformation service and stores only in an in-memory repository. Notifications include ID, title, body, category, priority, status, recipient, module, related entity and route references, timestamp, read state, dismiss state, and source event ID.

Categories cover Workflow, CRM, Deals, Properties, Calendar, Communications, AI Workforce, Analytics, Integrations, and Platform. Inbox, history, and preference routes share one Server Component and reusable VDS views. The existing notification overview remains unchanged.

## Delivery policy

Notifications are read-only and deterministic. Push, email, SMS, WhatsApp, browser push, and all external providers are disabled. Preferences expose this boundary and are not persisted. No notification is fabricated when no event exists.

## Publishing and subscriber rules

Notification creation requires an existing domain event and preserves its event ID, source, timestamp, and severity. Transformation never executes workflows or contacts a recipient. A future subscriber may consume approved event types, but current production hooks are disabled.

## Future provider strategy

Delivery providers must register through the Integration Platform and consume approved notification delivery requests, not raw module state. Future delivery requires consent, preferences, tenant authorization, template version, locale, idempotency, rate limits, provider health, audit, and delivery receipts.

## Technical debt and Sprint 35 recommendation

Recipient resolution, persisted preferences, read/dismiss mutations, durable notification history, delivery requests, localization, deduplication windows, and retention remain future work. Sprint 35 should define durable notification projection and consent contracts while keeping external delivery disabled.
