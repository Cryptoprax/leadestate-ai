import type { PlatformApplication } from "../types/application";

import { ApplicationCard } from "./ApplicationCard";

export interface ApplicationGridProps {
  applications: PlatformApplication[];
}

export function ApplicationGrid({
  applications,
}: ApplicationGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
      aria-label="AtlasOS applications"
    >
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
}
