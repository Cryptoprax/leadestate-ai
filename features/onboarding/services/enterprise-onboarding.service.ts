import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { OnboardingRepository } from "../repositories/onboarding.repository";

export class EnterpriseOnboardingService {
  private async repository() { return new OnboardingRepository(await createSupabaseServerClient()); }
  async session() { return (await this.repository()).session(); }
  async save(step: number, configuration: Record<string, unknown>, completed: readonly number[], demoMode: boolean) {
    if (step < 1 || step > 15) throw new Error("Invalid onboarding step.");
    return (await this.repository()).save(step, configuration, completed, demoMode);
  }
  async complete() { return (await this.repository()).complete(); }
}
