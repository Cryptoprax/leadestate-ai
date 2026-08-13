import type{UniversalObjectRef}from"@/features/platform/universal-objects/domain/models";import type{KnowledgeRecord}from"../domain/types";
export interface KnowledgeStore{get(target:UniversalObjectRef):KnowledgeRecord|undefined;list():readonly KnowledgeRecord[];save(record:KnowledgeRecord):void}
export interface KnowledgeGenerator{analyze(target:UniversalObjectRef,context?:Readonly<Record<string,unknown>>):Promise<KnowledgeRecord>}
