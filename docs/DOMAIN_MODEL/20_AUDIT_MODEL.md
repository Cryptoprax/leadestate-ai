# Audit Model

AuditEvent is append-only compliance evidence containing tenant, actor/type, subject, action, time, correlation/causation, reason, field-level changes, source, and metadata. Sensitive values are redacted or classified.

Audit differs from activity and telemetry. Retention policies are jurisdictional and event-specific. Legal hold overrides deletion. Access to audit data is itself audited. Clock, actor attribution, integrity, export, and chain-of-custody requirements are implementation concerns.
