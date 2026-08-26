import { AdminNav } from "@/components/common/AdminNav";
import { AdminToastProvider } from "@/components/common/AdminToastProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-6">
      <AdminNav />
      <AdminToastProvider>{children}</AdminToastProvider>
    </main>
  );
}
