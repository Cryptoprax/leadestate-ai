import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export class OnboardingRepository {
  constructor(private client: SupabaseClient) {}
  async session() {
    const { data, error } = await this.client.rpc("get_enterprise_onboarding_session");
    if (error) throw error;
    return data as { current_step: number; completed_steps: number[]; configuration: Record<string, unknown>; demo_mode: boolean; completed_at: string | null } | null;
  }
  async save(step: number, configuration: Record<string, unknown>, completed: readonly number[], demoMode: boolean) {
    const { error } = await this.client.rpc("save_enterprise_onboarding_progress", { p_step: step, p_configuration: configuration, p_completed_steps: completed, p_demo_mode: demoMode });
    if (error) throw error;
  }
  async complete() {
    const { error } = await this.client.rpc("complete_enterprise_onboarding");
    if (error) throw error;
  }
}
