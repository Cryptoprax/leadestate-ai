# Coding Standards

## TypeScript first

All application and platform code is TypeScript with strict checking. Avoid
`any`; validate unknown inputs at boundaries. Public contracts use explicit,
exported types and model valid domain states directly.

## Feature-first ownership

Code belongs to the feature or platform capability that owns its behavior.
Routes compose modules and remain thin. Features expose intentional public
contracts and never depend on another feature's internal files.

## Configuration and policy

Do not hardcode tenant names, role checks, pricing, workflow policy, navigation,
module availability, or product variants in components. Use validated
configuration, capability authorization, and governed feature flags.

## Reuse

Do not duplicate domain logic, types, validation, design primitives, or
integration behavior. Extract reuse only when ownership and contract are clear;
avoid generic utility dumping grounds.

## Components

Components are focused, composable, typed, accessible, and responsive. They
support native semantics and states. Business logic stays in feature services,
not shared UI.

## Service boundaries

Services accept explicit actor, tenant, permission, and transaction context.
They validate inputs, enforce invariants and authorization, emit auditable
events, and return stable domain results. Data access is not called directly
from arbitrary UI.

## Error handling

Failures are typed or normalized, safely presented, correlated, and observable.
Never silently catch errors. Retry only known transient operations and preserve
idempotency.

## Security and privacy

Secrets never enter source control, clients, analytics, or logs. Minimize
sensitive data, enforce tenant scope, encode output, validate files, and use
least-privilege integrations.

## Testing

Testing is proportional to risk. Permissions, tenant isolation, billing,
workflow state, AI tools, migrations, and destructive actions require positive,
negative, boundary, and failure coverage.

## Quality gates

Changes pass formatting, lint, strict TypeScript, tests, accessibility checks
where relevant, production build, security checks, and review. Public contract
changes include documentation and migration guidance.

## Documentation

Significant architecture choices use Architecture Decision Records. Modules
document ownership, contracts, permissions, events, data, configuration,
observability, failure modes, and lifecycle.
