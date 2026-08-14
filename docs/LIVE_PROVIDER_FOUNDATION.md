# Live Provider Foundation

## Purpose

The Live Provider Foundation prepares Vayon OS to onboard WhatsApp Cloud, Google Calendar, Gmail, Microsoft Outlook, and Microsoft 365. It is an additive integration control-plane layer. It does not enable business operations or replace the existing Integration Platform.

## Architecture

```text
Provider routes
  -> readiness view models
    -> ProviderReadinessService
      -> LiveProviderConnectionRepository
        -> existing CredentialReference abstraction

Provider catalog
  -> authorization metadata
  -> required scopes
  -> disabled capability descriptors

OAuthStateService
  -> state digest
  -> PKCE challenge
  -> nonce digest
  -> trusted return path
  -> ten-minute expiry
  -> one-time consumption contract
```

The repository defaults to `ReferenceOnlyLiveProviderRepository`. It reports an explicit disconnected state and never stores credentials. A future workspace-scoped repository may return masked references through the existing `CredentialReference` contract without changing pages or provider definitions.

## Connection wizard

The wizard has Review, Authorize, and Validate stages. In this release it is a local explanatory UI: OAuth launch and completion are disabled. This makes readiness boundaries visible without creating a deceptive connection state.

Connection states are connected, disconnected, expired, pending, and validation failed. Authorization is tracked independently because a connection can exist while its grant is expired or invalid.

## OAuth state model

The OAuth state contract includes provider, workspace, trusted return path, SHA-256 state digest, PKCE code challenge, nonce digest, creation and expiry timestamps, consumption timestamp, and schema version. Raw state, verifier, nonce, access tokens, refresh tokens, and client secrets are not retained in the model.

Future OAuth actions must store state server-side, bind it to the authenticated workspace, compare state in constant time, mark it consumed atomically, validate the provider response, and write only encrypted credentials through an approved credential vault.

## Capability discovery

Capabilities are descriptive and immutable. Every capability is disabled in this release, including read operations, message or email delivery, meeting/calendar mutation, and tenant operations. Capability discovery therefore communicates future provider support without granting execution authority.

## Sandbox validation and health

Sandbox validation is deterministic and local. It checks only whether an opaque credential reference and valid connection state exist. It reports `externalRequestMade: false`.

Health exposes state, latency, authorization, last validation, and a human-readable explanation. Latency remains `null` until an explicitly authorized sandbox probe exists; the UI renders this as “Not measured” rather than fabricating a value.

## Diagnostics and credential safety

Diagnostics expose provider version, declared scopes, disabled capabilities, connection state, and validation issues. They never expose secrets or credential payloads. The UI can show only `CredentialReference.maskedLabel` when a future repository supplies it.

## Governance boundary

This module has no execution adapter and no provider gateway. It cannot:

- send WhatsApp messages or email;
- read production mail;
- create meetings or modify calendars;
- dispatch or execute workflows;
- call Google, Microsoft, or Meta endpoints;
- write database records or credentials.

Future activation must preserve approval policy enforcement, audit emission, tenant isolation, least-privilege incremental authorization, explicit sandbox-to-production promotion, revocation, rotation, and rate-limit controls.

## Routes

- `/vayon/providers` — readiness inventory.
- `/vayon/providers/[provider]` — connection wizard, scopes, capability status, health, and diagnostics.
