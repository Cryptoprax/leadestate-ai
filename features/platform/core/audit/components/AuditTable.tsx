import {
  DataTable,
  type DataTableColumn,
} from "../../../identity/components/DataTable";
import { EmptyState } from "../../../identity/components/EmptyState";
import { StatusBadge, type StatusTone } from "../../../identity/components/StatusBadge";
import { TableToolbar } from "../../../identity/components/TableToolbar";
import { auditEvents, auditFilters } from "../config/audit";
import type { AuditEvent } from "../types/audit";

const statusTones: Record<AuditEvent["status"], StatusTone> = {
  Success: "positive",
  Denied: "negative",
  Warning: "warning",
};

const columns: DataTableColumn<AuditEvent>[] = [
  { id: "date", header: "Date", render: (event) => event.date },
  {
    id: "user",
    header: "User",
    render: (event) => (
      <span className="font-medium text-vds-secondary">{event.user}</span>
    ),
  },
  {
    id: "organization",
    header: "Organization",
    render: (event) => event.organization,
  },
  {
    id: "workspace",
    header: "Workspace",
    render: (event) => event.workspace,
  },
  {
    id: "application",
    header: "Application",
    render: (event) => event.application,
  },
  { id: "action", header: "Action", render: (event) => event.action },
  { id: "target", header: "Target", render: (event) => event.target },
  {
    id: "ip",
    header: "IP",
    render: (event) => <span className="font-mono">{event.ip}</span>,
  },
  { id: "device", header: "Device", render: (event) => event.device },
  {
    id: "status",
    header: "Status",
    render: (event) => (
      <StatusBadge label={event.status} tone={statusTones[event.status]} />
    ),
  },
];

export function AuditTable() {
  return (
    <DataTable
      rows={auditEvents}
      columns={columns}
      getRowKey={(event) => event.id}
      caption="AtlasOS enterprise audit events"
      toolbar={
        <TableToolbar
          searchLabel="Search audit events"
          searchPlaceholder="Search audit events..."
          filters={auditFilters}
          primaryAction="Saved Views"
          exportLabel="Export"
          bulkActionLabel="Actions"
        />
      }
      emptyState={
        <EmptyState
          title="No audit events"
          description="Audit events matching this view will appear here."
        />
      }
    />
  );
}
