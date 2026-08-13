import type { TriggerKind, WorkflowNodeKind, WorkflowTemplate } from "../domain/contracts";
const specs=[
  ["lead-follow-up","Lead Follow-up","Sales","lead.created","Create follow-up task","task"],
  ["welcome-email","Welcome Email","Communication","lead.created","Propose welcome email","email"],
  ["meeting-reminder","Meeting Reminder","Operations","meeting.created","Propose reminder","notification"],
  ["property-assignment","Property Assignment","Property","property.published","Review assignment","approval"],
  ["deal-escalation","Deal Escalation","Sales","deal.won","Notify deal owner","notification"],
  ["customer-onboarding","Customer Onboarding","Customer","manual","Create onboarding task","task"],
  ["invoice-reminder","Invoice Reminder","Finance","schedule","Propose invoice reminder","email"],
] as const;
export const workflowTemplates:readonly WorkflowTemplate[]=Object.freeze(specs.map(([id,name,category,trigger,label,kind])=>Object.freeze({id,name,description:`Planning-only ${name.toLowerCase()} workflow.`,category,definition:Object.freeze({id:`template-${id}`,name,description:`${name} template`,version:1,status:"draft" as const,nodes:Object.freeze([{id:"trigger",kind:"trigger" as const,label:`Trigger: ${trigger}`,position:{x:80,y:120},configuration:{trigger:trigger as TriggerKind},variableReferences:[]},{id:"action",kind:kind as WorkflowNodeKind,label,position:{x:360,y:120},configuration:{proposalOnly:true},variableReferences:[]}]),connections:Object.freeze([{id:"trigger-action",sourceNodeId:"trigger",targetNodeId:"action"}]),variables:Object.freeze([])} )})));
export function cloneWorkflowTemplate(templateId:string,workflowId:string){const template=workflowTemplates.find(item=>item.id===templateId);if(!template)return undefined;return Object.freeze({...template.definition,id:workflowId,name:`${template.name} copy`,status:"draft" as const,version:1});}
