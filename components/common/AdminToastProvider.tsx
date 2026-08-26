"use client";

import { cn } from "@/lib/utils";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ToastState = {
  id: number;
  message: string;
  type: "success" | "error";
};

type AdminToastContextValue = {
  showToast: (message: string, type: "success" | "error") => void;
};

const AdminToastContext = createContext<AdminToastContextValue | null>(null);

export function useAdminToast() {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error("useAdminToast phải được dùng bên trong AdminToastProvider");
  }
  return context;
}

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ id: Date.now(), message, type });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <AdminToastContext.Provider value={{ showToast }}>
      {children}
      {toast ? (
        <div
          role="status"
          className={cn(
            "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 text-sm text-white shadow-lg",
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600",
          )}
        >
          {toast.message}
        </div>
      ) : null}
    </AdminToastContext.Provider>
  );
}
