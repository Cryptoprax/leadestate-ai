import type { Metadata } from "next";
import type { ReactNode } from "react";

import { MissionControlLayout } from "@/features/dashboard/components/MissionControlLayout";

export const metadata: Metadata = {
  title: "Mission Control | AtlasOS",
  description: "The operating system shell for AtlasOS platform administration.",
};

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return <MissionControlLayout>{children}</MissionControlLayout>;
}
