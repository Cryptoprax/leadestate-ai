import type { ExecutionAdapter } from "../contracts/ports";
import type { ExecutionRequest, GovernedActionType } from "../domain/models";
const supported: readonly GovernedActionType[] = [
  "whatsapp.message",
  "email.draft",
  "meeting.schedule",
  "lead.assign",
  "deal.update",
  "document.generate",
  "campaign.launch",
  "task.create",
];
export class DeterministicExecutionAdapter implements ExecutionAdapter {
  readonly id = "deterministic-preparation";
  readonly external = false as const;
  supports(action: string) {
    return supported.includes(action as GovernedActionType);
  }
  async prepare(request: ExecutionRequest) {
    if (request.status !== "approved")
      throw new Error("Execution preparation requires approval.");
    if (!this.supports(request.actionType))
      throw new Error("Action adapter is unavailable.");
    return {
      status: "prepared" as const,
      executable: false as const,
      adapterId: this.id,
    };
  }
}
