# Calendar Model

Calendar aggregates working-time context; CalendarEvent represents appointments, viewings, follow-ups, closings, leave, or blocks. Events carry timezone, absolute start/end, attendees, related entities, location/channel, and status.

Viewing lifecycle: Requested → Proposed → Confirmed → Completed, with Rescheduled, Cancelled, and NoShow outcomes. Availability is a derived view of working hours, blocks, provider calendars, buffers, and policy. External provider IDs are aliases owned by Integration.
