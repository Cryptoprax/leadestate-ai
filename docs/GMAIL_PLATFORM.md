# Gmail Platform

## Architecture

Sprint 45 adds `features/platform/gmail` as the customer-facing Gmail module. It follows `domain → contracts → repositories → services → providers → view-models → components`. The production repository delegates transport to the existing Google Gmail service; it does not create another OAuth client, credential store, or inbox. Server Components load mailbox state and live content. Client hydration is limited to existing interactive VDS controls.

The route family is `/vayon/email`, `/inbox`, `/sent`, `/drafts`, `/archive`, `/spam`, `/trash`, and `/[messageId]`. All routes remain inside the authenticated Product Shell.

## OAuth reuse

Gmail uses the existing Google Workspace authorization-code flow with PKCE, state, nonce, incremental consent, Supabase tenant context, and encrypted credential RPCs. Gmail consent adds only the registered `gmail.modify` and `gmail.send` scopes. No Gmail-specific authentication session exists.

## Security

Access tokens, refresh tokens, client secrets, authorization headers, and raw OAuth payloads remain server-only. Message HTML is retained by the transport model but is never injected as trusted markup. Attachment downloads are authenticated, streamed directly from Gmail, use `private, no-store`, sanitize filenames, and set `X-Content-Type-Options: nosniff`. Mail content is not copied to local storage.

## Token lifecycle

The Google API service detects expiry before calls. A 401 triggers one forced refresh and one retry. A second authorization failure becomes an explicit reconnect error. Refresh rotation uses the existing optimistic credential version. UI diagnostics expose state and timestamps only—not secrets. Google does not expose a reliable remaining-quota value here, so the UI says `Not measurable`.

## Provider

`ProductionGmailProvider` exposes connect, disconnect, health, validate, message/thread list and retrieval, structured search, send, draft create/update/delete, labels, and refresh. `GoogleGmailRepository` adapts these operations to the established Google service. The provider version is explicit and its health model distinguishes healthy, attention, authorization-required, and unavailable states.

Search composes Gmail query syntax for subject, sender, recipient, labels, dates, text, unread state, and attachments. Pagination uses Gmail page tokens. Message bodies, participants, labels, threads, and attachment metadata are parsed from the live API response.

## Communications Hub

Gmail registers as the live email provider and links to `/vayon/email`. `duplicateInbox: false` documents that Communications must reference this mailbox rather than persist or render a competing live inbox.

## CRM integration

The context contract supports Lead, Customer, Deal, Property, and Timeline references. Until authoritative projections exist, production returns an empty reference collection and a clear unavailable message. It never infers or fabricates links from email addresses.

## Business Timeline

Canonical proposal types cover received, sent, draft created/updated/deleted, deleted, and linked events. The integration creates immutable proposals only. Durable Timeline publication remains behind the existing approved Event Bus ingestion boundary; no new database writes are introduced.

## AI Workforce

The view model reserves summary, suggested reply, suggested follow-up, priority, sentiment, and next-action fields. With no configured AI provider output it returns `AI provider unavailable.` and null results. No AI output is fabricated and Gmail never calls an AI provider directly.

## Workflow governance

Human-authored sends remain explicit user actions. AI and automated email work stops at draft or approval-required state. The governance contract sets `autonomousExecution: false`; future execution must continue through Draft → Approval → Execution Request → Integration Provider → Timeline.

## Notifications and observability

Contracts reserve mention, important-mail, failed-send, and approval-required notifications. Provider metadata includes connection health, validation latency, last validation, refresh availability, quota availability, and provider version. Logs contain identifiers/counts only and exclude subject, body, recipients, and tokens.

## Technical debt

- Durable Timeline/Event Bus ingestion needs an approved persistence release.
- CRM relationship projections need authoritative server-side mappings.
- Gmail history/watch synchronization needs webhook and queue infrastructure.
- Draft attachment editing and safe in-browser previews need a malware-scanning boundary.
- Quota telemetry needs Google Cloud monitoring integration.

## Future enhancements

Add Gmail push notifications, history cursor synchronization, shared mailbox delegation, provider-backed notification delivery, approved CRM link persistence, safe attachment previews, batch operations, and governed send execution without changing the provider contract.
