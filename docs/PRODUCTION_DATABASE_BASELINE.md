# Production database baseline

The Sprint 22 production baseline is [`supabase/migrations/20260813000000_sprint22_production_baseline.sql`](../supabase/migrations/20260813000000_sprint22_production_baseline.sql). It consolidates all 14 SQL files in `/database`, in dependency order, for a brand-new Supabase project. The historical files were audited but not modified.

No migration was applied and no SQL in the baseline was executed while preparing it.

## Schema summary

| Object | Count |
| --- | ---: |
| Extensions | 1 (`pgcrypto`) |
| PostgreSQL enum types | 0 |
| Public tables | 75 |
| Explicit indexes | 38 |
| Foreign-key references | 256 |
| Check constraints | 70 |
| Functions | 82 |
| Trigger functions | 4 |
| Non-trigger public functions / RPC surface | 78 |
| Triggers | 4 |
| RLS-enabled public tables | 75 of 75 |
| Policies | 75 (71 public-table policies and 4 storage policies) |
| Storage buckets | 1 |

The schema covers authentication and onboarding, property and lead CRM, deal management, operations, communications, AI workforce and runtime, billing, provider integrations, notifications, WhatsApp, AtlasOS customer success and support, feature flags, releases, platform operations, and the Sprint 22 demo experience.

The historical domain model uses text columns plus check constraints rather than PostgreSQL enum types. The baseline preserves that model and does not introduce replacement enum types.

## RLS coverage

RLS is enabled on every public table (75/75). Seventy-one public tables have one or more explicit policies. The following four tables intentionally have RLS enabled with no direct client policy and are accessed through security-definer/service workflows:

- `google_oauth_credentials`
- `notification_queue`
- `subscription_events`
- `provider_webhook_events`

Four additional policies protect `storage.objects` for authenticated read, insert, update, and delete access scoped by organization/workspace folder paths.

## Storage

| Bucket | Public | Size limit | Allowed MIME types |
| --- | --- | ---: | --- |
| `leadestate-assets` | No | 20 MiB | JPEG, PNG, WebP, AVIF, PDF |

Object paths are expected to begin with `<organization_id>/<workspace_id>/`. Storage policies validate membership against those two path segments.

## Triggers

| Trigger | Table | Function |
| --- | --- | --- |
| `provision_ai_workforce_after_workspace` | `public.workspaces` | `public.provision_ai_workforce_on_workspace()` |
| `provision_billing_after_workspace` | `public.workspaces` | `public.provision_billing_on_workspace()` |
| `provision_integrations_after_workspace` | `public.workspaces` | `public.provision_integrations_on_workspace()` |
| `enrich_demo_after_generation` | `public.demo_organizations` | `public.enrich_demo_workspace()` |

## RPC inventory

The inventory below lists the 78 non-trigger functions in the public schema. Exposure is still governed by the `REVOKE`/`GRANT` statements in the migration and by function-level authorization checks.

