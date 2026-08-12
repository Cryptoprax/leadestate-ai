# Messaging Platform

## Purpose

The Messaging Platform provides governed, channel-independent communication for
users, organizations, automations, and AI employees.

## Supported model

The platform normalizes conversations, participants, messages, attachments,
delivery states, templates, consent, channel identities, and provider events.
Channels may include email, SMS, WhatsApp, in-app messaging, push, voice
coordination, and future partner channels.

## Conversation ownership

Every conversation belongs to a tenant and has purpose, channel, participants,
assignment, visibility scope, consent basis, status, and retention policy.
Feature modules reference conversations without owning raw provider contracts.

## Sending pipeline

Sending validates identity, permission, tenant, recipient, consent, template,
rate limit, quiet hours, policy, provider availability, and idempotency. Provider
callbacks update normalized delivery state through signed, replay-safe handling.

## Templates

Templates are localized, versioned, channel-aware, variable-validated, and
classified as transactional, operational, or marketing. Publication supports
review and provider approval where required.

## Inbox

The shared inbox supports assignment, queues, status, priorities, internal
notes, mentions, search, collision indicators, service targets, and handoff
between humans and AI employees. Access follows hierarchy and conversation
scope.

## Consent and preferences

Consent records capture subject, purpose, channel, source, jurisdiction,
timestamp, proof, and withdrawal. Opt-out is honored promptly across applicable
workflows. Transactional exceptions are narrowly defined.

## Reliability

The platform records accepted, queued, sent, delivered, read, failed, and
undeliverable states. Retries are bounded and idempotent. Provider outages use
approved fallback without violating channel or consent policy.

## Observability

Metrics cover queue delay, delivery, failure, response time, cost, opt-out,
provider health, template performance, and AI/human handoff. Sensitive message
content is excluded from routine logs.
