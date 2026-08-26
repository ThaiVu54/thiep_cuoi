import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "burgundy";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
    // Giữ tên variant cũ để không phải sửa nơi gọi; giờ trỏ về style ghost
    burgundy: "btn-outline",
  };

  return <button className={cn(variants[variant], className)} {...props} />;
}
