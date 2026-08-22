-- Sprint 84.1: promote Marketing Studio to a subscription-licensed production feature.
alter table public.workspace_feature_licenses
  drop constraint if exists workspace_feature_licenses_feature_check;

insert into public.workspace_feature_licenses(
  organization_id, workspace_id, feature, enabled, source, starts_at, ends_at, updated_by, updated_at
)
select organization_id, workspace_id, 'marketing_studio', enabled, source, starts_at, ends_at, updated_by, updated_at
from public.workspace_feature_licenses
where feature = 'creative_studio_beta'
on conflict (workspace_id, feature) do update set
  enabled = excluded.enabled,
  source = excluded.source,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  updated_by = excluded.updated_by,
  updated_at = excluded.updated_at;

delete from public.workspace_feature_licenses where feature = 'creative_studio_beta';

alter table public.workspace_feature_licenses
  add constraint workspace_feature_licenses_feature_check
  check(feature in('marketing_studio','growth_studio','ai_workforce','property_matching','communications','inventory','reports'));
