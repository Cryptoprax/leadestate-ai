import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { IdentitySecurityProvider } from "../contracts";
export class SupabaseAuthSecurityProvider implements IdentitySecurityProvider {
  constructor(private client: SupabaseClient) {}
  async mfaStatus() {
    const [{ data, error }, { data: aal }] = await Promise.all([
      this.client.auth.mfa.listFactors(),
      this.client.auth.mfa.getAuthenticatorAssuranceLevel(),
    ]);
    if (error) throw error;
    const factors = [...(data.totp ?? []), ...(data.phone ?? [])].filter(
      (f) => f.status === "verified",
    );
    return {
      enabled: factors.length > 0,
      factors: factors.length,
      assuranceLevel: aal?.currentLevel ?? null,
    };
  }
  async enrollTotp(name: string) {
    const { data, error } = await this.client.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: name,
    });
    if (error) throw error;
    return {
      id: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      uri: data.totp.uri,
    };
  }
  async verifyTotp(factorId: string, code: string) {
    const challenge = await this.client.auth.mfa.challenge({ factorId });
    if (challenge.error) throw challenge.error;
    const verified = await this.client.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code,
    });
    if (verified.error) throw verified.error;
  }
  async disableMfa(factorId: string) {
    const { error } = await this.client.auth.mfa.unenroll({ factorId });
    if (error) throw error;
  }
  async changePassword(password: string) {
    const { error } = await this.client.auth.updateUser({ password });
    if (error) throw error;
  }
  async changeEmail(email: string, redirectTo: string) {
    const { error } = await this.client.auth.updateUser(
      { email },
      { emailRedirectTo: redirectTo },
    );
    if (error) throw error;
  }
  async revokeOtherSessions() {
    const { error } = await this.client.auth.signOut({ scope: "others" });
    if (error) throw error;
  }
}
