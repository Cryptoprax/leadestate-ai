# Google Calendar Platform

## Architecture

Sprint 46 adds `features/platform/google-calendar` without replacing the existing Calendar Platform. It follows Domain → Contract → Repository → Service → Provider → ViewModel → Server Component boundaries. The repository delegates established operations to the existing Google Calendar adapter and uses the shared Google API client for event lookup, move, and notification channels. App Router pages remain Server Components; only the route error boundary hydrates.

## OAuth reuse

Calendar authorization extends the existing Google identity grant with `include_granted_scopes=true`. It does not introduce another credential store or authentication flow. `GoogleOAuthService` owns encrypted tokens and refreshes an expiring credential. `GoogleApiService` performs one forced refresh and one retry after an HTTP 401.

## Provider

`ProductionGoogleCalendarProvider` exposes connection health, calendar and event reads, CRUD, move, attendees, FreeBusy, watch lifecycle, refresh, and deterministic CRM link contracts. Google Calendar API responses are the only source of calendar, event, attendee, availability, and Meet information.

## Security

Provider, repository, and service modules are server-only. Access tokens, refresh tokens, OAuth payloads, client secrets, authorization headers, and webhook verification tokens are never included in view models or browser props. Errors are normalized to reconnect or unavailable states. Logs must contain identifiers and counts only, never descriptions or attendee notes.

## Calendar model

The platform-neutral Calendar model carries calendar colors and access roles; event timezones, all-day dates, organizer and guest responses; visibility; reminders; read-only recurrence; and conference join URLs. The UI supports day, week, month, and agenda ranges, search, filters, pagination, event detail, attendees, locations, colors, and responsive VDS surfaces. Recording creation is not supported, and recording availability is displayed as unavailable unless Google supplies an authoritative capability in a future model.

## Timeline integration

The integration defines Meeting Created, Meeting Updated, Meeting Deleted, Attendee Changed, Meeting Linked, Calendar Connected, and Calendar Disconnected business events. Publication must occur only after the provider operation is confirmed and must use the existing Business Timeline ingestion path.

## CRM

References may target a Lead, Customer, Property, Deal, Meeting, Site Visit, or Timeline record. A link is accepted only after an authoritative tenant-scoped entity lookup and durable link write. The current production repository reports linking storage as unavailable instead of inventing a relationship.

## Workflow

Scheduling that requires approval follows Draft → Approval → Execution Request → Integration Platform → Google Calendar Provider → Timeline. Provider methods are execution capabilities, not permission to bypass governance. The UI labels new meetings as approval submissions until the existing workflow supplies an approved execution request.

## AI Workforce

The service reserves provider-neutral outputs for summaries, attendees, conflicts, meeting times, follow-ups, priority, and recommendations. Until an AI provider is attached, every field is empty and the UI states that AI is unavailable. No synthetic recommendation is shown as production output.

## Notifications and observability

Confirmed invitations, updates, approval requests, conflicts, and connection failures feed the existing notification platform. Settings show connection, primary calendar, calendars, effective permissions, token health, last sync, quota state, provider latency, sync health, last refresh, and version without credentials.

## Technical debt

- Add a tenant-scoped durable event-to-CRM link repository and entity verifier.
- Route mutation server actions through the existing approval and execution-request persistence APIs.
- Persist watch channel resource IDs and validate Google webhook headers at ingress.
- Capture quota headers and token refresh timestamps in the shared observability store.
- Add attendee response mutations once Google self-attendee semantics are represented in the shared model.

## Future enhancements

Incremental sync tokens, push-driven cache invalidation, recurring-event editing, working-location data, room resources, richer conference metadata, authoritative recording state, and provider-backed AI suggestions can be added behind the same contracts.
