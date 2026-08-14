"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Progress,
} from "@/features/platform/design-system";
import type { ProviderDiagnosticModel } from "../domain/contracts";

const steps = ["Review", "Authorize", "Validate"] as const;

export function ConnectionWizard({
  model,
}: {
  readonly model: ProviderDiagnosticModel;
}) {
  const [step, setStep] = useState(0);
  return (
    <Card aria-labelledby="connection-wizard-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-vds-primary">
            Connection wizard
          </p>
          <h2
            id="connection-wizard-title"
            className="mt-2 text-xl font-semibold"
          >
            Provider onboarding
          </h2>
          <p className="mt-2 text-sm text-vds-muted">
            Review-only foundation. Authorization exchange and provider traffic
            remain disabled.
          </p>
        </div>
        <Badge tone="warning">No live traffic</Badge>
      </div>
      <div className="mt-6">
        <Progress
          value={((step + 1) / steps.length) * 100}
          label={`Step ${step + 1} of ${steps.length}`}
        />
      </div>
      <ol
        className="mt-5 grid gap-3 sm:grid-cols-3"
        aria-label="Connection steps"
      >
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={index === step ? "step" : undefined}
            className={`rounded-xl border p-3 text-sm ${index === step ? "border-vds-primary bg-vds-primary-soft" : "border-vds-border"}`}
          >
            <span className="mr-2 text-vds-subtle">{index + 1}.</span>
            {label}
          </li>
        ))}
      </ol>
      <div
        className="mt-6 min-h-32 rounded-2xl border border-vds-border bg-vds-surface/[.025] p-5"
        role="region"
        aria-live="polite"
      >
        {step === 0 && (
          <>
            <h3 className="font-semibold">Review requested access</h3>
            <p className="mt-2 text-sm text-vds-muted">
              {model.definition.requiredScopes.length} provider scopes are
              declared. No secret or token is displayed.
            </p>
          </>
        )}
        {step === 1 && (
          <>
            <h3 className="font-semibold">Authorization boundary</h3>
            <p className="mt-2 text-sm text-vds-muted">
              PKCE, state, nonce, expiry, and trusted return-path contracts are
              ready. OAuth launch is intentionally unavailable in this
              foundation.
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="flex items-center gap-2 font-semibold">
              <ShieldCheck
                className="size-5 text-vds-primary"
                aria-hidden="true"
              />
              Sandbox validation
            </h3>
            <p className="mt-2 text-sm text-vds-muted">
              Validation requires a credential reference. It never reads mail,
              writes calendars, sends messages, or executes workflows.
            </p>
          </>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button
            onClick={() =>
              setStep((value) => Math.min(steps.length - 1, value + 1))
            }
          >
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button disabled>
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Awaiting authorization
          </Button>
        )}
      </div>
    </Card>
  );
}
