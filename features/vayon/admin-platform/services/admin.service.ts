import "server-only";
import { operationsContext } from "@/features/vayon/operations/services/context";
import type { AdminRepository } from "../contracts/repository";
import type { AdminSnapshot } from "../domain/models";
import { AuroraAdminRepository } from "../repositories/aurora.repository";
import { SupabaseAdminRepository } from "../repositories/supabase.repository";
export const administrationSafety = {
  readOnly: true,
  writes: false,
  roleMutations: false,
  permissionMutations: false,
  schemaChanges: false,
  migrations: false,
  aiExecution: false,
} as const;
export class AdminService {
  constructor(private r: AdminRepository) {}
  static async production() {
    const c = await operationsContext();
    return new AdminService(
      new SupabaseAdminRepository(c.client, c.organizationId, c.workspaceId),
    );
  }
  static demo() {
    return new AdminService(new AuroraAdminRepository());
  }
  load(): Promise<AdminSnapshot> {
    return this.r.load();
  }
}
