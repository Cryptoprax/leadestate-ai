import type {
  CredentialReference,
  CredentialVault,
} from "../contracts/provider";
export class ReferenceOnlyCredentialVault implements CredentialVault {
  private references = new Map<string, CredentialReference>();
  async reference(providerId: string, workspaceId: string) {
    return this.references.get(`${workspaceId}:${providerId}`) ?? null;
  }
  async store(reference: CredentialReference) {
    if (reference.kind !== "none")
      throw new Error("Sprint 28 does not accept production credentials.");
    this.references.set(
      `${reference.workspaceId}:${reference.providerId}`,
      structuredClone(reference),
    );
  }
  async revoke(providerId: string, workspaceId: string) {
    this.references.delete(`${workspaceId}:${providerId}`);
  }
}
