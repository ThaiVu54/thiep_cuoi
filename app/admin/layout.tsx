import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-6">
      <nav className="mb-5 flex flex-wrap gap-3 text-sm">
        <Link href="/admin" className="rounded-full bg-slate-900 px-3 py-1.5 text-white">
          Dashboard
        </Link>
        <Link href="/admin/guests" className="rounded-full bg-slate-100 px-3 py-1.5">
          Khách mời
        </Link>
        <Link href="/admin/rsvp" className="rounded-full bg-slate-100 px-3 py-1.5">
          RSVP
        </Link>
        <Link href="/admin/wishes" className="rounded-full bg-slate-100 px-3 py-1.5">
          Lời chúc
        </Link>
      </nav>
      {children}
    </main>
  );
}
