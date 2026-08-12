# Integration Model

IntegrationConnection binds an organization/workspace to a provider capability with status, configuration references, consent, scopes, health, and ownership. Credentials never enter domain contracts. ExternalIdentity maps internal entities to provider identifiers. WebhookReceipt provides replay/idempotency evidence. SyncCursor tracks progress.

Lifecycle: Requested → Configured → Verifying → Active → Degraded/Suspended → Revoked. Adapters translate provider payloads to canonical commands/events and isolate rate limits, retries, signatures, and schema drift.
