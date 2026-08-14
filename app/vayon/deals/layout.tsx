import type { ReactNode } from "react";
import { DealRoomShell } from "@/features/vayon/deal-room/components/DealRoomViews";
export default function Layout({ children }: { children: ReactNode }) {
  return <DealRoomShell>{children}</DealRoomShell>;
}
