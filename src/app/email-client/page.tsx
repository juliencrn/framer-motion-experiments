"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MailIcon } from "lucide-react";

const DEFAULT_MESSAGES = 4;
const titles = [
  ["Apple's newest iPhone is here", "Watch our July event"],
  [
    "Nintendo's Newsletter for July",
    "Introducing Strike, a 5-on-5 soccer game",
  ],
  ["Your funds have been processed", "See your latest deposit online"],
  ["This Week in Sports", "The finals are heating up"],
  ["Changelog update", "Edge subroutines and more"],
  ["React Hawaii is here!", "Time for fun in the sun"],
];

export default function Page() {
  const [messageIds, setMessageIds] = useState(
    Array.from(Array(DEFAULT_MESSAGES).keys())
  );

  const addMessage = () => {
    const newId = (messageIds.at(-1) || 0) + 1;
    setMessageIds((messages) => [...messages, newId]);
  };

  const archiveMessage = (messageId: number) => {
    setMessageIds((ids) => ids.filter((id) => id !== messageId));
  };

  return (
    <section
      className="flex flex-1 flex-col overscroll-y-contain items-center justify-center"
      style={{
        maxHeight: "calc(100vh - 80px - 4rem)",
      }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 overflow-hidden rounded-2xl bg-card border-2 border-border">
        <div className="flex w-full sm:w-[45%] md:w-[40%] flex-col bg-card py-2">
          <div className="border-b px-5 py-2 border-border">
            <button
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              onClick={addMessage}
            >
              <MailIcon className="size-5" />
            </button>
          </div>
          <ul className="overflow-y-scroll px-3 pt-2 no-scrollbar">
            {[...messageIds].reverse().map((id) => (
              <li key={id} className="relative py-0.5">
                <div
                  onClick={() => archiveMessage(id)}
                  className="w-full cursor-pointer truncate rounded py-3 px-3 text-left hover:bg-accent/50 hover:text-accent-foreground flex items-center justify-between"
                >
                  <div>
                    <p className="truncate text-sm font-medium">
                      {titles[id % titles.length][0]}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {titles[id % titles.length][1]}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 overflow-y-scroll no-scrollbar border-l px-8 py-8 block">
          <h1 className="h-8 rounded bg-muted text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {Array.from(Array(9).keys()).map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-muted" />
                <p className="h-4 rounded bg-muted" />
                <p className="h-4 w-4/6 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
