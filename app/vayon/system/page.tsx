import { SystemDiagnosticsView } from "@/features/platform/quality/components/SystemDiagnostics";
import { getSystemDiagnostics } from "@/features/platform/quality/services/system-diagnostics";
export default function Page() {
  return <SystemDiagnosticsView data={getSystemDiagnostics()} />;
}
