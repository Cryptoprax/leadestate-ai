import { ActionMenu } from "../../identity/components/ActionMenu";
import {
  DataTable,
  type DataTableColumn,
} from "../../identity/components/DataTable";
import { EmptyState } from "../../identity/components/EmptyState";
import { StatusBadge, type StatusTone } from "../../identity/components/StatusBadge";
import { TableToolbar } from "../../identity/components/TableToolbar";
import { organizationFilters, organizations } from "../config/organizations";
import type {
  Organization,
  OrganizationStatus,
} from "../types/organization";

const statusTones: Record<OrganizationStatus, StatusTone> = {
  Active: "positive",
  Provisioning: "info",
  Suspended: "negative",
};

const columns: DataTableColumn<Organization>[] = [
  {
    id: "name",
    header: "Organization Name",
    render: (organization) => (
      <div>
        <p className="font-medium text-slate-200">{organization.name}</p>
        <p className="mt-0.5 text-[10px] text-slate-700">{organization.id}</p>
      </div>
    ),
  },
  {
    id: "workspaces",
    header: "Workspace Count",
    render: (organization) => organization.workspaceCount,
  },
  {
    id: "users",
    header: "Users",
    render: (organization) => organization.userCount,
  },
  {
    id: "applications",
    header: "Applications",
    render: (organization) => organization.applicationCount,
  },
  {
    id: "status",
    header: "Status",
    render: (organization) => (
      <StatusBadge
        label={organization.status}
        tone={statusTones[organization.status]}
      />
    ),
  },
  {
    id: "country",
    header: "Country",
    render: (organization) => organization.country,
  },
  {
    id: "region",
    header: "Region",
    render: (organization) => organization.region,
  },
  {
    id: "created",
    header: "Created",
    render: (organization) => organization.createdAt,
  },
  {
    id: "actions",
    header: "Actions",
    render: (organization) => <ActionMenu label={organization.name} />,
  },
];

export function OrganizationTable() {
  return (
    <DataTable
      rows={organizations}
      columns={columns}
      getRowKey={(organization) => organization.id}
      caption="AtlasOS organizations"
      toolbar={
        <TableToolbar
          searchLabel="Search organizations"
          searchPlaceholder="Search organizations..."
          filters={organizationFilters}
          primaryAction="New Organization"
        />
      }
      emptyState={
        <EmptyState
          title="No organizations"
          description="Organizations will appear here when they are provisioned."
          actionLabel="New Organization"
        />
      }
    />
  );
}
