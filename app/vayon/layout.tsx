import type { ReactNode } from "react";
import { VayonShell } from "@/features/vayon/components/VayonShell";
export default function Layout({ children }: { children: ReactNode }) { return <VayonShell>{children}</VayonShell> }
