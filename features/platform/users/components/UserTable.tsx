import { ActionMenu } from "../../identity/components/ActionMenu";
import { Avatar } from "../../identity/components/Avatar";
import {
  DataTable,
  type DataTableColumn,
} from "../../identity/components/DataTable";
import { EmptyState } from "../../identity/components/EmptyState";
import { StatusBadge, type StatusTone } from "../../identity/components/StatusBadge";
import { TableToolbar } from "../../identity/components/TableToolbar";
import { userFilters, users } from "../config/users";
import type { User, UserStatus } from "../types/user";

const statusTones: Record<UserStatus, StatusTone> = {
  Active: "positive",
  Invited: "info",
  Suspended: "negative",
};

const columns: DataTableColumn<User>[] = [
  {
    id: "avatar",
    header: "Avatar",
    render: (user) => (
      <Avatar
        name={user.name}
        initials={user.initials}
        tone={user.avatarTone}
        size="sm"
      />
    ),
  },
  {
    id: "name",
    header: "Name",
    render: (user) => <span className="font-medium text-slate-200">{user.name}</span>,
  },
  { id: "email", header: "Email", render: (user) => user.email },
  { id: "role", header: "Role", render: (user) => user.role },
  {
    id: "organization",
    header: "Organization",
    render: (user) => user.organization,
  },
  { id: "workspace", header: "Workspace", render: (user) => user.workspace },
  {
    id: "status",
    header: "Status",
    render: (user) => (
      <StatusBadge label={user.status} tone={statusTones[user.status]} />
    ),
  },
  {
    id: "last-active",
    header: "Last Active",
    render: (user) => user.lastActive,
  },
  {
    id: "actions",
    header: "Actions",
    render: (user) => <ActionMenu label={user.name} />,
  },
];

export function UserTable() {
  return (
    <DataTable
      rows={users}
      columns={columns}
      getRowKey={(user) => user.id}
      caption="AtlasOS users"
      toolbar={
        <TableToolbar
          searchLabel="Search users"
          searchPlaceholder="Search users..."
          filters={userFilters}
          primaryAction="Invite User"
        />
      }
      emptyState={
        <EmptyState
          title="No users"
          description="Users will appear here after they are invited."
          actionLabel="Invite User"
        />
      }
    />
  );
}
