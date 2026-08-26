"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tao-thiep", label: "Tạo link" },
  { href: "/admin/guests", label: "Khách mời" },
  { href: "/admin/rsvp", label: "RSVP" },
  { href: "/admin/wishes", label: "Lời chúc" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-5 flex flex-wrap gap-3 text-sm">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
