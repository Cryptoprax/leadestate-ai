# AI Platform

## Purpose

The AI Platform provides governed intelligence across AtlasOS products. AI is
treated as an operational workforce with identities, permissions, tools,
budgets, evaluations, and accountable human owners—not as an unbounded chat
feature.

## Core services

- model and provider gateway
- prompt and policy registry
- tool registry and execution controls
- knowledge ingestion and retrieval
- memory services
- task orchestration and human handoff
- evaluation, experimentation, and quality gates
- usage metering, budgets, and cost allocation
- safety, privacy, redaction, and incident controls
- monitoring for latency, availability, outcome, and drift

## Provider strategy

Provider adapters normalize approved capabilities while exposing model-specific
limits honestly. Routing considers task, quality, latency, region, privacy,
availability, and cost. Fallback must not silently use a provider or region
outside policy.

## Knowledge and memory

Knowledge sources retain tenant, module, classification, ownership, permission,
version, and freshness metadata. Retrieval enforces the requesting AI employee's
effective permissions. Memory types—task, conversation, user preference,
organization, and durable operational memory—have explicit retention and
deletion policies.

## Tool execution

Tools are typed platform actions with permission requirements, input validation,
rate limits, idempotency, audit behavior, and risk classification. Sensitive or
irreversible actions require confirmation or human approval. Model-generated
text is never executed as unrestricted code.

## Quality governance

Each task class has curated evaluation sets, success criteria, safety checks,
cost and latency budgets, regression thresholds, and an accountable owner.
Production feedback is sampled safely and never becomes training data without
approved policy.

## Human oversight

AI discloses its role where appropriate, communicates uncertainty, cites
approved sources when required, and escalates on policy, confidence, sentiment,
or customer request. Humans can inspect decisions, correct outcomes, pause an AI
employee, and revoke tools immediately.

## Observability

Metrics include task success, escalation, correction, latency, provider error,
token and tool usage, cost, safety incidents, permission denials, retrieval
quality, and customer outcome. Content logging is minimized and policy-bound.
