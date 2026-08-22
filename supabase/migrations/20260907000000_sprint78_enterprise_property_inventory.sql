-- Sprint 78: tenant-scoped property projects, towers, units, pricing, media and CRM reservation history.
create table if not exists public.property_projects (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id),
  code text not null, name text not null, developer text not null, status text not null check(status in('upcoming','launching','active','sold-out','completed')),
  description text not null default'', address text not null, city text not null, state text not null, country text not null, zip_code text not null,
  latitude numeric, longitude numeric, launch_date date, possession_date date, project_type text not null, cover_image text, gallery jsonb not null default'[]',
  assigned_sales_team text[] not null default'{}', construction_progress numeric not null default 0 check(construction_progress between 0 and 100),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(workspace_id,code)
);
create table if not exists public.property_towers (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), project_id uuid not null references public.property_projects(id) on delete cascade,
  name text not null, floors integer not null check(floors>0), total_units integer not null check(total_units>=0), status text not null, construction_progress numeric not null default 0 check(construction_progress between 0 and 100), notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(project_id,name)
);
create table if not exists public.property_units (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), project_id uuid not null references public.property_projects(id) on delete cascade, tower_id uuid not null references public.property_towers(id) on delete cascade,
  unit_number text not null, floor integer not null, bhk_type text not null, bedrooms integer not null default 0, bathrooms integer not null default 0, area numeric not null check(area>0), area_unit text not null check(area_unit in('sqft','sqm')), balcony boolean not null default false, parking integer not null default 0, facing text, view_name text,
  price numeric not null check(price>=0), offer_price numeric check(offer_price>=0), booking_amount numeric not null default 0 check(booking_amount>=0), currency char(3) not null, status text not null check(status in('available','reserved','booked','sold','blocked','cancelled')), buyer_id uuid,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(tower_id,unit_number)
);
create table if not exists public.property_price_revisions (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), project_id uuid not null references public.property_projects(id) on delete cascade, unit_id uuid references public.property_units(id) on delete cascade,
  effective_from date not null, base_price numeric not null check(base_price>=0), offer_price numeric check(offer_price>=0), currency char(3) not null, discount_rule text, override_approval_id uuid,
  created_by uuid not null default auth.uid(), created_at timestamptz not null default now()
);
create table if not exists public.property_documents (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), project_id uuid not null references public.property_projects(id) on delete cascade,
  title text not null, kind text not null check(kind in('floor-plan','master-plan','brochure','elevation','construction','image','video')), storage_path text, placeholder boolean not null default false,
  created_by uuid not null default auth.uid(), created_at timestamptz not null default now()
);
create table if not exists public.property_inventory_audit (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), project_id uuid not null references public.property_projects(id), unit_id uuid references public.property_units(id),
  action text not null, actor_id uuid default auth.uid(), actor_label text not null, metadata jsonb not null default'{}', occurred_at timestamptz not null default now()
);
create table if not exists public.property_inventory_opportunity_requests (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id), workspace_id uuid not null references public.workspaces(id), project_id uuid not null references public.property_projects(id), unit_id uuid not null references public.property_units(id), buyer_id uuid not null,
  status text not null default'pending' check(status in('pending','completed','cancelled')), created_by uuid not null default auth.uid(), created_at timestamptz not null default now()
);

create index if not exists property_projects_search_idx on public.property_projects(workspace_id,city,status,developer);
create index if not exists property_towers_project_idx on public.property_towers(workspace_id,project_id);
create index if not exists property_units_inventory_idx on public.property_units(workspace_id,project_id,tower_id,status,bhk_type,price,area);
create index if not exists property_price_history_idx on public.property_price_revisions(workspace_id,project_id,unit_id,effective_from desc);
create index if not exists property_documents_project_idx on public.property_documents(workspace_id,project_id,kind);
create index if not exists property_inventory_audit_idx on public.property_inventory_audit(workspace_id,project_id,occurred_at desc);

