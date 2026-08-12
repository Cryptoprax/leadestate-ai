# Super Admin

## Purpose

Super Admin is a privileged platform role for authorized AtlasOS operators. It
is not an organization role and cannot be granted by tenant administrators. Its
capabilities are exposed through Mission Control and protected by least
privilege, strong authentication, step-up verification, and immutable auditing.

## Organization capabilities

- Create organizations with region, product, plan, owner, and baseline policy.
- Suspend organizations while preserving data, communicating impact, and
  supporting controlled restoration.
- Delete organizations only through a reviewed retention and purge workflow.
- Impersonate an organization context for support diagnosis.
- Inspect configuration, modules, usage, health, incidents, and data residency.

## User and session capabilities

- Search identities and organization memberships.
- Impersonate users in time-bound, visibly marked sessions with reason capture.
- View live sessions and revoke compromised or obsolete sessions.
- Lock, restore, or require credential recovery for accounts under policy.
- Review authentication, membership, and authorization history.

## Governance capabilities

- View and export audit logs under privacy and retention rules.
- Manage feature flags, targeting, owners, rollout, expiry, and emergency stops.
- Manage platform permission definitions and standard role templates.
- Manage integrations, credentials metadata, scopes, and operational state.
- Manage modules, compatibility, rollout, suspension, and deprecation.
- Manage workflows, execution controls, failure queues, and emergency pauses.

## Commercial capabilities

- Manage pricing catalogs, products, plans, add-ons, meters, and effective dates.
- Manage subscriptions, entitlements, credits, trials, invoices, and exceptions.
- Review revenue, usage, payment failures, and margin signals.

## AI and marketing capabilities

- Manage AI providers, models, policies, budgets, tools, evaluations, and
  incident controls.
- Manage global marketing sites, content governance, tracking configuration,
  campaigns, consent standards, and brand portfolios.

## Safety controls

Every privileged action records operator, reason, target, before and after
state, approval where required, timestamp, source, and outcome. High-risk actions
require step-up verification and may require dual control. Operators receive
scoped roles—Support, Finance, Marketing, Security, or Platform Admin—instead of
universal access by default.
