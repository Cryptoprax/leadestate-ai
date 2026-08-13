# Release 2.9 — Microsoft 365 Business Applications

## Overview

Release 2.9 activates provider-neutral Microsoft Graph adapters for Outlook Mail, Outlook Calendar, OneDrive, Microsoft People, and Microsoft Teams. Each capability uses separate incremental delegated consent and the existing tenant-aware Microsoft identity vault. Screens never display sample provider records or inferred metrics.

## Provider architecture

Microsoft services implement the existing Mail, Calendar, External Storage, and Contact contracts. Teams adds read-oriented collaboration contracts because no shared collaboration contract previously existed. All Graph requests pass through `MicrosoftGraphGateway`; customer pages do not access Graph directly. Integration Center remains the readiness and permission authority.

## Applications

- `/vayon/communications/outlook`: Inbox, Sent, Drafts, Archive, search, conversation threads, attachment boundaries, categories, compose, draft, and provider service contracts for reply, reply-all, and forward.
- `/vayon/calendar/outlook`: calendar inventory, day/week/month/agenda navigation, upcoming events, meeting creation, recurrence, guests, conference readiness, and availability contracts.
- `/vayon/documents/onedrive`: files, folders, recent, shared, search, metadata, upload, download proxy, provider preview links, and reference-only CRM boundaries.
- `/vayon/contacts/microsoft`: personal contacts, directory, search, category groups, deterministic duplicate suggestions, and review-only CRM matching. Automatic merging is disabled.
- `/vayon/communications/teams`: chats, messages, meetings, presence, search, plus channel and file contracts. Live message sending is intentionally unavailable.

## Incremental authorization

Product permissions are requested only from each product page. Existing identity scopes and refresh credentials are retained and merged into the encrypted credential. Consent denial returns to the requesting application. Feature and workspace authorization remain mandatory.

## Workflow, context, Timeline, and search

Microsoft workflow nodes remain `contract-only` and `executable: false`, even where a corresponding user-initiated provider operation exists. Microsoft context slices expose references or awaiting-data states. Timeline adapters create immutable-shaped proposals with `submitted: false`. Universal search queries only connected providers and safely ignores unavailable providers.

## Executive Home

The Microsoft snapshot appears only when at least one Microsoft business capability is connected. Values are counts from the current live provider page, labeled as such; unavailable calls remain unavailable and no business metrics are inferred.

## Security

Graph content is never logged. Provider HTML is not injected into Vayon pages. Downloads are authorized server-side. Workspace-bound AES-256-GCM credentials, PKCE, state, nonce, signature verification, scope checks, token rotation, and tenant validation remain in force.

## Known limitations

No background synchronization, subscriptions, webhooks, durable provider cache, delta queries, large-file upload sessions, rich Outlook editor, attachment upload composer, full recurrence editor, multi-calendar aggregation, Teams live sending, or automatic CRM merge is included. Directory and Teams permissions can require tenant administrator consent. The Release 2.8 browser-bound encrypted vault remains a documented limitation until a schema-authorized durable vault is introduced.
