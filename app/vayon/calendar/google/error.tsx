"use client";
import { RouteError } from "@/features/vayon/components/RouteStates";
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <RouteError reset={reset} />; }
