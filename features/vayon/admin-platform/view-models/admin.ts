import type { AdminSnapshot } from "../domain/models";
export function adminAnalytics(s: AdminSnapshot) {
  const roles = new Set(s.users.map((x) => x.role));
  return [
    [
      "User Activity",
      s.audit.length ? `${s.audit.length} audit records` : "Unavailable",
    ],
    ["Role Distribution", `${roles.size} represented roles`],
    ["Workspace Growth", "Unavailable"],
    [
      "Approval Volume",
      s.audit.filter((x) => x.module.toLowerCase().includes("approval")).length,
    ],
    [
      "Module Usage",
      s.audit.length
        ? `${new Set(s.audit.map((x) => x.module)).size} active modules`
        : "Unavailable",
    ],
  ] as const;
}
