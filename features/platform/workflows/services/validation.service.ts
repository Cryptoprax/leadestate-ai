import type { WorkflowDefinition, WorkflowValidationIssue, WorkflowValidationResult } from "../domain/contracts";
export class WorkflowValidationService {
  validate(workflow: WorkflowDefinition): WorkflowValidationResult {
    const issues: WorkflowValidationIssue[]=[];
    const allIds=[...workflow.nodes.map(node=>node.id),...workflow.connections.map(edge=>edge.id),...workflow.variables.map(variable=>variable.id)];
    const duplicates=allIds.filter((id,index)=>allIds.indexOf(id)!==index);
    for(const id of new Set(duplicates))issues.push({code:"duplicate_id",severity:"error",message:`Duplicate ID: ${id}`,subjectId:id});
    const nodeIds=new Set(workflow.nodes.map(node=>node.id));
    for(const edge of workflow.connections)if(!nodeIds.has(edge.sourceNodeId)||!nodeIds.has(edge.targetNodeId))issues.push({code:"invalid_reference",severity:"error",message:`Connection ${edge.id} references a missing node.`,subjectId:edge.id});
    const connected=new Set(workflow.connections.flatMap(edge=>[edge.sourceNodeId,edge.targetNodeId]));
    if(workflow.nodes.length>1)for(const node of workflow.nodes)if(!connected.has(node.id))issues.push({code:"disconnected_node",severity:"warning",message:`${node.label} is disconnected.`,subjectId:node.id});
    if(!workflow.nodes.some(node=>node.kind==="trigger"))issues.push({code:"missing_trigger",severity:"error",message:"Workflow requires a trigger."});
    const variables=new Set(workflow.variables.map(variable=>variable.name));
    for(const node of workflow.nodes)for(const reference of node.variableReferences)if(!variables.has(reference))issues.push({code:"missing_variable",severity:"error",message:`${node.label} references missing variable ${reference}.`,subjectId:node.id});
    const adjacency=new Map<string,string[]>();for(const id of nodeIds)adjacency.set(id,[]);for(const edge of workflow.connections)adjacency.get(edge.sourceNodeId)?.push(edge.targetNodeId);
    const visiting=new Set<string>(),visited=new Set<string>();const cycle=(id:string):boolean=>{if(visiting.has(id))return true;if(visited.has(id))return false;visiting.add(id);for(const next of adjacency.get(id)??[])if(cycle(next))return true;visiting.delete(id);visited.add(id);return false};
    if([...nodeIds].some(id=>cycle(id)))issues.push({code:"circular_loop",severity:"error",message:"Circular execution path detected. Use an explicit Loop node with a future bounded-runtime policy."});
    return Object.freeze({valid:!issues.some(issue=>issue.severity==="error"),issues:Object.freeze(issues)});
  }
}
