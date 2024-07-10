"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { buttonVariants } from "./ui/button";

export function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={isOpen ? close : open}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto bg-black/80"
            onClick={close}
          >
            <div className="flex min-h-full container justify-center items-center">
              <ModalCard onClick={close} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ModalCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-card shadow-xl my-8 w-full max-w-lg p-6 flex flex-col gap-8 border border-border">
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 className="font-bold leading-6">Deactivate account</h3>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row-reverse gap-3">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "destructive" }))}
          onClick={onClick}
        >
          Deactivate
        </button>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={onClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
