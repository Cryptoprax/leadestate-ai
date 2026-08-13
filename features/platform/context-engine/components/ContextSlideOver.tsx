"use client";
import { Button } from "@/features/platform/design-system";
import { X } from "lucide-react";
import type { UnifiedContextViewModel } from "../view-models/contracts";
import { UnifiedContextPanel } from "./ContextPanel";
export function ContextSlideOver({ model, open, onClose }: { readonly model: UnifiedContextViewModel; readonly open: boolean; readonly onClose: () => void }) { if (!open) return null; return <div className="fixed inset-0 z-[70] bg-vds-overlay backdrop-blur-sm" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose() }}><aside role="dialog" aria-modal="true" aria-label="Business context" className="ml-auto h-full w-full max-w-xl overflow-y-auto border-l border-vds-border/[.08] bg-vds-background p-3 sm:p-5"><Button variant="control" type="button" onClick={onClose} aria-label="Close unified context" className="mb-3 ml-auto grid size-10 place-items-center rounded-xl text-vds-muted hover:bg-vds-surface/[.05] hover:text-vds-foreground focus-visible:outline-2 focus-visible:outline-vds-focus"><X className="size-4"/></Button><UnifiedContextPanel model={model}/></aside></div> }
