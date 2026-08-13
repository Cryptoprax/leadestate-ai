import type { LucideIcon } from "lucide-react";
import type { ExecutiveWidgetModel } from "../domain/contracts";
import { AwaitingData } from "./AwaitingData";
import { ExecutiveCard } from "./ExecutiveCard";
export function ContextWidget({ widget, icon: Icon }: { readonly widget: ExecutiveWidgetModel; readonly icon: LucideIcon }) { return <ExecutiveCard title={widget.title} eyebrow="Context widget" icon={<Icon className="size-4" aria-hidden="true"/>}><p className="mb-4 text-xs leading-5 text-vds-subtle">{widget.description}</p>{widget.state === "awaiting-data" ? <AwaitingData compact/> : <ul>{widget.items.map(item => <li key={item}>{item}</li>)}</ul>}</ExecutiveCard> }
