# Coding Standards

## TypeScript first

- New application code is written in TypeScript with strict types.
- Avoid `any`; prefer unknown input plus validation and narrowing.
- Public component and service contracts use exported, intentional types.
- Model domain states explicitly rather than with loosely related booleans.

## Feature-first architecture

- Product behavior lives in the feature that owns it.
- Cross-cutting infrastructure belongs in the platform layer.
- Shared UI stays business-agnostic.
- Import public feature contracts; do not depend on another feature's internals.
- Keep route files focused on composition.

## Reusable components

- Build small primitives with predictable variants and native prop support.
- Prefer composition over deeply configurable all-purpose components.
- Reuse design tokens and established primitives before introducing new styles.
- Do not duplicate behavior, types, constants, or accessibility patterns.

## Accessibility

- Use semantic HTML and preserve keyboard navigation.
- Provide visible focus states, programmatic labels, and meaningful alternative
  text.
- Ensure status and error messages are available to assistive technology.
- Treat WCAG 2.2 AA as the minimum product target.

## Responsive UI

- Design mobile-first and validate common mobile, tablet, laptop, and wide
  desktop layouts.
- Avoid fixed dimensions that cause overflow or truncate essential content.
- Preserve usable touch targets and readable line lengths.

## Business logic

- Do not hardcode tenant-specific policies, plan rules, role checks, workflow
  behavior, or product availability in UI components.
- Keep business rules in typed feature or platform services behind explicit
  contracts.
- Use configuration and governed feature flags only where variability is
  intentional.

## Code quality

- Prefer clear naming and short, single-purpose modules.
- Remove dead code instead of commenting it out.
- Handle errors deliberately; never silently discard failures.
- Add tests proportionate to risk, especially for permissions and tenancy.
- Run TypeScript checks, lint, and a production build before merging.

## Security and privacy

- Never expose secrets in client code or source control.
- Minimize sensitive data in logs and analytics.
- Enforce authorization and tenant isolation at trusted server boundaries.
- Record auditable events for security-sensitive actions.
