# Workspace Model

A Workspace is an organization-owned operating partition for a brand, market, business unit, or regulated data boundary. It never supersedes organization tenant isolation.

Organization 1→* Workspace; Workspace *↔* Employee through WorkspaceMembership; Workspace 1→* preferences, pipelines, calendars, dashboards, and scoped business records.

Status catalog: active, suspended, archived. Workspace configuration may override organization locale defaults. Cross-workspace views require explicit scope and permission. Moving records between workspaces is a governed domain operation with audit and events, never an identifier rewrite.
