export const emailContextRelationships=Object.freeze(["contact","company","lead","deal","property","campaign","meeting"]as const);
export interface EmailContextSlice{readonly messageId:string;readonly threadId:string;readonly related:readonly {type:(typeof emailContextRelationships)[number];id:string}[];readonly unavailableReason:string|null}
