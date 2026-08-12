import { ActionMenu } from "../../identity/components/ActionMenu";
import {
  DataTable,
  type DataTableColumn,
} from "../../identity/components/DataTable";
import { EmptyState } from "../../identity/components/EmptyState";
import { StatusBadge, type StatusTone } from "../../identity/components/StatusBadge";
import { TableToolbar } from "../../identity/components/TableToolbar";
import { roleFilters, roles } from "../config/roles";
import type { Role, RoleStatus } from "../types/role";

const statusTones: Record<RoleStatus, StatusTone> = {
  System: "info",
  Custom: "positive",
  Draft: "warning",
};

const columns: DataTableColumn<Role>[] = [
  {
    id: "role",
    header: "Role",
    render: (role) => <span className="font-medium text-slate-200">{role.name}</span>,
  },
  {
    id: "description",
    header: "Description",
    className: "max-w-md whitespace-normal",
    render: (role) => role.description,
  },
  { id: "users", header: "Users", render: (role) => role.userCount },
  {
    id: "permissions",
    header: "Permissions",
    render: (role) => role.permissionCount,
  },
  { id: "scope", header: "Scope", render: (role) => role.scope },
  {
    id: "status",
    header: "Status",
    render: (role) => (
      <StatusBadge label={role.status} tone={statusTones[role.status]} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    render: (role) => <ActionMenu label={role.name} />,
  },
];

export function RoleTable() {
  return (
    <DataTable
      rows={roles}
      columns={columns}
      getRowKey={(role) => role.id}
      caption="AtlasOS roles"
      toolbar={
        <TableToolbar
          searchLabel="Search roles"
          searchPlaceholder="Search roles..."
          filters={roleFilters}
          primaryAction="New Role"
        />
      }
      emptyState={
        <EmptyState
          title="No roles"
          description="Role definitions will appear here."
          actionLabel="New Role"
        />
      }
    />
  );
}
