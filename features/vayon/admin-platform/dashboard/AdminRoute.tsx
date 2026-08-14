import {
  Audit,
  Cards,
  Header,
  Overview,
  Permissions,
  Users,
} from "../components/AdminViews";
import { AdminService } from "../services/admin.service";
export type AdminView =
  | "overview"
  | "users"
  | "roles"
  | "permissions"
  | "teams"
  | "departments"
  | "organizations"
  | "workspaces"
  | "audit";
export async function AdminRoute({ view }: { view: AdminView }) {
  const service = await AdminService.production(),
    s = await service.load(),
    title =
      view === "overview"
        ? "Administration Control Center"
        : view[0]!.toUpperCase() + view.slice(1);
  return (
    <main className="mx-auto max-w-[110rem] px-5 py-8">
      <Header title={title} />
      {view === "overview" && <Overview s={s} />}{" "}
      {view === "users" && <Users s={s} />}{" "}
      {view === "roles" && <Cards items={s.roles} />}{" "}
      {view === "permissions" && <Permissions s={s} />}{" "}
      {view === "teams" && (
        <Cards
          items={s.teams.map((x) => ({
            id: x.id,
            name: x.name,
            meta: `${x.memberIds.length} members · ${x.custom ? "Custom" : "Standard"}`,
          }))}
        />
      )}{" "}
      {view === "departments" && (
        <Cards
          items={s.departments.map((x) => ({
            id: x.id,
            name: x.name,
            meta: `${x.teamIds.length} teams`,
          }))}
        />
      )}{" "}
      {view === "organizations" && (
        <Cards
          items={s.organizations.map((x) => ({
            id: x.id,
            name: x.name,
            meta: x.status,
          }))}
        />
      )}{" "}
      {view === "workspaces" && (
        <Cards
          items={s.workspaces.map((x) => ({
            id: x.id,
            name: x.name,
            meta: `${x.status} · ${x.organizationId}`,
          }))}
        />
      )}{" "}
      {view === "audit" && <Audit s={s} />}
    </main>
  );
}
