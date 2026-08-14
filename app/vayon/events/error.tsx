"use client";
import { ModuleError } from "@/features/platform/quality/components/RouteBoundary";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <ModuleError reset={reset} label="Event history could not be loaded." />
  );
}
