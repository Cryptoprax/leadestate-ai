import { MailPlus, Search, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { operationsContext } from "@/features/leadestate/operations/services/context";

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
  searchParams: Promise<{ search?: string }>;
}) {
  const [{ search = "" }, context] = await Promise.all([
    searchParams,
    operationsContext(),
  ]);
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Workspace access
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Team Management</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Manage workspace members, invitations, and role assignments from one secure view.
          </p>
        </div>
        <a
          href="#pending-invitations"
          aria-disabled={!canManage}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition ${
            canManage
              ? "bg-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.18)] hover:bg-cyan-300"
              : "pointer-events-none border border-white/10 bg-white/5 text-slate-500"
          }`}
        >
          <UserPlus className="size-4" />
          Invite Member
        </a>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card variant="glass" className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <Users className="size-5" />
          </span>
          <div><p className="text-2xl font-semibold">{members.length}</p><p className="text-sm text-slate-500">Team members</p></div>
        </Card>
        <Card variant="glass" className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-2xl bg-amber-300/10 text-amber-200">
            <MailPlus className="size-5" />
          </span>
          <div><p className="text-2xl font-semibold">{invitations.length}</p><p className="text-sm text-slate-500">Pending invitations</p></div>
        </Card>
        <Card variant="glass" className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-2xl bg-violet-300/10 text-violet-200">
            <ShieldCheck className="size-5" />
          </span>
          <div><p className="text-2xl font-semibold">{rolesResult.data?.length ?? 0}</p><p className="text-sm text-slate-500">Available roles</p></div>
        </Card>
      </section>

      <Card padding="none" className="mt-6 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-semibold">Team Members</h2><p className="mt-1 text-sm text-slate-500">People with access to this workspace.</p></div>
          <form className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input name="search" defaultValue={search} aria-label="Search team members" placeholder="Search members or roles" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-10 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10" />
          </form>
        </div>

        {members.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200"><Users className="size-7" /></span>
            <h2 className="mt-5 text-xl font-semibold">Build your workspace team</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Invite colleagues and assign the right roles to start collaborating across your real estate operations.</p>
            <a href="#pending-invitations" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"><UserPlus className="size-4" />Invite your first team member</a>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-slate-500">No team members match “{search}”.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.025] text-xs uppercase tracking-[0.14em] text-slate-500"><tr><th className="px-5 py-4 font-medium">Avatar</th><th className="px-5 py-4 font-medium">Name</th><th className="px-5 py-4 font-medium">Email</th><th className="px-5 py-4 font-medium">Role</th><th className="px-5 py-4 font-medium">Status</th><th className="px-5 py-4 font-medium">Last Login</th></tr></thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredMembers.map((member) => {
                  const isCurrent = member.user_id === user?.id;
                  const name = isCurrent ? String(user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "You") : "Team member";
                  const email = isCurrent ? user?.email ?? "—" : "—";
                  return <tr key={member.user_id} className="transition hover:bg-white/[0.025]"><td className="px-5 py-4"><span className="grid size-10 place-items-center rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/15 to-violet-300/10 text-xs font-semibold text-cyan-100">{initials(name)}</span></td><td className="px-5 py-4 font-medium text-slate-100">{name}{isCurrent&&<span className="ml-2 text-xs font-normal text-cyan-300">You</span>}</td><td className="px-5 py-4 text-slate-400">{email}</td><td className="px-5 py-4 text-slate-300">{member.roles?.name ?? "Unassigned"}</td><td className="px-5 py-4">{statusBadge(member.status)}</td><td className="px-5 py-4 text-slate-500">{isCurrent ? formatDate(user?.last_sign_in_at) : "—"}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card id="pending-invitations" padding="none" className="overflow-hidden">
          <div className="border-b border-white/[0.07] p-5"><h2 className="font-semibold">Pending Invitations</h2><p className="mt-1 text-sm text-slate-500">Invitations awaiting acceptance.</p></div>
          {invitations.length ? <div className="divide-y divide-white/[0.06]">{invitations.map((invite)=><div key={invite.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-amber-300/10 text-xs font-semibold text-amber-100">{initials(invite.name)}</span><div><p className="font-medium">{invite.name}</p><p className="mt-0.5 text-sm text-slate-500">{invite.email} · {invite.roles?.name ?? "Unassigned"}</p></div></div><div className="flex items-center gap-3">{statusBadge("pending")}<time className="text-xs text-slate-600">Expires {formatDate(invite.expires_at)}</time></div></div>)}</div>:<div className="p-10 text-center text-sm text-slate-500">No pending invitations.</div>}
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="border-b border-white/[0.07] p-5"><h2 className="font-semibold">Roles</h2><p className="mt-1 text-sm text-slate-500">Access levels available to your organization.</p></div>
          <div className="divide-y divide-white/[0.06]">{rolesResult.data?.map((role)=><div key={role.code} className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="text-sm font-medium text-slate-200">{role.name}</p><p className="mt-1 text-xs capitalize text-slate-600">{role.scope} scope</p></div><Badge variant={role.code===currentRole?"accent":"neutral"}>{role.code===currentRole?"Your role":"Available"}</Badge></div>)}</div>
        </Card>
      </div>
    </main>
  );
}
