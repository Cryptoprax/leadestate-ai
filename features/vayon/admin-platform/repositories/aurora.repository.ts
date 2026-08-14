import "server-only";
import { auroraEmployees } from "@/features/vayon/demo-workspace/people/employees";
import { auroraRealtyGroup } from "@/features/vayon/demo-workspace/config/aurora-realty-group";
import { adminModules, roleDefinitions } from "../config/catalogs";
import type { AdminRepository } from "../contracts/repository";
import type { AdminRole, AdminSnapshot } from "../domain/models";
const role = (department: string, title: string): AdminRole =>
  title.includes("Director") || title.includes("Chief")
    ? "Administrator"
    : title.includes("Manager")
      ? "Manager"
      : department === "marketing"
        ? "Marketing"
        : department === "operations"
          ? "Operations"
          : department === "finance"
            ? "Finance"
            : department === "legal"
              ? "Legal"
              : department === "support" || department === "customer-success"
                ? "Support"
                : "Sales";
export class AuroraAdminRepository implements AdminRepository {
  readonly provider = "aurora" as const;
  async load(): Promise<AdminSnapshot> {
    const teams = [...new Set(auroraEmployees.map((x) => x.departmentId))].map(
      (name, index) => ({
        id: `aurora-team-${index + 1}`,
        name: `${name} team`,
        department: name,
        memberIds: auroraEmployees
          .filter((x) => x.departmentId === name)
          .map((x) => x.id),
        custom: ![
          "sales",
          "marketing",
          "operations",
          "finance",
          "legal",
        ].includes(name),
        readOnly: true as const,
      }),
    );
    return {
      users: auroraEmployees.map((x) => ({
        id: x.id,
        name: x.name,
        email: x.email,
        profile: x.title,
        role: role(x.departmentId, x.title),
        department: x.departmentId,
        team: `${x.departmentId} team`,
        workspace: "aurora-demo-workspace",
        status: "active",
        lastLogin: null,
        assignedAIEmployees: [],
      })),
      roles: roleDefinitions,
      permissions: roleDefinitions.flatMap((r) =>
        adminModules.map((module) => ({
          role: r.name,
          module,
          allowed:
            r.name === "Administrator" || !module.includes("Integration"),
          source: "configured" as const,
          readOnly: true as const,
        })),
      ),
      teams,
      departments: auroraRealtyGroup.departments.map((x) => ({
        id: x.id,
        name: x.name,
        teamIds: teams.filter((t) => t.department === x.id).map((t) => t.id),
        readOnly: true,
      })),
      organizations: [
        {
          id: "aurora-realty-group",
          name: auroraRealtyGroup.company.legalName,
          status: "demo",
          readOnly: true,
        },
      ],
      workspaces: [
        {
          id: "aurora-demo-workspace",
          organizationId: "aurora-realty-group",
          name: "Aurora Realty Group",
          status: "demo",
          readOnly: true,
        },
      ],
      audit: [],
      aiGovernance: auroraEmployees.map((x) => ({
        userId: x.id,
        assignedAIEmployees: [],
        approvalAuthority: x.title.includes("Manager")
          ? "Human approval authority"
          : "No approval authority",
        recommendationScope: "Advisory recommendations",
        executionScope: "disabled",
      })),
      integrationGovernance: [],
      source: "aurora",
      errors: {},
    };
  }
}
