import { MailPlus, Search, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/features/platform/design-system";
import { operationsContext } from "@/features/vayon/operations/services/context";
import { inviteTeamMemberAction } from "@/features/identity-workspace/actions/settings.actions";

type Role = { code: string; name: string } | null;
type MemberRow = {
  user_id: string;
  status: string;
  created_at: string;
  roles: Role;
};
type InvitationRow = {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
  expires_at: string;
  roles: Role;
};

const managementRoles = new Set([
  "organization_owner",
  "organization_admin",
]);

function statusBadge(status: string) {
  const normalized = status.toLowerCase();
  const variants: Record<string, BadgeVariant> = {
    active: "success",
    pending: "warning",
    suspended: "neutral",
  };
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return (
    <Badge variant={variants[normalized] ?? "neutral"} withDot>
      {label}
    </Badge>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "TM";
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string;error?:string;success?:string }>;
}) {
  const [queryParams, context] = await Promise.all([
    searchParams,
    operationsContext(),
  ]);
  const {search=""}=queryParams;
  const { client, organizationId, workspaceId } = context;
  const {
    data: { user },
  } = await client.auth.getUser();

  const [membersResult, invitationsResult, rolesResult, currentMembershipResult] =
    await Promise.all([
      client
        .from("workspace_members")
        .select("user_id,status,created_at,roles(code,name)")
        .eq("organization_id", organizationId)
        .eq("workspace_id", workspaceId)
        .order("created_at"),
      client
        .from("invitations")
        .select("id,name,email,status,created_at,expires_at,roles(code,name)")
        .eq("organization_id", organizationId)
        .eq("workspace_id", workspaceId)
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
      client
        .from("roles")
        .select("code,name,scope")
        .neq("code", "super_admin")
        .order("name"),
      user
        ? client
            .from("workspace_members")
            .select("roles(code)")
            .eq("workspace_id", workspaceId)
            .eq("user_id", user.id)
            .eq("status", "active")
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);

  for (const result of [membersResult, invitationsResult, rolesResult]) {
    if (result.error) throw result.error;
  }
  if (currentMembershipResult.error) throw currentMembershipResult.error;

  const members = (membersResult.data ?? []) as unknown as MemberRow[];
  const invitations = (invitationsResult.data ?? []) as unknown as InvitationRow[];
  const currentRole = (
    currentMembershipResult.data as unknown as { roles: { code: string } | null } | null
  )?.roles?.code;
  const canManage = managementRoles.has(currentRole ?? "");
  const query = search.trim().toLowerCase();
  const filteredMembers = members.filter((member) => {
    if (!query) return true;
    const isCurrent = member.user_id === user?.id;
    const name = isCurrent
      ? String(user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "")
      : "team member";
    const email = isCurrent ? user?.email ?? "" : "";
    return [name, email, member.roles?.name, member.status].some((value) =>
      value?.toLowerCase().includes(query),
    );
  });

  return (
    <main className="mx-auto max-w-[96rem] px-5 py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-vds-primary">
            Workspace access
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Team Management</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-vds-muted">
            Manage workspace members, invitations, and role assignments from one secure view.
          </p>
        </div>
        {canManage ? <ButtonLink href="#pending-invitations"><UserPlus className="size-4" />Invite Member</ButtonLink> : <span aria-disabled="true" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-vds-border bg-vds-elevated px-5 text-sm font-semibold text-vds-muted"><UserPlus className="size-4" />Invite Member</span>}
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card variant="glass" className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-2xl bg-vds-primary-soft text-vds-primary">
            <Users className="size-5" />
          </span>
          <div><p className="text-2xl font-semibold">{members.length}</p><p className="text-sm text-vds-muted">Team members</p></div>
        </Card>
        <Card variant="glass" className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-2xl bg-vds-warning-soft text-vds-warning">
            <MailPlus className="size-5" />
          </span>
          <div><p className="text-2xl font-semibold">{invitations.length}</p><p className="text-sm text-vds-muted">Pending invitations</p></div>
        </Card>
        <Card variant="glass" className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-2xl bg-vds-accent-soft text-vds-accent">
            <ShieldCheck className="size-5" />
          </span>
          <div><p className="text-2xl font-semibold">{rolesResult.data?.length ?? 0}</p><p className="text-sm text-vds-muted">Available roles</p></div>
        </Card>
      </section>
      {queryParams.error&&<p role="alert" className="mt-5 rounded-xl border border-vds-danger bg-vds-danger-soft p-3 text-sm text-vds-danger">{queryParams.error}</p>}
      {queryParams.success&&<p role="status" className="mt-5 rounded-xl border border-vds-success bg-vds-success-soft p-3 text-sm text-vds-success">{queryParams.success}</p>}

      <Card padding="none" className="mt-6 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-vds-border/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-semibold">Team Members</h2><p className="mt-1 text-sm text-vds-muted">People with access to this workspace.</p></div>
          <form className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-vds-muted" />
            <input name="search" defaultValue={search} aria-label="Search team members" placeholder="Search members or roles" className="h-11 w-full rounded-xl border border-vds-border bg-vds-surface/[0.035] pl-10 pr-4 text-sm outline-none placeholder:text-vds-subtle focus:border-vds-accent-border focus:ring-2 focus:ring-vds-focus" />
          </form>
        </div>

        {members.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-3xl border border-vds-accent-border bg-vds-primary/[0.07] text-vds-primary"><Users className="size-7" /></span>
            <h2 className="mt-5 text-xl font-semibold">Build your workspace team</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-vds-muted">Invite colleagues and assign the right roles to start collaborating across your real estate operations.</p>
            <ButtonLink href="#pending-invitations" className="mt-6"><UserPlus className="size-4" />Invite your first team member</ButtonLink>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-vds-muted">No team members match “{search}”.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-vds-surface/[0.025] text-xs uppercase tracking-[0.14em] text-vds-muted"><tr><th className="px-5 py-4 font-medium">Avatar</th><th className="px-5 py-4 font-medium">Name</th><th className="px-5 py-4 font-medium">Email</th><th className="px-5 py-4 font-medium">Role</th><th className="px-5 py-4 font-medium">Status</th><th className="px-5 py-4 font-medium">Last Login</th></tr></thead>
              <tbody className="divide-y divide-vds-divider/[0.06]">
                {filteredMembers.map((member) => {
                  const isCurrent = member.user_id === user?.id;
                  const name = isCurrent ? String(user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "You") : "Team member";
                  const email = isCurrent ? user?.email ?? "—" : "—";
                  return <tr key={member.user_id} className="transition hover:bg-vds-surface/[0.025]"><td className="px-5 py-4"><span className="grid size-10 place-items-center rounded-2xl border border-vds-accent-border bg-gradient-to-br from-vds-primary-soft to-vds-accent-soft text-xs font-semibold text-vds-primary">{initials(name)}</span></td><td className="px-5 py-4 font-medium text-vds-foreground">{name}{isCurrent&&<span className="ml-2 text-xs font-normal text-vds-primary">You</span>}</td><td className="px-5 py-4 text-vds-muted">{email}</td><td className="px-5 py-4 text-vds-secondary">{member.roles?.name ?? "Unassigned"}</td><td className="px-5 py-4">{statusBadge(member.status)}</td><td className="px-5 py-4 text-vds-muted">{isCurrent ? formatDate(user?.last_sign_in_at) : "—"}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card id="pending-invitations" padding="none" className="overflow-hidden">
          <div className="border-b border-vds-border/[0.07] p-5"><h2 className="font-semibold">Pending Invitations</h2><p className="mt-1 text-sm text-vds-muted">Invitations awaiting acceptance.</p></div>
          {canManage&&<form action={inviteTeamMemberAction} className="grid gap-3 border-b border-vds-border p-5 sm:grid-cols-2"><label className="text-sm">Name<input name="name" required minLength={2} className="mt-2 h-11 w-full rounded-xl border border-vds-border bg-vds-input px-3"/></label><label className="text-sm">Email<input name="email" type="email" required className="mt-2 h-11 w-full rounded-xl border border-vds-border bg-vds-input px-3"/></label><label className="text-sm">Role<select name="role" defaultValue="agent" className="mt-2 h-11 w-full rounded-xl border border-vds-border bg-vds-input px-3"><option value="organization_admin">Admin</option><option value="branch_manager">Manager</option><option value="sales_manager">Sales manager</option><option value="agent">Agent</option><option value="viewer">Viewer</option></select></label><div className="flex items-end"><Button type="submit" className="w-full">Create pending invitation</Button></div><p className="text-xs text-vds-subtle sm:col-span-2">No email will be sent. The invitation is stored for a future approved delivery provider.</p></form>}
          {invitations.length ? <div className="divide-y divide-vds-divider/[0.06]">{invitations.map((invite)=><div key={invite.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-vds-warning-soft text-xs font-semibold text-vds-warning">{initials(invite.name)}</span><div><p className="font-medium">{invite.name}</p><p className="mt-0.5 text-sm text-vds-muted">{invite.email} · {invite.roles?.name ?? "Unassigned"}</p></div></div><div className="flex items-center gap-3">{statusBadge("pending")}<time className="text-xs text-vds-subtle">Expires {formatDate(invite.expires_at)}</time></div></div>)}</div>:<div className="p-10 text-center text-sm text-vds-muted">No pending invitations.</div>}
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="border-b border-vds-border/[0.07] p-5"><h2 className="font-semibold">Roles</h2><p className="mt-1 text-sm text-vds-muted">Access levels available to your organization.</p></div>
          <div className="divide-y divide-vds-divider/[0.06]">{rolesResult.data?.map((role)=><div key={role.code} className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="text-sm font-medium text-vds-secondary">{role.name}</p><p className="mt-1 text-xs capitalize text-vds-subtle">{role.scope} scope</p></div><Badge variant={role.code===currentRole?"accent":"neutral"}>{role.code===currentRole?"Your role":"Available"}</Badge></div>)}</div>
        </Card>
      </div>
    </main>
  );
}
