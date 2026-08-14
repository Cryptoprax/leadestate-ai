# Vayon Enterprise Administration Platform

## Architecture

The platform is additive and read-only, following `Repository → Service → Domain Models → View Models → Reusable Components → Pages`. It does not modify authentication, authorization, roles, permissions, teams, organizations, workspaces, audit, integrations, AI Workforce, or any business module.

The Supabase repository scopes administration reads to the active organization and workspace and loads users, roles, teams, departments, organizations, workspaces, audit records, and integration connections concurrently. Individual unavailable repositories produce explicit errors and empty views. The Aurora repository maps the existing fictional employees, departments, company blueprint, and workspace without persistence.

## Domain models

Users expose profile, role, department, team, workspace, status, explicit unavailable last-login state, and assigned AI employees. Roles cover Administrator, Manager, Sales, Marketing, Operations, Finance, Legal, and Support. Permissions cover CRM, Properties, Deals, Calendar, Communications, Workflow Approval, AI Workforce, Analytics, and Integrations.

Teams support standard Sales, Marketing, Operations, Finance, Legal, and custom-team classification. Department, organization, and workspace records remain read-only. Audit records include user, action, module, timestamp, entity, outcome, and correlation ID.

## Governance

AI governance displays assignments, approval authority, recommendation scope, and an execution scope permanently set to `disabled`. Integration governance displays enabled state, approval requirements, health, and workspace scope. It never exposes credentials or mutates connections.

## Analytics

The overview displays evidence-safe user activity, role distribution, workspace growth availability, approval volume, and module usage. Missing audit or historical growth sources render as unavailable instead of fabricated metrics.

## Safety

The service exports explicit guards for read-only operation, no writes, no role mutations, no permission mutations, no schema changes, no migrations, and no AI execution. No Server Action or RPC is introduced.

## Technical debt and Sprint 36 recommendation

Authoritative user profiles, last-login telemetry, role-to-permission projections, team membership projections, AI assignments, provider governance health, audit normalization, and growth history require future existing-contract extensions. Sprint 36 should introduce read-only administration projection contracts and evidence lineage before considering any governed administrative mutation workflow.
