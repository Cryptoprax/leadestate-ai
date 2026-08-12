# Automation Platform

## Purpose

The Automation Platform executes governed, event-driven business workflows
across AtlasOS modules. Automation accelerates repeatable work without obscuring
ownership, permission, state, or failure.

## Workflow model

A workflow contains version, owner, trigger, conditions, steps, branches,
variables, credentials references, actor policy, limits, timeout, retry,
compensation, audit settings, and success measures.

## Triggers

Supported trigger classes include domain events, schedules, inbound webhooks,
record changes, form submissions, manual actions, thresholds, and approved AI
decisions. Triggers are deduplicated and preserve source context.

## Actions

Actions are registered, typed capabilities from modules and platform services.
Each declares input/output schema, permission, risk, idempotency, timeout,
failure behavior, and data classification. Arbitrary code execution is outside
the standard builder.

## Execution

Workflow runs are durable state machines. They support branching, waits,
approvals, parallel steps, retries with backoff, cancellation, deadlines,
compensation, and resumability. Every step records sanitized inputs, outcome,
duration, actor, and correlation.

## Permissions

Publication validates that the workflow owner may delegate every action.
Runtime uses a dedicated automation identity constrained by tenant, workflow,
and declared capabilities. Editing a workflow cannot elevate existing grants.

## Human approval

High-risk steps can create approval tasks with context, expiry, separation of
duties, escalation, and explicit approve/reject outcomes. Approval does not
replace downstream authorization.

## Operations

Operators can inspect timelines, retry safe steps, resume, cancel, pause a
workflow version, and manage dead-letter work. Emergency stops can disable a
module action or integration globally or per tenant.

## Governance

Drafts, tests, simulation, change comparison, approvals, staged rollout,
version pinning, rollback, dependency mapping, and usage limits are mandatory.
