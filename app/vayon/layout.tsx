import type { ReactNode } from "react";
import { VayonShell } from "@/features/vayon/components/VayonShell";
import { ProductAnalytics } from "@/features/platform/conversion-analytics/components/ProductAnalytics";
export default function Layout({ children }: { children: ReactNode }) { return <VayonShell><ProductAnalytics />{children}</VayonShell> }
