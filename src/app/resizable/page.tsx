"use client";

import { AnimatedCheckIcon } from "@/components/animated-check-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

type Status = "initial" | "loading" | "success" | "sent";

export default function Page() {
  const [status, setStatus] = useState<Status>("initial");
  const ref = useRef<HTMLDivElement>(null);
  const { height = 0 } = useResizeObserver({
    ref,
  });

  const handleSubmit = () => {
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("sent");
      }, 1000);
    }, 2000);
  };

  return (
    <section className="flex-1 flex flex-col gap-8 container justify-center items-center">
      {/* <div className="flex gap-2 justify-center items-center">
        <button
          onClick={() => setStatus("initial")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            status === "initial" && "border-primary"
          )}
        >
          Initial
        </button>
        <button
          onClick={() => setStatus("loading")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            status === "loading" && "border-primary"
          )}
        >
          Loading
        </button>
        <button
          onClick={() => setStatus("success")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            status === "success" && "border-primary"
          )}
        >
          Success
        </button>
        <button
          onClick={() => setStatus("sent")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            status === "sent" && "border-primary"
          )}
        >
          Sent
        </button>
      </div> */}
      <MotionConfig
        transition={{ duration: 0.4, type: "ease", ease: "easeInOut" }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-xl w-full max-w-lg p-6 flex flex-col gap-8 border border-border">
          <motion.div
            animate={{ height: height }}
            transition={{ type: "spring", duration: "0.6" }}
          >
            <div ref={ref} className="grid gap-4">
              {status === "sent" ? (
                <div className="flex flex-col gap-3">
                  <h1 className="text-xl tracking-tight font-semibold mb-4">
                    Reset password
                  </h1>
                  <p className="text-muted-foreground">
                    Email sent! Check your inbox to continue.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-xl tracking-tight font-semibold mb-4">
                      Reset password
                    </h1>
                    <fieldset className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none"
                      >
                        Enter your email to get a password reset link:
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        defaultValue="john.doe@acme.com"
                      />
                    </fieldset>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "relative",
                        status === "success" && "disabled:opacity-100"
                      )}
                      disabled={status !== "initial"}
                      onClick={handleSubmit}
                    >
                      <motion.span
                        animate={status === "initial" ? "visible" : "hidden"}
                        variants={{
                          visible: { opacity: 1 },
                          hidden: { opacity: 0 },
                        }}
                      >
                        Email me my link
                      </motion.span>
                      <AnimatePresence>
                        {status === "loading" && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute"
                          >
                            <Loader2Icon className="size-4 animate-spin" />
                          </motion.span>
                        )}
                        {status === "success" && (
                          <span className="absolute">
                            <AnimatedCheckIcon
                              svgProps={{ className: "size-5" }}
                            />
                          </span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </MotionConfig>

      <div className="w-full max-w-lg">
        <p className="text-muted-foreground">
          Reach out to us if you need more help.
        </p>
      </div>
    </section>
  );
}
