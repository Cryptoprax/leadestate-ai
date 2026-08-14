# Sprint 28 — Integration Platform

## Overview

The Vayon Integration Platform is a provider-neutral deterministic control plane composed beneath the existing Integration Center. It introduces no live API calls, production credentials, database changes, or provider-specific business logic.

```text
Integration Center UI
  → Provider Status ViewModel
    → Integration Platform Service
      → Integration Manager
        → Provider Registry
          → IntegrationProvider contracts
            → deterministic adapters
```

## Provider contract

Every provider exposes `connect`, `disconnect`, `health`, `capabilities`, `validate`, and `execute`. WhatsApp, Gmail, Google Calendar, Outlook, Twilio, Stripe, OpenAI, Claude, and Gemini are registered through the same deterministic adapter implementation with provider-specific capability declarations.

`execute` performs a local simulation only. Requests without an approval ID are blocked. Results always carry `externalRequestMade: false`. Future adapters can implement the contract without changing CRM, Workforce, Workflow Governance, or other business modules.

## Integration Manager

The manager resolves providers, validates connections, manages deterministic connection state, discovers capabilities, aggregates health, applies rate limits, dispatches simulations, and appends lifecycle audit entries. It does not own credentials or business workflows.

## Connections and credentials

Connection state is stored in an in-memory repository and disappears when the process restarts. This is intentional until durable tenant-scoped persistence is approved.

`CredentialVault` stores references rather than secret values. The Sprint 28 vault rejects every credential kind except `none`; therefore production tokens, API keys, and OAuth credentials cannot enter this framework.

## Reliability contracts

The retry policy declares maximum attempts, delay bounds, exponential or fixed backoff, and retryable codes. The deterministic retry service retries only declared transient codes. Rate limiting uses a workspace-scoped token contract and exposes allowed, remaining, and retry-after decisions.

Future production implementations must use a distributed counter, idempotency store, jittered backoff, provider quota headers, circuit breaking, and observability.

## Audit integration

Connect, disconnect, and execution simulation events record provider, workspace, actor, correlation ID, timestamp, and safe metadata. Credentials and provider payloads are never written to audit metadata.

## Future provider registration

Implement `IntegrationProvider`, declare capabilities and approval requirements, then register the adapter with `ProviderRegistry`. Duplicate IDs fail closed. Production registration must remain disabled until authorization, credential storage, rate limits, retries, health validation, tenant isolation, auditing, and human approval are certified.

## Sprint completion

- Integration Manager: complete
- Provider Registry and future registration: complete
- Provider contracts and capability discovery: complete
- Deterministic health and validation: complete
- Connection management: complete, local only
- Credential abstraction: complete, references only
- Provider status dashboard: integrated into the existing Integration Center
- Audit integration: complete
- Retry and rate-limit contracts: complete
- Nine deterministic provider adapters: complete
- Live APIs and production credentials: intentionally absent
