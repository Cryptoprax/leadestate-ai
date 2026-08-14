import type { ReactNode } from "react";
import { AdminShell } from "@/features/vayon/admin-platform/components/AdminViews";
export default function Layout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
