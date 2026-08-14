import {
  Badge,
  Card,
  Page,
  PageHeader,
  Section,
} from "@/features/platform/design-system";
import type { SystemDiagnostics as Diagnostics } from "../services/system-diagnostics";
export function SystemDiagnosticsView({ data }: { data: Diagnostics }) {
  const metadata = [
    ["Version", data.build.version],
    ["Environment", data.build.environment],
    ["Build ID", data.build.buildId],
    ["Commit", data.build.commitSha],
    ["Built At", data.build.builtAt ?? "Unavailable"],
    ["Test Status", "Not exposed at runtime"],
  ] as const;
  return (
    <Page width="wide">
      <PageHeader
        eyebrow="Platform diagnostics"
        title="System"
        description="Non-sensitive build, route, module, and feature inventory for operational verification."
      />
      <Section className="mt-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {metadata.map(([label, value]) => (
            <Card key={label}>
              <p className="text-xs text-vds-muted">{label}</p>
              <p className="mt-2 break-all font-semibold">{value}</p>
            </Card>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
          <Card>
            <h2 className="font-semibold">Health summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-vds-muted">Module health</dt>
                <dd>Registered</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-vds-muted">Route health</dt>
                <dd>{data.routeHealth}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-vds-muted">Sensitive data</dt>
                <dd>Excluded</dd>
              </div>
            </dl>
          </Card>
          <Card>
            <h2 className="font-semibold">Feature inventory</h2>
            <ul
              className="mt-4 grid gap-2 sm:grid-cols-2"
              aria-label="Registered platform features"
            >
              {data.modules.map((module) => (
                <li
                  className="flex items-center justify-between rounded-xl bg-vds-elevated p-3 text-sm"
                  key={module.name}
                >
                  <span>{module.name}</span>
                  <Badge tone="success">{module.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">Authenticated route inventory</h2>
              <Badge tone="info">{data.routeCount} routes</Badge>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              {data.routes.map((group) => (
                <div
                  key={group.group}
                  className="flex justify-between gap-4 rounded-lg bg-vds-elevated px-3 py-2"
                >
                  <dt className="text-vds-muted">{group.group}</dt>
                  <dd className="font-semibold">{group.count}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <h2 className="font-semibold">Performance posture</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-vds-muted">Rendering</dt>
                <dd>{data.performance.rendering}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-vds-muted">Hydration</dt>
                <dd>{data.performance.hydration}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-vds-muted">Runtime metrics</dt>
                <dd>{data.performance.runtimeMetrics}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-vds-subtle">
              Runtime performance data is not collected or inferred by this
              diagnostics view.
            </p>
          </Card>
        </div>
      </Section>
    </Page>
  );
}
