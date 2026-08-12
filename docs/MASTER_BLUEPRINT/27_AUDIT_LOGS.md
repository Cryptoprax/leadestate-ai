# Audit Logs

## Purpose

Audit logs provide durable evidence of who or what performed a significant
action, under which tenant and authority, against which resource, and with what
outcome. They support security, compliance, customer trust, investigations, and
operational accountability.

## Event schema

An audit event contains:

- unique event and correlation identifiers
- event type and schema version
- occurred and recorded timestamps
- actor type, actor ID, session or service identity
- product, organization, and impersonation context
- action, target type, and target ID
- outcome and policy decision
- reason, approval, or ticket reference where required
- privacy-safe source and device context
- structured before/after change summary where appropriate
- integrity and retention metadata

## Event coverage

Required events include authentication changes, membership and role changes,
permission decisions for sensitive actions, organization lifecycle,
impersonation, exports, configuration publication, feature flags, module
installation, billing adjustments, AI tool actions, workflow administration,
security events, and data deletion.

## Integrity

Audit records are append-only to application users and administrators.
Correction creates a related event rather than mutation. Storage, access, and
export preserve ordering, integrity evidence, and retention policy.

## Access

Organization administrators see approved tenant events. Platform operators see
only events required by their role. Sensitive values are redacted; audit access
and export are themselves audited.

## Search and export

Search supports time, actor, tenant, event, target, outcome, risk, correlation,
and impersonation filters. Exports are permission-controlled, purpose-recorded,
watermarked where appropriate, encrypted, expiring, and rate-limited.

## Retention

Retention depends on event class, contract, jurisdiction, and legal hold.
Operational logs and audit logs have separate policies; an application log is
not a substitute for audit evidence.

## Monitoring

High-risk event patterns generate security detections, including repeated
denials, unusual privilege changes, bulk exports, cross-tenant operations,
impersonation abuse, and emergency-control use.