create or replace function public.inventory_workspace_member(p_organization_id uuid,p_workspace_id uuid) returns boolean language sql stable security definer set search_path=public as $$select public.is_organization_member(p_organization_id) and exists(select 1 from public.workspace_members wm where wm.workspace_id=p_workspace_id and wm.organization_id=p_organization_id and wm.user_id=auth.uid() and wm.status='active')$$;
create or replace function public.inventory_can_write(p_organization_id uuid,p_workspace_id uuid) returns boolean language sql stable security definer set search_path=public as $$select public.inventory_workspace_member(p_organization_id,p_workspace_id) and exists(select 1 from public.organization_members om left join public.roles r on r.id=om.role_id where om.organization_id=p_organization_id and om.user_id=auth.uid() and om.status='active' and r.code in('organization_owner','organization_admin','administrator','sales_manager','sales_agent','project_manager'))$$;

alter table public.property_projects enable row level security; alter table public.property_towers enable row level security; alter table public.property_units enable row level security; alter table public.property_price_revisions enable row level security; alter table public.property_documents enable row level security; alter table public.property_inventory_audit enable row level security; alter table public.property_inventory_opportunity_requests enable row level security;
do $$declare t text;begin foreach t in array array['property_projects','property_towers','property_units','property_price_revisions','property_documents','property_inventory_audit','property_inventory_opportunity_requests'] loop execute format('drop policy if exists %I on public.%I',t||'_select',t);execute format('create policy %I on public.%I for select to authenticated using(public.inventory_workspace_member(organization_id,workspace_id))',t||'_select',t);execute format('drop policy if exists %I on public.%I',t||'_insert',t);execute format('create policy %I on public.%I for insert to authenticated with check(public.inventory_can_write(organization_id,workspace_id))',t||'_insert',t);execute format('drop policy if exists %I on public.%I',t||'_update',t);execute format('create policy %I on public.%I for update to authenticated using(public.inventory_can_write(organization_id,workspace_id)) with check(public.inventory_can_write(organization_id,workspace_id))',t||'_update',t);execute format('drop policy if exists %I on public.%I',t||'_delete',t);execute format('create policy %I on public.%I for delete to authenticated using(public.inventory_can_write(organization_id,workspace_id))',t||'_delete',t);end loop;end$$;

create or replace function public.transition_property_unit(p_workspace_id uuid,p_unit_id uuid,p_expected_status text,p_next_status text,p_buyer_id uuid default null,p_create_opportunity boolean default false) returns void language plpgsql security definer set search_path=public as $$
declare v_org uuid:=public.enterprise_org_context(p_workspace_id);v_project uuid;v_current text;
begin
  if not public.inventory_can_write(v_org,p_workspace_id) then raise exception'not authorized';end if;
  if p_next_status not in('available','reserved','booked') then raise exception'invalid transition';end if;
  if p_next_status='booked' and p_buyer_id is null then raise exception'buyer required';end if;
  select project_id,status into v_project,v_current from property_units where id=p_unit_id and organization_id=v_org and workspace_id=p_workspace_id for update;
  if v_current is null or v_current<>p_expected_status then raise exception'inventory changed; refresh and retry';end if;
  if not ((v_current='available' and p_next_status='reserved') or (v_current='reserved' and p_next_status in('available','booked'))) then raise exception'invalid inventory lifecycle transition';end if;
  update property_units set status=p_next_status,buyer_id=case when p_next_status='available' then null else p_buyer_id end,updated_at=now() where id=p_unit_id;
  insert into property_inventory_audit(organization_id,workspace_id,project_id,unit_id,action,actor_label,metadata) values(v_org,p_workspace_id,v_project,p_unit_id,'inventory.'||p_next_status,'Authorized user',jsonb_build_object('previous_status',v_current,'buyer_id',p_buyer_id));
  if p_create_opportunity and p_buyer_id is not null then insert into property_inventory_opportunity_requests(organization_id,workspace_id,project_id,unit_id,buyer_id)values(v_org,p_workspace_id,v_project,p_unit_id,p_buyer_id);end if;
end$$;
revoke all on function public.transition_property_unit(uuid,uuid,text,text,uuid,boolean) from public; grant execute on function public.transition_property_unit(uuid,uuid,text,text,uuid,boolean) to authenticated;
