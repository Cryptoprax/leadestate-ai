# Release 2.3 — Google Calendar Workspace

## Architecture

Provider-neutral calendar contracts live in `features/platform/calendar`. They model calendars, permissions, events, recurrence, all-day dates, timezones, guests, conferences, reminders, availability, colors, status, pagination, and mutations. Google Calendar is the only active adapter. Outlook Calendar, Exchange, CalDAV, Apple Calendar, and enterprise calendars are inactive extension targets.

Calendar authorization is incremental and independent of Gmail. The existing Google identity credential remains encrypted and workspace-scoped; Calendar activation adds only `calendar.events` and `calendar.readonly` through the existing PKCE/state/nonce flow.

## Workspace

The customer workspace preserves Vayon's existing operational calendar and adds live calendar discovery, primary/secondary metadata, visibility, colors, access roles, selection, day/week/month/agenda modes, search, upcoming event details, guests, availability posture, conference links, create, update/delete adapter operations, pagination, recurring/all-day event parsing, and timezone normalization.

## Platform integration

Executive projections may consume live Google event/free-busy responses only. Timeline helpers produce immutable proposals for create, update, cancellation, invite acceptance/decline, and reminders without appending events. Context slices support Lead, Deal, Property, Contact, Company, Campaign, Task, and Meeting references without inference. The asynchronous Universal Bar provider searches titles, guests, locations, dates, and organizers using Google Calendar's query boundary.

## Security and observability

Every server action re-establishes authenticated organization-owner context. Provider credentials stay encrypted server-side, are refreshed through versioned storage, and never enter UI payloads. Date-time events send an explicit IANA timezone; all-day events use Google date values. Logs include operation, calendar ID, counts, recurrence flags, and failures only—never descriptions or attendee notes.

## Known limitations

No background sync, push notifications, offline cache, Outlook/Microsoft Graph, CalDAV, persisted calendar selection, Timeline append, inferred CRM linking, or automatic reminder event generation is included. Editing UI is limited while the adapter contract supports updates. Live synchronization was not asserted without authorized Google credentials.
