# Sprint 23 Milestone 2 — Executive Dashboard

The Executive Dashboard upgrades `/leadestate` into an enterprise CRM command center while retaining the existing route, authentication boundary, tenant RLS, organization/workspace services, billing implementation, onboarding flow, and database schema.

## Architecture

`ExecutiveDashboardService` is a server-only read aggregation layer. It obtains the authenticated organization/workspace context through the existing services, executes tenant-scoped Supabase queries, and maps serializable results into `ExecutiveDashboardData`. The page remains a Server Component and passes this snapshot into independent widget components.

Every widget has a stable `data-widget-id`. Widgets do not depend on each other and receive narrow typed props, providing the foundation for Sprint 24 layout persistence and drag-and-drop customization without coupling data retrieval to layout behavior.

The interactive revenue visualization is isolated behind `RevenueChartLoader`, a Client Component using `next/dynamic`. Other widgets remain server-rendered to minimize client JavaScript. Route-level loading renders an eight-card KPI skeleton plus major widget skeletons.

## Widgets

- `DashboardShell`: responsive composition boundary and widget registry surface.
- `KpiCard`: icon, live value, comparative trend, sparkline, hover/focus behavior, and destination link.
- `Sparkline`: compact accessible SVG trend visualization.
- `PipelineBoard`: New, Qualified, Viewing Scheduled, Negotiation, Closed Won, and Closed Lost stages with values, counts, trends, and filter links.
- `RevenueChart`: interactive twelve-month Revenue, Pipeline Growth, Leads, Conversion Rate, and Monthly Sales views.
- `ActivityTimeline`: tenant activity stream with event-aware icons, timestamps, workspace labels, and contextual links.
- `CalendarWidget`: today’s meetings, site visits, calls, and tasks with explicit weather/map provider placeholders.
- `QuickActions`: seven keyboard-accessible operational shortcuts.
- `AIWidget`: daily AI conversations, customer appointments, outbound follow-ups, property recommendations, emails, and WhatsApp activity.
- `NotificationsPanel`: unread events, warnings, subscription renewal, storage usage, and AI credit usage.

## Data flow

All reads are constrained by both `organization_id` and `workspace_id` and remain subject to existing RLS. KPIs and charts are derived only from persisted Sprint 22 records:

- Leads, properties, deals, meetings, tasks, calls, site visits, and activity use their domain tables.
- Pipeline value and stage columns use active deal values and `deal_stages` identifiers.
- Revenue uses paid invoice totals; monthly sales uses deals reaching `completed`.
- AI metrics use `ai_conversations`, `ai_recommendations`, and actual outbound communication records.
- Notifications use unread, undismissed notification events plus subscription and usage records.

If a user cannot read a billing record under existing RLS, the query naturally yields no record and the associated value remains zero/empty. Weather and map data are intentionally labeled placeholders and contain no fabricated information.

## Customization readiness

Widget IDs are stable and layout-independent. A future customization layer can store ordering, visibility, and spans keyed by `data-widget-id`, wrap widgets in a drag handle, and retain the current typed widget inputs. No widget currently owns global layout state.

## Accessibility and performance

Dashboard links and tabs are keyboard-native and use existing focus rings. Sections have accessible names, charts and sparklines have text alternatives, trends retain textual direction, contrast follows the dark design system, and animation respects the existing reduced-motion stylesheet. Expensive aggregation occurs on the server; charts are code split; chart calculations are memoized; and loading skeletons preserve layout stability.

## Future widgets

- Provider-backed local weather and travel routing
- Forecast versus target and commission analytics
- Team capacity and response-time SLA views
- Saved executive dashboard layouts
- Drag-and-drop placement and resize controls
- Real-time Supabase subscriptions for selected counters
- Custom report builder and scheduled executive summaries
