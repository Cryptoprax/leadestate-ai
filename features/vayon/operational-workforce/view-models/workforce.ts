import type { WorkforceSnapshot } from "../domain/models";
export function workforceSummary(snapshot: WorkforceSnapshot) {
  return [
    { label: "Workforce", value: String(snapshot.employees.length) },
    {
      label: "Available",
      value: String(
        snapshot.employees.filter(
          (x) => x.status === "online" || x.status === "idle",
        ).length,
      ),
    },
    { label: "Queued", value: String(snapshot.observability.queueLength) },
    { label: "Failures", value: String(snapshot.observability.failureCount) },
    { label: "Health", value: snapshot.observability.health },
    { label: "Latency", value: snapshot.observability.latency },
  ] as const;
}
