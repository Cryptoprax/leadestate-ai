import type { UnifiedContextViewModel } from "../view-models/contracts";
import { UnifiedContextPanel } from "./ContextPanel";
export function ContextSidePanel({ model }: { readonly model: UnifiedContextViewModel }) { return <aside aria-label="Business context side panel" className="w-full xl:max-w-md"><UnifiedContextPanel model={model} className="xl:sticky xl:top-20"/></aside> }
