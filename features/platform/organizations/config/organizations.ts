import type { Organization } from "../types/organization";

export const organizations: Organization[] = [
  {
    id: "org-northstar",
    name: "Northstar Holdings",
    workspaceCount: 6,
    userCount: 184,
    applicationCount: 7,
    status: "Active",
    country: "United States",
    region: "North America",
    createdAt: "Mar 12, 2026",
  },
  {
    id: "org-meridian",
    name: "Meridian Group",
    workspaceCount: 4,
    userCount: 96,
    applicationCount: 5,
    status: "Active",
    country: "United Kingdom",
    region: "Europe",
    createdAt: "Apr 03, 2026",
  },
  {
    id: "org-aurora",
    name: "Aurora Ventures",
    workspaceCount: 2,
    userCount: 41,
    applicationCount: 4,
    status: "Provisioning",
    country: "Singapore",
    region: "Asia Pacific",
    createdAt: "Jul 28, 2026",
  },
  {
    id: "org-atlas-demo",
    name: "Atlas Research",
    workspaceCount: 1,
    userCount: 12,
    applicationCount: 3,
    status: "Suspended",
    country: "Canada",
    region: "North America",
    createdAt: "May 19, 2026",
  },
];

export const organizationFilters = [
  {
    id: "organization-status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Provisioning", value: "provisioning" },
      { label: "Suspended", value: "suspended" },
    ],
  },
  {
    id: "organization-region",
    label: "Region",
    options: [
      { label: "North America", value: "north-america" },
      { label: "Europe", value: "europe" },
      { label: "Asia Pacific", value: "asia-pacific" },
    ],
  },
];
