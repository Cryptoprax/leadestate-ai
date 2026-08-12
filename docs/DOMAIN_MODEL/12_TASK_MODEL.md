# Task Model

Task is assignable work related to a lead, property, deal, or organization. It owns title, description, status, priority, due/reminder times, assignee, completion, recurrence definition, and version.

Statuses are configurable: open, in_progress, blocked, completed, cancelled. Parent references are polymorphic and tenant-scoped. Recurrence describes future generation without embedding scheduler behavior. Completion and reopen emit events; original completion evidence is retained.
