import "server-only";
import { randomBytes, createHash } from "node:crypto";
import { operationsContext } from "@/features/vayon/operations/services/context";
import { SupabaseAuthSecurityProvider } from "../providers/supabase-auth.provider";
import { EnterpriseSecurityRepository } from "../repositories/security.repository";
import type { IdentitySecurityProvider, SecurityContext } from "../contracts";
const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export class EnterpriseSecurityService {
  constructor(
    private context: SecurityContext,
    private repository: EnterpriseSecurityRepository,
    private provider: IdentitySecurityProvider,
  ) {}
  static async production() {
    const c = await operationsContext(),
      {
        data: { user },
      } = await c.client.auth.getUser();
    if (!user) throw new Error("Authentication required.");
    const context = {
      ...c,
      userId: user.id,
      emailVerified: Boolean(user.email_confirmed_at),
    };
    return new EnterpriseSecurityService(
      context,
      new EnterpriseSecurityRepository(context),
      new SupabaseAuthSecurityProvider(c.client),
    );
  }
  async dashboard() {
    return this.repository.snapshot(await this.provider.mfaStatus());
  }
  async enrollMfa(name = "VAYON Authenticator") {
    return this.provider.enrollTotp(name);
  }
  async verifyMfa(factorId: string, code: string) {
    await this.provider.verifyTotp(factorId, code);
    const codes = Array.from({ length: 10 }, () =>
      randomBytes(5).toString("hex").toUpperCase(),
    );
    await this.repository.rpc("replace_mfa_recovery_codes", {
      p_code_hashes: codes.map(hash),
    });
    await this.audit("mfa.enabled");
    return codes;
  }
  async disableMfa(factorId: string) {
    await this.provider.disableMfa(factorId);
    await this.audit("mfa.disabled");
  }
  async changePassword(password: string) {
    if (password.length < 12)
      throw new Error("Password must contain at least 12 characters.");
    await this.provider.changePassword(password);
    await this.audit("password.changed");
  }
  async changeEmail(email: string, origin: string) {
    await this.provider.changeEmail(
      email,
      `${origin}/auth/callback?next=/vayon/settings/security`,
    );
  }
  async revokeOtherSessions() {
    await this.provider.revokeOtherSessions();
    await this.repository.rpc("revoke_other_identity_sessions", {});
    await this.audit("session.revoked");
  }
  async trustDevice(fingerprint: string, name: string) {
    await this.repository.rpc("trust_identity_device", {
      p_fingerprint: hash(fingerprint),
      p_name: name,
    });
    await this.audit("device.trusted");
  }
  async removeDevice(id: string) {
    await this.repository.rpc("remove_identity_device", { p_device_id: id });
    await this.audit("device.removed");
  }
  async createToken(name: string, scopes: string[], expiresAt?: string) {
    if (!name.trim() || !scopes.length)
      throw new Error("Token name and scopes are required.");
    const secret = `vayon_pat_${randomBytes(32).toString("base64url")}`,
      prefix = secret.slice(0, 16);
    const id = await this.repository.rpc("create_personal_access_token", {
      p_workspace_id: this.context.workspaceId,
      p_name: name,
      p_token_prefix: prefix,
      p_token_hash: hash(secret),
      p_scopes: [...new Set(scopes)].slice(0, 20),
      p_expires_at: expiresAt ?? null,
    });
    return { id: String(id), token: secret, prefix };
  }
  revokeToken(id: string) {
    return this.repository.rpc("revoke_personal_access_token", {
      p_token_id: id,
    });
  }
  switchOrganization(organizationId: string, workspaceId: string) {
    return this.repository.rpc("switch_current_organization", {
      p_organization_id: organizationId,
      p_workspace_id: workspaceId,
    });
  }
  private audit(eventType: string) {
    return this.repository.rpc("record_identity_audit", {
      p_event_type: eventType,
      p_organization_id: this.context.organizationId,
      p_workspace_id: this.context.workspaceId,
      p_metadata: { source: "security_center" },
    });
  }
}
