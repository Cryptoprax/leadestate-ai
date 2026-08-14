import { LoadingState, Page } from "@/features/platform/design-system";
export default function Loading() {
  return (
    <Page>
      <LoadingState label="Loading provider readiness" />
    </Page>
  );
}
