"use client";

type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div
      className={`fixed bottom-24 right-4 z-50 rounded-xl px-4 py-2 text-sm text-white shadow-md ${
        type === "success" ? "bg-emerald-500" : "bg-rose-500"
      }`}
    >
      {message}
    </div>
  );
}
