"use server";

import { revalidatePath } from "next/cache";
import { LaunchReadinessService } from "../services/launch-readiness.service";

export async function runLaunchReadinessAuditAction() {
  await new LaunchReadinessService().snapshot({ record: true });
  revalidatePath("/platform/launch-readiness");
}
