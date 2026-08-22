import { AIRuntimeHeader } from "@/features/vayon/ai-runtime/components/AIRuntimeHeader";
import { PromptLibrary } from "@/features/vayon/ai-runtime/components/PromptLibrary";

export default function Page() {
  return <main className="mx-auto max-w-6xl px-5 py-8"><AIRuntimeHeader title="Enterprise Prompt Library" description="Versioned role and system prompt templates, tested only through governed workspace-attributed AI employee workflows."/><PromptLibrary /></main>;
}
