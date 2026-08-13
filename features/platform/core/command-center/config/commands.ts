import type { Command, CommandGroup } from "../types/command";

export const commandGroups: CommandGroup[] = [
  "Recent Commands",
  "Suggested Commands",
  "Quick Actions",
  "Recent Organizations",
  "Recent Applications",
  "Recent Users",
];

export const commands: Command[] = [
  { id: "command-recent-org", title: "Open Organizations", description: "Return to the organization directory.", group: "Recent Commands", shortcut: "G O", iconName: "organization" },
  { id: "command-suggested-audit", title: "Review Audit Activity", description: "Inspect recent platform security events.", group: "Suggested Commands", iconName: "audit" },
  { id: "command-quick-search", title: "Universal Search", description: "Search every AtlasOS resource.", group: "Quick Actions", shortcut: "⌘ K", iconName: "search" },
  { id: "command-org-northstar", title: "Northstar Holdings", description: "Active organization · six workspaces.", group: "Recent Organizations", iconName: "organization" },
  { id: "command-app-vayon", title: "Vayon OS", description: "Operational application · version 1.0.0.", group: "Recent Applications", iconName: "application" },
  { id: "command-user-amelia", title: "Amelia Chen", description: "Organization Owner · active now.", group: "Recent Users", iconName: "user" },
];
