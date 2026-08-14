# Vayon CRM Engine

## Architecture

The CRM Engine is an additive module under `features/vayon/crm-engine`. Pages depend on `CrmService`, services depend on the provider-neutral `CrmRepository` contract, and repositories adapt either tenant-scoped Supabase records or the existing Aurora demo fixtures. UI components consume view models and never query Supabase directly.

```text
App Router pages → CRM components → CRM service → repository contract
                                             ↙                 ↘
                              Supabase repository       Aurora repository
```

Production context is obtained through the existing workspace operations context. Every production query retains both organization and workspace boundaries. The module performs no database writes and does not alter authentication, middleware, schema, RLS, global routing behavior, or product-shell navigation.

## Routes

- `/vayon/crm` — CRM command center
- `/vayon/crm/leads` — searchable, filterable, sortable lead table
- `/vayon/crm/leads/[leadId]` — Customer 360 profile
- `/vayon/crm/customers` — relationship-oriented customer directory
- `/vayon/crm/companies` — company directory
- `/vayon/crm/activities` — chronological CRM activity stream

## Customer 360

The profile exposes overview, timeline, property interests, deals, communications, meetings, tasks, documents, and deterministic insight tabs. Suggested outreach and next-best-action content comes from transparent local rules; it makes no external AI call and executes no business action. Communication history is read-only. Empty states explicitly state when compatible live data is unavailable.

## Lead list behavior

Filtering and pagination are server-driven through URL query parameters. Selection and column visibility are local presentation state. CSV export uses only the rows already delivered to the browser and performs no server write. Saved views can be represented as stable query strings; durable per-user persistence is intentionally deferred until an approved schema contract exists.

## Provider model

`SupabaseCrmRepository` is the production adapter and delegates canonical lead mapping to the existing Lead repository. `AuroraCrmRepository` uses the existing demo workspace fixtures without changing them. Company data has an explicit unavailable state in production because the current supported schema does not expose a compatible canonical company repository; no records are fabricated.

## Future integration points

- Durable saved-view preferences through an approved configuration persistence contract.
- Authorized write commands for notes, assignments, and bulk actions.
- Provider-neutral communication actions through the Communication Hub.
- Universal Object and Business Timeline projections as compatible read sources.
- AI-provider enrichment behind the existing Brain/Cognitive contracts, preserving deterministic fallback and explainability.
