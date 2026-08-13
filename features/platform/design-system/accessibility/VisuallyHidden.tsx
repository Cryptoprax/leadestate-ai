import type { HTMLAttributes } from "react";
export function VisuallyHidden(props: HTMLAttributes<HTMLSpanElement>) { return <span {...props} className={`sr-only ${props.className ?? ""}`}/> }
