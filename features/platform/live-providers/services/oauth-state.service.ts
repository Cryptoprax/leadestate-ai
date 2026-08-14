import { createHash, randomUUID } from "node:crypto";
import type { LiveProviderId, OAuthState } from "../domain/contracts";

const digest = (value: string) =>
  createHash("sha256").update(value, "utf8").digest("base64url");

export class OAuthStateService {
  create(input: {
    providerId: LiveProviderId;
    workspaceId: string;
    redirectPath: string;
    state: string;
    codeVerifier: string;
    nonce: string;
    now?: Date;
  }): OAuthState {
    if (!input.redirectPath.startsWith("/vayon/providers"))
      throw new Error("OAuth return path is not trusted.");
    const now = input.now ?? new Date();
    return Object.freeze({
      id: randomUUID(),
      providerId: input.providerId,
      workspaceId: input.workspaceId,
      redirectPath: input.redirectPath,
      stateDigest: digest(input.state),
      codeChallenge: digest(input.codeVerifier),
      nonceDigest: digest(input.nonce),
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 10 * 60_000).toISOString(),
      consumedAt: null,
      version: 1,
    });
  }

  validate(model: OAuthState, rawState: string, now = new Date()) {
    return (
      model.consumedAt === null &&
      model.version === 1 &&
      now.getTime() < Date.parse(model.expiresAt) &&
      model.stateDigest === digest(rawState)
    );
  }
}
