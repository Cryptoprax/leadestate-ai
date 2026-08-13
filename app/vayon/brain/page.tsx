import type { Metadata } from "next";
import { BrainDashboard } from "@/features/platform/intelligence/brain/dashboard/BrainDashboard";
export const metadata: Metadata = { title: "Vayon Brain | Vayon OS", description: "Architecture dashboard for Vayon OS intelligence orchestration." };
export default function BrainPage() { return <main className="mx-auto max-w-[100rem] px-4 py-8 sm:px-6"><BrainDashboard /></main> }

