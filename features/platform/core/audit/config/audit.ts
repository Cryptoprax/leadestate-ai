import type { AuditEvent } from "../types/audit";

export const auditEvents: AuditEvent[] = [
  { id: "audit-1", date: "07 Aug 2026 · 09:42", user: "Amelia Chen", organization: "Northstar Holdings", workspace: "LeadEstate Global", application: "Mission Control", action: "User login", target: "Session", ip: "203.0.113.24", device: "Chrome · macOS", status: "Success" },
  { id: "audit-2", date: "07 Aug 2026 · 09:18", user: "Platform Operations", organization: "Aurora Ventures", workspace: "APAC Launch", application: "Identity", action: "Organization created", target: "Aurora Ventures", ip: "198.51.100.17", device: "Service identity", status: "Success" },
  { id: "audit-3", date: "07 Aug 2026 · 08:24", user: "Sales AI", organization: "Northstar Holdings", workspace: "Sales Operations", application: "AI Studio", action: "Tool permission denied", target: "Billing export", ip: "Internal", device: "AI employee", status: "Denied" },
  { id: "audit-4", date: "06 Aug 2026 · 17:05", user: "James Wilson", organization: "Meridian Group", workspace: "UK Operations", application: "Automation", action: "Workflow published", target: "Lead follow-up v3", ip: "192.0.2.44", device: "Edge · Windows", status: "Success" },
  { id: "audit-5", date: "06 Aug 2026 · 11:39", user: "Platform Admin", organization: "AtlasOS", workspace: "Platform", application: "Identity", action: "Permission changed", target: "marketing.content.publish", ip: "198.51.100.8", device: "Chrome · Linux", status: "Warning" },
];

export const auditFilters = [
  { id: "audit-status", label: "Status", options: [{ label: "Success", value: "success" }, { label: "Denied", value: "denied" }, { label: "Warning", value: "warning" }] },
  { id: "audit-application", label: "Application", options: [{ label: "Mission Control", value: "mission-control" }, { label: "Identity", value: "identity" }, { label: "AI Studio", value: "ai-studio" }] },
  { id: "audit-date", label: "Date", options: [{ label: "Today", value: "today" }, { label: "Last 7 days", value: "week" }, { label: "Last 30 days", value: "month" }] },
];
