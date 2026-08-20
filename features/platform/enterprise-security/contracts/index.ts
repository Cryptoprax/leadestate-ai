import type { SupabaseClient } from "@supabase/supabase-js";
export interface IdentitySecurityProvider {
  mfaStatus(): Promise<{
    enabled: boolean;
    factors: number;
    assuranceLevel: string | null;
  }>;
  enrollTotp(
    name: string,
  ): Promise<{ id: string; qrCode: string; secret: string; uri: string }>;
  verifyTotp(factorId: string, code: string): Promise<void>;
  disableMfa(factorId: string): Promise<void>;
  changePassword(password: string): Promise<void>;
  changeEmail(email: string, redirectTo: string): Promise<void>;
  revokeOtherSessions(): Promise<void>;
}
export interface SecurityContext {
  client: SupabaseClient;
  userId: string;
  organizationId: string;
  workspaceId: string;
  emailVerified: boolean;
}