- Foundation and authorization: `is_organization_member`, `complete_organization_onboarding`, `current_workspace_role`, `can_manage_deal`, `can_use_operations`, `can_use_communications`, `can_govern_ai`, `can_manage_billing`, `can_manage_integrations`, `is_platform_staff`, `is_super_admin`
- Properties: `create_property`, `update_property`, `archive_properties`
- Leads: `create_lead`, `update_lead`, `assign_leads`, `change_lead_status`, `archive_leads`
- Deals: `create_deal`, `update_deal`, `move_deal_stage`, `archive_deal`, `create_offer`, `create_payment`, `create_commission`, `create_visit`
- Operations: `create_operation_task`, `update_operation_task`, `complete_operation_task`, `archive_operation_task`, `schedule_operation_meeting`, `schedule_operation_visit`
- Communications: `ensure_communication_thread`, `create_call_log`, `create_follow_up`, `complete_follow_up`, `add_communication_note`, `archive_communication_thread`
- AI: `provision_ai_workforce`, `create_ai_knowledge`, `decide_ai_approval`, `archive_ai_recommendation`, `store_ai_runtime_output`
- Billing: `provision_workspace_billing`, `change_subscription_plan`, `cancel_subscription`, `update_billing_contact`, `generate_draft_invoice`, `check_subscription_limit`, `process_stripe_event`
- Integrations: `provision_workspace_integrations`, `set_integration_enabled`, `rotate_integration_secret_metadata`, `replay_integration_webhook`, `retry_integration_sync`, `archive_integration_log`, `get_google_credential`, `upsert_google_credential`, `refresh_google_credential`
- AtlasOS and customer success: `platform_customer_directory`, `platform_audit`, `request_support_session`, `approve_support_session`, `end_support_session`, `create_platform_feature_flag`, `assign_platform_feature_flag`, `publish_platform_release`, `archive_platform_release`, `add_customer_health_note`
- WhatsApp, notifications, and commercial operations: `connect_whatsapp`, `disconnect_whatsapp`, `get_whatsapp_delivery_credential`, `process_whatsapp_message`, `process_whatsapp_status`, `enqueue_notification`, `dismiss_notification`
- Demo experience: `generate_demo_organization`

The four trigger functions excluded from that list are `provision_ai_workforce_on_workspace`, `provision_billing_on_workspace`, `provision_integrations_on_workspace`, and `enrich_demo_workspace`.

## Seeded catalogs

Only catalog data already present in the audited Sprint 22 SQL history is retained:

| Catalog | Rows / behavior |
| --- | --- |
| `roles` | 7 roles: super admin, organization owner/admin, branch manager, sales manager, agent, viewer |
| `deal_stages` | 14 ordered stages from new lead through completed/lost/support |
| `subscription_plans` | 4 plans: starter, professional, business, enterprise |
| `integration_providers` | 11 providers, including active and future provider metadata |
| `countries` | Idempotently derives entries from existing organizations; produces no rows on a brand-new empty project |

AI capabilities, workforce records, billing subscriptions, and integration connections are provisioned by the existing workspace triggers. The demo records embedded in Sprint 22 are created only when the existing demo-generation RPC is explicitly called; the baseline itself does not create a demo organization.

## Audit and ordering notes

- Source order is `001_sprint8_auth_onboarding.sql` through `014_sprint22_demo_experience.sql`.
- All 75 table definitions precede their foreign-key dependants according to a static reference-order check.
- Every trigger target and trigger function resolves in the baseline.
- Every policy target resolves either to a baseline public table or Supabase's existing `storage.objects` table.
- Sprint 21 contained literal `` `r`n `` text after its header. The baseline converts that corruption to a real newline so its first `ALTER TABLE` can parse. The historical source file remains unchanged.
- SQL compilation was verified statically only, because the preparation requirement explicitly forbids executing SQL. A disposable-project `supabase db reset` is therefore a required pre-production validation step.

## Manual deployment checklist

1. Confirm the target Supabase project is brand new and contains no prior LeadEstate AI tables or migration history.
2. Review the baseline diff and the warning about the repaired Sprint 21 newline corruption.
3. In an isolated disposable Supabase project, run a full reset with this baseline and inspect function, policy, trigger, and seed creation. Do not use the production project for this rehearsal.
4. Run Supabase database linting against the disposable project and review security-definer function search paths and function execute grants.
5. Confirm Auth, `authenticated`, `service_role`, Storage, and required Supabase-managed schemas are available.
6. Confirm application secrets and provider credentials are configured outside the migration; no secrets are seeded by this baseline.
7. Back up/export any production project state if the target is no longer truly empty.
8. Link the CLI to the intended project, verify the project reference twice, and inspect the pending migration list.
9. Apply the single baseline during an approved deployment window.
10. Smoke-test onboarding, workspace provisioning, CRM, AI approval flows, billing, integrations, notifications, storage access, AtlasOS, and explicit demo generation.
11. Record the deployed migration version; add every later schema change as a new file under `/supabase/migrations`.
