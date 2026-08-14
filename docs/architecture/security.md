# Security Architecture

Security boundaries are tenant-first and deny by default.

- Authentication, session refresh, OAuth, and middleware remain centralized.
- Server secrets and provider credentials never enter client components.
- Repository reads require organization and workspace scope.
- RLS remains the database enforcement boundary.
- AI recommendations are non-executable.
- Every executable action requires an approval policy.
- Self-approval is prohibited.
- Execution adapters are disabled or non-executable until separately certified.
- Audit records exclude credentials and sensitive provider payloads.

Future durable workflow storage must add RLS, immutable audit append semantics, idempotency keys, trusted-origin checks, rate-limit boundaries, structured security logging, and retention controls.
