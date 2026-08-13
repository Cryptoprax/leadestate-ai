import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ValidationMessage({
  message,
  valid = false,
}: {
  message?: string;
  valid?: boolean;
}) {
  if (!message) return null;
  return (
    <p
      className={`mt-2 flex items-center gap-1.5 text-xs ${valid ? "text-vds-success" : "text-vds-danger"}`}
      role={valid ? "status" : "alert"}
    >
      {valid ? <CheckCircle2 className="size-3.5" /> : <AlertCircle className="size-3.5" />}
      {message}
    </p>
  );
}
