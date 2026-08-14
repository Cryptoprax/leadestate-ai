"use client";
import { Button, ErrorState, Page } from "@/features/platform/design-system";
export default function Error({ reset }: { readonly reset: () => void }) {
  return (
    <Page>
      <ErrorState
        title="Provider readiness unavailable"
        description="The local provider model could not be assembled."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </Page>
  );
}
