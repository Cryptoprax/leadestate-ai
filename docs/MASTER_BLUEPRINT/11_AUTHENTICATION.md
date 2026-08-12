# Authentication

## Scope

Authentication proves identity; it does not determine organization access or
business permissions. AtlasOS will support human users, service identities,
integrations, and approved partner applications through separate credential
profiles.

## Human authentication

The target capability set includes secure password authentication, passwordless
methods, verified email, multi-factor authentication, enterprise single sign-on,
and recovery flows. Methods are enabled by product, organization policy, user
risk, and platform availability.

## Session lifecycle

Sessions have opaque identifiers, secure cookie transport, creation and expiry
timestamps, device and risk metadata, assurance level, and revocation state.
Rotation, inactivity limits, absolute lifetime, and concurrent-session policy
are centrally governed. Sensitive actions can require recent step-up
verification.

## Enterprise identity

Future enterprise support includes OIDC and SAML federation, domain discovery,
enforced SSO, just-in-time membership under strict rules, and directory
provisioning. Account linking prevents duplicate identities and requires
verified ownership.

## Recovery

Recovery uses short-lived, single-use tokens and never reveals whether an
untrusted identifier exists. High-risk recovery may revoke active sessions,
require additional verification, notify the user, and create a security event.
Support staff cannot view or set user secrets.

## Machine authentication

API clients and service identities use scoped, rotatable credentials with named
owners, environments, expiration, last-used metadata, and revocation. Long-lived
shared secrets are avoided where stronger workload identity is available.

## Abuse protection

Authentication endpoints apply rate limiting, anomaly detection, replay
protection, bot controls where appropriate, safe error messages, and alerting.
Credential values and authentication tokens are never logged.

## Audit events

Successful and failed sign-in, MFA enrollment and removal, recovery, credential
change, federation events, session creation and revocation, risk challenges, and
administrator interventions are recorded with privacy-safe context.
