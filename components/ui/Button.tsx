import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "burgundy";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-primary text-cream border-2 border-primary hover:bg-primary-dark",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-cream",
    burgundy: "bg-gold text-ink border-2 border-gold hover:bg-gold/90",
  };

  return (
    <button
      className={cn(
        "px-6 py-2.5 font-serif text-sm uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
