import type { ReactNode } from "react";
import { CalendarShell } from "@/features/vayon/calendar-platform/components/CalendarShell";

export default function Layout({ children }: { children: ReactNode }) {
  return <CalendarShell>{children}</CalendarShell>;
}
