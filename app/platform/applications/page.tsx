import { ApplicationGrid } from "@/features/platform/applications/components/ApplicationGrid";
import { ApplicationHeader } from "@/features/platform/applications/components/ApplicationHeader";
import { ApplicationSidebar } from "@/features/platform/applications/components/ApplicationSidebar";
import { applications } from "@/features/platform/applications/config/applications";

export default function ApplicationsPage() {
  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <ApplicationSidebar applications={applications} />
      <div className="min-w-0 flex-1 px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
        <div className="mx-auto w-full max-w-[88rem]">
          <ApplicationHeader applications={applications} />
          <div className="pt-7">
            <ApplicationGrid applications={applications} />
          </div>
        </div>
      </div>
    </div>
  );
}
