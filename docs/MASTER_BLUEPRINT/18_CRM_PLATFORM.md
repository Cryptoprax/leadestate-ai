# CRM Platform

## Purpose

The CRM Platform is an installable relationship and revenue-operations module,
not the identity of AtlasOS. It supplies reusable customer, lead, activity,
pipeline, assignment, and engagement capabilities to products that require
them.

## Core domains

- people, companies, and relationship identities
- leads, sources, consent, qualification, and ownership
- configurable pipelines, stages, transitions, and outcomes
- tasks, notes, meetings, calls, messages, and timeline events
- assignment queues, territories, teams, and service-level targets
- products or interests through module-defined associations
- duplicate detection, merge, import, export, and data quality

## Configurability

Organizations can configure fields, layouts, pipelines, stages, loss reasons,
views, assignment rules, forms, scoring inputs, alerts, and workflows within
product policy. Metadata changes are versioned and cannot bypass permission or
data-classification rules.

## Record model

Records include tenant, owner, hierarchy scope, lifecycle, source, timestamps,
custom-field schema version, consent metadata, and audit attribution. A unified
timeline references immutable activities without making CRM the owner of every
connected module's data.

## Permissions

Permissions distinguish record type, action, and scope such as own, assigned,
team, branch, or organization. Sensitive fields, exports, bulk operations,
merges, and ownership changes receive elevated controls.

## AI participation

Authorized AI employees may summarize activity, enrich structured fields,
recommend next actions, draft communication, qualify leads, and identify risk.
They must identify evidence, respect consent, and obtain approval for sensitive
or external actions.

## Integration

CRM publishes versioned events and consumes approved events from messaging,
properties, marketing, automation, calendar, and billing. Integrations use
public services rather than direct table ownership.

## Measures

Standard measures include response time, qualification rate, conversion,
pipeline velocity, activity outcomes, data completeness, assignment fairness,
and forecast accuracy. Definitions are governed to prevent metric drift.
