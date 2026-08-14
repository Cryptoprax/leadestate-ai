import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { adminModules, roleDefinitions } from "../config/catalogs";
import type { AdminRepository } from "../contracts/repository";
import type { AdminRole, AdminSnapshot } from "../domain/models";
export class SupabaseAdminRepository implements AdminRepository {
  readonly provider = "supabase" as const;
  constructor(
    private c: SupabaseClient,
    private o: string,
    private w: string,
  ) {}
  async load(): Promise<AdminSnapshot> {
    const errors: Record<string, string> = {},
      names = [
        "workspace_members",
        "roles",
        "teams",
        "departments",
        "organizations",
        "workspaces",
        "audit_logs",
        "integration_connections",
      ] as const,
      results = await Promise.all([
        this.c.from("workspace_members").select("*").eq("workspace_id", this.w),
        this.c.from("roles").select("*").eq("organization_id", this.o),
        this.c.from("teams").select("*").eq("workspace_id", this.w),
        this.c.from("departments").select("*").eq("workspace_id", this.w),
        this.c.from("organizations").select("*").eq("id", this.o),
        this.c
          .from("workspaces")
          .select("*")
          .eq("id", this.w)
          .eq("organization_id", this.o),
        this.c
          .from("audit_logs")
          .select("*")
          .eq("organization_id", this.o)
          .eq("workspace_id", this.w)
          .limit(500),
        this.c
          .from("integration_connections")
          .select("*")
          .eq("organization_id", this.o)
          .eq("workspace_id", this.w),
      ]);
    results.forEach((result, index) => {
      if (result.error) errors[names[index]!] = result.error.message;
    });
    const [
      members,
      roles,
      teams,
      departments,
      organizations,
      workspaces,
      audit,
      providers,
    ] = results.map(
      (result) => (result.data ?? []) as Record<string, unknown>[],
    );
    const roleName = (value: unknown): AdminRole => {
      const v = String(value ?? "").toLowerCase();
      return v.includes("admin") || v.includes("owner")
        ? "Administrator"
        : v.includes("manager")
          ? "Manager"
          : v.includes("market")
            ? "Marketing"
            : v.includes("operation")
              ? "Operations"
              : v.includes("finance")
                ? "Finance"
                : v.includes("legal")
                  ? "Legal"
                  : v.includes("support")
                    ? "Support"
                    : "Sales";
    };
    return {
      users: members.map((r) => ({
        id: String(r.user_id),
        name: String(r.display_name ?? r.user_id),
        email: r.email ? String(r.email) : undefined,
        role: roleName(r.role_code),
        department: r.department_id ? String(r.department_id) : undefined,
        team: r.team_id ? String(r.team_id) : undefined,
        workspace: this.w,
        status: ["active", "inactive", "suspended", "invited"].includes(
          String(r.status),
        )
          ? (String(r.status) as "active")
          : "inactive",
        lastLogin: null,
        assignedAIEmployees: [],
      })),
      roles: roles.length
        ? roles.map((r) => ({
            id: String(r.id),
            name: roleName(r.code),
            description: String(r.description ?? "Configured role."),
            readOnly: true,
          }))
        : roleDefinitions,
      permissions: roleDefinitions.flatMap((role) =>
        adminModules.map((module) => ({
          role: role.name,
          module,
          allowed: false,
          source: "unavailable" as const,
          readOnly: true as const,
        })),
      ),
      teams: teams.map((r) => ({
        id: String(r.id),
        name: String(r.name),
        department: r.department_id ? String(r.department_id) : undefined,
        memberIds: [],
        custom: true,
        readOnly: true,
      })),
      departments: departments.map((r) => ({
        id: String(r.id),
        name: String(r.name),
        teamIds: [],
        readOnly: true,
      })),
      organizations: organizations.map((r) => ({
        id: String(r.id),
        name: String(r.name),
        status: String(r.status ?? "active"),
        readOnly: true,
      })),
      workspaces: workspaces.map((r) => ({
        id: String(r.id),
        organizationId: String(r.organization_id),
        name: String(r.name),
        status: String(r.status ?? "active"),
        readOnly: true,
      })),
      audit: audit.map((r) => ({
        id: String(r.id),
        user: String(r.actor_id ?? "System"),
        action: String(r.action ?? r.event_type),
        module: String(r.module ?? "platform"),
        timestamp: String(r.created_at),
        entity: r.entity_id ? String(r.entity_id) : undefined,
        outcome: String(r.outcome ?? "recorded"),
        correlationId: String(r.correlation_id ?? r.id),
      })),
      aiGovernance: members.map((r) => ({
        userId: String(r.user_id),
        assignedAIEmployees: [],
        approvalAuthority: "Awaiting authoritative policy",
        recommendationScope: "Advisory only",
        executionScope: "disabled",
      })),
      integrationGovernance: providers.map((r) => ({
        providerId: String(r.provider_id ?? r.id),
        enabled: Boolean(r.enabled),
        approvalRequired: true,
        health: "unknown",
        workspaceScope: this.w,
        readOnly: true,
      })),
      source: "supabase",
      errors,
    };
  }
}
