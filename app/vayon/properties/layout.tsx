import type { ReactNode } from "react";
import { PropertyShell } from "@/features/vayon/property-platform/components/PropertyShell";
export default function Layout({ children }: { children: ReactNode }) {
  return <PropertyShell>{children}</PropertyShell>;
}
