"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <section>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={isOpen ? close : open}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Open Modal
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <Backdrop key="modal" onClose={close}>
            <ModalCard onClose={close} />
          </Backdrop>
        )}
      </AnimatePresence>
    </section>
  );
}

function Backdrop({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto bg-black/80 flex justify-center items-center"
      onClick={onClose}
    >
      {children}
    </motion.div>
  );
}

function ModalCard({ onClose }: { onClose?: () => void }) {
  return (
    <motion.div
      variants={{
        hidden: { y: "-100vh", opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.2,
            type: "spring",
            damping: 20,
            stiffness: 100,
          },
        },
        exit: { y: "-100vh", opacity: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative overflow-hidden rounded-xl bg-card shadow-xl m-8 w-full max-w-lg p-6 flex flex-col gap-8 border border-border"
    >
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 id="modal-title" className="font-bold leading-6">
          Deactivate account
        </h3>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row-reverse gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className={cn(buttonVariants({ variant: "destructive" }))}
          onClick={onClose}
        >
          Deactivate
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={onClose}
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );
}
