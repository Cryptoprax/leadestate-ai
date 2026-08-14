"use client";
import {
  Button,
  ErrorState,
  LoadingState,
  Page,
} from "@/features/platform/design-system";
export function ModuleLoading({
  label = "Loading module",
}: {
  label?: string;
}) {
  return (
    <Page width="standard">
      <LoadingState label={label} />
    </Page>
  );
}
export function ModuleError({
  reset,
  label = "This module could not be loaded.",
}: {
  reset: () => void;
  label?: string;
}) {
  return (
    <Page width="standard">
      <ErrorState
        description={label}
        action={<Button onClick={reset}>Try again</Button>}
      />
    </Page>
  );
}
