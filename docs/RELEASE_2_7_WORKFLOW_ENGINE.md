# Release 2.7 — Workflow Automation Engine

## Executive summary

Release 2.7 introduces a provider-neutral, planning-only workflow platform. Customers can compose and validate visual graphs and inspect deterministic execution plans. The platform deliberately has no execution runtime, production hooks, database writes, provider calls, or durable persistence.

## Architecture

`features/platform/workflows` separates domain contracts, execution ports, registries, validation, planning, templates, local draft storage, timeline proposals, context slices, and presentation. It does not import CRM repositories, integration adapters, AI providers, or database clients. The earlier Configuration Engine workflow model remains unchanged.

Workflow definitions are versioned immutable-shaped documents with draft, published, and archived lifecycle states. Only drafts can enter the in-memory store. Published is a contract state for a future governed persistence release, not an executable state.

## Designer

`/vayon/workflows` supplies a responsive canvas, node palette, zoom, wheel pan, grid, selection, multi-selection, grouping, drag positioning, undo/redo, keyboard shortcuts, mini-map, template selection, validation output, and execution-plan preview. The disabled publish control makes the release boundary explicit.

## Nodes, triggers, actions, and variables

The node registry covers Trigger, Condition, Delay, Approval, Branch, Loop, Notification, Email, Calendar, Task, Communication, CRM, Webhook, Document, Variable, Math, Formatter, AI placeholder, and future plugins. Every registration declares `executable: false`.

Trigger and action unions cover the release inventory. Provider actions are proposal contracts only. Variables support business objects, user/workspace context, current date, math, strings, booleans, and lists.

## Validation and planning

Validation detects duplicate IDs, missing node references, disconnected nodes, missing triggers, missing variables, and circular execution paths. Planning uses a stable topological order with node-ID tie breaking. Invalid workflows return no steps. Every plan and step declares planning-only and non-executable status.

## Timeline, context, and integrations

Timeline integration emits typed proposals only and cannot append events. Context integration exposes reference-only workflow slices and explicit awaiting-data states. The Integration Center registers Workflow Engine as an internal productivity capability linking to the designer.

## Templates

The local library includes Lead Follow-up, Welcome Email, Meeting Reminder, Property Assignment, Deal Escalation, Customer Onboarding, and Invoice Reminder. Templates contain no business records, metrics, credentials, or sending behavior.

## Future readiness

Future releases may add governed persistence, approvals, bounded loops, secrets references, provider capability checks, durable queues, replay, scheduling, worker isolation, rate limits, observability, and execution. Those systems must consume validated versioned plans and must not weaken tenant isolation or proposal review boundaries.
