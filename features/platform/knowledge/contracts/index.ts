export type KnowledgeStatus="draft"|"published"|"archived";export type KnowledgeCategory="user"|"administrator"|"ai"|"crm"|"workflow"|"billing"|"security"|"api"|"faq"|"release_notes"|"tutorial"|"organization";
export interface KnowledgeArticle{id:string;title:string;summary:string;content:string;category:KnowledgeCategory;tags:readonly string[];status:KnowledgeStatus;version:number;author:string;lastReviewedAt:string|null;views:number;helpful:number;notHelpful:number;createdAt:string;updatedAt:string}
export interface KnowledgeDocument{id:string;name:string;mimeType:string;category:KnowledgeCategory;tags:readonly string[];status:KnowledgeStatus;version:number;author:string;lastReviewedAt:string|null;createdAt:string}
export interface KnowledgeSearchRequest{query:string;category?:KnowledgeCategory;tags?:readonly string[];mode:"full_text"|"semantic";limit:number}
export interface KnowledgeSearchResult{id:string;title:string;summary:string;category:KnowledgeCategory;tags:readonly string[];score:number;source:"article"|"document";citation:string}
export interface SemanticKnowledgeProvider{readonly id:string;search(request:KnowledgeSearchRequest):Promise<readonly KnowledgeSearchResult[]>}
export interface KnowledgeAnswer{answer:string;citations:readonly KnowledgeSearchResult[];related:readonly KnowledgeSearchResult[];escalate:boolean;recommendationOnly:true;latencyMs:number}
