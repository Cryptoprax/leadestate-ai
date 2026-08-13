# Release 0.6.6 — Vayon Cognitive Engine

## Why it exists

Vayon Brain assembles governed business context. The Vayon Cognitive Engine sits above Brain and provides provider-neutral contracts for reasoning about that context: establishing goals, preparing plans, evaluating deterministic policies, requesting human approval, reviewing outcomes, and recording candidate learning.

This is an architecture-only release. It performs no AI, ML, simulation, production execution, rollback, external API, database, or Supabase operation. It does not invent production goals, metrics, decisions, or outcomes.

## Relationship to Brain and Digital Workforce

```text
Universal Objects + Intelligence Platform
                   │
                   ▼
          Vayon Brain Gateway
         assembles BrainContext
                   │
                   ▼
       Vayon Cognitive Engine
   ┌──────────┬───────────┬──────────┐
 Context    Goals       Planning   Policies
  Graph                  │          │
                         └── Approvals
                               │
                       Safe Action Lifecycle
                               │
                    Reflection + Learning candidates
                               │
                               ▼
                Explainable CognitiveResponse
                               │
                               ▼
                  Digital Workforce employee
```

Employees obtain context through Brain, submit objectives to the Cognitive Engine, and consume typed plans and explanations. Their contract has no execution method. This preserves current CRM ownership, permissions, and security boundaries.

## Context graph

The graph represents organizations, workspaces, users, contacts, companies, properties, leads, deals, tasks, activities, documents, calendar events, knowledge, memory, recommendations, predictions, events, and analytics. Nodes carry typed identity and optional Universal Object references. Directed or bidirectional edges carry relationship names, weight, confidence, and evidence.

`BrainContextGraphBuilder` creates a graph strictly from supplied Brain context. `InMemoryContextGraphTraverser` supports direction, relationship filters, depth limits, confidence thresholds, paths, and cycle-safe traversal. `ContextGraphStore` is a future graph-storage port; no database adapter exists.

## Goal Engine and business objectives

Goals support business, personal, team, AI, and workflow scopes, along with targets, priority, deadline, dependencies, success and failure criteria, progress, and completion. The deterministic in-memory evaluator marks completion only from explicit criteria.

Business objectives support revenue, response time, conversions, satisfaction, churn, occupancy, manual work, productivity, and arbitrary future objective keys. Example labels in the dashboard are architecture examples, not active company goals. Future KPI integration belongs behind a governed objective source.

## Planning and decisions

Task planning models objective, ordered subtasks, dependencies, parallel or sequential execution, estimates, risk, confidence, approvals, and future retry and rollback. The current planner produces drafts from explicitly supplied goals and marks retry and rollback unavailable.

Decision planning models trees, alternatives, constraints, trade-offs, dependencies, risks, priority matrices, and future simulation. Simulation remains unavailable and no alternative is fabricated.

## Policy Engine and business rules

Policies support business, compliance, security, approval, financial, legal, workspace, and future custom categories. The deterministic evaluator applies explicit conditions and returns allow, deny, or approval requirements with matched policies and explanations.

Business rules are separate from AI and support organization or workspace scope, conditions, outcomes, exceptions, overrides, inheritance, priority, activation, and versioning. `StaticBusinessRuleResolver` applies tenant scope without persistence. A future visual rule builder can produce these definitions without changing the evaluator contract.

## Approval framework

Approvals support auto, manager, owner, legal, finance, executive, and ordered multi-step review. Contracts include escalation targets, expiration, delegation, decision reasons, and audit links. Architecture-generated actions request human approval; nothing is auto-executed.

## Safe action lifecycle

The lifecycle is Observe → Understand → Plan → Evaluate → Policy Check → Approval Check → Execute Placeholder → Verify → Explain → Learn → Store Memory → Audit → Rollback Placeholder.

`SafeActionLifecycle` stops at the execution placeholder. Pending approval and policy denial block the action. Even an allowed action remains non-executable in this release. Future executors must be separate outbound adapters with idempotency, authorization, audit, verification, approval, and rollback guarantees.

## Reflection and learning

Reflection captures expected result, actual result, gap, lesson, improvement, confidence adjustment, and future feedback state. Because no action executes, the default reflection clearly reports that comparison is unavailable.

Learning contracts cover observations, feedback, corrections, preferences, successes, failures, human feedback, and future reinforcement. Candidate records require review; there is no ML or automatic reinforcement. Empty actual outcomes produce no learning record.

## Dashboard

`/vayon/cognitive` visualizes the context graph boundary, goal engine, planners, policies, approvals, decision planning, lifecycle, reflection, learning, and objective catalog. It is responsive, accessible, dark-themed, and contains architecture status only—no fabricated business metrics.

## Future autonomy

Future autonomy requires approved persistence, tenant and object authorization, policy administration, approval identities and delegation, immutable audit, idempotent execution adapters, verification, compensation or rollback, evaluation suites, privacy controls, incident controls, and human override. AI providers, if approved later, remain consumers behind Cognitive Engine ports and never receive unrestricted CRM access.

