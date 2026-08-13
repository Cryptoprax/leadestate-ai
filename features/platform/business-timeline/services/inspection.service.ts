import type { TimelineValidator, TimelineValidationContext } from "../contracts/ports";
import type { CanonicalBusinessEvent } from "../domain/contracts";
import type { EventInspection } from "../projections/live-contracts";

export class TimelineInspectionService {
  constructor(private readonly validator: TimelineValidator) {}
  inspect(event: CanonicalBusinessEvent, context: TimelineValidationContext): EventInspection {
    const result = this.validator.validate(event, context);
    return { event, validation: { status: result.valid ? "valid" : "invalid", messages: result.errors.map(error => error.message) } };
  }
}
