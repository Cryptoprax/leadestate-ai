import type {
  LiveProviderConnection,
  LiveProviderConnectionRepository,
  LiveProviderId,
} from "../domain/contracts";

export class ReferenceOnlyLiveProviderRepository implements LiveProviderConnectionRepository {
  async connection(
    providerId: LiveProviderId,
  ): Promise<LiveProviderConnection> {
    return Object.freeze({
      providerId,
      state: "disconnected",
      credential: null,
      authorization: "not-authorized",
      lastValidation: null,
    });
  }
}
