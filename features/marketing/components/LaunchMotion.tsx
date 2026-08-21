"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .55, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}

export function WorkflowMotion({ steps }: { steps: readonly string[] }) {
  const reduced = useReducedMotion();
  return <div className="grid gap-2 lg:grid-cols-8">{steps.map((step, index) => <motion.div key={step} className="relative rounded-2xl border border-vds-border bg-vds-surface p-4 text-sm font-medium" initial={reduced ? false : { opacity: 0, scale: .96 }} whileInView={reduced ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .06 }} whileHover={reduced ? undefined : { y: -3 }}><span className="mb-4 block text-xs text-vds-primary">0{index + 1}</span>{step}</motion.div>)}</div>;
}
