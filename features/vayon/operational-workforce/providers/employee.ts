import type { AIProvider, AITask, AITaskResult } from "./provider";

export interface AIEmployee {
  readonly id: string;
  readonly role: string;
  readonly provider: AIProvider;
  execute(task: AITask): Promise<AITaskResult>;
}

export class ProviderBackedAIEmployee implements AIEmployee {
  constructor(
    readonly id: string,
    readonly role: string,
    readonly provider: AIProvider,
  ) {}

  execute(task: AITask): Promise<AITaskResult> {
    if (task.employeeId !== this.id)
      throw new Error("Task is assigned to a different AI employee.");
    return this.provider.execute(task);
  }
}

export interface AIEmployeeProviderAssignment {
  readonly employeeId: string;
  readonly providerId: string;
  readonly providerVersion: string;
}

export class AIEmployeeRegistry {
  private readonly employees = new Map<string, AIEmployee>();

  register(employee: AIEmployee): void {
    if (this.employees.has(employee.id))
      throw new Error(`AI employee is already registered: ${employee.id}`);
    this.employees.set(employee.id, employee);
  }

  resolve(employeeId: string): AIEmployee {
    const employee = this.employees.get(employeeId);
    if (!employee)
      throw new Error(`AI employee is not registered: ${employeeId}`);
    return employee;
  }

  assignments(): readonly AIEmployeeProviderAssignment[] {
    return Object.freeze(
      [...this.employees.values()].map((employee) =>
        Object.freeze({
          employeeId: employee.id,
          providerId: employee.provider.id,
          providerVersion: employee.provider.version,
        }),
      ),
    );
  }
}
