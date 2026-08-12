# User Management

## Identity model

A user is a global AtlasOS identity; access to tenant data is granted through
organization memberships. Identity, profile, membership, credentials, sessions,
and permissions are separate concerns with distinct lifecycle and audit rules.

## User lifecycle

Supported states include invited, active, locked, recovery required, disabled,
and deleted. State transitions are explicit and do not silently remove
membership or historical attribution. Deletion follows privacy, legal,
financial, and audit-retention requirements.

## Invitations and onboarding

Invitations specify organization, intended roles, hierarchy scope, inviter,
expiry, and one-time acceptance state. Acceptance verifies the intended
identity, records policy consent, establishes membership, and cannot grant more
authority than the inviter may delegate.

## Profiles

Profiles contain name, preferred language, timezone, contact details, avatar,
accessibility preferences, and notification preferences. Sensitive attributes
are minimized, purpose-limited, and visibility-controlled.

## Membership administration

Authorized administrators can invite, resend, revoke, activate, suspend, and
remove memberships; assign approved roles; and scope users to hierarchy nodes.
Bulk actions require validation previews and per-item outcomes.

## Sessions and devices

Users can review and revoke their active sessions. Authorized security operators
can investigate session metadata and revoke sessions without viewing secrets.
Risk signals may trigger step-up verification or global revocation.

## Service identities

Automations, integrations, and AI employees use explicit non-human identities.
They have owners, purpose, scoped permissions, credential lifecycle, usage
limits, and audit attribution. Shared human accounts are prohibited.

## Privacy and support

User search and support tools expose only necessary fields. Impersonation is
time-bound, disclosed, purpose-recorded, and auditable. Data export and erasure
requests follow verified workflows and preserve legally required records.
