# Organization Model

**Aggregate:** Organization. It represents one contracting tenant and legal/account boundary. It owns status, locale defaults, subscriptions, workspaces, branches, departments, teams, employees, policies, and integrations.

Organization 1→* Workspace; Organization 1→* Branch; Branch 0→* Department; Department 0→* Team; Team *↔* Employee. Employees reference an external identity and may hold different roles per workspace.

Statuses are configurable: active, suspended, archived. Suspension prevents operational work but preserves evidence. Archival is non-destructive.

Global fields use ISO country, currency and language codes and IANA timezones. Legal entities, tax registrations, data regions, brands, and operating branches are extensions, not identity duplication.
