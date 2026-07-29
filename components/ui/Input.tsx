import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-rose-200 bg-white px-4 py-2 text-sm outline-none focus:border-primary",
        className,
      )}
      {...props}
    />
  );
}
