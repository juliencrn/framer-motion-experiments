"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Step } from "./_components/step";

const MAX_STEP = 4;
const MIN_STEP = 1;

export default function Page() {
  const [step, setStep] = React.useState(3);

  const canPrev = step > MIN_STEP;
  const canNext = step <= MAX_STEP;

  const next = () => setStep((s) => (canNext ? s + 1 : s));
  const prev = () => setStep((s) => (canPrev ? s - 1 : s));

  return (
    <section className="flex-1 flex justify-center items-start">
      <div className="relative overflow-hidden rounded-xl bg-card shadow-xl m-8 w-full max-w-lg p-6 flex flex-col gap-8 border border-border">
        <div className="flex justify-between">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
          <Step step={4} currentStep={step} />
        </div>

        <ContentPlaceholder />

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
          <button
            type="button"
            disabled={!canPrev}
            onClick={prev}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            className={cn(buttonVariants({ variant: "default" }))}
            disabled={!canNext}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

function ContentPlaceholder() {
  return (
    <div className="flex-1 space-y-6 py-4">
      <div className="h-4 w-40 bg-muted rounded"></div>
      <div className="space-y-3">
        <div className="h-2.5 bg-muted rounded"></div>
        <div className="h-2.5 bg-muted rounded"></div>
        <div className="h-2.5 w-4/5 bg-muted rounded"></div>
      </div>
    </div>
  );
}
