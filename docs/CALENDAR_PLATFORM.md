# Vayon Enterprise Calendar & Scheduling Platform

## Calendar architecture

The platform is additive and follows `Repository → Service → Domain Models → View Models → Reusable Components → Pages`. Server Components acquire one snapshot per route. The snapshot loads reminders and conflict analysis concurrently after a single event inventory load, avoiding duplicate fetches. Existing authentication, Google Calendar workspace, operations services, CRM, Communications Hub, Workflow Engine, AI Workforce, and Integration Platform remain unchanged.

Production data is read through `SupabaseCalendarRepository`, scoped by both `organization_id` and `workspace_id`. The repository performs no writes. `AuroraCalendarRepository` supplies a deterministic, read-only scheduling demonstration containing 150 meetings, 90 site visits, 200 tasks, 180 reminders, and 30 conflicts.

## Scheduling model

The canonical `ScheduleEvent` supports meetings, site visits, follow-ups, phone calls, reminders, internal tasks, deadlines, and AI recommendations. Every event carries time, duration, status, priority, contextual CRM references, human and AI assignment references, workflow, approval, timeline, communication, notification, and audit timestamps when available. Missing production context is presented as unavailable rather than fabricated.

Calendar views cover day, week, month, and a virtualized agenda. Operational workspaces cover meetings, site visits, tasks, reminders, upcoming work, today, overdue-ready status fields, and timeline-ready references.

## Meeting model

The meeting workspace presents customer, property, deal, agenda, attachments, notes, related communications, workflow status, reminder status, and assigned AI employee. Empty collections and absent links remain explicit.

## Site visit model

Site visits include address, property, buyer, agent, status, checklist, travel notes, documents, reminder, and workflow context. The architecture supports these fields without creating schema or persistence.

## Task model

Tasks normalize `pending`, `scheduled`, `in-progress`, `completed`, and `cancelled` states with `low`, `medium`, `high`, and `critical` priorities. Existing Supabase task values are translated at the repository boundary; underlying CRM behavior is unchanged.

## Reminder model

Reminder contracts cover meeting, task, follow-up, site visit, deal, and workflow reminders. Production returns an honest empty queue until an authoritative reminder source is available. Aurora supplies deterministic demonstration reminders.

## Conflict detection

Production conflict detection is deterministic and read-only. It compares chronologically adjacent, non-cancelled windows and reports overlaps only where assignment is shared or unspecified. It does not move, cancel, or create events. Aurora exposes exactly 30 deterministic review cases.

## AI recommendation

Scheduling assistance reuses AI Workforce concepts through provider-free deterministic recommendations for scheduling review, conflicts, travel preparation, meeting follow-up, summaries, and priority. Recommendations contain rationale and always declare `executionAllowed: false`. No external AI provider is called.

## Workflow integration

Every future scheduling mutation must follow:

`Draft → Approval Engine → Execution Request → Timeline`

The current release creates no mutations, execution requests, timeline events, or external schedules. Human approval remains mandatory. Communications references, notifications, CRM relationships, and Workflow IDs are display-only contextual links.

## Observability

The customer-facing health surface shows meeting load, task load, reminder queue, conflict count, and schedule health. Analytics include meetings today, site visits, completion rate, tasks due, upcoming work, and average meeting duration. Values are derived only from the loaded repository snapshot.

## Future Google Calendar strategy

Google Calendar remains an independent existing workspace. A future adapter may translate approved execution requests into provider-neutral scheduling commands registered through the Integration Platform. It must use incremental authorization, idempotency keys, provider health checks, replay-safe audit records, timezone preservation, and Timeline proposals. It must not bypass Workflow approval or write provider credentials into calendar domain models.

## Performance and accessibility

- Server Components keep repository access off the client.
- Repository collections load concurrently where dependencies permit.
- One route snapshot prevents duplicated data acquisition.
- Agenda rendering uses CSS `content-visibility` and a bounded scroll region.
- Navigation is keyboard accessible, horizontally scrollable on narrow screens, and uses VDS semantic focus, surface, border, and text tokens.

## Technical debt and Sprint 31 recommendation

Production reminder persistence, per-event detail routes, timezone-aware recurrence, user-selectable date anchors, true windowed virtualization, and workflow-backed draft creation remain future work because this release forbids schema changes and execution. Sprint 31 should introduce approved scheduling command proposals and provider-neutral recurrence contracts before any live provider adapter is enabled.
