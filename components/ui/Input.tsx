import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full border-2 border-primary/30 bg-cream px-4 py-3 text-sm outline-none transition-colors",
        "focus:border-primary focus:ring-1 focus:ring-primary/20",
        "placeholder:text-ink/40",
        className,
      )}
      {...props}
    />
  );
}
