import type { Metadata } from "next";
import { RuntimeDashboard } from "@/features/platform/ai-runtime/dashboard/RuntimeDashboard";
export const metadata: Metadata = { title: "AI Runtime | Vayon OS", description: "Architecture dashboard for the provider-neutral Vayon AI Runtime." };
export default function RuntimePage() { return <main className="mx-auto max-w-[100rem] px-4 py-8 sm:px-6"><RuntimeDashboard /></main> }

