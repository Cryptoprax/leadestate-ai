import type{BuyerPropertyProfile,MatchingEvidence,PropertyMatch}from"./domain";import type{InventorySnapshot,InventoryUnit}from"@/features/vayon/property-platform/inventory/domain";
export interface PropertyMatchingRepository{evidence():Promise<MatchingEvidence>;saveShortlist(input:{profileId:string;name:string;unitIds:readonly string[];favoriteUnitIds:readonly string[]}):Promise<void>}
export interface PropertyMatchingProvider{readonly id:string;readonly version:string;score(profile:BuyerPropertyProfile,unit:InventoryUnit,inventory:InventorySnapshot,evidence:MatchingEvidence):PropertyMatch}
