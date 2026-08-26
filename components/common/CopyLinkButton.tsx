"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type CopyLinkButtonProps = {
  value: string;
  className?: string;
};

export function CopyLinkButton({ value, className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API bị chặn (HTTP non-localhost, trình duyệt cũ) — người dùng copy tay từ ô text
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-100",
        copied && "border-emerald-500 text-emerald-600",
        className,
      )}
    >
      {copied ? "Đã sao chép" : "Copy"}
    </button>
  );
}
