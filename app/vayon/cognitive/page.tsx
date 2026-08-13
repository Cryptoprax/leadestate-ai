import type { Metadata } from "next";
import { CognitiveDashboard } from "@/features/platform/intelligence/cognitive/dashboard/CognitiveDashboard";
export const metadata: Metadata = { title: "Cognitive Engine | Vayon OS", description: "Architecture dashboard for Vayon OS cognitive planning and governance." };
export default function CognitivePage() { return <main className="mx-auto max-w-[100rem] px-4 py-8 sm:px-6"><CognitiveDashboard /></main> }

