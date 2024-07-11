"use client";

import { motion, Variant } from "framer-motion";

type Status = "active" | "upcoming" | "completed";

export function Step({
  step,
  currentStep,
}: {
  step: number;
  currentStep: number;
}) {
  const status: Status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "upcoming"
      : "completed";

  return (
    <motion.div animate={status} className="relative">
      <motion.div
        animate={status}
        className="rounded-full size-10 absolute inset-0 bg-primary/50"
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2,
              ease: "easeOut",
            },
          },
          completed: {
            scale: 1.25,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "tween",
          ease: "circOut",
        }}
      ></motion.div>

      <motion.div
        initial={false}
        className="rounded-full size-10 border-2 relative flex justify-center items-center m-auto"
        transition={{ duration: 10 }}
        variants={{
          active: {
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--primary))",
            borderColor: "hsl(var(--primary))",
            transition: {
              duration: 3,
            },
          },
          upcoming: {
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--muted))",
            borderColor: "hsl(var(--muted))",
          },
          completed: {
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            borderColor: "hsl(var(--primary))",
          },
        }}
      >
        {status === "completed" ? (
          <CheckIcon className="size-6" />
        ) : (
          <span className="font-bold">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      className={className}
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathLength: 1 }}
        initial={{ pathLength: 0 }}
        d="M5 13l4 4L19 7"
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
      />
    </svg>
  );
}
