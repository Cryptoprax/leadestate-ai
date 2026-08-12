# Operations Hub

Sprint 13 composes tasks, meetings, site visits, calendar entries, and activity into the daily LeadEstate operating surface. Routes orchestrate server-only services; repositories own tenant-scoped reads and atomic RPC calls; the additive migration owns authorization, optimistic concurrency, calendar projection, and activity generation.

The calendar entry model is deliberately projection-oriented and drag-and-drop ready. Recurrence remains a stored JSON contract without recurrence UI or scheduling execution. Workspace tabs are registered through AtlasOS Builder and rendered by the Universal Workspace Engine.
