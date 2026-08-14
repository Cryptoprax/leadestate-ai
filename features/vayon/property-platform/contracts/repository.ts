import type {
  PropertyAsset,
  PropertyDocument,
  PropertyRelationships,
} from "../domain/models";

export interface PropertyAssetRepository {
  readonly provider: "supabase" | "aurora";
  properties(): Promise<readonly PropertyAsset[]>;
  relationships(): Promise<readonly PropertyRelationships[]>;
  documents(): Promise<readonly PropertyDocument[]>;
}

export interface PropertyGovernance {
  readonly executionAllowed: false;
  readonly externalMLSConnected: false;
  readonly approvalRequired: true;
}
