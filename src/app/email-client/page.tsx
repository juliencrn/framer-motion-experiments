"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LucideIcon, MailIcon, Trash2Icon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelected = (messageId: number) => {
    setSelectedIds((ids) =>
      ids.includes(messageId)
        ? ids.filter((id) => id !== messageId)
        : [...ids, messageId]
    );
  };

  const addMessage = () => {
    const newId = (messageIds.at(-1) || 0) + 1;
    setMessageIds((messages) => [...messages, newId]);
  };

  const archiveMessage = (messageId: number) => {
    setMessageIds((ids) => ids.filter((id) => id !== messageId));
  };

  const archiveSelectedMessages = () => {
    setSelectedIds((selectedIds) => {
      selectedIds.forEach(archiveMessage);
      return [];
    });
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
          <div className="border-b px-5 py-2 border-border flex justify-between">
            <ButtonIcon onClick={addMessage} icon={MailIcon} />
            <ButtonIcon
              onClick={archiveSelectedMessages}
              icon={Trash2Icon}
              disabled={selectedIds.length === 0}
            />
          </div>

          <div className="overflow-y-scroll px-3 pt-2 no-scrollbar">
            <AnimatePresence>
              {[...messageIds].reverse().map((id) => (
                <motion.article
                  transition={{
                    duration: 0.2,
                    type: "tween",
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  key={id}
                  className="relative py-0.5"
                >
                  <div
                    onClick={() => toggleSelected(id)}
                    className={cn(
                      "w-full cursor-pointer truncate rounded py-3 px-3 text-left  flex items-center justify-between",
                      selectedIds.includes(id)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/30"
                    )}
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
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
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

function ButtonIcon({
  icon: Icon,
  onClick,
  disabled,
}: {
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      onClick={onClick}
    >
      <Icon className="size-5" />
    </button>
  );
}
