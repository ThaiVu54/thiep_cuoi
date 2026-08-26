"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, type MouseEvent } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tao-thiep", label: "Tạo link" },
  { href: "/admin/guests", label: "Khách mời" },
  { href: "/admin/rsvp", label: "RSVP" },
  { href: "/admin/wishes", label: "Lời chúc" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const handleClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    // Để trình duyệt tự xử lý khi người dùng mở tab mới / dùng phím tắt
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (href === pathname) return;

    event.preventDefault();
    setPendingHref(href);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <nav className="mb-5 flex flex-wrap gap-3 text-sm">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const isLoading = isPending && pendingHref === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleClick(item.href)}
            aria-current={isActive ? "page" : undefined}
            aria-disabled={isPending}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors",
              isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              isPending && !isLoading ? "pointer-events-none opacity-60" : "",
            )}
          >
            {isLoading && (
              <svg
                className="h-3.5 w-3.5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
