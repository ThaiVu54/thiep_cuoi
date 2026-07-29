"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className={cn("max-w-lg rounded-3xl bg-white p-3")} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
