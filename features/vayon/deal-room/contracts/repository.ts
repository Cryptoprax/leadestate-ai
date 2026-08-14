import type {
  DealChecklist,
  DealConnections,
  DealContract,
  DealOffer,
  DealRoomDeal,
} from "../domain/models";
export interface DealRoomRepository {
  readonly provider: "supabase" | "aurora";
  deals(): Promise<readonly DealRoomDeal[]>;
  offers(): Promise<readonly DealOffer[]>;
  contracts(): Promise<readonly DealContract[]>;
  checklists(): Promise<readonly DealChecklist[]>;
  connections(): Promise<readonly DealConnections[]>;
}
