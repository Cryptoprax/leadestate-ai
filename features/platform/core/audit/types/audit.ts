export interface AuditEvent {
  id: string;
  date: string;
  user: string;
  organization: string;
  workspace: string;
  application: string;
  action: string;
  target: string;
  ip: string;
  device: string;
  status: "Success" | "Denied" | "Warning";
}
