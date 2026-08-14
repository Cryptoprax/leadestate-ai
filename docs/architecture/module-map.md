# Module Map

| Module              | Primary responsibility                          | Persistence boundary                     |
| ------------------- | ----------------------------------------------- | ---------------------------------------- |
| Product Shell       | Authenticated navigation and global context     | Browser preferences only                 |
| CRM Engine          | Tenant-scoped customer and sales views          | Existing Supabase repositories           |
| Universal Objects   | Provider-neutral business identities            | Contract/storage adapters                |
| Business Timeline   | Immutable events and projections                | Foundation contracts/local stores        |
| Context Engine      | Read-only context assembly                      | Existing source contracts                |
| AI Workforce        | Operational employee models and advisory tasks  | Existing AI tables/demo adapter          |
| AI Provider layer   | Execute, summarize, recommend, health contracts | Provider implementations                 |
| Workflow Governance | Requests, approvals, lifecycle, audit           | Local repository; durable adapter future |
| Integration Center  | Provider inventory and readiness                | Existing integration contracts           |

Dependencies point from presentation toward domain/service contracts. Business modules must not import provider SDKs or credential storage directly.
