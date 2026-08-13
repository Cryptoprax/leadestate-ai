import type{ActionResult,ApprovalRecord,ExecutionCheckpoint,ExecutionContext,ExecutionHistoryEntry,ExecutionSession,RuntimePlan,RuntimeStep}from"../domain/contracts";
export interface RuntimeStore{save(session:ExecutionSession):void;get(id:string):ExecutionSession|undefined;list():readonly ExecutionSession[];appendHistory(entry:ExecutionHistoryEntry):void;history(sessionId:string):readonly ExecutionHistoryEntry[];checkpoint(value:ExecutionCheckpoint):void;latestCheckpoint(sessionId:string):ExecutionCheckpoint|undefined;saveApproval(value:ApprovalRecord):void;approval(sessionId:string,stepId:string):ApprovalRecord|undefined}
export interface ActionHandler{readonly action:string;execute(step:RuntimeStep,context:ExecutionContext,variables:Readonly<Record<string,unknown>>):Promise<ActionResult>}
export interface RuntimeAuthorizer{authorize(context:ExecutionContext,permission:string):Promise<boolean>}
export interface TimelineProposalSubmitter{submit(proposal:Readonly<Record<string,unknown>>,context:ExecutionContext):Promise<Readonly<Record<string,unknown>>>}
export interface RuntimeClock{now():Date;sleep(ms:number):Promise<void>}
export interface WorkflowPublisher{publish(plan:RuntimePlan,context:ExecutionContext):Promise<RuntimePlan>}
